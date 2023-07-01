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
export async function fetchTotalCovidData(): Promise<totalCovidData> {
    try {
      const response = await axios.get('https://disease.sh/v3/covid-19/all')
      // console.log(typeof(response.data));
      return response.data
    } catch (error) {
      console.error('Error fetching COVID data:', error)
      
    }
}

export async function fetchHistoricalAll(): Promise<AxiosResponse> {
    try {
      const response = await axios.get('https://disease.sh/v3/covid-19/historical')
      // console.log(response.config.url+'?lastdays=all');
      
      return response
    } catch (error) {
      console.error('Error fetching COVID data:', error)
      return { cases: {}, deaths: {}, recovered: {}  }
    }
}


export async function fetchContinents(): Promise<continentsType> {
  try {
    const response = await axios.get('https://disease.sh/v3/covid-19/continents')    
    return response.data
  } catch (error) {
    console.error('Error fetching COVID data:', error)
  }
}

export async function fetchCountries(): Promise<countriesType> {
  try {
    const response = await axios.get('https://disease.sh/v3/covid-19/countries')    
    return response.data
  } catch (error) {
    console.error('Error fetching COVID data:', error)
  }
}
