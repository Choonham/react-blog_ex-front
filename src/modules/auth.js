import {createAction, handleActions} from "redux-actions";
import produce from 'immer';
import createRequestSaga, {createRequestActionType} from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';
import {takeLatest} from 'redux-saga/effects';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionType('auth/REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionType('auth/LOGIN');

const initialState = {
    register: {
        name: '',
        password: '',
        passwordConfirm: '',
    },
    login: {
        name: '',
        password: ''
    },
    auth: null,
    authError: null
};

export const changeField = createAction(
    CHANGE_FIELD,
    ({form, key, value}) => ({
        form, // register, login
        key, // name, password, passwordConfirm
        value, // 실제 바꾸려는 값
    }),
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form);

export const register = createAction(REGISTER, ({name, password}) => ({
    name,
    password
}));

export const login = createAction(LOGIN, ({name, password}) => ({
    name,
    password
}));

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
}

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, {payload: {form, key, value}}) =>
            produce(state, draft => {
                draft[form][key] = value;
            }),
        [INITIALIZE_FORM]: (state, {payload: form}) => ({
            ...state,
            [form]: initialState[form],
            authError: null,
        }),
        [REGISTER_SUCCESS]: (state, {payload: auth}) => ({
            ...state,
            authError: null,
            auth,
        }),
        [REGISTER_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error,
        }),
        [LOGIN_SUCCESS]: (state, {payload: auth}) => ({
            ...state,
            authError: null,
            auth,
        }),
        [LOGIN_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error,
        })
    },
    initialState
)

export default auth;