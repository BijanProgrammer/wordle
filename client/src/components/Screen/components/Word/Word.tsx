import {ReactElement, useContext} from 'react';

import {ColorContext} from '@/providers/ColorProvider.tsx';
import {WordsContext} from '@/providers/WordsProvider.tsx';

import {ArrayUtils} from '@/utils/array-utils.ts';

import Letter from '../Letter/Letter.tsx';

import styles from './Word.module.scss';

type Props = {
    index: number;
    word: string;
};

function Word({index, word}: Props): ReactElement {
    const {currentWordIndex} = useContext(WordsContext);
    const {wordsColors} = useContext(ColorContext);

    const isSubmitted = index < currentWordIndex;

    return (
        <div className={styles.word}>
            {ArrayUtils.fillMap(5, (letterIndex) => (
                <Letter
                    key={letterIndex}
                    letter={word[letterIndex]}
                    color={isSubmitted ? wordsColors[index][letterIndex] : 'default'}
                />
            ))}
        </div>
    );
}

export default Word;
