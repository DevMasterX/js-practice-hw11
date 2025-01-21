import Notiflix from 'notiflix';
import './js/api/apiService';
import { fetchPictures } from './js/api/utils/fetchPictures';
import { ApiService } from './js/api/apiService';
import { renderGallery } from './js/api/utils/renderGallery';

const form = document.querySelector('.js-form');
const loadMoreBtn = document.querySelector('.js-load-more');
const gallery = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');

const apiService = new ApiService();

form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();
  console.log('show loader');
  showLoader();

  apiService.query = event.currentTarget.elements.searchQuery.value.trim();

  if (apiService.query === '') {
    Notiflix.Notify.warning('Fill in the input field!!!', {
      //   width: '30%',
      clickToClose: true,
      position: 'center-center',
      //   fontSize: '16px',
    });
    hideLoader();

    return;
  }
  form.reset();

  try {
    const pictures = await fetchPictures(apiService);
    const { hits } = pictures;

    renderGallery(gallery, hits);
  } catch (error) {
    console.error('Something went wrong in onFormSubmit:', error);
    Notiflix.Notify.failure(
      '❌ Something went wrong in onFormSubmit. Please try again.',
      {
        clickToClose: true,
        position: 'center-center',
      }
    );
  } finally {
    hideLoader();
  }
}

function showLoader() {
  loader.classList.remove('hidden');
}
function hideLoader() {
  loader.classList.add('hidden');
}
