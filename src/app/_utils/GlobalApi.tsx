import axios from "axios";


const API_KEY = process.env.NEXT_PUBLIC_DOKTERIN_STRAPI_API_TOKEN!;

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:1337/api/',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
  },
});

const getCategories = () => axiosClient.get('/categories?populate=*');
const getDoctorList = async () => await axiosClient.get('/doctors?populate=*');
const getDoctorByCategory = async (category_slug: string) => await axiosClient.get(`/doctors?filters[categories][Slug][$in]=${category_slug}&populate=*`);
const getDoctorById = async (doctor_document_id: string) => await axiosClient.get(`/doctors/${doctor_document_id}?populate=*`);

type CreateAppointmentData = {

};
const createAppointment = async (data: CreateAppointmentData) => await axiosClient.post(`/appointments/`, {
  ...data
});

export default {
  getCategories,
  getDoctorList,
  getDoctorByCategory,
  getDoctorById,
  createAppointment,
};