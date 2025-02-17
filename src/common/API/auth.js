import http from './index';

export const LOGIN = '/admin/login';
export const SIGNUP = './admin/signup';

export const login = (payload) => http.post(LOGIN, payload);
export const signUp = (payload) => http.post(SIGNUP, payload);
