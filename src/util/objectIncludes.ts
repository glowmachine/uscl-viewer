export default function objectIncludes(obj: unknown, str: string): boolean {
    if (typeof obj === 'string')
        return obj.toLowerCase().includes(str);
    else if (Array.isArray(obj))
        return obj.some(val => objectIncludes(val, str));
    else if (obj !== null && typeof obj === 'object')
        return Object.values(obj).some(val => objectIncludes(val, str));
    else
        return false;
}