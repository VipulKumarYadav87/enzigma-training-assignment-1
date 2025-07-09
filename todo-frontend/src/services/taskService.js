import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getTasks = async () => {
  const res = await axios.get(`${API_URL}/tasks`);
  return res.data;
};

export const createTask = async (task) => {
  const res = await axios.post(`${API_URL}/task`, task);
  return res.data;
};

export const updateTask = async (id, task) => {
  const res = await axios.put(`${API_URL}/task/${id}`, task);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axios.delete(`${API_URL}/task/${id}`);
  return res.data;
};
