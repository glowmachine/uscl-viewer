import { useDataContext } from "../contexts/DataContext";
import { useTableContext, type ColumnKey, type Row } from "../contexts/TableContext";
import { useEffect, useMemo, useState } from "react";
import DataTableControls from "./DataTableControls";
import DataTableRow from "./DataTableRow";
import selectData from "./selectData";
import sortRows from "./sortRows";
import filterRows from "./filterRows";

export default function DataTable() {
    const { data, isLoading, error } = useDataContext();
    const { columns, setColumns, sortBy, setSortBy, filterOptions } = useTableContext();

    type PaginationSettings = {
        index: number,
        range: number,
    }
    const defaultPageSettings = { index: 0, range: 10 };
    const [pageSettings, setPageSettings] = useState<PaginationSettings>(defaultPageSettings);

    useEffect(() => {
        setPageSettings(defaultPageSettings);
    }, [data, columns, sortBy, filterOptions]);

    const visibleRows = useMemo<Row[]>(() => {
        if (!data) return [];
        let results: Row[] = selectData(data);
        results = sortRows(results, sortBy.key, sortBy.asc);
        results = filterRows(results, filterOptions);
        return results;
    }, [data, columns, sortBy, filterOptions, pageSettings]);


    return (<>
        <div>
            <DataTableControls />
            <div id='table-settings-container'
                className='text-right mb-1'>
                <button
                    className='w-5 h-5 border rounded
                    hover:bg-gray-200 active:bg-gray-400'
                    disabled={pageSettings.index === 0}
                    onClick={() => setPageSettings(p => ({ ...p, index: p.index - 10 }))}>←</button>
                <span>
                    {` ${pageSettings.index + 1} to ${pageSettings.index + pageSettings.range <= visibleRows.length ?
                        pageSettings.index + pageSettings.range : visibleRows.length} `}
                </span>
                <button
                    className='w-5 h-5 border rounded
                    hover:bg-gray-200 active:bg-gray-400'
                    disabled={pageSettings.index + pageSettings.range >= visibleRows.length}
                    onClick={() => setPageSettings(p => ({ ...p, index: p.index + 10 }))}>→</button>
            </div>
            <div id='table-container'
                className='overflow-auto'>
                <table>
                    <thead>
                        <tr className='text-left bg-gray-400'>
                            <th>Details</th>
                            {columns.filter((c) => (c.visible)).map((col) =>
                                <th key={col.key}><button
                                    className='flex gap-1 justify-between whitespace-nowrap w-full px-1 hover:bg-gray-500'
                                    onClick={() => setSortBy((prev) => {
                                        return (col.key == prev.key)
                                            ? { ...prev, asc: !prev.asc }
                                            : { key: col.key as ColumnKey, asc: true }
                                    })}
                                >
                                    <span>{col.label}</span>
                                    <span className={col.key !== sortBy.key ? 'invisible' : ''}>
                                        {sortBy.asc ? '▲' : '▼'}</span>
                                </button></th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && <tr><td>Loading Database</td></tr>}
                        {error && <tr><td>{error.message}</td></tr>}
                        {visibleRows && <>
                            {visibleRows.map((row, index) =>
                                (index >= pageSettings.index && index < pageSettings.index + pageSettings.range)
                                && <DataTableRow row={row} key={row.id} />
                            )}
                        </>}
                    </tbody>
                </table>
            </div>
        </div>
    </>);
}