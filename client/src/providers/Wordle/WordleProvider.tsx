import {createContext, PropsWithChildren, ReactElement, useCallback, useEffect, useState} from 'react';

import {Color} from '@/models/color.ts';
import {Input} from '@/models/input.ts';
import {Letter} from '@/models/letter.ts';

import {ArrayUtils} from '@/utils/array-utils.ts';
import {ColorUtils} from '@/utils/color-utils.ts';

type ContextValue = {
    words: string[];
    currentWordIndex: number;
    solution: string | null;
    wordsColors: Color[][];
    lettersColors: Map<Letter, Color>;
    isLoading: boolean;
    inputHandler: (input: Input) => void;
};

export const WordleContext = createContext<ContextValue>({
    words: [],
    currentWordIndex: 0,
    solution: null,
    wordsColors: [],
    lettersColors: new Map<Letter, Color>(),
    isLoading: false,
    inputHandler: () => {},
});

const BASE_URL = 'http://localhost:5000' as const;

type Props = PropsWithChildren;

function WordleProvider({children}: Props): ReactElement {
    const [solution, setSolution] = useState<string | null>(null);

    const [words, setWords] = useState<string[]>(ArrayUtils.fill(6, ''));
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

    const [wordsColors, setWordsColors] = useState<Color[][]>(ArrayUtils.fill(6, []));
    const [lettersColors, setLettersColors] = useState<Map<Letter, Color>>(new Map());

    useEffect(() => {
        const fetchSolution = async (): Promise<void> => {
            const response = await fetch(`${BASE_URL}/solution`);
            const solution = await response.json();

            setSolution(solution);
        };

        fetchSolution().then();
    }, []);

    useEffect(() => {
        setLettersColors(ColorUtils.generateLettersColors(words, currentWordIndex, wordsColors));
    }, [words, currentWordIndex, wordsColors]);

    const enterInputHandler = useCallback((): void => {
        if (!solution) {
            console.warn('Not loaded yet');
            return;
        }

        const guess = words[currentWordIndex];
        if (guess.length < 5) {
            console.warn('Not enough letters');
            return;
        }

        setWordsColors((old) => {
            const newColors = [...old];
            newColors[currentWordIndex] = ColorUtils.generateWordColors(guess, solution);
            return newColors;
        });

        setWords((old) => [...old, guess]);
        setCurrentWordIndex((old) => old + 1);
    }, [words, currentWordIndex, solution]);

    const backspaceInputHandler = useCallback(() => {
        const currentWord = words[currentWordIndex];

        if (currentWord.length <= 0) {
            return;
        }

        setWords((old) => {
            const newWords = [...old];
            newWords[currentWordIndex] = currentWord.substring(0, currentWord.length - 1);
            return newWords;
        });
    }, [words, currentWordIndex]);

    const letterInputHandler = useCallback(
        (letter: Letter) => {
            const currentWord = words[currentWordIndex];
            if (currentWord.length >= 5) {
                return;
            }

            setWords((old) => {
                const newWords = [...old];
                newWords[currentWordIndex] = currentWord + letter;
                return newWords;
            });
        },
        [words, currentWordIndex]
    );

    const inputHandler = useCallback(
        (input: Input): void => {
            if (input === 'enter') {
                enterInputHandler();
                return;
            }

            if (input === 'backspace') {
                backspaceInputHandler();
                return;
            }

            letterInputHandler(input);
        },
        [enterInputHandler, backspaceInputHandler, letterInputHandler]
    );

    return (
        <WordleContext.Provider
            value={{words, currentWordIndex, solution, wordsColors, lettersColors, isLoading: !!solution, inputHandler}}
        >
            {children}
        </WordleContext.Provider>
    );
}

export default WordleProvider;
