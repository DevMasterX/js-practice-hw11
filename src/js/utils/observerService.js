import { renderGallery } from './renderGallery';
import { ApiService } from '../api/apiService';
import { showLoader, hideLoader } from './loader';
import { lightbox } from './lightbox';
import Notiflix from 'notiflix';

const target = document.querySelector('.observer-target');
const gallery = document.querySelector('.gallery');
const apiService = new ApiService();

const observer = new IntersectionObserver(onLoad, {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
});

async function onLoad(entries, observer) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      apiService.incrementPage();

      showLoader();

      try {
        const pictures = await apiService.fetchPictures();

        renderGallery(gallery, pictures.hits);
        lightbox.refresh();

        if (apiService.isLastPage()) {
          observer.unobserve(target);
        }
      } catch (error) {
        console.error('Error in onLoadMoreBtnClick:', error);
        Notiflix.Notify.failure(
          '❌ An error occurred. Please try again later.',
          {
            clickToClose: true,
            position: 'center-center',
          }
        );
      } finally {
        hideLoader();
      }
    }
  }
}

export { observer };
