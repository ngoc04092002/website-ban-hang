import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { store } from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AuthContextProvider>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </AuthContextProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
);
