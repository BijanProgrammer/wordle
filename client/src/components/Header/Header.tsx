import {ReactElement} from 'react';

import styles from './Header.module.scss';

function Header(): ReactElement {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Wordle</h1>
        </header>
    );
}

export default Header;
