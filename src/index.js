import './css/styles.css';
import { fetchCountries } from  "./fetchCountries"; 

var debounce = require('lodash.debounce');

import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;


const form = document.querySelector('.search-box');
const profileContainer = document.querySelector('.profile-container');

form.addEventListener('submit', event => {
  event.preventDefault();

  fetchUser(form.elements.username.value)
    .then(user => {
      profileContainer.innerHTML = buildProfileMarkup(user);
    })
    .catch(() => {
      profileContainer.innerHTML = buildErrorScreen();
    });

  form.reset();
});









export const buildErrorScreen = () => {
  return `<b class="error-screen">Такого пользователя не существует :(</b>`;
};

