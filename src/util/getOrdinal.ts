export default function getOrdinal(num: number) {
    const lastTwoDigits = num % 100;
    const lastDigit = num % 10;

    if ([11, 12, 13].includes(lastTwoDigits)) return `${num}th`;

    switch (lastDigit) {
        case 1: return
        case 1: return `${num}st`;
        case 2: return `${num}nd`;
        case 3: return `${num}rd`;
        default: return `${num}th`;
    }
}