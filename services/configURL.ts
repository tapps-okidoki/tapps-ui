import axios from 'axios';

const BASE_URL = 'https://test.gamefi-1.dev/';

export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
  },
});
