import axios, { AxiosResponse } from 'axios'
import type { totalCovidType,continentsType,countriesType,historicalAllType} from '@/types/dashboard/index';

interface TotalCovidData {
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
}
export async function fetchTotalCovidData() {
  try {
    const response = await axios.get<TotalCovidData>('/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  } 
   
}

export async function fetchHistoricalAll(){
  try {
    const response = await axios.get<AxiosResponse>('/historical');
    return response;
  } catch (error) {
    console.error('Error fetching HistoricalAll data:', error);
  } 
}

export async function fetchContinents(){
  try {
    const response = await axios.get('/continents')    
    return response.data
  } catch (error) {
    console.error('Error fetching COVID data:', error)
  }
}

export async function fetchCountries() {
  try {
    const response = await axios.get('/countries')    
    return response.data
  } catch (error) {
    console.error('Error fetching COVID data:', error)
  }
}
