import axios from "axios";

const api = axios.create({
  baseURL: "http://172.30.172.10:3333"
});

export default api;
