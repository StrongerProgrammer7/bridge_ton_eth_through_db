// @ts-nocheck
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import { UserContext } from './components/UserContext';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import BlackLoading from './components/UI/loadings/blackloading/BlackLoadings';
export const Context = createContext(null);

ReactDOM.createRoot(document.getElementById('root')).render(
    <TonConnectUIProvider
        manifestUrl='https://alefmanvladimir.github.io/my-twa/tonconnect-manifest.json'>
        <React.StrictMode>
            <Provider store={ store }>
                <PersistGate loading={ <BlackLoading /> } persistor={ persistor }>
                    <UserContext>
                        <App />
                    </UserContext>
                </PersistGate>
            </Provider>
        </React.StrictMode>
    </TonConnectUIProvider>
)
