import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burggerappreact.firebaseio.com/'
});

export default instance;