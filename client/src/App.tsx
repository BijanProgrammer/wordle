import {ReactElement} from 'react';

import Keyboard from '@/components/Keyboard/Keyboard.tsx';
import Screen from '@/components/Screen/Screen.tsx';

import ColorProvider from '@/providers/ColorProvider.tsx';
import SolutionProvider from '@/providers/SolutionProvider.tsx';
import WordsProvider from '@/providers/WordsProvider.tsx';

import './App.scss';

function App(): ReactElement {
    return (
        <SolutionProvider>
            <WordsProvider>
                <ColorProvider>
                    <div id="app">
                        <Screen />
                        <Keyboard />
                    </div>
                </ColorProvider>
            </WordsProvider>
        </SolutionProvider>
    );
}

export default App;
