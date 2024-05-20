import {createContext, PropsWithChildren, ReactElement, useEffect, useState} from 'react';

type ContextValue = {
    solution: string;
};

export const SolutionContext = createContext<ContextValue>({
    solution: '',
});

type Props = PropsWithChildren;

function SolutionProvider({children}: Props): ReactElement {
    const [solution, setSolution] = useState<string>('');

    useEffect(() => {
        const fetchSolution = async (): Promise<void> => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/solution`);
            const solution = await response.json();

            setSolution(solution);
        };

        fetchSolution().then();
    }, []);

    return <SolutionContext.Provider value={{solution}}>{children}</SolutionContext.Provider>;
}

export default SolutionProvider;
