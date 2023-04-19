import client  from "./client";

export const login = ({name, password}) =>
    client.post('/api/users/login', {name, password});

export const register = ({name, password}) =>
    client.post('/api/users/register', {name, password});

export const check = () => client.post('/api/users/check');

export const logout = () => client.post('/api/users/logout');