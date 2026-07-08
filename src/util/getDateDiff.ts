type DateDiffResult = {
    days: number,
    months: number,
    years: number,
    direction: 'elapsed' | 'countdown'
}

// returns elapsed time from A to B or a countdown from B to A
export default function getDateDiff(dateA: Date, dateB: Date = new Date()): DateDiffResult {
    const [start, end, direction]: [Date, Date, 'elapsed' | 'countdown']
        = (dateA <= dateB) ?
            [dateA, dateB, 'elapsed'] : [dateB, dateA, 'countdown'];

    let days = end.getDate() - start.getDate();
    let months = end.getMonth() - start.getMonth();
    let years = end.getFullYear() - start.getFullYear();

    if (days < 0) {
        months--;
        const prevMonthLastDate = new Date(end.getFullYear(), end.getMonth(), 0);
        days += prevMonthLastDate.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    return { days, months, years, direction };
}