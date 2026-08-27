import type { Legislator } from "../../contexts/DataContext";
import type { ID, Office } from "../../types/LegislatorDistrictOffice";

const idKeys: Array<keyof ID> = [
    'bioguide',
    'thomas',
    'govtrack',
];
const officeKeys: Array<keyof Office> = [
    'id',
    'address',
    'suite',
    'building',
    'city',
    'state',
    'zip',
    'latitude',
    'longitude',
    'fax',
    'hours',
    'phone',
]

function indent(count: number): string {
    if (count <= 0) return '';
    return Array(count).fill('\u00A0').join('');
}
function styleMissing(obj: unknown) {
    return (obj === undefined)
        ? 'text-zinc-400'
        : ''
}
const styleHover = 'hover:bg-zinc-300 dark:hover:bg-zinc-600';

export default function renderLegislatorOffice(member: Legislator) {
    return (<>
        <p className='mb-5 italic'>from legislators-district-offices.yaml</p>
        <ul className='whitespace-nowrap w-fit'>
            <li><ul>
                <li className='font-bold'>- id:</li>
                <li className={styleHover}><ul>
                    {idKeys.map(key => <li className={styleMissing(member.id[key])} key={key}>
                        {indent(4)}{key}: {key === 'thomas' && member.id[key] !== undefined
                            ? `'${member.id[key]}'`
                            : member.id[key]}
                    </li>
                    )}
                </ul></li>
            </ul></li>
            <li><ul>
                <li className='font-bold'>{indent(2)}offices:</li>
                {member.offices.map(office =>
                    <li key={office.id}>
                        <ul className={styleHover}>
                            <li>{indent(2)}- id: {office.id}</li>
                            {officeKeys.slice(1).map(key =>
                                <li
                                    className={styleMissing(office[key])}
                                    key={key}>
                                    {indent(4)}{key}: {office[key]}
                                </li>
                            )}
                        </ul>
                    </li>
                )}
            </ul></li>
        </ul>
    </>)
}