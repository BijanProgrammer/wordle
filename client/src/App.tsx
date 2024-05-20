import {ReactElement} from 'react';

import Keyboard from '@/components/Keyboard/Keyboard.tsx';
import Screen from '@/components/Screen/Screen.tsx';

import WordleProvider from '@/providers/Wordle/WordleProvider.tsx';

import './App.scss';

function App(): ReactElement {
    return (
        <WordleProvider>
            <div className="app">
                <Screen />
                <Keyboard />
            </div>
        </WordleProvider>
    );
}

export default App;
