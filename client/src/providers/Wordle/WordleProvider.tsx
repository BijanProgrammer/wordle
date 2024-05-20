import {createContext, PropsWithChildren, ReactElement, useCallback, useEffect, useState} from 'react';

import {Color} from '../../models/color.ts';
import {Input} from '../../models/input.ts';

type ContextValue = {
    words: string[];
    solution: string | null;
    colors: Record<string, Color>;
    isLoading: boolean;
    inputHandler: (input: Input) => void;
};

export const WordleContext = createContext<ContextValue>({
    words: [],
    solution: null,
    colors: {},
    isLoading: false,
    inputHandler: () => {},
});

const BASE_URL = 'http://localhost:5000' as const;

type Props = PropsWithChildren;

function WordleProvider({children}: Props): ReactElement {
    const [words, setWords] = useState<string[]>(Array(6).fill(''));
    const [solution, setSolution] = useState<string | null>(null);
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
    const [colors, setColors] = useState<Record<string, Color>>({});

    useEffect(() => {
        const fetchGameData = async (): Promise<void> => {
            const response = await fetch(`${BASE_URL}/`);
            const data = await response.json();

            setSolution(data.solution);
        };

        fetchGameData().then();
    }, []);

    const getColor = useCallback(
        (letterInGuess: string, indexInGuess: number): Color => {
            const indicesInSolution: number[] = [];
            solution?.split('').forEach((letterInSolution, indexInSolution) => {
                if (letterInGuess === letterInSolution) {
                    indicesInSolution.push(indexInSolution);
                }
            });

            if (indicesInSolution.length > 0) {
                if (indicesInSolution.includes(indexInGuess)) {
                    return 'green';
                }

                return 'yellow';
            }

            return 'gray';
        },
        [solution]
    );

    const updateColors = useCallback(
        (guess: string): void => {
            const newColors: Record<string, Color> = {};

            guess.split('').forEach((letterInGuess, indexInGuess) => {
                newColors[letterInGuess] = getColor(letterInGuess, indexInGuess);
            });

            setColors((old) => ({...newColors, ...old}));
        },
        [getColor]
    );

    const guessSubmitHandler = useCallback((): void => {
        const guess = words[currentWordIndex];

        updateColors(guess);

        setWords((old) => [...old, guess]);
        setCurrentWordIndex((old) => old + 1);
    }, [words, currentWordIndex, updateColors]);

    const inputHandler = useCallback(
        (input: Input): void => {
            const currentWord = words[currentWordIndex];

            if (input === 'enter') {
                guessSubmitHandler();
                return;
            }

            if (input === 'backspace') {
                if (currentWord.length > 0) {
                    setWords((old) => {
                        const newWords = [...old];
                        newWords[currentWordIndex] = currentWord.substring(0, currentWord.length - 1);
                        return newWords;
                    });
                }

                return;
            }

            if (currentWord.length < 5) {
                setWords((old) => {
                    const newWords = [...old];
                    newWords[currentWordIndex] = currentWord + input;
                    return newWords;
                });
            }
        },
        [words, currentWordIndex, guessSubmitHandler]
    );

    return (
        <WordleContext.Provider value={{words, solution, colors, isLoading: !!solution, inputHandler}}>
            {children}
        </WordleContext.Provider>
    );
}

export default WordleProvider;
