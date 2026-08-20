import { useDataContext, type Legislator } from "../../contexts/DataContext";
import { useTableContext, type Row } from "../../contexts/TableContext";
import { useMemo, useState } from "react";
import TableRow from "./TableRow";
import getRowData from "./getRowData";
import sortRows from "./sortRows";
import filterData from "./filterData";
import ColumnSelector from "./ColumnSelector";

const buttonStyle = 'h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-200';

export default function Table() {
    const { legislators, isLoading, error } = useDataContext();
    const { columns, sortBy, setSortBy, filterOptions } = useTableContext();
    const [colSelectOpen, setColSelectOpen] = useState(false);

    const rows = useMemo<Row[]>(() => {
        if (!legislators) return [];
        const filteredData: Legislator[] = filterData(legislators, filterOptions);
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

    return (<>
        {colSelectOpen && <ColumnSelector colSelectOpen={colSelectOpen} setColSelectOpen={setColSelectOpen} />}

        <div className='bg-gray-300 p-4 flex flex-col min-w-0 max-h-full h-screen'>
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
            {isLoading && <div className='h-full grid place-content-center
                    text-3xl text-gray-400'>Loading Database</div>}
            {error && <div className='h-full grid place-content-center
                    text-2xl text-red-300'>{error.message}</div>}
            {(!isLoading && !error) && <div className='bg-white rounded-xl h-full pt-3'>
                <div className='min-w-0 h-full overflow-auto px-3'>
                    <div className='sticky px-2 flex items-center gap-1 justify-between'>
                        <div className='flex items-center gap-1 text-gray-600'>
                            <h1 className='text-3xl'>Legislators</h1> <span>({rows.length})</span>
                        </div>
                        <div className='flex gap-1'>
                            <button className={`${buttonStyle} ${colSelectOpen ? 'bg-gray-200' : ''}`}
                                onClick={() => setColSelectOpen(prev => !prev)}
                            >
                                <span className='material-symbols-outlined'
                                    style={{ fontVariationSettings: `'FILL' ${colSelectOpen ? 1 : 0}` }}
                                >
                                    view_column
                                </span>
                            </button>
                        </div>
                    </div>
                    <table className='min-w-full'>
                        <thead className='sticky top-0 bg-white text-left'>
                            <tr>{columns.filter((c) => (c.selected)).map((col, index) =>
                                <th colSpan={index === 0 ? 2 : 1} key={col.key}>
                                    <button
                                        className='h-15 flex items-center gap-1 whitespace-nowrap w-full p-2
                                            text-gray-500 hover:text-black hover:bg-gray-100 border-b-1 border-gray-300'
                                        onClick={() => setSortBy((prev) => {
                                            return (col.key === prev.key)
                                                ? { ...prev, asc: !prev.asc }
                                                : { key: col.key, asc: true }
                                        })}
                                    >
                                        <span>{col.label}</span>
                                        <span className={col.key !== sortBy.key ? 'invisible' : ''}>
                                            {sortBy.asc ? '▲' : '▼'}</span>
                                    </button>
                                </th>)
                            }</tr>
                        </thead>
                        <tbody>
                            {rows &&
                                rows.map(row =>
                                    // (index >= pageSettings.index && index < pageSettings.index + pageSettings.rowsPerPage)
                                    <TableRow row={row} key={row.bioguide} />
                                )}
                        </tbody>
                    </table>
                </div>
            </div>}
        </div>
    </>);
}