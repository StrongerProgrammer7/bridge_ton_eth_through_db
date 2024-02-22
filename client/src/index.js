// @ts-nocheck
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { UserContext } from './components/UserContext';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={ store }>
            <UserContext>
                <App />
            </UserContext>
        </Provider>
    </React.StrictMode>

);
