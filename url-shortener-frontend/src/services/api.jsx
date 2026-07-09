import axios from "axios";

const api = axios.create({
    baseURL: "https://url-shortener-api-jhd4.onrender.com",
});

export default api;