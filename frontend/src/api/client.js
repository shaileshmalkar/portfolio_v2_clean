import axios from 'axios';

const baseURL = import.meta.env.PROD 
  ? '/api'  // Use relative path in production (Vercel)
  : 'http://127.0.0.1:8000/api';  // Use local backend in development

export default axios.create({
  baseURL: baseURL
});
