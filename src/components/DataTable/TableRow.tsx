import { useTableContext, type Row, type RowData } from "../../contexts/TableContext";
import { NavLink } from "react-router";
import buildLink from "./buildLink";

interface TableRowProps { row: Row }
export default function TableRow({ row }: TableRowProps) {
    const { columns } = useTableContext();

    return <>
        <tr className='even:bg-gray-100 hover:bg-gray-200 *:p-4 *:whitespace-nowrap'
            key={row.bioguide}>
            {columns
                .filter((c) => (c.selected))
                .map((col, index) => {
                    const value = row[col.key];
                    const link = buildLink(col.key, row);

                    if (col.key === 'name')
                        return <td key={col.key}>
                            <NavLink to={`/details/${row.bioguide}`} className='hover:underline'>
                                {value}
                            </NavLink>
                        </td>

                    return <td key={col.key}>
                        {link
                            ? <a href={link} target='_blank' rel='noopener noreferrer'
                                // className='hover:text-red-500 hover:*:visible'>{value}
                                className='inline-flex gap-1 items-center hover:text-red-500 *:invisible hover:*:visible'>
                                {value} <span className='material-symbols-outlined !text-lg'>
                                    open_in_new</span>
                            </a>
                            : <p>{String(value)}</p>
                        }
                    </td>
        </tr>
    </>
}