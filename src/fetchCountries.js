export const fetchCountries = name => {
  return fetch(`https://restcountries.com/#api-endpoints-v3-name/${name}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};


https://restcountries.com/v2/all?fields=name.official,capital,population,flags.svg,languages
