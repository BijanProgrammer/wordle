import {ReactElement} from 'react';

import clsx from 'clsx';

import {Color} from '@/models/color.ts';

import styles from './Letter.module.scss';

type Props = {
    letter: string;
    color: Color;
};

function Letter({letter, color}: Props): ReactElement {
    return <div className={clsx(styles.letter, styles[color])}>{letter || ''}</div>;
}

export default Letter;
