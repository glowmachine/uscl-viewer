import { useDataContext } from "../contexts/DataContext";
import { useTableContext } from "../contexts/TableContext";
import { sortDataTableCol } from "./sortDataTableCol";
import DataTableRow from "./DataTableRow";

// function filterData(data: DataType[], exclude: FilterOptions): DataType[] {
//     return data;
// }

export default function DataTable() {
    const { data, isLoading, error } = useDataContext();
    const { visibleColumns, sortBy, setSortBy } = useTableContext();

    const displayData = sortDataTableCol(data, sortBy);

    return (<>
        <div className='overflow-auto'>
            <table>
                <thead>
                    <tr className='text-left bg-gray-400'>
                        {visibleColumns.map((column) =>
                            <th key={column}><button
                                className='flex gap-1 justify-between whitespace-nowrap w-full px-1 hover:bg-gray-500'
                                onClick={() => setSortBy((prev) => {
                                    return prev.column !== column
                                        ? { column: column, asc: true }
                                        : { ...prev, asc: !prev.asc }
                                })}
                            >
                                <span>{column}</span>
                                <span className={column !== sortBy.column ? 'invisible' : ''}>
                                    {sortBy.asc ? '🔼' : '🔽'}</span>
                            </button></th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {isLoading && <tr><td>Loading Database</td></tr>}
                    {error && <tr><td>{error.message}</td></tr>}
                    {displayData && <>
                        {displayData.map((member) =>
                            <DataTableRow member={member} key={member.id.bioguide} />
                        )}
                    </>}
                </tbody>
            </table>
        </div>
    </>);
}