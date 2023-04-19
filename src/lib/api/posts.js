import client from './client';

export const writePost = ({title, body, tags, writer}) =>
    client.post('/api/posts', {title, body, tags, writer});

export const readPost  = id => client.get(`/api/posts/${id}`);

export const listPosts = ({page, name, tag}) => {
    return client.get('/api/posts', {
        params: {page, name, tag}
    });
};

export const updatePost = ({id, title, body, tags}) => client.patch(`/api/posts/${id}`, {
    title, body, tags
});

export const removePost = id => client.delete(`/api/posts/${id}`);


