import {Color} from '@/models/color.ts';
import {Letter, LETTERS} from '@/models/letter.ts';

import {StringUtils} from '@/utils/string-utils.ts';

export class ColorUtils {
    public static generateWordColors(word: string, solution: string): Color[] {
        const colors: Color[] = [];
        const coloredLetters = new ColoredLetters();

        word.split('').forEach((letter, index) => {
            if (letter !== solution[index]) {
                return;
            }

            colors[index] = 'green';
            coloredLetters.add(letter);
        });

        word.split('').forEach((letter, index) => {
            if (colors[index]) {
                return;
            }

            const countedInGuess = coloredLetters.count(letter);
            const countInSolution = StringUtils.count(solution, letter);

            colors[index] = countedInGuess < countInSolution ? 'yellow' : 'gray';
            coloredLetters.add(letter);
        });

        return colors;
    }

    public static generateLettersColors(
        words: string[],
        currentWordIndex: number,
        wordsColors: Color[][]
    ): Map<Letter, Color> {
        const colors = new Map<Letter, Color>();

        for (let wordIndex = 0; wordIndex < currentWordIndex; wordIndex++) {
            const currentWord = words[wordIndex];
            if (!currentWord) {
                continue;
            }

            for (let letterIndex = 0; letterIndex < 5; letterIndex++) {
                const currentLetter = words[wordIndex][letterIndex] as Letter;
                if (!LETTERS.includes(currentLetter)) {
                    continue;
                }

                const currentColor = wordsColors[wordIndex][letterIndex] || 'default';
                const oldColor = colors.get(currentLetter);

                if (oldColor === 'green' || currentColor === 'green') {
                    colors.set(currentLetter, 'green');
                    continue;
                }

                if (oldColor === 'yellow' || currentColor === 'yellow') {
                    colors.set(currentLetter, 'yellow');
                    continue;
                }

                colors.set(currentLetter, 'gray');
            }
        }

        return colors;
    }
}

class ColoredLetters {
    private record: Record<string, number> = {};

    public count(letter: string): number {
        return this.record[letter] || 0;
    }

    public add(letter: string): void {
        if (!this.record[letter]) {
            this.record[letter] = 0;
        }

        this.record[letter]++;
    }
}
