import type { StateAbbreviation } from "./states";

export interface LegislatorsHistorical {
    id: ID;
    name: Name;
    bio: Bio;
    terms: Term[];
    other_names?: OtherName[];
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
    govtrack: number;
    icpsr?: number;
    wikipedia: string;
    wikidata: string;
    google_entity_id?: string;
    house_history?: number;
    ballotpedia?: string;
    bioguide_previous?: string[];
    house_history_alternate?: number;
    thomas?: string;
    cspan?: number;
    votesmart?: number;
    lis?: string;
    fec?: string[];
    opensecrets?: string;
    maplight?: number;
    pictorial?: number;
}

export interface LeadershipRole {
    title: string;
    chamber: Chamber;
    start: string;
    end: string;
}

export type Chamber = 'house' | 'senate';

export interface Name {
    first: string;
    last: string;
    middle?: string;
    nickname?: string;
    suffix?: string;
    official_full?: string;
}

export interface OtherName {
    end?: string;
    middle?: null;
    last: string;
}

export interface Term {
    type: Type;
    start: string;
    end: string;
    state: StateAbbreviation;
    class?: number;
    party?: Caucus;
    district?: number;
    how?: EndType;
    party_affiliations?: PartyAffiliation[];
    caucus?: Caucus;
    url?: string;
    address?: string;
    phone?: string;
    fax?: null | string;
    contact_form?: string;
    office?: string;
    state_rank?: StateRank;
    rss_url?: string;
    "end-type"?: EndType;
}

export type Caucus =
    | 'Adams'
    | 'Adams Democrat'
    | 'AL'
    | 'American'
    | 'American Labor'
    | 'Anti-Administration'
    | 'Anti Jackson'
    | 'Anti-Jacksonian'
    | 'Anti-Lecompton Democrat'
    | 'Anti Mason'
    | 'Anti Masonic'
    | 'Anti-administration'
    | 'Anti Jacksonian'
    | 'Pro-administration'
    | 'Coalitionist'
    | 'Conservative'
    | 'Conservative Republican'
    | 'Constitutional Unionist'
    | 'Crawford Republican'
    | 'Democrat'
    | 'Democrat-Liberal'
    | 'Democratic Republican'
    | 'Farmer-Labor'
    | 'Federalist'
    | 'Free Silver'
    | 'Free Soil'
    | 'Ind. Democrat'
    | 'Ind. Republican'
    | 'Ind. Republican-Democrat'
    | 'Ind. Whig'
    | 'Independent'
    | 'Independent Democrat'
    | 'Jackson'
    | 'Jackson Republican'
    | 'Jacksonian'
    | 'Jacksonian Republican'
    | 'Law and Order'
    | 'Liberal'
    | 'Liberal Republican'
    | 'Libertarian'
    | 'Liberty'
    | 'National Greenbacker'
    | 'New Progressive'
    | 'Nonpartisan'
    | 'Nullifier'
    | 'Popular Democrat'
    | 'Populist'
    | 'Pro-Administration'
    | 'Progressive'
    | 'Progressive Republican'
    | 'Prohibitionist'
    | 'Readjuster'
    | 'Readjuster Democrat'
    | 'Republican'
    | 'Republican-Conservative'
    | 'Silver'
    | 'Silver Republican'
    | 'Socialist'
    | 'States Rights'
    | 'Unconditional Unionist'
    | 'Union'
    | 'Union Democrat'
    | 'Union Labor'
    | 'Unionist'
    | 'Unknown'
    | 'Whig';

export type EndType = 'appointment' | 'special-election';

export interface PartyAffiliation {
    start: string;
    end: string;
    party: Caucus;
    caucus?: Caucus;
}

export type StateRank = 'junior' | 'senior';

export type Type = 'rep' | 'sen';