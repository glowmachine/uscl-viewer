import type { DataType } from "../api/fetchData";
import type { Row } from "../contexts/TableContext";
import { states } from "../types/states";
import getDateDiff from "../util/getDateDiff";

export default function selectData(data: DataType[]): Row[] {
    const selectedData = data.map(member => {
        const currentTerm = member.terms[member.terms.length - 1];
        return {
            id: member.id.bioguide,
            first: member.name.first,
            last: member.name.last,
            age: getDateDiff(new Date(member.bio.birthday)).years,
            gender: member.bio.gender,
            type: currentTerm.type === 'rep' ? 'Representative' : 'Senator',
            state: states[currentTerm.state],
            district: currentTerm.district,
            party: String(currentTerm.party),
            terms: member.terms.length,
            start: currentTerm.start,
            end: currentTerm.end,
        };
    })
    return selectedData;
}