import axios from 'axios';

const BASE_URL = 'https://tapps-gateway.gamefi-1.dev/';

export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
  },
});
