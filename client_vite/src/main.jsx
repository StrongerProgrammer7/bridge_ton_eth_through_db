// @ts-nocheck
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux';
import { store } from './store/store';
import { UserContext } from './components/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Context = createContext(null);

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
        <Provider store={ store }>
            <UserContext>
                <App />
            </UserContext>
        </Provider>
    </React.StrictMode>
)
