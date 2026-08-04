export interface LegislatorSocialMedia {
    id: ID;
    social: Social;
}

export interface ID {
    bioguide: string;
    thomas?: string;
    govtrack?: string;
}

export interface Social {
    twitter?: string;
    facebook?: string;
    youtube_id?: string;
    twitter_id?: string;
    youtube?: string;
    instagram?: string;
    instagram_id?: string;
    mastodon?: string;
}