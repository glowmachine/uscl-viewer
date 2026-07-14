import { useDataContext } from "../contexts/DataContext";
import { useTableContext, type ColumnKey, type Row } from "../contexts/TableContext";
import { useMemo } from "react";
import DataTableRow from "./DataTableRow";
import selectData from "./selectData";
import sortRows from "./sortRows";
import filterRows from "./filterRows";

export default function DataTable() {
    const { data, isLoading, error } = useDataContext();
    const { columns, setColumns, sortBy, setSortBy, filterOptions } = useTableContext();

    const visibleRows = useMemo<Row[]>(() => {
        if (!data) return [];
        let results: Row[] = selectData(data);
        results = sortRows(results, sortBy.key, sortBy.asc);
        results = filterRows(results, filterOptions);
        return results;
    }, [data, columns, sortBy, filterOptions]);


    return (<>
        <div className='overflow-auto'>
            <table>
                <thead>
                    <tr className='text-left bg-gray-400'>
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
                        {visibleRows.map((row) =>
                            <DataTableRow row={row} key={row.id} />
                        )}
                    </>}
                </tbody>
            </table>
        </div>
    </>);
}