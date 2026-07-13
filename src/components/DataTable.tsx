import { useDataContext } from "../contexts/DataContext";
import { useTableContext, type ColumnKey } from "../contexts/TableContext";
import DataTableRow from "./DataTableRow";
import { useMemo } from "react";
import { getDisplayData, type RowData } from "./getDisplayData";
import sortDisplayData from "./sortDisplayData";
// import filterDisplayData from "./filterDisplayData";

export default function DataTable() {
    const { data, isLoading, error } = useDataContext();
    const { columns, setColumns, sortBy, setSortBy } = useTableContext();

    const tableData = useMemo<RowData[]>(() => {
        if (!data) return [];

        let displayData: RowData[] = getDisplayData(data);
        displayData = sortDisplayData(displayData, sortBy.key, sortBy.asc);
        return displayData;
    }, [data, columns, sortBy]);


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
                    {tableData && <>
                        {tableData.map((row) =>
                            <DataTableRow row={row} key={row.id} />
                        )}
                    </>}
                </tbody>
            </table>
        </div>
    </>);
}