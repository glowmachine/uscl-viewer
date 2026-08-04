import type { Legislator } from "../../contexts/DataContext";
import type { Row } from "../../contexts/TableContext";
import { allAreas, type StateAbbreviation } from "../../types/states";
import getDateDiff from "../../util/getDateDiff";

export default function getRowData(data: Legislator[]): Row[] {
    const selectedData = data.map(member => {
        const currentTerm = member.terms[member.terms.length - 1];
        return {
            full: member.name.official_full
                || member.name.first.concat(' ', member.name.last),
            id: member.id.bioguide,
            first: member.name.first,
            last: member.name.last,
            age: getDateDiff(new Date(member.bio.birthday)).years,
            gender: member.bio.gender,
            type: currentTerm.type === 'rep' ? 'Representative' : 'Senator',
            state: allAreas[currentTerm.state as StateAbbreviation],
            district: currentTerm.district,
            party: String(currentTerm.party),
            terms: member.terms.length,
            start: currentTerm.start,
            end: currentTerm.end,
            twitter: member.social?.twitter,
            twitter_id: member.social?.twitter_id,
            facebook: member.social?.facebook,
            youtube: member.social?.youtube,
            youtube_id: member.social?.youtube,
            instagram: member.social?.instagram,
            instagram_id: member.social?.instagram_id,
            mastodon: member.social?.mastodon,
        };
    })
    return selectedData;
}