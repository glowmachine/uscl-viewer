import type { StateAbbreviation } from "./states";

export interface Legislator {
    id: ID;
    name: Name;
    bio: Bio;
    terms: Term[];
    leadership_roles?: LeadershipRole[];
    family?: Family[];
}

export interface Bio {
    birthday: string;
    gender: 'F' | 'M';
}

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
    chamber: 'house' | 'senate';
    start: string;
    end?: string;
}

export interface Name {
    first: string;
    last: string;
    official_full?: string;
    middle?: string;
    nickname?: string;
    suffix?: string;
}

export interface Term {
    type: 'rep' | 'sen';
    start: string;
    end: string;
    state: StateAbbreviation;
    district?: number;
    party: Caucus;
    class?: number;
    url?: string;
    address?: string;
    phone?: string;
    fax?: null | string;
    contact_form?: string;
    office?: string;
    state_rank?: 'junior' | 'senior';
    rss_url?: string;
    caucus?: Caucus;
    how?: 'appointment' | 'special-election';
    "end-type"?: 'appointment' | 'special-election';
    party_affiliations?: PartyAffiliation[];
}

export interface PartyAffiliation {
    start: string;
    end: string;
    party: Caucus;
    caucus?: Caucus;
}

export type Caucus = 'Democrat' | 'Independent' | 'Republican';