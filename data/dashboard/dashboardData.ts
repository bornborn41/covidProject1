import type { totalCovidType,historicalAllType,continentsType,countriesType } from '@/types/dashboard/index';

/*--Transform Total Covid Cases Data--*/
export function transformTotalCovidData (data: totalCovidType){
    const transformedData: totalCovidType[]= [];     
    transformedData.push(data)
    return transformedData
}

export function transformHistoricalAll (data: historicalAllType){
    const historicalData: any[]= [];     

    if (data.length === 289){
        const forData = Object.values(data).map((item,index)=> {
            // console.log(index,item.timeline.cases);
            const { country,province ,timeline } = item;
            const cases = getDateValues(timeline.cases);
            const deaths = getDateValues(timeline.deaths);
            const recovered = getDateValues(timeline.recovered);
            return {
                country: country,
                province: province,
                cases: cases,
                deaths:deaths,
                recovered:recovered
            }
           
            // console.log(country,province ,cases );
            // historicalData.push(country,province,cases,deaths ,recovered )
        });
        // console.log(forData);
        return forData
        
        
    }else{
        console.log("Overall");
        const cases = getDateValues(data.cases);
        const deaths = getDateValues(data.deaths);
        const recovered = getDateValues(data.recovered);
        historicalData.push(cases,deaths ,recovered )
    }
    return historicalData
}

function getDateValues(data: Record<string,number>){
    const getData =  Object.entries(data).map(([date,value]) => (
        {
            date: new Date(date).getTime(),
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
export function transformCountriesData(data: countriesType): countriesType[]{
    const transformedData: countriesType[]= [];  
    // console.log(data);

    transformedData.push(data)
    // console.log(transformedData);
    return transformedData
}