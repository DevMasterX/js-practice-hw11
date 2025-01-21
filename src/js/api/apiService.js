import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '39861298-38e1e10cd9c08fce6ef5c3957';

class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.PER_PAGE = 40;
  }

  async fetchPictures() {
    const params = {
      key: API_KEY,
      q: `${this.searchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: `${this.page}`,
      per_page: `${this.PER_PAGE}`,
    };

    try {
      const response = await axios.get('', { params });
      return response.data;
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure(
        '❌ Something went wrong while fetching the pictures!!! Please try again later.',
        {
          clickToClose: true,
          position: 'center-center',
        }
      );
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export { ApiService };
