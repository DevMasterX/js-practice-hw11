// import Notiflix from 'notiflix';

// async function fetchPictures(apiService) {
//   try {
//     const result = await apiService.fetchPictures();
//     console.log('🚀  result:', result);

//     const { hits, totalHits } = result;
//     console.log('🚀  totalHits:', totalHits);
//     console.log('🚀  hits:', hits);
//     if (!hits.length) {
//       Notiflix.Notify.failure(
//         '❌ Sorry, there are no images matching your search query. Please try again.',
//         {
//           clickToClose: true,
//           position: 'center-center',
//         }
//       );
//       return;
//     }

//     return { hits, totalHits };
//   } catch (error) {
//     Notiflix.Notify.failure(
//       '❌ Something went wrong while fetching the pictures. Please try again later.',
//       {
//         clickToClose: true,
//         position: 'center-center',
//       }
//     );
//     console.error('Error fetching pictures:', error);
//   }
// }

// export { fetchPictures };
