import axios from "axios";


const API_KEY = process.env.NEXT_PUBLIC_DOKTERIN_STRAPI_API_TOKEN!;

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DOKTERIN_STRAPI_ENDPOINT!}/api`,
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

const sendEmail = async (data: any) => await axios.post('/api/sendEmail', data);

const getUserAppointmentList = async (user_email: string) => await axiosClient.get(`/appointments?filters[Email][$eq]=${user_email}&populate[doctor][populate]=Image&sort[0]=Appointment_Date`);

const deleteAppointmentById = async (appointment_document_id: string) => await axiosClient.delete(`/appointments/${appointment_document_id}`);

export default {
  getCategories,
  getDoctorList,
  getDoctorByCategory,
  getDoctorById,
  createAppointment,
  sendEmail,
  getUserAppointmentList,
  deleteAppointmentById,
};