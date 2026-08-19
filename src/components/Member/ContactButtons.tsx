import type { Legislator } from "../../contexts/DataContext";
import type { Social } from "../../types/LegislatorSocialMedia";

const buttonStyle = 'shrink-0 w-10 h-10 rounded-full grid place-items-center'

const socials = [
    'twitter',
    'facebook',
    'youtube_id',
    'twitter_id',
    'youtube',
    'instagram',
    'instagram_id',
    'mastodon',
] satisfies (keyof Social)[];
const buttonConfig: Record<keyof Social,
    {
        label: string,
        icon: string,
        link: (id: string) => string, enabled: boolean
    }> = {
    twitter: {
        label: 'Twitter',
        icon: 'T',
        link: (id) => `https://twitter.com/${id}`,
        enabled: true
    },
    facebook: {
        label: 'Facebook',
        icon: 'FB',
        link: (id) => `https://facebook.com/${id}`,
        enabled: true
    },
    youtube_id: {
        label: 'youtube_id',
        icon: 'YT',
        link: (id) => `https://youtube.com/channel/${id}`,
        enabled: true
    },
    twitter_id: {
        label: 'twitter_id',
        icon: 'T',
        link: (id) => `https://twitter.com/${id}`,
        enabled: true
    },
    youtube: {
        label: 'youtube',
        icon: 'YT',
        link: (id) => `https://youtube.com/user/${id}`,
        enabled: true
    },
    instagram: {
        label: 'instagram',
        icon: 'IG',
        link: (id) => `https://www.instagram.com/${id}`,
        enabled: true
    },
    instagram_id: {
        label: 'instagram_id',
        icon: 'IG',
        link: (id) => `https://twitter.com/${id}`,
        enabled: true
    },
    mastodon: {
        label: 'mastodon',
        icon: 'M',
        link: (id) => `https://mastodon.social/${id}`,
        enabled: true
    },
}

type ContactButtonsProps = {
    member: Legislator
}
export default function ContactButtons({ member }: ContactButtonsProps) {
    return (
        <div className='flex gap-5'>{
            {socials.map(socialKey => {
                if (!buttonConfig[socialKey].enabled) return null;
                return !member.social[socialKey]
                    ? <a href='' onClick={e => e.preventDefault()}
                        className={`${buttonStyle} bg-gray-100 cursor-default`}
                        key={socialKey}>
                        {buttonConfig[socialKey].icon}
                    </a>
                    : <a
                        href={buttonConfig[socialKey].link(member.social[socialKey])}
                        target='_blank' rel='noopener noreferrer'
                        className={`${buttonStyle} bg-blue-200`}
                        key={socialKey}>
                        {buttonConfig[socialKey].icon}
                    </a>
            })}
        </div>
    )
}
