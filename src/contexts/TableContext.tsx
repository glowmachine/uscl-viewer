import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { StateAbbreviation } from "../types/states";
import { useSettingsContext } from "./SettingsContext";
import type { Caucus, PartyAffiliation } from "../types/LegislatorCurrent";

export type RowData = {
    full: string,

    bioguide: string,
    thomas?: string | undefined,
    lis?: string | undefined,
    govtrack: number,
    opensecrets?: string | undefined,
    votesmart?: number | undefined,
    // fec?: string[],
    cspan?: number | undefined,
    wikipedia?: string | undefined,
    house_history?: number | undefined,
    ballotpedia?: string | undefined,
    maplight?: number | undefined,
    icpsr?: number | undefined,
    wikidata?: string | undefined,
    google_entity_id?: string | undefined,
    pictorial?: number | undefined,

    first: string,
    last: string,
    official_full?: string,
    middle?: string,
    nickname?: string,
    suffix?: string,

    birthday: string,
    gender: 'F' | 'M',

    type: 'rep' | 'sen',
    start: string,
    end: string,
    state: StateAbbreviation,
    district?: number,
    party: Caucus,
    class?: number,
    url?: string,
    address?: string,
    phone?: string,
    fax?: null | string,
    contact_form?: string,
    office?: string,
    state_rank?: 'junior' | 'senior',
    rss_url?: string,
    caucus?: Caucus,
    how?: 'appointment' | 'special-election',
    'end-type'?: 'appointment' | 'special-election',
    // party_affiliations?: PartyAffiliation[],

    twitter: string | undefined,
    twitter_id: string | undefined,
    facebook: string | undefined,
    youtube: string | undefined,
    youtube_id: string | undefined,
    instagram: string | undefined,
    instagram_id: string | undefined,
    mastodon: string | undefined,
};
export type Row = { [K in keyof RowData]: RowData[K] };

type Column = {
    key: keyof RowData,
    label: string,
    selected: boolean
};
const tableColumns = [
    { key: 'address', label: 'address', selected: false },
    { key: 'birthday', label: 'birthday', selected: false },
    { key: 'bioguide', label: 'bioguide', selected: false },
    { key: 'caucus', label: 'caucus', selected: false },
    { key: 'class', label: 'class', selected: false },
    { key: 'contact_form', label: 'contact_form', selected: false },
    { key: 'cspan', label: 'cspan', selected: false },
    { key: 'district', label: 'district', selected: false },
    { key: 'end', label: 'end', selected: false },
    { key: 'end-type', label: 'end-type', selected: false },
    { key: 'facebook', label: 'facebook', selected: false },
    { key: 'fax', label: 'fax', selected: false },
    { key: 'first', label: 'first', selected: false },
    { key: 'full', label: 'Full Name', selected: false },
    { key: 'gender', label: 'gender', selected: false },
    { key: 'google_entity_id', label: 'google_entity_id', selected: false },
    { key: 'govtrack', label: 'govtrack', selected: false },
    { key: 'house_history', label: 'house_history', selected: false },
    { key: 'how', label: 'how', selected: false },
    { key: 'icpsr', label: 'icpsr', selected: false },
    { key: 'instagram', label: 'instagram', selected: false },
    { key: 'instagram_id', label: 'instagram_id', selected: false },
    { key: 'last', label: 'last', selected: false },
    { key: 'lis', label: 'lis', selected: false },
    { key: 'maplight', label: 'maplight', selected: false },
    { key: 'mastodon', label: 'mastodon', selected: false },
    { key: 'middle', label: 'middle', selected: false },
    { key: 'nickname', label: 'nickname', selected: false },
    { key: 'office', label: 'office', selected: false },
    { key: 'official_full', label: 'official_full', selected: false },
    { key: 'opensecrets', label: 'opensecrets', selected: false },
    { key: 'party', label: 'party', selected: false },
    { key: 'phone', label: 'phone', selected: false },
    { key: 'pictorial', label: 'pictorial', selected: false },
    { key: 'rss_url', label: 'rss_url', selected: false },
    { key: 'state', label: 'state', selected: false },
    { key: 'state_rank', label: 'state_rank', selected: false },
    { key: 'start', label: 'start', selected: false },
    { key: 'suffix', label: 'suffix', selected: false },
    { key: 'thomas', label: 'thomas', selected: false },
    { key: 'twitter', label: 'twitter', selected: false },
    { key: 'twitter_id', label: 'twitter_id', selected: false },
    { key: 'type', label: 'type', selected: false },
    { key: 'url', label: 'url', selected: false },
    { key: 'votesmart', label: 'votesmart', selected: false },
    { key: 'wikipedia', label: 'wikipedia', selected: false },
    { key: 'wikidata', label: 'wikidata', selected: false },
    { key: 'youtube', label: 'youtube', selected: false },
    { key: 'youtube_id', label: 'youtube_id', selected: false },
] as const satisfies Column[];
// const tableColumns = [
//     { key: 'full', label: 'Full Name', selected: false },

