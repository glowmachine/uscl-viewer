import type { RowData, Row } from "../../contexts/TableContext";

export default function sortRows(rows: Row[], key: keyof RowData, asc: boolean): Row[] {
    return rows.sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];

        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return asc ? 1 : -1;
        if (bVal == null) return asc ? -1 : 1;

        let compareVal = 0;

        if (typeof aVal === 'string' && typeof bVal === 'string')
            compareVal = aVal.localeCompare(bVal);
        else if (typeof aVal === 'number' && typeof bVal === 'number')
            compareVal = aVal - bVal;

        return asc ? compareVal : -compareVal;
    })
}