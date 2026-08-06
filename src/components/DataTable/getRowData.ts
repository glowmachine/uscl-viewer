import type { Legislator } from "../../contexts/DataContext";
import type { Row } from "../../contexts/TableContext";

export default function getRowData(data: Legislator[]): Row[] {
    const selectedData = data.map(member => {
        const currentTerm = member.terms[member.terms.length - 1];
        return {
            name: `${member.name.first} ${member.name.last}`,

            bioguide: member.id.bioguide,
            thomas: member.id.thomas,
            lis: member.id.lis,
            govtrack: String(member.id.govtrack),
            opensecrets: member.id.opensecrets,
            votesmart: member.id.votesmart ? String(member.id.votesmart) : undefined,
            // fec: string[],
            cspan: member.id.cspan ? String(member.id.cspan) : undefined,
            wikipedia: member.id.wikipedia,
            house_history: member.id.house_history ? String(member.id.house_history) : undefined,
            ballotpedia: member.id.ballotpedia,
            maplight: member.id.maplight ? String(member.id.maplight) : undefined,
            icpsr: member.id.icpsr ? String(member.id.icpsr) : undefined,
            wikidata: member.id.wikidata,
            google_entity_id: member.id.google_entity_id,
            pictorial: member.id.pictorial ? String(member.id.pictorial) : undefined,

            first: member.name.first,
            last: member.name.last,
            official_full: member.name.official_full,
            middle: member.name.middle,
            nickname: member.name.nickname,
            suffix: member.name.suffix,

            birthday: member.bio.birthday,
            gender: member.bio.gender,

            type: currentTerm.type,
            start: currentTerm.start,
            end: currentTerm.end,
            state: currentTerm.state,
            district: currentTerm.district ? String(currentTerm.district) : undefined,
            party: currentTerm.party,
            class: currentTerm.class ? String(currentTerm.class) : undefined,
            url: currentTerm.url,
            address: currentTerm.address,
            phone: currentTerm.phone,
            fax: currentTerm.fax || undefined,
            contact_form: currentTerm.contact_form,
            office: currentTerm.office,
            state_rank: currentTerm.state_rank,
            rss_url: currentTerm.rss_url,
            caucus: currentTerm.caucus,
            how: currentTerm.how,
            "end-type": currentTerm["end-type"],
            // party_affiliations: currentTerm.party_affiliations,

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