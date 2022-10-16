import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(elm) {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
    const searchQuery = elm.target.value.trim();
    if (searchQuery !== "") {
        fetchCountries(searchQuery).then(renderCountry).catch(onFetchError);
    }
}

function renderCountry(countries) {
    if (countries.lenght > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    }

    if (2 < countries.lenght && countries.lenght < 10) {
        renderCountryList(countries);
        return;
    }

    renderCountryInfo(countries);
}

function renderCountryList(countries) {
    const markup = countries.map(country => {
        return `<li>
        <img src="${country.flags.svg}" width="35" height="35">
      <span>
        <b>${country.name.official}</b>
      </span>
      </li>`;
    }).join('');

    countryList.innerHTML = markup;
}

function renderCountryInfo(countries) {
    const markup = countries.map(country => {
        return `<div class="country-flag-name">
        <img src="${country.flags.svg}" alt="flag" width="35" height="35">
        <span><b style="font-size: 20px">${country.name.official}</b></span>
      </div>
      <p><b>Capital</b>: ${country.capital}</p>
      <p><b>Population</b>: ${country.population}</p>
      <p><b>Languages</b>: ${Object.values(country.languages).join(', ')}</p>`;
    });

    countryInfo.innerHTML = markup;
}

function onFetchError(error) {
    Notify.failure('Oops, there is no country with that name');
}