import type { totalCovidType,historicalAllType,continentsType,countriesType } from '@/types/dashboard/index';

interface Countries {
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

/*--Transform Total Covid Cases Data--*/
export function transformTotalCovidData (data: totalCovidType){
    const transformedData: totalCovidType[]= [];     
    transformedData.push(data)
    return transformedData
}

export function transformHistoricalAll (data: historicalAllType){
    const seriesData: any[]= []; 
    const cases = getDateValues(data.cases);
    const deaths = getDateValues(data.deaths);
    const recovered = getDateValues(data.recovered);
    seriesData.push(cases,deaths ,recovered )
    return seriesData
}

function getDateValues(data: Record<string,number>){
    const getData =  Object.entries(data).map(([date,value]) => (
        {
            timeline: new Date(date).getTime(),
            data: value,
        }
    ));
    return getData
}

export function transformContinentsData(data: continentsType[]): continentsType[]{
    const transformedData: continentsType[]= [];     
    transformedData.push(data)
    return transformedData
}
export function transformCountriesData(data: countriesType): Countries[]{
    const transformedData: Countries[]= [];  

    // for (const item of data ){

    // }
    // data.forEach((item) => {
        
    //     const country =item.country 
    //     const countryInfo=item.countryInfo
    //     const cases=item.cases
    //     const todayCases=item.todayCases
    //     const deaths=item.deaths
    //     const todayDeaths=item.todayDeaths
    //     const recovered =item.recovered 
    //     const todayRecovered=item.todayRecovered
    //     const activecritical=item.activecritical
    //     const population=item.population
    //     const continent=item.continent
    //     transformedData.push(country,countryInfo,cases,todayCases,deaths,todayDeaths,recovered)
    // })
    
    transformedData.push(data)
    return transformedData
}
