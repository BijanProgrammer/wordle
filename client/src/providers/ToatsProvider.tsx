import {createContext, PropsWithChildren, ReactElement} from 'react';

import {ToastContainer} from 'react-toastify';

type ContextValue = object;

export const ToastContext = createContext<ContextValue>({});

type Props = PropsWithChildren;

function ToastProvider({children}: Props): ReactElement {
    return (
        <ToastContext.Provider value={{}}>
            {children}
            <div id="toast">
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
        </ToastContext.Provider>
    );
}

export default ToastProvider;
