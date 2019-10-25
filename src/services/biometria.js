import axios from 'axios';

const biometria = axios.create({
  baseURL: 'http://localhost:9000/api/public/v1/captura/',
});

export default biometria;
