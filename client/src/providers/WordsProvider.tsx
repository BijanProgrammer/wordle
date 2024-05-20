import {createContext, PropsWithChildren, ReactElement, useCallback, useContext, useState} from 'react';

import {toast} from 'react-toastify';

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

    const updateWord = useCallback((index: number, value: string): void => {
        setWords((old) => {
            const result = [...old];
            result[index] = value;
            return result;
        });
    }, []);

    const enterInputHandler = useCallback(async (): Promise<void> => {
        if (!solution) {
            toast.warn('Not loaded yet');
            return;
        }

        const guess = words[currentWordIndex];
        if (!(await ValidationUtils.isValidGuess(guess))) {
            return;
        }

        updateWord(currentWordIndex, guess);
        setCurrentWordIndex((old) => old + 1);
    }, [words, currentWordIndex, solution, updateWord]);

    const backspaceInputHandler = useCallback(() => {
        const currentWord = words[currentWordIndex];
        if (currentWord.length <= 0) {
            return;
        }

        updateWord(currentWordIndex, currentWord.substring(0, currentWord.length - 1));
    }, [words, currentWordIndex, updateWord]);

    const letterInputHandler = useCallback(
        (letter: Letter) => {
            const currentWord = words[currentWordIndex];
            if (currentWord.length >= 5) {
                return;
            }

            updateWord(currentWordIndex, currentWord + letter);
        },
        [words, currentWordIndex, updateWord]
    );

    const inputHandler = useCallback(
        (input: Input): void => {
            switch (input) {
                case 'enter':
                    enterInputHandler().then();
                    break;
                case 'backspace':
                    backspaceInputHandler();
                    break;
                default:
                    letterInputHandler(input);
                    break;
            }
        },
        [enterInputHandler, backspaceInputHandler, letterInputHandler]
    );

    return <WordsContext.Provider value={{words, currentWordIndex, inputHandler}}>{children}</WordsContext.Provider>;
}

export default WordsProvider;
