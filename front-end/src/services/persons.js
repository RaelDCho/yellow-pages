import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
  // const request =  axios.get(baseUrl);
  // return request.then(response => response.data);
  // console.log(`${baseUrl}`);
  return axios.get(baseUrl);
}

const create = newObject => {
  return axios.post(baseUrl, newObject);
}

const update = (id, newObject) => {
  console.log(`${baseUrl}/${id}`);
  return axios.put(`${baseUrl}/${id}`, newObject);
}

const remove = id => {
  // console.log(`${baseUrl}/${id}`);
  return axios.delete(`${baseUrl}/${id}`);
}

export default {getAll, create, update, remove};