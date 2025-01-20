import Notiflix from 'notiflix';
import './js/api/apiService';
import { fetchPictures } from './js/api/utils/fetchPictures';
import { ApiService } from './js/api/apiService';

const form = document.querySelector('.js-form');
const loadMoreBtn = document.querySelector('.js-load-more');
const gallery = document.querySelector('.js-gallery');

const apiService = new ApiService();

form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.searchQuery.value.trim();

  if (apiService.query === '') {
    Notiflix.Notify.warning('Fill in the input field!!!', {
      //   width: '30%',
      clickToClose: true,
      position: 'center-center',
      //   fontSize: '16px',
    });
    return;
  }
  form.reset();

  const pictures = await fetchPictures(apiService);

  const { hits } = pictures;
  console.log('🚀  hits:', hits);

  renderGallery(hits);
}

function renderGallery(items) {
  const galleryMarkup = items
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
  
  <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryMarkup);
}
