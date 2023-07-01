export type totalCovidType = {
    cases?: number;
    todayCases?: number;
    deaths?: number;
    todayDeaths?: number;
    recovered?: number;
    todayRecovered?: number;
    active?: number;
    critical?: number;
    casesPerOneMillion?: number;
    deathsPerOneMillion?: number;
    tests?: number;
    testsPerOneMillion?: number;
    population: number;
    continent: string;
    activePerOneMillion: number;
    recoveredPerOneMillion: number;
    criticalPerOneMillion: number;
    affectedCountries: number;
    
};
export type historicalAllType = {
    cases : Record<string, number>
    deaths : Record<string, number>
    recovered : Record<string, number>
    
};

export type continentsType = {
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

export type countriesType = {
   
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
export type casesThisYear = {
    [index: string]: {
        date:number;
    }
}

export type totalCases = {
    [index: string]: {
        date:number;
    }
}



// export type { covidAll,ReportCovidByContinent,casesThisYear,totalCases,byCountries }