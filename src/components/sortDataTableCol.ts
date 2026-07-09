import type { DataType } from "../api/fetchData";
import type { SortByOptions } from "../contexts/TableContext";



export function sortDataTableCol(data: DataType[] | null, { column, asc }: SortByOptions): DataType[] {
    if (data == null) return [];

    switch (column) {
        case ('First Name'):
            return [...data].sort((a, b) => {
                return asc
                    ? a.name.first.localeCompare(b.name.first)
                    : b.name.first.localeCompare(a.name.first);
            });
        case ('Last Name'):
            return [...data].sort((a, b) => {
                return asc
                    ? a.name.last.localeCompare(b.name.last)
                    : b.name.last.localeCompare(a.name.last);
            });
        case ('Age'):
            return [...data].sort((a, b) => {
                return asc
                    ? a.bio.birthday.localeCompare(b.bio.birthday)
                    : b.bio.birthday.localeCompare(a.bio.birthday);
            });
        default:
            throw new Error('Sort Property Mismatch');
    }
}