import type { Bio, ID, LeadershipRole, Legislator, Name, PartyAffiliation, Term } from "../types/legislator";

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
    'nickname',
    'official_full',
];
const bioKeys: Array<keyof Bio> = [
    'birthday',
    'gender',
];
const termKeys: Array<keyof Term> = [
    'type',
    'start',
    'end',
    'state',
    'district',
    'class',
    'state_rank',
    'party',
    'party_affiliations',
    'url',
    'address',
    'phone',
    'fax',
    'contact_form',
    'office',
    'rss_url',
    'caucus',
    'how',
    'end-type',
];
const affiliationKeys: Array<keyof PartyAffiliation> = [
    'start',
    'end',
    'party',
    'caucus',
]
const leadershipKeys: Array<keyof LeadershipRole> = [
    'title',
    'chamber',
    'start',
    'end',
];

function indent(count: number): string {
    if (count <= 0) return '';
    return Array(count).fill('\u00A0').join('');
}

function isDateKey(str: string): boolean {
    return (str === 'birthday' || str === 'start' || str === 'end');
}

function styleMissing(obj: unknown) {
    return (obj === undefined)
        ? 'text-gray-400'
        : ''
}
const styleHover = 'hover:bg-gray-200';

//YAML formatting reconstructed from json data, an absolute mess, needs refactoring
export function renderLegislatorData(member: Legislator) {
    return (
        <section className='font-mono mb-5'><ul>
            <li><ul>
                <li className='font-bold'>- id:</li>
                <li className={styleHover}><ul>
                    {idKeys.slice(1).map(key => key !== 'fec'
                        ? <li className={styleMissing(member.id[key])} key={key}>{indent(4)}{key}: {member.id[key]}</li>
                        : <li key={key}><ul>
                            <li>{indent(4)}fec:</li>
                            {member.id[key]?.map(item => <li key={item}>
                                {indent(4)}- {item}
                            </li>)}
                        </ul></li>)}
                </ul></li>
            </ul></li>
            <li><ul>
                <li className='font-bold'>{indent(2)}name:</li>
                <li className={styleHover}><ul>
                    {nameKeys.map(key => <li className={styleMissing(member.name[key])} key={key}>
                        {indent(4)}{key}: {member.name[key]}
                    </li>)}
                </ul></li>
            </ul></li>
            <li><ul>
                <li className='font-bold'>{indent(2)}bio:</li>
                <li className={styleHover}><ul>
                    {bioKeys.map(key => isDateKey(key)
                        ? <li key={key}>{indent(4)}{key}: '{member.bio[key]}'</li>
                        : <li key={key}>{indent(4)}{key}: {member.bio[key]}</li>)}
                </ul></li>
            </ul></li>
            {member.leadership_roles && <li><ul>
                <li className='font-bold'>{indent(2)}leadership_roles:</li>
                {member.leadership_roles.map(term => <li className={styleHover} key={`leader-${term.start}`}><ul>
                    <li>{indent(2)}- title: {term.title}</li>
                    {leadershipKeys.slice(1).map(key => isDateKey(key)
                        ? <li className={styleMissing(term[key])} key={key}>{indent(4)}{key}: '{term[key]}'</li>
                        : <li className={styleMissing(term[key])} key={key}>{indent(4)}{key}: {term[key]}</li>
                    )}
                </ul></li>)}
            </ul></li>}
            <li><ul>
                <li className='font-bold'>{indent(2)}terms:</li>
                {member.terms.map(term => <li className={styleHover} key={term.start}><ul>
                    <li>{indent(2)}- type: {term.type}</li>
                    {termKeys.slice(1).map(key => key !== 'party_affiliations'
                        ? isDateKey(key)
                            ? <li className={styleMissing(term[key])} key={key}>{indent(4)}{key}: '{term[key]}'</li>
                            : <li className={styleMissing(term[key])} key={key}>{indent(4)}{key}: {term[key]}</li>
                        : term['party_affiliations'] && <li key={key}><ul>
                            <li>{indent(4)}party_affiliations:</li>
                            {term[key]?.map(item => <li key={item.party}><ul>
                                <li>{indent(4)}- start: '{item['start']}'</li>
                                {affiliationKeys.slice(1).map(key => isDateKey(key)
                                    ? <li className={styleMissing(item[key])} key={key}>{indent(6)}{key}: '{item[key]}'</li>
                                    : <li className={styleMissing(item[key])} key={key}>{indent(6)}{key}: {item[key]}</li>
                                )}
                            </ul></li>)}
                        </ul></li>
                    )}
                </ul>
                </li>)}
            </ul></li>
        </ul></section>
    )
}