import createRequestSaga, {createRequestActionType} from "../lib/createRequestSaga";
import {createAction, handleActions} from "redux-actions";
import * as postsAPI from '../lib/api/posts';
import {takeLatest} from 'redux-saga/effects';

const [
    LIST_POSTS,
    LIST_POSTS_SUCCESS,
    LIST_POSTS_FAILURE
] = createRequestActionType('posts/LIST_POSTS');

export const listPosts = createAction(
    LIST_POSTS,
    ({tag, name, page}) => ({tag, name, page})
);

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);

export function* postsSaga() {
    yield takeLatest(LIST_POSTS, listPostsSaga);
}

const initialState = {
    posts: null,
    error: null,
    lastPage: 1
};

const posts = handleActions(
    {
        [LIST_POSTS_SUCCESS]: (state, {payload: posts, meta: response}) => ({
            ...state,
            posts,
            lastPage: parseInt(response.headers['last-page'], 10)
        }),
        [LIST_POSTS_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error
        }),
    },
    initialState
);

export default posts;