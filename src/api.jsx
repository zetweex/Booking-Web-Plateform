import axios from 'axios'; 

const API = axios.create({
    baseURL: 'https://fleepi-api.herokuapp.com',
  });

export default API;