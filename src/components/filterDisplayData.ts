import type { FilterOptions } from "../contexts/TableContext";
import type { RowData } from "./getDisplayData";

export default function filterDisplayData(data: RowData[], filterOptions: FilterOptions): RowData[] {
    let rows = data;

    if (filterOptions.search) {
        const searchTerms = filterOptions.search
            .trim().toLowerCase().split(/\s+/).filter(term => term.length > 0);

        rows = data.filter((row) => {
            const first = row.first.toLowerCase();
            const last = row.last.toLowerCase();
            return searchTerms.every(term => first.includes(term) || last.includes(term));
        });
    }

    if (!filterOptions.filters.Democrats)
        rows = rows.filter(row => row.party !== 'Democrat');
    if (!filterOptions.filters.Independents)
        rows = rows.filter(row => row.party !== 'Independent');
    if (!filterOptions.filters.Republicans)
        rows = rows.filter(row => row.party !== 'Republican');
    if (!filterOptions.filters.Representatives)
        rows = rows.filter(row => row.type !== 'Representative');
    if (!filterOptions.filters.Senators)
        rows = rows.filter(row => row.type !== 'Senator');

    return rows;
}