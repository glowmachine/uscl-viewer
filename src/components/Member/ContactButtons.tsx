import type { Legislator } from "../../contexts/DataContext";
import type { Social } from "../../types/LegislatorSocialMedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faMastodon, faXTwitter, faYoutube, type IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faLink } from "@fortawesome/free-solid-svg-icons";

const buttonStyle = 'shrink-0 size-10 rounded-full grid place-items-center'

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
        faIcon: IconDefinition,
        link: (id: string) => string, enabled: boolean
    }> = {
    twitter: {
        label: 'Twitter',
        faIcon: faXTwitter,
        link: (id) => `https://twitter.com/${id}`,
        enabled: true
    },
    facebook: {
        label: 'Facebook',
        faIcon: faFacebook,
        link: (id) => `https://facebook.com/${id}`,
        enabled: true
    },
    youtube_id: {
        label: 'youtube_id',
        faIcon: faYoutube,
        link: (id) => `https://youtube.com/channel/${id}`,
        enabled: true
    },
    twitter_id: {
        label: 'twitter_id',
        faIcon: faXTwitter,
        link: (id) => `https://twitter.com/${id}`,
        enabled: true
    },
    youtube: {
        label: 'youtube',
        faIcon: faYoutube,
        link: (id) => `https://youtube.com/user/${id}`,
        enabled: true
    },
    instagram: {
        label: 'instagram',
        faIcon: faInstagram,
        link: (id) => `https://www.instagram.com/${id}`,
        enabled: true
    },
    instagram_id: {
        label: 'instagram_id',
        faIcon: faInstagram,
        link: (id) => `https://twitter.com/${id}`,
        enabled: true
    },
    mastodon: {
        label: 'mastodon',
        faIcon: faMastodon,
        link: (id) => `https://mastodon.social/${id}`,
        enabled: true
    },
}

type ContactButtonsProps = {
    member: Legislator
}
export default function ContactButtons({ member }: ContactButtonsProps) {
    return (
        <div className='flex flex-wrap justify-center gap-5'>
            <a
                href={member.terms[member.terms.length - 1].url}
                target='_blank' rel='noopener noreferrer'
                className={`${buttonStyle} bg-zinc-200 hover:bg-zinc-300
                    dark:bg-zinc-700 dark:hover:bg-zinc-600`}>
                <FontAwesomeIcon icon={faLink} />
            </a>
            {socials.map(socialKey => {
                //button is disabled or property undefined
                if (!buttonConfig[socialKey].enabled || !member.social[socialKey]) {
                    return null;
                }
                return !member.social[socialKey]
                    ? <a href='' onClick={e => e.preventDefault()}
                        className={`${buttonStyle} bg-zinc-100 cursor-default`}
                        key={socialKey}>
                        <FontAwesomeIcon icon={buttonConfig[socialKey].faIcon} />
                    </a>
                    : <a
                        href={buttonConfig[socialKey].link(member.social[socialKey])}
                        target='_blank' rel='noopener noreferrer'
                        className={`${buttonStyle} bg-zinc-200 hover:bg-zinc-300
                            dark:bg-zinc-700 dark:hover:bg-zinc-600`}
                        key={socialKey}>
                        <FontAwesomeIcon icon={buttonConfig[socialKey].faIcon} />
                    </a>
            })}
        </div>
    )
}
