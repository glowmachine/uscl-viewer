export interface LegislatorDistrictOffice {
    id: ID;
    offices: Office[];
}

export interface ID {
    bioguide: string;
    govtrack: number;
    thomas?: string;
}

export interface Office {
    id: string;
    address?: string;
    suite?: number | string;
    city: string;
    state: string;
    zip?: string;
    latitude?: number;
    longitude?: number;
    fax?: string;
    phone?: string;
    building?: string;
    hours?: string;
}