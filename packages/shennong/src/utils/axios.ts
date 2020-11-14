import axios from 'axios';

axios.defaults.baseURL = 'https://kyuch4n.github.io/';
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axios;
