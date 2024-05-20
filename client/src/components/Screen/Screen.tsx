import {ReactElement, useContext} from 'react';

import {WordleContext} from '@/providers/Wordle/WordleProvider.tsx';

import {ArrayUtils} from '@/utils/array-utils.ts';

import Word from './components/Word/Word.tsx';

import styles from './Screen.module.scss';

function Screen(): ReactElement {
    const {words} = useContext(WordleContext);

    return (
        <div className={styles.screen}>
            {ArrayUtils.fillMap(6, (index) => (
                <Word key={index} index={index} word={words[index] || ''} />
            ))}
        </div>
    );
}

export default Screen;
