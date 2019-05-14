import axios from 'axios'; // Promise based HTTP client for the browser and node.js

const instance = axios.create({ // craete axios instance
  baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`, // Environment variable host, environment variable port number
  timeout: 5000,
  headers: {}
});

export default instance;
