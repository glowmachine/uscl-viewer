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

            bioguide: member.id.bioguide,
            thomas: member.id.thomas,
            lis: member.id.lis,
            govtrack: member.id.govtrack,
            opensecrets: member.id.opensecrets,
            votesmart: member.id.votesmart,
            // fec: string[],
            cspan: member.id.cspan,
            wikipedia: member.id.wikipedia,
            house_history: member.id.house_history,
            ballotpedia: member.id.ballotpedia,
            maplight: member.id.maplight,
            icpsr: member.id.icpsr,
            wikidata: member.id.wikidata,
            google_entity_id: member.id.google_entity_id,
            pictorial: member.id.pictorial,
        };
    })
    return selectedData;
}