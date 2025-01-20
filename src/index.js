import Notiflix from 'notiflix';
import './js/api/apiService';
import { ApiService } from './js/api/apiService';

const form = document.querySelector('.js-form');

const apiService = new ApiService();

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.searchQuery.value.trim();

  if (apiService.query === '') {
    Notiflix.Notify.warning('Fill in the input field!!!', {
      //   width: '30%',
      clickToClose: true,
      position: 'center',
      //   fontSize: '16px',
    });
  }

  //   apiService.fetchPictures().then(data => console.log(data));
}

// Notiflix.Notify.failure(
//   'Sorry, there are no images matching your search query. Please try again.'
// );
