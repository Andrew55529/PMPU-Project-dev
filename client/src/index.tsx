import React, {createContext} from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import Store from "./store/store";
import "./index.css";
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "./store";




const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
