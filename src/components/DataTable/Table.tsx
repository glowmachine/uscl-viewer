import { useDataContext } from "../../contexts/DataContext";
import { useTableContext, type Row } from "../../contexts/TableContext";
import { useMemo } from "react";
import TableControls from "./TableControls";
import TableRow from "./TableRow";
import getRowData from "./getRowData";
import sortRows from "./sortRows";
import filterData from "./filterData";
import type { LegislatorCurrent } from "../../types/LegislatorCurrent";

export default function Table() {
    const { legislators, isLoading, error } = useDataContext();
    const { columns, sortBy, setSortBy, filterOptions } = useTableContext();
    const rows = useMemo<Row[]>(() => {
        if (!legislators) return [];
        const filteredData: LegislatorCurrent[] = filterData(legislators, filterOptions);
        let rowData: Row[] = getRowData(filteredData);
        rowData = sortRows(rowData, sortBy.key, sortBy.asc);
        return rowData;
    }, [legislators, columns, sortBy, filterOptions]);

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
            <div id='table-container' className='h-screen overflow-auto'>
                {isLoading && <div className='h-full grid place-content-center
                    text-3xl text-gray-400'>Loading Database</div>}
                {error && <div className='h-full grid place-content-center
                    text-2xl text-red-300'>{error.message}</div>}
                {(!isLoading && !error) &&
                    <table className='min-w-full'>
                        <thead className='sticky top-0'>
                            <tr className='text-left bg-gray-400'>
                                {columns.filter((c) => (c.selected)).map((col) =>
                                    <th key={col.key}><button
                                        className='flex gap-1 justify-between whitespace-nowrap w-full px-1 hover:bg-gray-500'
                                        onClick={() => setSortBy((prev) => {
                                            return (col.key === prev.key)
                                                ? { ...prev, asc: !prev.asc }
                                                : { key: col.key, asc: true }
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
                            {rows &&
                                rows.map(row =>
                                    // (index >= pageSettings.index && index < pageSettings.index + pageSettings.rowsPerPage)
                                    <TableRow row={row} key={row.bioguide} />
                                )}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}