import {createContext, PropsWithChildren, ReactElement, useContext, useEffect, useState} from 'react';

import {Color} from '@/models/color.ts';
import {Letter} from '@/models/letter.ts';

import {SolutionContext} from '@/providers/SolutionProvider.tsx';
import {WordsContext} from '@/providers/WordsProvider.tsx';

import {ArrayUtils} from '@/utils/array-utils.ts';
import {ColorUtils} from '@/utils/color-utils.ts';

type ContextValue = {
    wordsColors: Color[][];
    lettersColors: Map<Letter, Color>;
};

export const ColorContext = createContext<ContextValue>({
    wordsColors: [],
    lettersColors: new Map<Letter, Color>(),
});

type Props = PropsWithChildren;

function ColorProvider({children}: Props): ReactElement {
    const {solution} = useContext(SolutionContext);
    const {words, currentWordIndex} = useContext(WordsContext);

    const [wordsColors, setWordsColors] = useState<Color[][]>(ArrayUtils.fill(6, []));
    const [lettersColors, setLettersColors] = useState<Map<Letter, Color>>(new Map());

    useEffect(() => {
        const colors = words.map((word) => ColorUtils.generateWordColors(word, solution));
        setWordsColors(colors);
    }, [solution, words]);

    useEffect(() => {
        const colors = ColorUtils.generateLettersColors(words, currentWordIndex, wordsColors);
        setLettersColors(colors);
    }, [words, currentWordIndex, wordsColors]);

    return <ColorContext.Provider value={{wordsColors, lettersColors}}>{children}</ColorContext.Provider>;
}

export default ColorProvider;
