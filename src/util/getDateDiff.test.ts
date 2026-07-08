import getDateDiff from "./getDateDiff";

describe('getDateDiff', () => {
    it('returns the difference between two dates', () => {
        expect(getDateDiff(new Date('2026-07-04'), new Date('2026-07-05')))
            .toMatchObject({ 'days': 1, 'months': 0, 'years': 0 });
        expect(getDateDiff(new Date('2026-07-04'), new Date('2026-09-05')))
            .toMatchObject({ 'days': 1, 'months': 2, 'years': 0 });
        expect(getDateDiff(new Date('2023-07-04'), new Date('2026-09-05')))
            .toMatchObject({ 'days': 1, 'months': 2, 'years': 3 });
    });

    it('returns the correct timer direction', () => {
        expect(getDateDiff(new Date('2026-07-04'), new Date('2026-07-05')))
            .toMatchObject({ 'direction': 'elapsed' });
        expect(getDateDiff(new Date('2026-07-05'), new Date('2026-07-04')))
            .toMatchObject({ 'direction': 'countdown' });
    })

    it('handles lower date numbers that cross months', () => {
        expect(getDateDiff(new Date('2026-07-28'), new Date('2026-08-04')))
            .toMatchObject({ 'days': 7, 'months': 0 });
    });

    it('handles lower month numbers that cross years', () => {
        expect(getDateDiff(new Date('2026-12-25'), new Date('2027-01-04')))
            .toMatchObject({ 'days': 10, 'months': 0, 'years': 0 });
    });
});