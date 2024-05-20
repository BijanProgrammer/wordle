import {ReactElement} from 'react';

import {Letter} from '../../../../models/letter.ts';

import KeyboardLetter from '../KeyboardLetter/KeyboardLetter.tsx';

type KeyboardRowProps = {
    letters: Letter[];
};

function KeyboardLetters({letters}: KeyboardRowProps): ReactElement {
    return (
        <>
            {letters.map((letter) => (
                <KeyboardLetter key={letter} letter={letter} />
            ))}
        </>
    );
}

export default KeyboardLetters;
