import {ReactElement} from 'react';

import Header from '@/components/Header/Header.tsx';
import Keyboard from '@/components/Keyboard/Keyboard.tsx';
import Screen from '@/components/Screen/Screen.tsx';

import ColorProvider from '@/providers/ColorProvider.tsx';
import SolutionProvider from '@/providers/SolutionProvider.tsx';
import ToastProvider from '@/providers/ToatsProvider.tsx';
import WordsProvider from '@/providers/WordsProvider.tsx';

import './App.scss';

function App(): ReactElement {
    return (
        <ToastProvider>
            <SolutionProvider>
                <WordsProvider>
                    <ColorProvider>
                        <div id="app">
                            <Header />
                            <Screen />
                            <Keyboard />
                        </div>
                    </ColorProvider>
                </WordsProvider>
            </SolutionProvider>
        </ToastProvider>
    );
}

export default App;
