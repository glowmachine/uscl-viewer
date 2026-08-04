import type { FilterOptions } from "../../contexts/TableContext";
import type { LegislatorCurrent } from "../../types/LegislatorCurrent";

export default function filterData(data: LegislatorCurrent[], filterOptions: FilterOptions): LegislatorCurrent[] {
    let filteredData = data;

    if (filterOptions.search) {
        const searchStrings: string[] = filterOptions.search
            .trim().toLowerCase().split(/\s+/).filter(str => str.length > 0);

        filteredData = filteredData.filter((member) => {
            return searchStrings.every(str =>
                member.name.first.toLowerCase().includes(str)
                || member.name.last.toLowerCase().includes(str)
                || member.name.nickname?.toLowerCase().includes(str));
        });
    }

    if (filterOptions.state)
        filteredData = filteredData.filter(member =>
            (member.terms[member.terms.length - 1].state === filterOptions.state));

    Object.entries(filterOptions.parties).forEach(([party, isChecked]) => {
        if (!isChecked)
            filteredData = filteredData.filter(member =>
                (member.terms[member.terms.length - 1].party !== (party[0].toUpperCase() + party.slice(1)))
            )
    });
    Object.entries(filterOptions.types).forEach(([type, isChecked]) => {
        if (!isChecked)
            filteredData = filteredData.filter(member =>
                (member.terms[member.terms.length - 1].type !== (type))
            )
    });

    return filteredData;
}