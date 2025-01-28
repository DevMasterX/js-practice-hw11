import Notiflix from 'notiflix';
import { showLoader, hideLoader } from './loader';
import { ApiService } from '../api/apiService';
import { lightbox } from './lightbox';
import { renderGallery } from './renderGallery';
import { observer } from './observerService';
import { startTypingEffect, stopTypingEffect } from './typeEffect';

function initFormHandlers() {
  const target = document.querySelector('.observer-target');
  const gallery = document.querySelector('.gallery');
  const form = document.querySelector('.js-form');
  const formSearchButton = document.querySelector('.js-form-button');
  const apiService = new ApiService();

  form.addEventListener('submit', onFormSubmit);
  form.elements.searchQuery.addEventListener('input', onInputChange);

  async function onFormSubmit(event) {
    event.preventDefault();
    observer.unobserve(target);

    gallery.innerHTML = '';
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
    stopTypingEffect();
    form.reset();
    apiService.resetPage();

    try {
      const pictures = await apiService.fetchPictures();

      renderGallery(gallery, pictures.hits);
      lightbox.refresh();
      disableSearchButton();

      if (apiService.isLastPage()) {
        observer.unobserve(target);
      } else {
        observer.observe(target);
      }
    } catch (error) {
      console.error('Something went wrong in onFormSubmit:', error);

      startTypingEffect();
    } finally {
      hideLoader();
    }
  }

  function onInputChange(event) {
    if (event.target.value) {
      enableSearchButton();
    } else {
      disableSearchButton();
    }
  }

  function disableSearchButton() {
    formSearchButton.classList.add('disabled');
  }

  function enableSearchButton() {
    formSearchButton.classList.remove('disabled');
  }
}

export { initFormHandlers };
