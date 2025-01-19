import axios from 'axios';

const API_KEY = '39861298-38e1e10cd9c08fce6ef5c3957';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const params = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.PER_PAGE = 40;
  }

  async fetchPictures() {
    try {
    } catch (error) {}
  }
}

// ---------пример запроса
// axios({
//   method: 'get',
//   url: '/user',
//   params: {
//     ID: 12345,
//   },
// });
