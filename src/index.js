import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import rootReducer, {rootSaga} from "./modules";
import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware from 'redux-saga';
import {checkUser, tempSetUser} from "./modules/user";
import {HelmetProvider} from "react-helmet-async";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

function loadUser() {
    try{
        const user = localStorage.getItem('user');
        if(!user) return;
        store.dispatch(tempSetUser(JSON.parse(user)));
        store.dispatch(checkUser);
    } catch(e) {
        console.log('localStorage is not working');
    }
}

sagaMiddleware.run(rootSaga);
loadUser();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <HelmetProvider>
                <App/>
            </HelmetProvider>
        </BrowserRouter>
    </Provider>
);
