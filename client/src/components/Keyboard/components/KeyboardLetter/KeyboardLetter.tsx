import {ReactElement, useContext} from 'react';

import clsx from 'clsx';

import {Letter} from '@/models/letter.ts';

import {WordleContext} from '@/providers/Wordle/WordleProvider.tsx';

import keyboardStyles from '../../Keyboard.module.scss';
import styles from './KeyboardLetter.module.scss';

type KeyboardButtonProps = {
    letter: Letter;
};

function KeyboardLetter({letter}: KeyboardButtonProps): ReactElement {
    const {colors, inputHandler} = useContext(WordleContext);

    const keyClickHandler = (letter: Letter): void => {
        inputHandler(letter);
    };

    return (
        <button
            className={clsx(keyboardStyles.key, styles.letter, styles[colors[letter] || 'default'])}
            type="button"
            onClick={() => keyClickHandler(letter)}
        >
            {letter}
        </button>
    );
}

export default KeyboardLetter;
