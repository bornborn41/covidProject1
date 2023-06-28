import { date } from "yup";
import { useFetch  } from "nuxt/dist/app/composables";

type covidAll = {
    cases : number;
    deaths : number;
    recovered : number;
    
};
type ReportCovidByContinent = {
    [index: string]: {
        cases: number;
        todayCases: number;
        deaths: number;
        todayDeaths: number;
        recovered: number;
        todayRecovered: number;
        active: number;
        critical: number;
        casesPerOneMillion: number;
        deathsPerOneMillion: number;
        tests: number;
        testsPerOneMillion: number;
        population: number;
        continent: string;
        activePerOneMillion: number;
        recoveredPerOneMillion: number;
        criticalPerOneMillion: number;
    }

};
type casesThisYear = {
    [index: string]: {
        date:number;
    }
}

type totalCases = {
    [index: string]: {
        date:number;
    }
}

type byCountries = {
    [index: string]: {
        updated: number,
        country: string,
        countryInfo: {
            _id: number,
            iso2: string,
            iso3: string,
            lat: number,
            long: number,
            flag: string
        },
        cases: number,
        todayCases: number,
        deaths: number,
        todayDeaths: number,
        recovered: number,
        todayRecovered: number,
        active: number,
        critical: number,
        casesPerOneMillion: number,
        deathsPerOneMillion: number,
        tests: number,
        testsPerOneMillion: number,
        population: number,
        continent: number,
        oneCasePerPeople: number,
        oneDeathPerPeople: number,
        oneTestPerPeople: number,
        activePerOneMillion: number,
        recoveredPerOneMillion: number,
        criticalPerOneMillion: number
  }
}


export type { covidAll,ReportCovidByContinent,casesThisYear,totalCases,byCountries }