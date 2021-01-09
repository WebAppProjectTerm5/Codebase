import {drawChartCasesIndia} from './drawChartNation.js';
import {drawChartCasesCumulativeIndia} from './drawChartNation.js';
import {drawChartTestingIndia} from './drawChartNation.js';
import {drawChartCasesState} from './drawChartState.js';
import {drawChartTestingState} from './drawChartState.js';
import {drawChartTestingRateState} from './drawChartState.js';
import {generateTableHead} from './table.js';
import {generateTable} from './table.js';
import {chart4} from './drawChartState.js';
import {chart5} from './drawChartState.js';
import {chart6} from './drawChartState.js';
import {drawCards} from './card.js';

const confirmedCasesDaily = [];
const recoveredCasesDaily = [];
const activeCasesDaily = [];
const deceasedCasesDaily = [];
const confirmedCasesCumulative = [];
const recoveredCasesCumulative = [];
const activeCasesCumulative = [];
const deceasedCasesCumulative = [];
const dateCases = [];
const dateTest = [];
const tested = [];
const testedpositive = [];
let stateCaseDataDaily;
let stateTestingDataDaily;

var state = "Gujarat";

let stateCaseDataSet;
let stateTestDataSet;
let tableCaseDataSet;

let totalActive = 0;
let totalConfirmed = 0;
let totalRecovered = 0;
let totalDeceased = 0;


$.get("https://api.covid19india.org/v2/state_district_wise.json", function(data) {
        tableCaseDataSet = data;
        setIndiaTableData(data);
        setStateTableData(data,state);
}, "json");

$.get("https://api.covid19india.org/states_daily.json", function(data) {
        stateCaseDataSet = data;
        setStateCasesData(stateCaseDataSet,state);
        //  console.log(data.states_daily);
}, "json");

$.get("https://api.covid19india.org/state_test_data.json", function(data) {
        stateTestDataSet = data;
        setStateTestData(stateTestDataSet,state);
        //  console.log(data.states_tested_data);
}, "json");

$.get("https://api.covid19india.org/data.json", function(data) {
        setCasesDataArray(data);
        setTestDataArray(data);
        // console.log(data);
}, "json");

function setIndiaTableData(data){
    let tableData = [];
    for(let i=0;i<data.length;i++){
        let state = data[i].state;
        let confirmedDataTemp = 0;
        let recoveredDataTemp = 0;
        let activeDataTemp = 0;
        let deceasedDataTemp = 0;
            for(let j=0;j<data[i].districtData.length;j++){
                confirmedDataTemp = confirmedDataTemp + data[i].districtData[j].confirmed;
                recoveredDataTemp = recoveredDataTemp + data[i].districtData[j].recovered;
                activeDataTemp = activeDataTemp + data[i].districtData[j].active;
                deceasedDataTemp = deceasedDataTemp + data[i].districtData[j].deceased;
            }
            let tableObject = {"State": state, "Confirmed": confirmedDataTemp, "Recovered": recoveredDataTemp, "Deceased": deceasedDataTemp};
            totalConfirmed = totalConfirmed + confirmedDataTemp;
            totalRecovered = totalRecovered + recoveredDataTemp;
            totalDeceased = totalDeceased + deceasedDataTemp;
            totalActive = totalActive + activeDataTemp;
            tableData.push(tableObject);
    }
    //console.log(totalActive);
    let stateTable = document.getElementById("stateTable");
    let tableDataHead = Object.keys(tableData[0]);
    generateTableHead(stateTable,tableDataHead);
    generateTable(stateTable, tableData);
    drawCards(totalConfirmed, totalRecovered, totalActive, totalDeceased);
}

