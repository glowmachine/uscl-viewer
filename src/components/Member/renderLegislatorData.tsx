import type { Bio, ID, LeadershipRole, LegislatorCurrent, Name, PartyAffiliation, Term } from "../../types/LegislatorCurrent";

const idKeys: Array<keyof ID> = [
    'bioguide',
    'thomas',
    'govtrack',
    'lis',
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
        ? 'text-zinc-400'
        : ''
}
const styleHover = 'hover:bg-zinc-300 dark:hover:bg-zinc-600';

//YAML formatting reconstructed from json data, an absolute mess, needs refactoring
export function renderLegislatorData(member: LegislatorCurrent) {
    return (<>
        <p className='mb-5 italic'>from legislators-current.yaml</p>
        <ul className='whitespace-nowrap w-fit'>
            <li><ul>
                <li className='font-bold'>- id:</li>
                <li className={styleHover}><ul>
                    {idKeys.map(key => {
                        if (key === 'fec')
                            return <li key={key}><ul>
                                <li>{indent(4)}fec:</li>
                                {member.id[key]?.map(item => <li key={item}>
                                    {indent(4)}- {item}
                                </li>)}
                            </ul></li>
                        else return <li className={styleMissing(member.id[key])} key={key}>
                            {indent(4)}{key}: {key === 'thomas' && member.id[key] !== undefined
                                ? `'${member.id[key]}'`
                                : member.id[key]}
                        </li>
                    })}
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
                    {leadershipKeys.slice(1).map(key =>
                        <li className={styleMissing(term[key])} key={key}>
                            {`${indent(4)}${key}: ${term[key]
                                ? isDateKey(key)
                                    ? `'${term[key]}'`
                                    : term[key]
                                : ''}`}
                        </li>
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
                                {affiliationKeys.slice(1).map(key =>
                                    <li className={styleMissing(item[key])} key={key}>
                                        {`${indent(6)}${key}: ${item[key]
                                            ? isDateKey(key)
                                                ? `'${term[key]}'`
                                                : term[key]
                                            : ''}`}
                                    </li>
                                )}
                            </ul></li>)}
                        </ul></li>
                    )}
                </ul>
                </li>)}
            </ul></li>
        </ul>

    </>)
}