export class MathUtils {
    public static generateRandomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }
}