function setStateTableData(data,state){
    let tableData = [];
    for(let i=0;i<data.length;i++){
        let stateTemp = data[i].state;
        if(stateTemp == state){
            for(let j=0;j<data[i].districtData.length;j++){
                let tableObject = {"District": data[i].districtData[j].district, "Confirmed": data[i].districtData[j].confirmed, "Recovered": data[i].districtData[j].recovered, "Deceased": data[i].districtData[j].deceased};
                tableData.push(tableObject);
            }
            break;
        }
    }
    // console.log(tableData);
    let districtTable = document.getElementById("districtTable");
    districtTable.innerHTML = "";
    let tableDataHead = Object.keys(tableData[0]);
    generateTableHead(districtTable,tableDataHead);
    generateTable(districtTable, tableData);
}

function setCasesDataArray(data){
    for(let i=0;i<data.cases_time_series.length;i++){
        let object = data.cases_time_series[i];
        dateCases.push(object.date);
        confirmedCasesDaily.push(object.dailyconfirmed);
        recoveredCasesDaily.push(object.dailyrecovered);
        deceasedCasesDaily.push(object.dailydeceased);
        confirmedCasesCumulative.push(object.totalconfirmed);
        recoveredCasesCumulative.push(object.totalrecovered);
        deceasedCasesCumulative.push(object.totaldeceased);
    }
    // console.log("confirmedCasesDailyNational: ",confirmedCasesDaily);
    // console.log("recoveredCasesDailyNational: ",recoveredCasesDaily);
    // console.log("deceasedCasesDailyNational: ",deceasedCasesDaily);
    // console.log("confirmedCasesCumulativeNational: ",confirmedCasesCumulative);
    // console.log("recoveredCasesCumulativeNational: ",recoveredCasesCumulative);
    // console.log("deceasedCasesCumulativeNational: ",deceasedCasesCumulative);
    // console.log("dateCasesNational: ",dateCases);
    drawChartCasesIndia(dateCases,confirmedCasesDaily,recoveredCasesDaily,deceasedCasesDaily);
    drawChartCasesCumulativeIndia(dateCases,confirmedCasesCumulative,recoveredCasesCumulative,deceasedCasesCumulative);
}

function setTestDataArray(data){
    // console.log(data);
    for(let i=0;i<data.tested.length;i++){
        let objectTest = data.tested[i];
        if(objectTest.updatetimestamp != ""){
            dateTest.push(objectTest.updatetimestamp);
            tested.push(objectTest.totalsamplestested);
            testedpositive.push(objectTest.totalpositivecases);
        }
    }
    // console.log("dateTestNational: ",dateTest);
    // console.log("testedNational: ",tested);
    // console.log("testedPositiveNational: ",testedpositive);
    drawChartTestingIndia(dateTest,tested);
}

function setStateTestData(data,state){
    const totalTest = [];
    const totalNegativeTest = [];
    const totalPositiveTest = [];
    const testPositivityRate = [];
    const testDate = [];

    //console.log(data);
    for(let i=0;i<data.states_tested_data.length;i++){
        if(data.states_tested_data[i].state == state){
            if(data.states_tested_data[i].totaltested != ''){
                totalTest.push(data.states_tested_data[i].totaltested);
                totalNegativeTest.push(data.states_tested_data[i].negative);
                totalPositiveTest.push(data.states_tested_data[i].positive);
                //let str = data.states_tested_data[i].testpositivityrate;
                //let newStr = str.substring(0, str.length-1);
                //testPositivityRate.push(str);
                testDate.push(data.states_tested_data[i].updatedon);
            }
        }
    }
    drawChartTestingState(testDate,totalTest,totalPositiveTest,totalNegativeTest);
    //drawChartTestingRateState(testDate,testPositivityRate);
    // console.log("Total Test: ",totalTest);
    // console.log("Total Negative Test: ",totalNegativeTest);
    // console.log("Total Positive Test: ",totalPositiveTest);
    // console.log("Test Positivity Rate: ",testPositivityRate);
    // console.log("State Date: ",testDate);
}

