import {ReactElement, useContext} from 'react';

import {WordleContext} from '@/providers/Wordle/WordleProvider.tsx';

import {ArrayUtils} from '@/utils/array-utils.ts';

import Letter from '../Letter/Letter.tsx';

import styles from './Word.module.scss';

type Props = {
    index: number;
    word: string;
};

function Word({index, word}: Props): ReactElement {
    const {wordsColors, currentWordIndex} = useContext(WordleContext);

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
