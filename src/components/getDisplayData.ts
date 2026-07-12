import type { DataType } from "../api/fetchData";
import { states } from "../types/states";
import getDateDiff from "../util/getDateDiff";

export type RowData = {
    id: string,
    first: string,
    last: string,
    age: number,
    gender: 'F' | 'M',
    type: 'Representative' | 'Senator',
    state: string,
    district: number | undefined,
    party: string,
    terms: number,
    start: string,
    end: string,
}

export function getDisplayData(data: DataType[]): RowData[] {
    return data.map((member) => {
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
    });
}