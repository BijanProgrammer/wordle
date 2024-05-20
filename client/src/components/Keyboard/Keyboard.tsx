import {ReactElement, useContext, useEffect} from 'react';

import clsx from 'clsx';

import {Input} from '@/models/input.ts';
import {Letter, LETTERS} from '@/models/letter.ts';

import {WordleContext} from '@/providers/Wordle/WordleProvider.tsx';

import KeyboardLetters from './components/KeyboardLetters/KeyboardLetters.tsx';

import styles from './Keyboard.module.scss';

function Keyboard(): ReactElement {
    const {inputHandler} = useContext(WordleContext);

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
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path
                            fill="currentcolor"
                            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Keyboard;
