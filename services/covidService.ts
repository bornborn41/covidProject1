// services/covidService.ts
import axios from 'axios'

export interface CovidData {
    
      date: Record<string, number>
      cases: Record<string, number>
      deaths: Record<string, number>
      recovered: Record<string, number>
    }

  
export async function fetchCovidData(): Promise<CovidData> {
    try {
      const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
      return response.data
    } catch (error) {
      console.error('Error fetching COVID data:', error)
      return { date:{},  cases: {}, deaths: {}, recovered: {}  }
    }
}


export interface HistoricalData {
  country: string;
  timeline: {
    cases: Record<string, number>;
    deaths: Record<string, number>;
    recovered: Record<string, number>;
  };
}
export async function fetchHistoricalData(): Promise<HistoricalData> {
  try {
    const response = await axios.get('https://disease.sh/v3/covid-19/historical?lastdays=all');
    return response.data;
  } catch (error) {
    console.error(error);
    
    throw new Error('Failed to fetch filter chart data');
    
  }
}

