import Axios from 'axios';

import { BASE_URL } from '../../configs/constants';

const callApi = async (url, method, headers, data) => {
  let response = null;
  try {
    switch (method) {
    case 'GET':
      response = await Axios.get(`${BASE_URL}${url}`, { headers });
      break;
    case 'POST':
      response = await Axios.post(`${BASE_URL}${url}`, data, { headers });
      break;
    case 'PUT':
      response = await Axios.put(`${BASE_URL}${url}`, data, { headers });
      break;
    case 'DELETE':
      response = await Axios.delete(`${BASE_URL}${url}`, { headers });
      break;
    default:
      response = null;
    }
  } catch (err) {
    throw err?.response || err;
  }
  return response.data;
};

export default callApi;
