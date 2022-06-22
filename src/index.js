import './css/styles.css';
import {fetchCountries} from  "./fetchCountries"; 
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');




input.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY)
);

function onInput() {
  const name = input.value.trim();
  console.log(name);
  if (name === "") {
    return (countryList.innerHTML = ''),
      (countryInfo.innerHTML = '')
  }


    fetchCountries(name)
    .then(countries => {
      countryList.innerHTML = ''
      countryInfo.innerHTML = ''
      if (countries.length === 1) {
        countryList.insertAdjacentHTML('beforeend', createMarkupList(countries))
        countryInfo.insertAdjacentHTML('beforeend', createMarkupInfo(countries))
      } else if (countries.length >= 10) {
        alertManyFound()
      } else {
       countryList.insertAdjacentHTML('beforeend', createMarkupList(countries))
      }
    })
    .catch(alertNotFound);
}



function createMarkupInfo(countries){
    const markup = countries.map(({name, capital, population, languages, flags}) => {
       return `
        <ul class="country-info__list">
       <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
       <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
       <li class="country-info__item"><p><b>Languages: </b>${Object.values(languages).join(', ')}</p></li>
   </ul>`;}).join("");
       return markup;
 };
 function createMarkupList(countries){
    const markupInfo = countries.map(({name, flags}) => {
               return `
               <li class="country-list__item">
               <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
               <h2 class="country-list__name">${name.official}</h2>
           </li>`;}).join("");
               return markupInfo;
     }
    function alertManyFound(){
         return Notify.info('Too many matches found. Please enter a more specific name.');
    }
    function alertNotFound(){
        Notify.failure('"Oops, there is no country with that name');
    }
