import type { historicalType } from '@/types/filter/index';

export function transformHistorical (data: historicalType){
  const historicalData: any[]= [];     
  console.log(data.length);
  // const forData = Object.values(data).map((item,index)=> {
  //   console.log(index,item);
    
  // })
  // const cases = getDateValues(data.cases);
  // const deaths = getDateValues(data.deaths);
  // const recovered = getDateValues(data.recovered);
  // historicalData.push(cases,deaths ,recovered )
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