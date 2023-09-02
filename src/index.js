import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const selectors = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

let breeds = [];

function selectMarkUp(arr) {
  selectors.select.innerHTML = arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');

  new SlimSelect({
    select: '.breed-select',
    events: {
      afterChange: handleSelect,
    },
  });
  selectors.select.classList.remove('hidden');
}

fetchBreeds()
  .then(({ data }) => {
    breeds = data;
    selectMarkUp(breeds);
  })
  .catch(err => {
    selectors.error.classList.remove('hidden');
    Notify.failure(err.message);
  })
  .finally(() => selectors.loader.classList.add('hidden'));
function handleSelect(e) {
  selectors.catInfo.classList.add('hidden');
  selectors.loader.classList.remove('hidden');
  const id = e[0].value;
  const breedInfo = breeds.find(breed => breed.id === id);
  fetchCatByBreed(id)
    .then(({ data }) => {
      tamplateMakrUp(data[0].url, breedInfo);
      selectors.catInfo.classList.remove('hidden');
    })
    .catch(err => {
      selectors.error.classList.remove('hidden');
      Notify.failure(err.message);
    })
    .finally(() => selectors.loader.classList.add('hidden'));
}

function tamplateMakrUp(imgUrl, breedInfo) {
  selectors.catInfo.innerHTML = `<img src="${imgUrl}" alt="${breedInfo.name}" width="300" >
<div class="desc">
  <h2>${breedInfo.name}</h2>
  <p>${breedInfo.description}</p>
  <p><b>Temperament: </b>${breedInfo.temperament}</p>
</div>`;
}
