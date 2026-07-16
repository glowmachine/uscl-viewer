import type { DataType } from "../api/fetchData";
import { useDataContext } from "../contexts/DataContext";
import type { Bio, ID, LeadershipRole, Name, Term } from "../types/legislatorsCurrent";
import { states } from "../types/states";
import getDateDiff from "../util/getDateDiff";
import { NavLink } from "react-router";

const idKeys: Array<keyof ID> = [
    'bioguide',
    'thomas',
    'lis',
    'govtrack',
    'opensecrets',
    'votesmart',
    'fec',
    'cspan',
    'wikipedia',
    'house_history',
    'ballotpedia',
    'maplight',
    'icpsr',
    'wikidata',
    'google_entity_id',
    'pictorial'
];
const nameKeys: Array<keyof Name> = [
    'first',
    'middle',
    'last',
    'suffix',
    'official_full',
    'nickname',
];
const bioKeys: Array<keyof Bio> = [
    'birthday',
    'gender',
];
const termKeys: Array<keyof Term> = [
    'party',
    'type',
    'class',
    'state',
    'district',
    'start',
    'end',
    'url',
    'address',
    'phone',
    'fax',
    'contact_form',
    'office',
    'state_rank',
    'rss_url',
    'caucus',
    'how',
    'end-type',
    'party_affiliations',
];
const leadershipKeys: Array<keyof LeadershipRole> = [
    'title',
    'chamber',
    'start',
    'end',
];

function getPartyAbbr(party: string | undefined) {
    switch (party) {
        case 'Democrat': return 'D';
        case 'Independent': return 'I';
        case 'Republican': return 'R';
        default: return party;
    }
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
        <article>
            <NavLink to='/' className='rounded bg-gray-300 active:bg-gray-400'>🔙</NavLink>
            <div className='border-b p-1 w-full flex gap-2'>
                <img alt={`Profile photo for ${info.name.first} ${info.name.last}`}
                    src={`https://unitedstates.github.io/images/congress/225x275/${info.id.bioguide}.jpg`}
                    className='w-30'
                />
                <div>
                    <p>{`${info.name.first} ${info.name.last}, ${age}${info.bio.gender}`}</p>
                    <p>{`(${getPartyAbbr(currentTerm.party)})${currentTerm.type === 'rep' ? 'Representative' : 'Senator'}`}</p>
                    <p>{`${states[currentTerm.state]}${currentTerm.district ? ', District ' + currentTerm.district : ''}`}</p>
                </div>
            </div>
            <div className='bg-gray-200 flex flex-col gap-5'>
                <div>
                    {nameKeys.map(k => <p key={k}>{k}: {info.name[k]}</p>)}
                </div>
                <div>
                    {bioKeys.map(k => <p key={k}>{k}: {info.bio[k]}</p>)}
                </div>
                <div>
                    {idKeys.map(k => <p key={k}>{k}: {info.id[k]}</p>)}
                </div>
                <div>
                    <p>Current Term:</p>
                    {termKeys.map(k => <p key={k}>{k}: {`${currentTerm[k] ? currentTerm[k] : ''}`}</p>)}
                </div>
                <div>
                    <p>All Terms:</p>
                    {info.terms.map(term =>
                        <details key={term.start}>
                            <summary className='hover:cursor-pointer'>{term.start} - {term.end}</summary>
                            {termKeys.map(k => <p key={k}>{k}: {`${term[k] ? term[k] : ''}`}</p>)}
                        </details>
                    )
                    }
                </div>
                <div>
                    <p>Leadership Roles:</p>
                    {info.leadership_roles
                        ? info.leadership_roles.map(term =>
                            <details key={term.start}>
                                <summary className='hover:cursor-pointer'>{term.start} - {term.end}</summary>
                                {leadershipKeys.map(k => <p key={k}>{k}: {`${term[k] ? term[k] : ''}`}</p>)}
                            </details>
                        )
                        : <p>none</p>}
                </div>
            </div>
        </article >
    );
}
