import {ReactElement, useContext, useEffect} from 'react';

import clsx from 'clsx';

import BackspaceIcon from '@/icons/BackspaceIcon.tsx';

import {Input} from '@/models/input.ts';
import {Letter, LETTERS} from '@/models/letter.ts';

import {WordsContext} from '@/providers/WordsProvider.tsx';

import KeyboardLetters from './components/KeyboardLetters/KeyboardLetters.tsx';

import styles from './Keyboard.module.scss';

function Keyboard(): ReactElement {
    const {inputHandler} = useContext(WordsContext);

    useEffect(() => {
        const documentKeyUpHandler = (e: KeyboardEvent): void => {
            if (e.key === 'Enter' || e.key === 'Backspace') {
                inputHandler(e.key.toLowerCase() as Input);
                return;
            }

            const letter = e.key.toLowerCase() as Letter;
            if (LETTERS.includes(letter)) {
                inputHandler(letter);
            }
        };

        document.removeEventListener('keyup', documentKeyUpHandler);
        document.addEventListener('keyup', documentKeyUpHandler);

        return (): void => {
            document.removeEventListener('keyup', documentKeyUpHandler);
        };
    }, [inputHandler]);

    const enterButtonClickHandler = (): void => {
        inputHandler('enter');
    };

    const backspaceButtonClickHandler = (): void => {
        inputHandler('backspace');
    };

    return (
        <div className={styles.keyboard}>
            <div className={styles.row}>
                <KeyboardLetters letters={'qwertyuiop'.split('') as Letter[]} />
            </div>
            <div className={styles.row}>
                <div className={styles.spacer}></div>
                <KeyboardLetters letters={'asdfghjkl'.split('') as Letter[]} />
                <div className={styles.spacer}></div>
            </div>
            <div className={styles.row}>
                <button className={clsx(styles.key, styles.large)} type="button" onClick={enterButtonClickHandler}>
                    enter
                </button>
                <KeyboardLetters letters={'zxcvbnm'.split('') as Letter[]} />
                <button className={clsx(styles.key, styles.large)} type="button" onClick={backspaceButtonClickHandler}>
                    <BackspaceIcon />
                </button>
            </div>
        </div>
    );
}

export default Keyboard;
