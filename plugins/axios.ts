
import axios from 'axios';
export default defineNuxtPlugin((nuxtApp) => {
  axios.defaults.baseURL = 'https://disease.sh/v3/covid-19';
  
});






