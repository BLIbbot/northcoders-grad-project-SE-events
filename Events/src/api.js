import axios from "axios";

const handleError = (error) => {
  if (error.response) {
    // Server responded with a status outside 2xx
    const { status, data } = error.response;
    return Promise.reject({
      status,
      message: data.message || "Something went wrong",
      error: data.error || null,
    });
  } else if (error.request) {
    // Request was made but no response received
    console.error("No response received:", error.request);
    return Promise.reject({
      message: "No response from server",
    });
  } else {
    // Something happened setting up the request
    console.error("Error setting up request:", error.message);
    return Promise.reject({
      message: error.message,
    });
  }
};

const apiClient = axios.create({
  baseURL: "https://apex.oracle.com/pls/apex/3dwebspace/data",
});

export const getEvents = () => {
  return apiClient
    .get(`/events`)
    .then((response) => {
      return response.data.items;
    })
    .catch(handleError);
};

export const deleteEvent = (event_id) => {
  return apiClient
    .delete(`/event/${event_id}`)
    .then((response) => {
      return response.data.items;
    })
    .catch(handleError);
};

export const getStaffEvents = (staff_id) => {
  return apiClient
    .get(`/events/${staff_id}`)
    .then((response) => {
      return response.data.items;
    })
    .catch(handleError);
};

export const signUp = (details) => {
  return apiClient
    .post(`/signup`, details)
    .then((response) => {
      return response;
    })
    .catch(handleError);
};

export const addEvent = (details) => {
  return apiClient
    .post(`/events`, details)
    .then((response) => {
      return response;
    })
    .catch(handleError);
};

export const updateEvent = (details, event_id) => {
  console.log(details);
  console.log(event_id);
  return apiClient
    .put(`/event/${event_id}`, details)
    .then((response) => {
      return response;
    })
    .catch(handleError);
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
    .catch(handleError);
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
    .catch(handleError);
};
