import type { DataType } from "../api/fetchData";
import { useDataContext } from "../contexts/DataContext";
import type { LeadershipRole } from "../types/legislatorsCurrent";
import { allAreas, type StateAbbreviation } from "../types/states";
import getDateDiff from "../util/getDateDiff";
import { NavLink } from "react-router";
import { renderLegislatorsCurrent } from "./renderLegislatorsCurrent";

// const idKeys: Array<keyof ID> = [
//     'bioguide',
//     'thomas',
//     'lis',
//     'govtrack',
//     'opensecrets',
//     'votesmart',
//     'fec',
//     'cspan',
//     'wikipedia',
//     'house_history',
//     'ballotpedia',
//     'maplight',
//     'icpsr',
//     'wikidata',
//     'google_entity_id',
//     'pictorial'
// ];
// const nameKeys: Array<keyof Name> = [
//     'first',
//     'middle',
//     'last',
//     'suffix',
//     'official_full',
//     'nickname',
// ];
// const bioKeys: Array<keyof Bio> = [
//     'birthday',
//     'gender',
// ];
// const termKeys: Array<keyof Term> = [
//     'party',
//     'type',
//     'class',
//     'state',
//     'district',
//     'start',
//     'end',
//     'url',
//     'address',
//     'phone',
//     'fax',
//     'contact_form',
//     'office',
//     'state_rank',
//     'rss_url',
//     'caucus',
//     'how',
//     'end-type',
//     'party_affiliations',
// ];
// const leadershipKeys: Array<keyof LeadershipRole> = [
//     'title',
//     'chamber',
//     'start',
//     'end',
// ];

function abbreviateParty(party: string | undefined) {
    switch (party) {
        case 'Democrat': return 'D';
        case 'Independent': return 'I';
        case 'Republican': return 'R';
        default: return party;
    }
}

function getLeadershipRole(terms: LeadershipRole[] | undefined) {
    if (!terms || terms[terms.length - 1].end) return;
    return <p>{terms[terms.length - 1].title}</p>
}

interface DetailsProps {
    bioguide: string,
}
export default function Details({ bioguide }: DetailsProps) {
    const { data } = useDataContext();
    const info: DataType | undefined = data?.find(item => item.id.bioguide === bioguide);
    if (!info) return <p>No information found for bioguide {bioguide}</p>

    const age = getDateDiff(new Date(info.bio.birthday)).years;
    const currentTerm = info.terms[info.terms.length - 1];

    return (
        <article className='flex flex-col max-w-full max-h-full'>
            <NavLink to='/' className='rounded bg-gray-300 active:bg-gray-400'>🔙</NavLink>
            <section className='border-b p-1 w-full flex gap-2'>
                <img alt={`Profile photo for ${info.name.first} ${info.name.last}`}
                    src={`https://unitedstates.github.io/images/congress/225x275/${info.id.bioguide}.jpg`}
                    className='w-30'
                />
                <div>
                    <div className='mb-1'>
                        <p>{info.name.first} {info.name.last}</p>
                        <p>{age}{info.bio.gender}</p>
                    </div>
                    <div className='mb-1'>
                        <p>{`(${abbreviateParty(currentTerm.party)})${currentTerm.type === 'rep' ? 'Representative' : 'Senator'}`}</p>
                        <p>{`${allAreas[currentTerm.state as StateAbbreviation]}${currentTerm.district ? ', District ' + currentTerm.district : ''}`}</p>
                    </div>
                    {getLeadershipRole(info.leadership_roles)}
                </div>
            </section>
            <details className='overflow-auto' open><summary className='font-bold hover:cursor-pointer'>legislatorsCurrent.yaml</summary>
                {renderLegislatorsCurrent(info)}
            </details>
        </article>
    );
}
