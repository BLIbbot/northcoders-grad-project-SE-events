import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://apex.oracle.com/pls/apex/3dwebspace/data",
});

export const getEvents = () => {
  return apiClient
    .get(`/events`)
    .then((response) => {
      console.log(response.data.items);
      return response.data.items;
    })
    .catch((response) => {
      return Promise.reject(response.status);
    });
};

export const getStaffEvents = (staff_id) => {
  return apiClient
    .get(`/events/${staff_id}`)
    .then((response) => {
      console.log(response.data.items);
      return response.data.items;
    })
    .catch((response) => {
      return Promise.reject(response.status);
    });
};

export const signUp = (details) => {
  return apiClient
    .post(`/signup`, details)
    .then((response) => {
      return response;
    })
    .catch((response) => {
      console.log(response, "catch");
      return Promise.reject(response.status);
    });
};

export const signIn = (username, password) => {
  return apiClient
    .post(`/login`, {
      username: username,
      password: password,
    })
    .then((response) => {
      return response;
    })
    .catch((response) => {
      return Promise.reject(response.status);
    });
};

export const updatePassword = (staff_id, password) => {
  return apiClient
    .put(`/login`, {
      staff_id: staff_id,
      password: password,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((response) => {
      return Promise.reject(response.status);
    });
};
