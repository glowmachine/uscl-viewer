import { useTableContext, type ColumnKey, type Row } from "../../contexts/TableContext";
import { NavLink } from "react-router";

interface TableRowProps { row: Row }
export default function TableRow({ row }: TableRowProps) {
    const { columns } = useTableContext();

    return <>
        <tr className='even:bg-gray-100 hover:bg-gray-200 *:p-1 *:whitespace-nowrap'
            key={row.id}>
            <td className='text-center'>
                <NavLink to={`/details/${row.id}`}>🔍</NavLink>
            </td>
            {columns.filter((c) => (c.selected)).map((col) =>
                <td key={col.key}>{row[col.key as ColumnKey]}</td>
            )}
        </tr>
    </>
}