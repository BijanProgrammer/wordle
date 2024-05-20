import {ReactElement, useContext} from 'react';

import clsx from 'clsx';

import {WordleContext} from '../../../../providers/Wordle/WordleProvider.tsx';

import styles from './Letter.module.scss';

type Props = {
    letter: string;
};

function Letter({letter}: Props): ReactElement {
    const {colors} = useContext(WordleContext);

    return <div className={clsx(styles.letter, styles[colors[letter]])}>{letter || ''}</div>;
}

export default Letter;
