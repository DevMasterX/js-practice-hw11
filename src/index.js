import { lightbox } from './js/api/utils/lightbox';
import Notiflix from 'notiflix';
import './js/api/apiService';
// import { fetchPictures } from './js/api/utils/fetchPictures';
import { ApiService } from './js/api/apiService';
import { renderGallery } from './js/api/utils/renderGallery';

const form = document.querySelector('.js-form');
// const loadMoreBtn = document.querySelector('.js-load-more');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const formSearchButton = document.querySelector('.js-form-button');
const target = document.querySelector('.observer-target');
const apiService = new ApiService();

form.addEventListener('submit', onFormSubmit);
form.elements.searchQuery.addEventListener('input', onInputChange);

// loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
async function onFormSubmit(event) {
  event.preventDefault();
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

// async function onLoadMoreBtnClick() {
//   apiService.incrementPage();
//   showLoader();

//   try {
//     const pictures = await apiService.fetchPictures();

//     renderGallery(gallery, pictures.hits);
//     lightbox.refresh();

//     if (apiService.isLastPage()) {
//       hideLoadMoreBtn();
//     }
//   } catch (error) {
//     console.error('Error in onLoadMoreBtnClick:', error);
//     Notiflix.Notify.failure('❌ An error occurred. Please try again later.', {
//       clickToClose: true,
//       position: 'center-center',
//     });
//   } finally {
//     hideLoader();
//   }
// }

function showLoader() {
  loader.classList.remove('hidden');
  gallery.style.opacity = '0.3';
}
function hideLoader() {
  loader.classList.add('hidden');
  gallery.style.opacity = '1';
}

// function showLoadMoreBtn() {
//   loadMoreBtn.classList.remove('hidden');
// }
// function hideLoadMoreBtn() {
//   loadMoreBtn.classList.add('hidden');
// }

function disableSearchButton() {
  formSearchButton.classList.add('disabled');
}

function enableSearchButton() {
  formSearchButton.classList.remove('disabled');
}

function onInputChange(event) {
  if (event.target.value) {
    enableSearchButton();
  } else {
    disableSearchButton();
  }
}

// const lightbox = new SimpleLightbox('.gallery a');

// ----------------------Intersection Observer

const options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(onLoad, options);

async function onLoad(entries, observer) {
  for (const entry of entries) {
    // entries.forEach(entry => {
    if (entry.isIntersecting) {
      apiService.incrementPage();
      // console.log(apiService.showCurrentPage());

      showLoader();

      try {
        const pictures = await apiService.fetchPictures();

        renderGallery(gallery, pictures.hits);
        lightbox.refresh();

        if (apiService.isLastPage()) {
          // hideLoadMoreBtn();
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
