import type { FilterOptions } from "../contexts/TableContext";
import type { RowData } from "./getDisplayData";

export default function filterDisplayData(data: RowData[], filterOptions: FilterOptions): RowData[] {
    let rows = data;

    if (filterOptions.search) {
        rows = data.filter((row) =>
            (row.first.toLowerCase().includes(filterOptions.search.toLowerCase())));
    }

    if (!filterOptions.filters.Democrats)
        rows = rows.filter((r) => (r.party !== 'Democrat'));
    if (!filterOptions.filters.Independents)
        rows = rows.filter((r) => (r.party !== 'Independent'));
    if (!filterOptions.filters.Republicans)
        rows = rows.filter((r) => (r.party !== 'Republican'));
    if (!filterOptions.filters.Representatives)
        rows = rows.filter((r) => (r.type !== 'Representative'));
    if (!filterOptions.filters.Senators)
        rows = rows.filter((r) => (r.type !== 'Senator'));

    return rows;
}