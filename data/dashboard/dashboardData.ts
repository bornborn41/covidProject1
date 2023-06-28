import type { covidAll,ReportCovidByContinent,casesThisYear,totalCases,byCountries} from '@/types/dashboard/index';
import { BubbleMenu } from '@tiptap/vue-3';
import { defineSSRCustomElement } from 'vue';
import { ref,  watch} from 'vue';
// import { findDuplicates } from '@tiptap/vue-3';
// import { array, number, object } from 'yup';


/*--CovidAll--*/
const {data:all} = await useFetch<covidAll>("https://disease.sh/v3/covid-19/all",{
    pick: ['cases','deaths','recovered']
})
const datacovidAll = [all.value]

/*--Report Covid By Continent--*/
const {data:continent}  = await useFetch<ReportCovidByContinent>("https://disease.sh/v3/covid-19/continents")
const dataContinent = [continent.value]


/*--Cases This Year--*/
const {data:thisYear} = await useFetch<casesThisYear>("https://disease.sh/v3/covid-19/historical/all")
const dataThisYear =[thisYear.value?.cases]
let DT =Object.values(dataThisYear);
let dataTY = JSON.parse(JSON.stringify(DT))
let dataKaysTHY = Object.keys(dataTY[0]);
const arrDTv = Object.values(dataTY[0]);
const arrDTk : string[] = [];
for (const itemDTk in dataKaysTHY){
    let data:Date = new Date(dataKaysTHY[itemDTk]); 
    let dateTime:string = data.toUTCString();
    arrDTk.push(dateTime)    
}

/*--Total Cases Covid--*/
const {data:ttCases} = await useFetch<totalCases>("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
const ttcovidCases = [ttCases.value?.cases]
const ttdeathsCases = [ttCases.value?.deaths]
const ttrecoveredCases = [ttCases.value?.recovered]

let ttcc = Object.values(ttcovidCases);
let ttdc = Object.values(ttdeathsCases);
let ttrc = Object.values(ttrecoveredCases);

let datattc = JSON.parse(JSON.stringify(ttcc));
let datattd = JSON.parse(JSON.stringify(ttdc));
let datattr = JSON.parse(JSON.stringify(ttrc));

let dataKaysTTC = Object.keys(datattc[0]);
let dataKaysTTD = Object.keys(datattd[0]);
let dataKaysTTR = Object.keys(datattr[0]);

let dataValuesTTC = Object.values(datattc[0]);
let dataValuesTTD = Object.values(datattd[0]);
let dataValuesTTR = Object.values(datattr[0]);
 
const arrTTC : string[] =[]
arrTTC.push(dataValuesTTC,dataValuesTTD,dataValuesTTR,dataKaysTTC )



/*--byCountries Covid--*/
const {data:countries}  = await useFetch<byCountries>("https://disease.sh/v3/covid-19/countries")
const dataCountries =[countries.value]
const dataCountriesT =[countries.value?.updated]

let datacD = Object.values(dataCountries);
const datacd = JSON.parse(JSON.stringify(datacD));

const datavd:any = Object.values(datacd[0]);
for (const itemDATE in datavd){
    let data:Date = new Date(datavd[itemDATE].updated); 
    let dateTime:string = data.toDateString();
}

export { datacovidAll,dataContinent,arrDTv,arrDTk,arrTTC,dataCountries}