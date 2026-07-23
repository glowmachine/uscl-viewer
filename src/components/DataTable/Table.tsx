import { useDataContext } from "../../contexts/DataContext";
import { useTableContext, type ColumnKey, type Row } from "../../contexts/TableContext";
import { useEffect, useMemo, useState } from "react";
import TableControls from "./TableControls";
import TableRow from "./TableRow";
import selectData from "./selectData";
import sortRows from "./sortRows";
import type { DataType } from "../../api/fetchData";
import filterData from "./filterData";

export default function Table() {
    const { data, isLoading, error } = useDataContext();
    const { columns, setColumns, sortBy, setSortBy, filterOptions } = useTableContext();
    const rows = useMemo<Row[]>(() => {
        if (!data) return [];
        const filteredData: DataType[] = filterData(data, filterOptions);
        let rowData: Row[] = selectData(filteredData);
        rowData = sortRows(rowData, sortBy.key, sortBy.asc);
        return rowData;
    }, [data, columns, sortBy, filterOptions]);

    // type PaginationSettings = {
    //     rowsPerPage: number,
    //     index: number,
    // }
    // const defaultPageSettings = { rowsPerPage: 25, index: 0 };
    // const [pageSettings, setPageSettings] = useState<PaginationSettings>(defaultPageSettings);
    // const pageStart: number = pageSettings.index + 1;
    // const pageEnd: number = pageSettings.index + pageSettings.rowsPerPage <= rows.length
    //     ? pageSettings.index + pageSettings.rowsPerPage
    //     : rows.length;
    // useEffect(() => {
    //     setPageSettings(defaultPageSettings);
    // }, [rows]);

    return (
        <div className='flex flex-col max-w-full max-h-full'>
            <TableControls />
            {/* <div id='page-controls' className='self-end m-1 flex items-center gap-1'>
                {rows.length === 0
                    ? <span>0-0 of 0</span>
                    : <span>
                        {pageStart}-{pageEnd} of {rows.length}
                    </span>}
                <button
                    className='w-5 h-5 border rounded-full
                    hover:bg-gray-200 active:bg-gray-400'
                    disabled={pageSettings.index === 0}
                    onClick={() => setPageSettings(p =>
                        ({ ...p, index: p.index - p.rowsPerPage }))}>
                    ←</button>
                <button
                    className='w-5 h-5 border rounded-full
                    hover:bg-gray-200 active:bg-gray-400'
                    disabled={pageSettings.index + pageSettings.rowsPerPage >= rows.length}
                    onClick={() => setPageSettings(p =>
                        ({ ...p, index: p.index + p.rowsPerPage }))}>
                    →</button>
            </div> */}
            <div id='table-container' className='overflow-auto h-screen'>
                <table className='min-w-full'>
                    <thead className='sticky top-0'>
                        <tr className='text-left bg-gray-400'>
                            <th>Details</th>
                            {columns.filter((c) => (c.selected)).map((col) =>
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
                        {rows &&
                            rows.map(row =>
                                // (index >= pageSettings.index && index < pageSettings.index + pageSettings.rowsPerPage)
                                <TableRow row={row} key={row.id} />
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}