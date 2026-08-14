import type { Legislator } from "../../contexts/DataContext";
import type { ID, Social } from "../../types/LegislatorSocialMedia";

const idKeys: Array<keyof ID> = [
    'bioguide',
    'thomas',
    'govtrack',
];
const socialKeys: Array<keyof Social> = [
    'twitter',
    'facebook',
    'youtube_id',
    'twitter_id',
    'youtube',
    'instagram',
    'instagram_id',
    'mastodon',
];

function indent(count: number): string {
    if (count <= 0) return '';
    return Array(count).fill('\u00A0').join('');
}

function styleMissing(obj: unknown) {
    return (obj === undefined)
        ? 'text-gray-400'
        : ''
}
const styleHover = 'hover:bg-gray-200';

export function renderLegislatorSocial(member: Legislator) {
    return (
        <section className='font-mono mb-5'><ul>
            <li><ul>
                <li className='font-bold'>- id:</li>
                <li className={styleHover}><ul>
                    {idKeys.map(key =>
                        <li className={styleMissing(member?.id[key])} key={key}>
                            {indent(4)}{key}: {member?.id[key]}
                        </li>)}
                </ul></li>
            </ul></li>
            <li><ul>
                <li className='font-bold'>{indent(2)}social:</li>
                <li className={styleHover}><ul>
                    {socialKeys.map(key =>
                        <li className={styleMissing(member.social?.[key])} key={key}>
                            {indent(4)}{key}: {member.social?.[key]}
                        </li>)}
                </ul></li>
            </ul></li>
        </ul></section>
    )
}