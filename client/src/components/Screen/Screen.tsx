import {ReactElement, useContext} from 'react';

import clsx from 'clsx';

import {WordleContext} from '../../providers/Wordle/WordleProvider.tsx';

import styles from './Screen.module.scss';

function Screen(): ReactElement {
    const {words, colors} = useContext(WordleContext);

    return (
        <div className={styles.screen}>
            {Array(6)
                .fill(null)
                .map((_, wordIndex) => {
                    const word = words[wordIndex] || '';

                    return (
                        <div key={wordIndex} className={styles.word}>
                            {Array(5)
                                .fill(null)
                                .map((_, letterIndex) => {
                                    const letter = word[letterIndex];

                                    return (
                                        <div key={letterIndex} className={clsx(styles.letter, styles[colors[letter]])}>
                                            {letter || ''}
                                        </div>
                                    );
                                })}
                        </div>
                    );
                })}
        </div>
    );
}

export default Screen;
