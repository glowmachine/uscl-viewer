import { useDataContext } from "../contexts/DataContext";
import { useTableContext } from "../contexts/TableContext";
import DataTableRow, { type RowDataType } from "./DataTableRow";
import { useMemo } from "react";
import { states } from "../types/states";
import getDateDiff from "../util/getDateDiff";

export default function DataTable() {
    const { data, isLoading, error } = useDataContext();
    const { columns, setColumns, sortBy, setSortBy } = useTableContext();

    const displayData = useMemo<RowDataType[]>(() => {
        if (!data) return [];
        const reducedData: RowDataType[] = data.map((member) => {
            const currentTerm = member.terms[member.terms.length - 1];
            return {
                id: member.id.bioguide,
                first: member.name.first,
                last: member.name.last,
                age: getDateDiff(new Date(member.bio.birthday)).years,
                gender: member.bio.gender,
                type: currentTerm.type,
                state: states[currentTerm.state],
                district: currentTerm.district,
                party: String(currentTerm.party),
                terms: member.terms.length,
                start: currentTerm.start,
                end: currentTerm.end,
            }
        });
        const orderedData: RowDataType[] = [...reducedData].sort((a, b) => {
            const aValue = String(a[sortBy.key]);
            const bValue = String(b[sortBy.key]);
            if (aValue == null && bValue == null) return 0;
            if (sortBy.asc) {
                if (!aValue) return 1;
                if (!bValue) return -1;
                return aValue.localeCompare(bValue);
            } else {
                if (!bValue) return 1;
                if (!aValue) return -1;
                return bValue.localeCompare(aValue);
            }
        });
        return orderedData;
    }, [data, columns, sortBy]);


    return (<>
        <div className='overflow-auto'>
            <table>
                <thead>
                    <tr className='text-left bg-gray-400'>
                        {columns.filter((c) => (c.visible)).map((column) =>
                            <th key={column.key}><button
                                className='flex gap-1 justify-between whitespace-nowrap w-full px-1 hover:bg-gray-500'
                                onClick={() => setSortBy((prev) => {
                                    return (column.key == prev.key)
                                        ? { ...prev, asc: !prev.asc }
                                        : { key: column.key, asc: true }
                                })}
                            >
                                <span>{column.label}</span>
                                <span className={column.key !== sortBy.key ? 'invisible' : ''}>
                                    {sortBy.asc ? '▲' : '▼'}</span>

                            </button></th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {isLoading && <tr><td>Loading Database</td></tr>}
                    {error && <tr><td>{error.message}</td></tr>}
                    {displayData && <>
                        {displayData.map((member) =>
                            <DataTableRow member={member} key={member.id} />
                        )}
                    </>}
                </tbody>
            </table>
        </div>
    </>);
}