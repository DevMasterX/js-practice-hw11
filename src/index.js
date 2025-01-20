import Notiflix from 'notiflix';
import './js/api/apiService';
import { ApiService } from './js/api/apiService';

const form = document.querySelector('.js-form');

const apiService = new ApiService();

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.searchQuery.value.trim();
  form.reset();
  if (apiService.query === '') {
    Notiflix.Notify.warning('Fill in the input field!!!', {
      //   width: '30%',
      clickToClose: true,
      position: 'center-center',
      //   fontSize: '16px',
    });
    return;
  }

  fetchPictures();
}

async function fetchPictures() {
  const result = await apiService.fetchPictures();
  const { hits, totalHits } = result;
  console.log('🚀  totalHits:', totalHits);
  console.log('🚀  hits:', hits);
  if (!hits.length) {
    Notiflix.Notify.failure(
      '❌ Sorry, there are no images matching your search query. Please try again.',
      {
        clickToClose: true,
        position: 'center-center',
      }
    );
    return;
  }
}
