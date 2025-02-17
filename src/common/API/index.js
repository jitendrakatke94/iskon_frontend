import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:5454',
});

http.interceptors.request.use(
  (config) => {
    // function (config) {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    config.headers.post['Content-Type'] = 'application/json';
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response);
    return Promise.reject(error.response);
  }
);

export default http;
