import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonRow, IonCol, IonImg, IonLoading, IonCard, IonSelect, IonSelectOption } from '@ionic/react';
import moment from 'moment';
import axios from 'axios';
import { Doughnut, Bar } from 'react-chartjs-2';
import {COVID_API_KEY, COVID_MONTHLY_API_KEY} from '../ApiKeys'
import {countryMap} from '../CountryCodesMap';
import './CountryTab.css';
import { CalculateActiveCases } from './WorldTab';
import 'chartjs-plugin-datalabels';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

interface ICountryCount {
    country: string,
    cases:  ICaseCount;
    deaths: IDeathsCount;
  // count: number;
  // result: {
  //   todaysDate: {
  //     [caseName: string]: ICases
  //   };
  // };
}

interface IDeathsCount {
  total: number;
}
interface ICaseCount {
  active: number;
  recovered: number;
  total: number;
}

interface ICases {
  confirmed: number;
  deaths: number;
  recovered: number;
}

interface ICountryTimeSeries {
  count: number;
  results: ISeriesCases[];
}

interface ISeriesCases {
  date: string;
  // confirmed: number;
  // deaths: number;
  // recovered: number;
  new_cases: number;
  new_deaths: number;
  new_tests: number;
}

function getCountryNameFromCode(code: string): string | any {
  return countryMap.get(code);
}

