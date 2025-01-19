import axios from 'axios';

const API_KEY = '39861298-38e1e10cd9c08fce6ef5c3957';
axios.defaults.baseURL = 'https://pixabay.com/api/';
let page = 1;
const params = new URLSearchParams({
  key: API_KEY,
  image_type: photo,
  orientation: horizontal,
  safesearch: true,
});
