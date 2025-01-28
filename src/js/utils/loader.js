const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');

function showLoader() {
  loader.classList.remove('hidden');
  gallery.style.opacity = '0.3';
}
function hideLoader() {
  loader.classList.add('hidden');
  gallery.style.opacity = '1';
}

export { showLoader, hideLoader };
