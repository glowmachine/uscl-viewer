export interface LegislatorsCurrent {
    id: ID;
    name: Name;
    bio: Bio;
    terms: Term[];
    leadership_roles?: LeadershipRole[];
    family?: Family[];
}

export interface Bio {
    birthday: Date;
    gender: Gender;
}

export type Gender = 'F' | 'M';

export interface Family {
    name: string;
    relation: string;
}

export interface ID {
    bioguide: string;
    thomas?: string;
    lis?: string;
    govtrack: number;
    opensecrets?: string;
    votesmart?: number;
    fec?: string[];
    cspan?: number;
    wikipedia?: string;
    house_history?: number;
    ballotpedia?: string;
    maplight?: number;
    icpsr?: number;
    wikidata?: string;
    google_entity_id?: string;
    pictorial?: number;
}

export interface LeadershipRole {
    title: string;
    chamber: Chamber;
    start: Date;
    end?: Date;
}

export type Chamber = 'house' | 'senate';

export interface Name {
    first: string;
    last: string;
    official_full?: string;
    middle?: string;
    nickname?: string;
    suffix?: string;
}

export interface Term {
    type: Type;
    start: Date;
    end: Date;
    state: string;
    district?: number;
    party: Caucus;
    class?: number;
    url?: string;
    address?: string;
    phone?: string;
    fax?: null | string;
    contact_form?: string;
    office?: string;
    state_rank?: StateRank;
    rss_url?: string;
    caucus?: Caucus;
    how?: EndType;
    "end-type"?: EndType;
    party_affiliations?: PartyAffiliation[];
}

export type Caucus = 'Democrat' | 'Independent' | 'Republican';

export type EndType = 'appointment' | 'special-election';

export interface PartyAffiliation {
    start: Date;
    end: Date;
    party: Caucus;
    caucus?: Caucus;
}

export type StateRank = 'junior' | 'senior';

export type Type = 'rep' | 'sen';