function setStateCasesData(data,state){

    const confirmedCasesCumulativeState = [];
    const recoveredCasesCumulativeState = [];
    const deceasedCasesCumulativeState = [];
    const stateDate = [];

    let stateCode = getStateCode(state);
    // console.log(stateCode);
    for(let i=0;i<data.states_daily.length;i++){
        if(data.states_daily[i].status == "Confirmed"){
            let Object = data.states_daily[i];
            stateDate.push(data.states_daily[i].date);
            for(var key in Object){
                if(key == stateCode){
                    confirmedCasesCumulativeState.push(Object[key]);
                }
            }
        }
        if(data.states_daily[i].status == "Recovered"){
            let Object = data.states_daily[i];
            for(var key in Object){
                if(key == stateCode){
                    recoveredCasesCumulativeState.push(Object[key]);
                }
            }
        }
        if(data.states_daily[i].status == "Deceased"){
            let Object = data.states_daily[i];
            for(var key in Object){
                if(key == stateCode){
                    deceasedCasesCumulativeState.push(Object[key]);
                }
            }
        }
    }
    drawChartCasesState(stateDate,confirmedCasesCumulativeState,recoveredCasesCumulativeState,deceasedCasesCumulativeState);
    // console.log("Confirmed Cases Cumulative State: ",confirmedCasesCumulativeState);
    // console.log("Recovered Cases Cumulative State: ",recoveredCasesCumulativeState);
    // console.log("Deceased Cases Cumulative State: ",deceasedCasesCumulativeState);
    // console.log("State Date: ",stateDate);
}

function getStateCode(state){
    let stateCode = "";
    switch(state){
        case "Andaman and Nicobar Islands":
            stateCode = "an";
            break;
        case "Andhra Pradesh":
            stateCode = "ap";
            break;
        case "Arunachal Pradesh":
            stateCode = "ar";
            break;
        case "Assam":
            stateCode = "as";
            break;
        case "Bihar":
            stateCode = "br";
            break;
        case "Chandigarh":
            stateCode = "ch";
            break;
        case "Chhattisgarh":
            stateCode = "ct";
            break;
        case "Delhi":
            stateCode = "dl";
            break;
        case "Goa":
            stateCode = "ga";
            break;
        case "Gujarat":
            stateCode = "gj";
            break;
        case "Himachal Pradesh":
            stateCode = "hp";
            break;
        case "Haryana":
            stateCode = "hr";
            break;
        case "Jharkhand":
            stateCode = "jh";
            break;
        case "Jammu and Kashmir":
            stateCode = "jk";
            break;
        case "Karnataka":
            stateCode = "ka";
            break;
        case "Kerala":
            stateCode = "kl";
            break;
        case "Ladakh":
            stateCode = "la";
            break;
        case "Lakshadweep":
            stateCode = "ld";
            break;
        case "Maharashtra":
            stateCode = "mh";
            break;
        case "Meghalaya":
            stateCode = "ml";
            break;
        case "Manipur":
            stateCode = "mn";
            break;
        case "Madhya Pradesh":
            stateCode = "mp";
            break;
        case "Mizoram":
            stateCode = "mz";
            break;
        case "Nagaland":
            stateCode = "nl";
            break;
        case "Odisha":
            stateCode = "od";
            break;
        case "Punjab":
            stateCode = "pb";
            break;
        case "Puducherry":
            stateCode = "py";
            break;
        case "Rajasthan":
            stateCode = "rj";
            break;
        case "Sikkim":
            stateCode = "sk";
            break;
        case "Telangana":
            stateCode = "tg";
            break;
        case "Tamil Nadu":
            stateCode = "tn";
            break;
        case "Tripura":
            stateCode = "tr";
            break;
        case "Uttar Pradesh":
            stateCode = "up";
            break;
        case "Uttarakhand":
            stateCode = "ut";
            break;
        case "West Bengal":
            stateCode = "wb";
            break;     
    }
    return stateCode;
}

$(".chosen").chosen();

$(document).ready(function(){
    $("select.chosen").change(function(){
        var selectedState = $(this).children("option:selected").val();
        chart4.destroy();
        chart5.destroy();
        //chart6.destroy();
        setStateCasesData(stateCaseDataSet,selectedState);
        setStateTestData(stateTestDataSet,selectedState);
        setStateTableData(tableCaseDataSet,selectedState);
    });
});