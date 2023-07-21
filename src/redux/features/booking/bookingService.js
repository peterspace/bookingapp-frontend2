import axios from 'axios';

import { BACKEND_URL } from '../baseURL';

const createBooking = async (userData) => {
  const response = await axios.post(`${BACKEND_URL}/bookings`, userData);
  return response.data;
};

const getUserBookings = async () => {
  const response = await axios.get(`${BACKEND_URL}/bookings`);
  return response.data;
};

const updateOwnerBooking = async (userData) => {
  const response = await axios.put(`${BACKEND_URL}/bookings`, userData);
  return response.data;
};

const getOneUserBooking = async (id) => {
  const response = await axios.get(`${BACKEND_URL}/bookings/${id}`);
  return response.data;
};

const getOwnerBookings = async (ownerId) => {
  const response = await axios.get(
    `${BACKEND_URL}/bookings/ownerbookings/${ownerId}`
  );
  return response.data;
};

// all rooms in one hotel or place
const getAllBookings = async () => {
  const response = await axios.get(`${BACKEND_URL}/bookings/allbookings`);
  return response.data;
};

const getAllBookingsByOwner = async (ownerId) => {
  const response = await axios.get(
    `${BACKEND_URL}/bookings/allbookingsbyowner/${ownerId}`
  );
  return response.data;
};

const getAllCompletedBookings = async (ownerId) => {
  const response = await axios.get(
    `${BACKEND_URL}/bookings/getAllCompletedBookings/${ownerId}`
  );
  return response.data;
};

const getAllActiveBookings = async (ownerId) => {
  const response = await axios.get(
    `${BACKEND_URL}/bookings/getAllActiveBookings/${ownerId}`
  );
  return response.data;
};

const getAllPendingBookings = async (ownerId) => {
  const response = await axios.get(
    `${BACKEND_URL}/bookings/getAllPendingBookings/${ownerId}`
  );
  return response.data;
};

const getAllPaidBookings = async (ownerId) => {
  const response = await axios.get(
    `${BACKEND_URL}/bookings/getAllPaidBookings/${ownerId}`
  );
  return response.data;
};

const getAllCanceledBookings = async (ownerId) => {
  const response = await axios.get(
    `${BACKEND_URL}/bookings/getAllCanceledBookings/${ownerId}`
  );
  return response.data;
};

const bookingService = {
  createBooking, //
  getUserBookings,
  updateOwnerBooking,
  getOneUserBooking,
  getOwnerBookings,
  getAllBookings,
  getAllBookingsByOwner,
  getAllCompletedBookings,
  getAllActiveBookings,
  getAllPendingBookings,
  getAllPaidBookings,
  getAllCanceledBookings,
};

export default bookingService;
