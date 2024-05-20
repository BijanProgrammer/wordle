export class ArrayUtils {
    public static fill<T>(length: number, defaultValue: T): T[] {
        return Array(length).fill(defaultValue);
    }

    public static fillMap<T>(length: number, callback: (index: number) => T): T[] {
        return Array(length)
            .fill(null)
            .map((_, index) => callback(index));
    }
}
