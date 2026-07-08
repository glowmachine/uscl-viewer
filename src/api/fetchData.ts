import type { LegislatorsCurrent } from "../types/legislatorsCurrent";
import type { LegislatorsHistorical } from "../types/legislatorsHistorical";

export type DataType =
    | LegislatorsCurrent
    | LegislatorsHistorical;

export type Filename =
    | 'legislators-current.json'
    | 'legislators-historical.json'

const baseUrl = '../tests/fixtures';
// const baseUrl = 'https://unitedstates.github.io/congress-legislators';
const timeoutMs = 5000;

export async function fetchData(filename: Filename): Promise<DataType[]> {
    try {
        const response = await fetch(
            `${baseUrl}/${filename}`,
            { signal: AbortSignal.timeout(timeoutMs) }
        );
        if (!response.ok) {
            throw new Error(`Error Code: ${response.status}, failed to fetch ${filename}`);
        }
        return await response.json() as DataType[];
    }
    catch (error) {
        if (error instanceof TypeError) {
            throw new Error(`Network Error: connection failed for ${filename}`);
        } else if (error instanceof Error && error.name === 'TimeoutError') {
            throw new Error(`Request Time Exceeded, failed to fetch ${filename} within 5 seconds`);
        } else {
            throw error;
        }
    }
}