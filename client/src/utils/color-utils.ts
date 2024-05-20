import {Color} from '@/models/color.ts';

import {StringUtils} from '@/utils/string-utils.ts';

export class ColorUtils {
    public static findColors(guess: string, solution: string): Color[] {
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
}
