import type { Gender, Type } from "../types/legislatorsCurrent";
import { tableColumns } from "../contexts/TableContext";

export type RowDataType = {
    id: string,
    first: string,
    last: string,
    age: number,
    gender: Gender,
    type: Type,
    state: string,
    district: number | undefined,
    party: string,
    terms: number,
    start: string,
    end: string,
}
interface DataTableRowProps { member: RowDataType }

export default function DataTableRow({ member }: DataTableRowProps) {
    return <>
        <tr className='even:bg-gray-100 hover:bg-gray-200 *:p-1 *:whitespace-nowrap'
            key={member.id}
        >
            {tableColumns.filter((c) => (c.visible)).map((col) =>
                <td key={col.key}>{member[col.key]}</td>
            )}
        </tr>
    </>
}