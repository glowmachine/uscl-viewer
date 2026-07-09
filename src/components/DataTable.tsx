import { useDataContext } from "../contexts/DataContext";
import { useTableContext } from "../contexts/TableContext";
import DataTableRow from "./DataTableRow";

export default function DataTable() {
    const { data, isLoading, error } = useDataContext();
    const { visibleColumns, sortBy, setSortBy } = useTableContext();

    return (<>
        {isLoading && <div>Loading Database</div>}
        {error && <div>{error.message}</div>}
        {data && <>
            <div className='overflow-auto'>
                <table>
                    <thead>
                        <tr className='text-left bg-gray-400'>
                            {visibleColumns.map((column) =>
                                <th
                                    className='px-1'
                                    key={column}>{column}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className=''>
                        {data.map((member) =>
                            <DataTableRow key={member.id.bioguide} member={member} />
                        )}
                    </tbody>
                </table>
            </div>
        </>}
    </>);
}