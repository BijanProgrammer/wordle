import {createContext, PropsWithChildren, ReactElement, useCallback, useContext, useState} from 'react';

import {Input} from '@/models/input.ts';
import {Letter} from '@/models/letter.ts';

import {SolutionContext} from '@/providers/SolutionProvider.tsx';

import {ArrayUtils} from '@/utils/array-utils.ts';
import {ValidationUtils} from '@/utils/validation-utils.ts';

type ContextValue = {
    words: string[];
    currentWordIndex: number;
    inputHandler: (input: Input) => void;
};

export const WordsContext = createContext<ContextValue>({
    words: [],
    currentWordIndex: 0,
    inputHandler: () => {},
});

type Props = PropsWithChildren;

function WordsProvider({children}: Props): ReactElement {
    const {solution} = useContext(SolutionContext);

    const [words, setWords] = useState<string[]>(ArrayUtils.fill(6, ''));
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

    const enterInputHandler = useCallback(async (): Promise<void> => {
        if (!solution) {
            console.warn('Not loaded yet');
            return;
        }

        const guess = words[currentWordIndex];
        if (!(await ValidationUtils.isValidGuess(guess))) {
            return;
        }

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
                enterInputHandler().then();
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

    return <WordsContext.Provider value={{words, currentWordIndex, inputHandler}}>{children}</WordsContext.Provider>;
}

export default WordsProvider;
