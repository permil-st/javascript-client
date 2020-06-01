import Axios from 'axios';

const BASE_URL = 'https://express-training.herokuapp.com/api/';

const callApi = async (url, method, header, data) => {
  let response = null;
  switch (method) {
  case 'GET':
    response = await Axios.get(`${BASE_URL}${url}`);
    break;
  case 'POST':
    response = await Axios.post(`${BASE_URL}${url}`, data);
    break;
  case 'PUT':
    response = await Axios.put(`${BASE_URL}${url}`, data);
    break;
  case 'DELETE':
    response = await Axios.delete(`${BASE_URL}${url}`, data);
    break;
  default:
    response = null;
  }
  return response.data;
};

export default callApi;
