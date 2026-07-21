import type { FilterOptions, Row } from "../../contexts/TableContext";
import { allAreas, type StateAbbreviation } from "../../types/states";

export default function filterRows(rows: Row[], filterOptions: FilterOptions): Row[] {
    let filteredRows = rows;

    if (filterOptions.search) {
        const searchTerms = filterOptions.search
            .trim().toLowerCase().split(/\s+/).filter(term => term.length > 0);

        filteredRows = filteredRows.filter((row) => {
            const first = row.first.toLowerCase();
            const last = row.last.toLowerCase();
            return searchTerms.every(term => first.includes(term) || last.includes(term));
        });
    }

    if (filterOptions.state)
        filteredRows = filteredRows.filter(row => (
            row.state === allAreas[filterOptions.state as StateAbbreviation]
        ));

    Object.entries(filterOptions.parties).forEach(([party, isChecked]) => {
        if (!isChecked) filteredRows = filteredRows.filter(row =>
            (row.party !== (party[0].toUpperCase() + party.slice(1)))
        )
    });
    Object.entries(filterOptions.types).forEach(([type, isChecked]) => {
        if (!isChecked) filteredRows = filteredRows.filter(row =>
            (row.type !== (type[0].toUpperCase() + type.slice(1)))
        )
    });

    return filteredRows;
}