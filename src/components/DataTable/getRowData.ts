import type { Legislator } from "../../contexts/DataContext";
import type { Row } from "../../contexts/TableContext";

export default function getRowData(data: Legislator[]): Row[] {
    const selectedData = data.map(member => {
        const currentTerm = member.terms[member.terms.length - 1];
        return {
            full: `${member.name.first} ${member.name.last}`,

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
            district: currentTerm.district,
            party: currentTerm.party,
            class: currentTerm.class,
            url: currentTerm.url,
            address: currentTerm.address,
            phone: currentTerm.phone,
            fax: currentTerm.fax,
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