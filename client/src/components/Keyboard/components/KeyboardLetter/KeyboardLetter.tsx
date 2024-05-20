import {ReactElement, useContext} from 'react';

import clsx from 'clsx';

import {Letter} from '@/models/letter.ts';

import {ColorContext} from '@/providers/ColorProvider.tsx';
import {WordsContext} from '@/providers/WordsProvider.tsx';

import keyboardStyles from '../../Keyboard.module.scss';
import styles from './KeyboardLetter.module.scss';

type KeyboardButtonProps = {
    letter: Letter;
};

function KeyboardLetter({letter}: KeyboardButtonProps): ReactElement {
    const {inputHandler} = useContext(WordsContext);
    const {lettersColors} = useContext(ColorContext);

    const keyClickHandler = (letter: Letter): void => {
        inputHandler(letter);
    };

    return (
        <button
            className={clsx(keyboardStyles.key, styles.letter, styles[lettersColors.get(letter) || 'default'])}
            type="button"
            onClick={() => keyClickHandler(letter)}
        >
            {letter}
        </button>
    );
}

export default KeyboardLetter;