const CountryTab: React.FC = () => {
  const [yourCountry, setYourCountry] = useState<string>('IND'); // by default India
  Storage.set({ key: 'yourCountry', value: yourCountry });
  const [countryData, setcountryData] = useState<ICountryCount>();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const getCountryData = async () => {
      let result: any = '';
      // fetch country code from localStorage
      const { value } = await Storage.get({ key: 'yourCountry' });
      if (value) {
        const countryName = getCountryNameFromCode(value);
        console.log("country name and code", countryName, value);
        // result = await axios('https://covidapi.info/api/v1/country/' + value + '/latest');
        result = await axios('https://covid-193.p.rapidapi.com/statistics?country='+ countryName, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': COVID_API_KEY,
        }
      });
      } else {
        const yourCountryName = getCountryNameFromCode(yourCountry);
        console.log("country name and code", yourCountryName, yourCountry);
        // result = await axios('https://covidapi.info/api/v1/country/' + yourCountry + '/latest');
        result = await axios('https://covid-193.p.rapidapi.com/statistics?country='+ yourCountryName, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': COVID_API_KEY,
          }
        });
      }
      console.log(result.data.response[0]);
      setcountryData(result.data.response[0]);
      setShowLoading(false);
    };

    getCountryData();
  }, [yourCountry]);

  let total, active, recovered, deaths: number = 0;
  if (countryData) {
    total = countryData?.cases.total;
    active = countryData?.cases.active;
    recovered = countryData?.cases?.recovered;
    deaths = countryData?.deaths.total;
  }

  const CountryDoughnutChart = {
    labels: ['Active', 'Recovered', 'Deaths'],
    datasets: [
      {
        labels: {
          render: 'value'
        },
        backgroundColor: [
          '#4399F6',
          '#37EA61',
          '#F34943'
        ],
        hoverBackgroundColor: [
          '#007bff',
          '#127729',
          '#ff073a'
        ],
        data: [active, recovered, deaths]
      }
    ]
  }

  const [countryTimeSeriesData, setcountryTimeSeriesData] = useState<ISeriesCases[]>([]);
  let endDate: string = new Date().toISOString().split('T')[0];
  let todaysDate = new Date();
  let startDate: string = new Date(todaysDate.getTime() - (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

  useEffect(() => {
    const getCountryTimeSeriesData = async () => {

      // const result = await axios('https://covidapi.info/api/v1/country/' + yourCountry + '/timeseries/' + startDate + '/' + endDate);
      // COVID Monthly API https://rapidapi.com/vaccovidlive-vaccovidlive-default/api/vaccovid-coronavirus-vaccine-and-treatment-tracker
      const result = await axios('https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/covid-ovid-data/sixmonth/' + yourCountry, {
        method: 'GET',
          headers: {
            'X-RapidAPI-Key': COVID_MONTHLY_API_KEY,
          }
      });
      console.log("country weekly count", result.data);
      setcountryTimeSeriesData(result.data);
      setShowLoading(false);
    };

    getCountryTimeSeriesData();
  }, [yourCountry, endDate, startDate]);

  let dateArr: Array<string> = [];
  let confirmedArr: Array<number> = [];
  let deathsArr: Array<number> = [];
  let testArr: Array<number> = [];

  countryTimeSeriesData.forEach((ele, idx) => {
    dateArr.push(ele.date);
    confirmedArr.push(ele.new_cases);
    testArr.push(ele.new_tests);
    deathsArr.push(ele.new_deaths);
  });

  const countryBarChart = {
    labels: [moment(dateArr[0]).format('MMMM Do'), moment(dateArr[1]).format('MMMM Do'), moment(dateArr[2]).format('MMMM Do'), moment(dateArr[3]).format('MMMM Do'), moment(dateArr[4]).format('MMMM Do')],
    datasets: [
      {
        label: 'New Caes',
        backgroundColor: '#4399F6',
        borderColor: '#007bff',
        borderWidth: 1,
        data: [confirmedArr[0], confirmedArr[1], confirmedArr[2], confirmedArr[3], confirmedArr[4]]
      },
      {
        label: 'New Tests',
        backgroundColor: '#37EA61',
        borderColor: '#127729',
        borderWidth: 1,
        data: [testArr[0], testArr[1], testArr[2], testArr[3], testArr[4]]
      },
      {
        label: 'New Deaths',
        backgroundColor: '#F34943',
        borderColor: '#ff073a',
        borderWidth: 1,
        data: [deathsArr[0], deathsArr[1], deathsArr[2], deathsArr[3], deathsArr[4]]
      }
    ]
  }

  const customPopoverOptions = {
    header: 'Select your country',
    translucent: false
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonRow>
            <IonCol><IonImg class="appIcon" src="assets/icon/coronatracker_favicon.png" alt="WorldIcon"></IonImg></IonCol>
            <IonCol class="appTitle">Corona Tracker</IonCol>
            <IonCol class="appDate">{moment().format('MMMM Do')}</IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={showLoading} onDidDismiss={() => setShowLoading(false)} message={'Fetching latest count for your country...'} />
        <IonRow>
          <IonCol size="5" class="countryTitle"> COVID19 Cases in</IonCol>
          <IonCol size="5" class="selectTitle">
            <IonSelect interfaceOptions={customPopoverOptions} interface="popover" value={yourCountry}
              onIonChange={(e) => { setYourCountry(e.detail.value); }}>
              <IonSelectOption value="IND">India</IonSelectOption>
              <IonSelectOption value="USA">United States</IonSelectOption>
              <IonSelectOption value="ARE">UAE</IonSelectOption>
              <IonSelectOption value="FRA">France</IonSelectOption>
              <IonSelectOption value="ESP">Spain</IonSelectOption>
              <IonSelectOption value="ITA">Italy</IonSelectOption>
              <IonSelectOption value="DEU">Germany</IonSelectOption>
              <IonSelectOption value="CHN">China</IonSelectOption>
              <IonSelectOption value="JPN">Japan</IonSelectOption>
              <IonSelectOption value="ZAF">South Africa</IonSelectOption>
              <IonSelectOption value="KOR">South Korea</IonSelectOption>
              <IonSelectOption value="CAN">Canada</IonSelectOption>
              <IonSelectOption value="BRA">Brazil</IonSelectOption>
              <IonSelectOption value="ARG">Argentina</IonSelectOption>
              <IonSelectOption value="PAK">Pakistan</IonSelectOption>
              <IonSelectOption value="CHE">Switzerland</IonSelectOption>
              <IonSelectOption value="IRN">Iran</IonSelectOption>
              <IonSelectOption value="GBR">United Kingdom</IonSelectOption>
              <IonSelectOption value="TUR">Turkey</IonSelectOption>
              <IonSelectOption value="NLD">Netherland</IonSelectOption>
              <IonSelectOption value="RUS">Russia</IonSelectOption>
              <IonSelectOption value="PRT">Portugal</IonSelectOption>
              <IonSelectOption value="ISR">Israel</IonSelectOption>
              <IonSelectOption value="SWE">Sweden</IonSelectOption>
              <IonSelectOption value="AUS">Australia</IonSelectOption>
              <IonSelectOption value="AUT">Austria</IonSelectOption>
              <IonSelectOption value="NZL">New Zealand</IonSelectOption>
              <IonSelectOption value="SGP">Singapore</IonSelectOption>
              <IonSelectOption value="MYS">Malaysia</IonSelectOption>
            </IonSelect>
          </IonCol>
          <IonCol size="2" class="changeButton">change country</IonCol>
        </IonRow>
        <IonRow class="casesBox">
          <IonCol class="totalCases">Total {total?.toLocaleString()}</IonCol>
          <IonCol class="confirmedBox">Active {active?.toLocaleString()}</IonCol>
          <IonCol class="recoveredBox">Recovered {recovered?.toLocaleString()}</IonCol>
          <IonCol class="deathsBox">Deaths {deaths?.toLocaleString()}</IonCol>
        </IonRow>
        <IonCard>
          <Doughnut
            data={CountryDoughnutChart}
            options={{
              legend: {
                display: true,
                position: 'right'
              },
              plugins: {
                datalabels: {
                  anchor: 'bottom',
                  clamp: 'true',
                  align: 'end',
                  color: 'black',
                  labels: {
                    title: {
                      font: {
                        weight: 'bold',
                        size: 10
                      }
                    }
                  }
                }
              }
            }} />
        </IonCard>
        <IonCard>
          <Bar
            data={countryBarChart}
            options={{
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              },
              title: {
                display: true,
                text: 'Cases in the last week',
                fontSize: 15
              },
              legend: {
                display: true,
                position: 'bottom'
              },
              plugins: {
                datalabels: { display: false }
              }
            }}
          />
        </IonCard>
        <IonRow>
          <IonCol class="pageTitle">#StayHomeStaySafe</IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  )
};

export default CountryTab;