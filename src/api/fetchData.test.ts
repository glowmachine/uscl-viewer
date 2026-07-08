import { fetchData } from "./fetchData";

describe('fetchData', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('returns promise when response.ok is true', async () => {
        const mockData = [
            { id: '8', name: 'Jane Doe' },
            { id: '8', name: 'John Smith' },
        ];
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue(mockData) as unknown
        } as Response);
        await expect(fetchData('legislators-current.json')).resolves.toBe(mockData);
    });

    it('throws when response.ok is false', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: false,
        } as Response);
        await expect(fetchData('legislators-current.json')).rejects
            .toThrow(/Error Code:/);
    });

    it('throws when fetch times out', async () => {
        const err = new Error();
        err.name = 'TimeoutError';
        vi.spyOn(globalThis, 'fetch').mockRejectedValue(err);
        await expect(fetchData('legislators-current.json')).rejects
            .toThrow(/Request Time Exceeded/);
    });

    it('throws when fetch fails (network error)', async () => {
        const err = new TypeError('Network Error:');
        vi.spyOn(globalThis, 'fetch').mockRejectedValue(err);
        await expect(fetchData('legislators-current.json')).rejects
            .toThrow(/Network Error/);
    });
})