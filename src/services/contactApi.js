import axios from "axios";

export const instanse = axios.create({
  baseURL: "https://connections-api.herokuapp.com",
});

export const setToken = (token) => {
  instanse.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  instanse.defaults.headers.common.Authorization = "";
};

export const requestRegister = async (formData) => {
  const { data } = await instanse.post("/users/signup", formData);
  setToken(data.token);

  return data;
};

export const requestLogin = async (formData) => {
  const { data } = await instanse.post("/users/login", formData);
  setToken(data.token);

  return data;
};

export const requestGetCurrentUser = async () => {
  const { data } = await instanse.get("/users/current");

  return data;
};

export const requestLogOut = async () => {
  const { data } = await instanse.post("/users/logout");
  clearToken();

  return data;
};

export const requestGetContacts = async () => {
  const { data } = await instanse.get("/contacts");

  return data;
};

export const requestAddContact = async (contact) => {
  const { data } = await instanse.post("/contacts", contact);

  return data;
};

export const requestDeleteContact = async (contactId) => {
  const { data } = await instanse.delete(`/contacts/${contactId}`);

  return data;
};

export const requestEditContact = async (editContact) => {
  const { data } = await instanse.patch(`/contacts/${editContact.id}`, {
    name: editContact.name,
    number: editContact.number,
  });
  return data;
};
