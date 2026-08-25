import { useTableContext, type Row } from "../../contexts/TableContext";
import { NavLink } from "react-router";
import buildLink from "./buildLink";

interface TableRowProps { row: Row }
export default function TableRow({ row }: TableRowProps) {
    const { columns } = useTableContext();

    return (
        <tr className='hover:bg-gray-100 *:p-2 *:whitespace-nowrap'
            key={row.bioguide}>
            <td className='w-0'>
                <NavLink to={`/member/${row.bioguide}`}>
                    <div className='bg-black object-cover w-10 aspect-square rounded-full overflow-hidden'>
                        <img alt={`Flag of ${row.state}`}
                            loading='lazy'
                            decoding='async'
                            src={`/flags/Flag_of_${row.state}.svg`}
                            onError={e => e.currentTarget.style.display = 'none'}
                            className='object-cover w-full h-full'
                        />
                    </div>
                </NavLink>
            </td>
            {columns.filter((c) => (c.selected)).map((col) => {
                const value = row[col.key];
                const link = buildLink(col.key, row);

                if (col.key === 'name')
                    return <td key={col.key}>
                        <NavLink to={`/details/${row.bioguide}`} className='hover:underline'>
                            {value}
                        </NavLink>
                    </td>
                else if (value === 0 || value) {
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
                }
                else {
                    return <td key={col.key}></td>
                }
            })}
        </tr >
    )
}