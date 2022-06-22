import './css/styles.css';
import { fetchCountries } from  "./fetchCountries"; 

var debounce = require('lodash.debounce');

import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;


const form = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

form.addEventListener('input', event => {
  event.preventDefault();

  fetchCountries(form.elements.name.value)
    .then(country => {
      profileContainer.insertAdjacentHTML = buildProfileMarkup(country);
    })
    .catch(() => {
      profileContainer.insertAdjacentHTML = buildErrorScreen();
    });

  form.reset();
});









export const buildErrorScreen = () => {
  return `<b class="error-screen">Такого пользователя не существует :(</b>`;
};

