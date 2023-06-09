import createRequestSaga, {createRequestActionType} from "../lib/createRequestSaga";
import {createAction, handleActions} from "redux-actions";
import * as authAPI from "../lib/api/auth";
import {takeLatest, call} from "redux-saga/effects";

const TEMP_SET_USER = 'user/TEMP_SET_USER';

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionType('user/CHECK');

const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const checkUser = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function* logoutSaga() {
    try {
        yield call(authAPI.logout);
        localStorage.removeItem('user');
    } catch(e) {
        console.log(e);
    }
}

function checkFailureSaga() {
    try{
        localStorage.removeItem('user');
    } catch(e) {
      console.log('localStorage is not working');
    }
}
export function* userSaga() {
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(CHECK_FAILURE, checkFailureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
    user: null,
    checkError: null,
};

export default handleActions(
    {
        [LOGOUT]: (state) => ({
            ...state,
            user: null
        }),
        [TEMP_SET_USER]: (state, {payload: user}) => ({
            ...state,
            user
        }),
        [CHECK_SUCCESS]: (state, {payload: user}) => ({
            ...state,
            user,
        }),
        [CHECK_FAILURE]: (state, {payload: error}) => ({
            ...state,
            user: null,
            checkError: error
        })
    },
    initialState,
);
