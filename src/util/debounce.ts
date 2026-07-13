// unTyped
// export default function debounce(fn, delay) {
//     let timeoutId;
//     return (...args) => {
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => fn.apply(this,args), delay);
//     }
// }

export default function debounce<T extends (...args: any[]) => void>
    (fn: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}