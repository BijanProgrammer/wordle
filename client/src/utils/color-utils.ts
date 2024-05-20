import {Color} from '@/models/color.ts';
import {Letter, LETTERS} from '@/models/letter.ts';

import {StringUtils} from '@/utils/string-utils.ts';

export class ColorUtils {
    public static generateWordColors(guess: string, solution: string): Color[] {
        const currentWordColors: Color[] = [];
        const coloredLetters: Record<string, number> = {};

        guess.split('').forEach((letterInGuess, indexInGuess) => {
            const indicesInSolution: number[] = [];
            solution?.split('').forEach((letterInSolution, indexInSolution) => {
                if (letterInGuess === letterInSolution) {
                    indicesInSolution.push(indexInSolution);
                }
            });

            if (indicesInSolution.length > 0) {
                if (indicesInSolution.includes(indexInGuess)) {
                    currentWordColors[indexInGuess] = 'green';

                    if (!coloredLetters[letterInGuess]) {
                        coloredLetters[letterInGuess] = 0;
                    }
                    coloredLetters[letterInGuess]++;
                }
            }
        });

        guess.split('').forEach((letterInGuess, indexInGuess) => {
            if (currentWordColors[indexInGuess]) {
                return;
            }

            const countInSolution = StringUtils.count(solution || '', letterInGuess);
            const countedInGuess = coloredLetters[letterInGuess] || 0;

            if (countedInGuess >= countInSolution) {
                currentWordColors[indexInGuess] = 'gray';
            } else {
                currentWordColors[indexInGuess] = 'yellow';
            }

            if (!coloredLetters[letterInGuess]) {
                coloredLetters[letterInGuess] = 0;
            }
            coloredLetters[letterInGuess]++;
        });

        return currentWordColors;
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
