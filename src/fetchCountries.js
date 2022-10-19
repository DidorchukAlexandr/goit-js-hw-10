const BASE_URL = 'https://restcountries.com/v3.1/name/';

export const fetchCountries = data => {
    return fetch(
        `${BASE_URL}${data}?fields=name,capital,population,flags,languages`
    ).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
}