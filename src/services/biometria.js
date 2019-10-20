import axios from 'axios';

const biometria = axios.create({
  baseURL: 'http://localhost:9000',
});

export default biometria;
