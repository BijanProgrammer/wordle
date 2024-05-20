export class StringUtils {
    public static count(text: string, character: string): number {
        let counter = 0;

        for (let i = 0; i < text.length; i++) {
            if (text[i] === character) {
                counter++;
            }
        }

        return counter;
    }
}
