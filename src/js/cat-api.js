import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_CpNOtRTKbqvBjol4o1T6Dw2j8BcBVxaLZeY0NGbOyW67bASo0QXNUWb9u1Mx7XhZ';

const PATH = 'https://api.thecatapi.com/';

function fetchBreeds() {
  const ENDPOINT = 'v1/breeds';
  return axios.get(PATH + ENDPOINT);
}

function fetchCatByBreed(id) {
  const ENDPOINT = 'v1/images/search';
  return axios.get(`${PATH}${ENDPOINT}?breed_ids=${id}`);
}

export { fetchBreeds, fetchCatByBreed };
