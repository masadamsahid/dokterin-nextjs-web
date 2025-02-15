import axios from "axios";


const API_KEY = process.env.NEXT_PUBLIC_DOKTERIN_STRAPI_API_TOKEN!;

const axiosClient = axios.create({
  baseURL: 'http://localhost:1337/api/',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
  },
});

const getCategories = () => axiosClient.get('/categories?populate=*');

export default {
  getCategories
};