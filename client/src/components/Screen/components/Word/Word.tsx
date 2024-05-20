import {ReactElement} from 'react';

import {ArrayUtils} from '@/utils/array-utils.ts';

import Letter from '../Letter/Letter.tsx';

import styles from './Word.module.scss';

type Props = {
    word: string;
};

function Word({word}: Props): ReactElement {
    return (
        <div className={styles.word}>
            {ArrayUtils.fillMap(5, (index) => (
                <Letter key={index} letter={word[index]} />
            ))}
        </div>
    );
}

export default Word;