//     { key: 'bioguide', label: 'bioguide', selected: false },
//     { key: 'thomas', label: 'thomas', selected: false },
//     { key: 'lis', label: 'lis', selected: false },
//     { key: 'govtrack', label: 'govtrack', selected: false },
//     { key: 'opensecrets', label: 'opensecrets', selected: false },
//     { key: 'votesmart', label: 'votesmart', selected: false },
//     // { key: 'fec', label: 'FEC', selected: false },
//     { key: 'cspan', label: 'cspan', selected: false },
//     { key: 'wikipedia', label: 'wikipedia', selected: false },
//     { key: 'house_history', label: 'house_history', selected: false },
//     { key: 'ballotpedia', label: 'ballotpedia', selected: false },
//     { key: 'maplight', label: 'maplight', selected: false },
//     { key: 'icpsr', label: 'icpsr', selected: false },
//     { key: 'wikidata', label: 'wikidata', selected: false },
//     { key: 'google_entity_id', label: 'google_entity_id', selected: false },
//     { key: 'pictorial', label: 'pictorial', selected: false },

//     { key: 'first', label: 'first', selected: false },
//     { key: 'last', label: 'last', selected: false },
//     { key: 'official_full', label: 'official_full', selected: false },
//     { key: 'middle', label: 'middle', selected: false },
//     { key: 'nickname', label: 'nickname', selected: false },
//     { key: 'suffix', label: 'suffix', selected: false },

//     { key: 'birthday', label: 'birthday', selected: false },
//     { key: 'gender', label: 'gender', selected: false },

//     { key: 'type', label: 'type', selected: false },
//     { key: 'start', label: 'start', selected: false },
//     { key: 'end', label: 'end', selected: false },
//     { key: 'state', label: 'state', selected: false },
//     { key: 'district', label: 'district', selected: false },
//     { key: 'party', label: 'party', selected: false },
//     { key: 'class', label: 'class', selected: false },
//     { key: 'url', label: 'url', selected: false },
//     { key: 'address', label: 'address', selected: false },
//     { key: 'phone', label: 'phone', selected: false },
//     { key: 'fax', label: 'fax', selected: false },
//     { key: 'contact_form', label: 'contact_form', selected: false },
//     { key: 'office', label: 'office', selected: false },
//     { key: 'state_rank', label: 'state_rank', selected: false },
//     { key: 'rss_url', label: 'rss_url', selected: false },
//     { key: 'caucus', label: 'caucus', selected: false },
//     { key: 'how', label: 'how', selected: false },
//     { key: 'end-type', label: 'end-type', selected: false },
//     // { key: 'party_affiliations', label: 'party_affiliations', selected: false },

//     { key: 'twitter', label: 'twitter', selected: false },
//     { key: 'twitter_id', label: 'twitter_id', selected: false },
//     { key: 'facebook', label: 'facebook', selected: false },
//     { key: 'youtube', label: 'youtube', selected: false },
//     { key: 'youtube_id', label: 'youtube_id', selected: false },
//     { key: 'instagram', label: 'instagram', selected: false },
//     { key: 'instagram_id', label: 'instagram_id', selected: false },
//     { key: 'mastodon', label: 'mastodon', selected: false },
// ] as const satisfies Column[];

export type FilterOptions = {
    search: string,
    state: string,
    parties: {
        democrat: boolean,
        independent: boolean,
        republican: boolean,
    },
    types: {
        sen: boolean,
        rep: boolean,
    },
};

export type SortByOptions = {
    key: keyof RowData,
    asc: boolean,
};

type TableContextValue = {
    columns: Column[],
    setColumns: React.Dispatch<React.SetStateAction<Column[]>>,
    sortBy: SortByOptions,
    setSortBy: React.Dispatch<React.SetStateAction<SortByOptions>>,
    filterOptions: FilterOptions,
    setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>,
    searchInput: string,
    setSearchInput: React.Dispatch<React.SetStateAction<string>>,
}
const TableContext = createContext<TableContextValue | undefined>(undefined);

export function TableProvider({ children }: PropsWithChildren) {
    const { savedColKeys } = useSettingsContext();

    const [columns, setColumns] = useState<Column[]>(() => {
        //for each saved key, get matching table cols,
        //filter out 'undefined' results when .find couldn't find the key,
        //set each col's 'selected' property to true
        const showCols = savedColKeys
            .map(savedColKey => tableColumns.find(col => col.key === savedColKey))
            .filter(col => col !== undefined)
            .map(col => ({ ...col, selected: true }));
        //for each table col, get the columns that don't match the saved keys,
        //set their 'selected' property to false
        const hideCols = tableColumns
            .filter(col => !savedColKeys.includes(col.key))
            .map(col => ({ ...col, selected: false }));
        return [...showCols, ...hideCols];
    });

    const [sortBy, setSortBy] = useState<SortByOptions>({
        key: 'full',
        asc: true,
    });
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        search: '',
        state: '',
        parties: {
            democrat: true,
            independent: true,
            republican: true,
        },
        types: {
            sen: true,
            rep: true,
        },
    })
    const [searchInput, setSearchInput] = useState('');

    return (
        <TableContext value={{
            columns, setColumns,
            sortBy, setSortBy,
            filterOptions, setFilterOptions,
            searchInput, setSearchInput
        }}>
            {children}
        </TableContext>
    );
}

export function useTableContext() {
    const context = useContext(TableContext);
    if (!context)
        throw new Error('useTableContext must be used within a TableProvider');
    return context;
}