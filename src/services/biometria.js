import axios from 'axios';

const biometria = axios.create({
  baseURL: '/api/public/v1/captura/',
});

export default biometria;
