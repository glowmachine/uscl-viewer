import type { RowData, Row } from "../../contexts/TableContext";

export default function sortRows(rows: Row[], key: keyof RowData, asc: boolean): Row[] {
    return rows.sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];

        //both values empty
        if (!aVal && !bVal) return 0;

        //whichever value is empty goes to the bottom, ignore 0 (district)
        if (aVal !== 0 && !aVal) return 1; //a empty, a goes after b
        if (bVal !== 0 && !bVal) return -1; //b empty, a goes before b

        //compare two non-empty values
        let compareVal = 0;
        if (typeof aVal === 'string' && typeof bVal === 'string')
            compareVal = aVal.localeCompare(bVal);
        else if (typeof aVal === 'number' && typeof bVal === 'number')
            compareVal = aVal - bVal;

        return asc ? compareVal : -compareVal;
    })
}