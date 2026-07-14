import { useTableContext, type ColumnKey, type Row } from "../contexts/TableContext";

interface DataTableRowProps { row: Row }
export default function DataTableRow({ row }: DataTableRowProps) {
    const { columns } = useTableContext();

    return <>
        <tr className='even:bg-gray-100 hover:bg-gray-200 *:p-1 *:whitespace-nowrap'
            key={row.id}>
            {columns.filter((c) => (c.visible)).map((col) =>
                <td key={col.key}>{row[col.key as ColumnKey]}</td>
            )}
        </tr>
    </>
}