import { client } from "../utils/httpClient";

const getUsers = (page, perPage) => {
  return client.get('/users', { params: { page, per_page: perPage } })
    .then((response) => Promise.resolve(response))
    .catch(() => Promise.reject());
};

const createUser = (email, firstName, lastName) => {
  return client.post('/users', {
    email,
    first_name: firstName,
    last_name: lastName,
  });
};

const deleteUser = (userId) => {
  return client.delete(`/users/${userId}`);
};

const getUserDetails = (userId) => {
  return client.get(`/users/${userId}`);
};

export const usersApi = {
  getUsers,
  createUser,
  deleteUser,
  getUserDetails,
}
