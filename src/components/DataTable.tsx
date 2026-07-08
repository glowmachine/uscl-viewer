import useData from "../hooks/useData";
import DataTableRow from "./DataTableRow";

export default function DataTable() {
    const { data, isLoading, error } = useData('legislators-current.json');

    return (<>
        {isLoading && <div>Loading Database</div>}
        {error && <div>{error.message}</div>}
        {data && <>
            <p>Records: {Object.values(data).length}</p>
            <table className='w-full'>
                <thead>
                    <tr className='text-left bg-gray-400'>
                        <th>State</th>
                        <th>Role</th>
                        <th>Member</th>
                        <th>Party</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((member) =>
                        <DataTableRow key={member.id.bioguide} member={member} />
                    )}
                </tbody>
            </table>
        </>}
    </>);
}