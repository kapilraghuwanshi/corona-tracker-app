import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonRow, IonCol, IonImg, IonLoading, IonCard, IonButton, IonPopover, IonSelectPopover } from '@ionic/react';
import moment from 'moment';
import axios from 'axios';
import { Doughnut, Bar } from 'react-chartjs-2';
import './CountryTab.css';
import { AddNumFunc } from './WorldTab';
import 'chartjs-plugin-datalabels';

interface ICountryCount {
  count: number;
  result: {
    todaysDate: {
      [caseName: string]: ICases
    };
  };
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
  confirmed: number;
  deaths: number;
  recovered: number;
}

let selectedCountry: string;

const CountryTab: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [countryData, setcountryData] = useState<ICountryCount>();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const getCountryData = async () => {
      const result = await axios('https://covidapi.info/api/v1/country/IND/latest');
      // console.log(result);
      setcountryData(result.data.result);
      setShowLoading(false);
    };

    getCountryData();
  }, []);

  let confirmed, recovered, deaths: number = 0;
  if (countryData) {
    confirmed = Object.values(countryData)[0]?.confirmed;
    recovered = Object.values(countryData)[0]?.recovered;
    deaths = Object.values(countryData)[0]?.deaths;
  }

  const CountryDoughnutChart = {
    labels: ['Confirmed', 'Recovered', 'Deaths'],
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
        data: [confirmed, recovered, deaths]
      }
    ]
  }

  const [countryTimeSeriesData, setcountryTimeSeriesData] = useState<ISeriesCases[]>([]);
  let endDate: string = new Date().toISOString().split('T')[0];
  let todaysDate = new Date();
  let startDate: string = new Date(todaysDate.getTime() - (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

  useEffect(() => {
    const getCountryTimeSeriesData = async () => {
      const result = await axios('https://covidapi.info/api/v1/country/IND/timeseries/' + startDate + '/' + endDate);
      // console.log(result);
      setcountryTimeSeriesData(result.data.result);
      setShowLoading(false);
    };

    getCountryTimeSeriesData();
  }, [endDate, startDate]);

  let dateArr: Array<string> = [];
  let confirmedArr: Array<number> = [];
  let recoveredArr: Array<number> = [];
  let deathsArr: Array<number> = [];
  countryTimeSeriesData.forEach((ele, idx) => {
    dateArr.push(ele.date);
    confirmedArr.push(ele.confirmed);
    recoveredArr.push(ele.recovered);
    deathsArr.push(ele.deaths);
  });

  const countryBarChart = {
    labels: [moment(dateArr[0]).format('MMMM Do'), moment(dateArr[1]).format('MMMM Do'), moment(dateArr[2]).format('MMMM Do'), moment(dateArr[3]).format('MMMM Do'), moment(dateArr[4]).format('MMMM Do')],
    datasets: [
      {
        label: 'Confirmed',
        backgroundColor: '#4399F6',
        borderColor: '#007bff',
        borderWidth: 1,
        data: [confirmedArr[0], confirmedArr[1], confirmedArr[2], confirmedArr[3], confirmedArr[4]]
      },
      {
        label: 'Recovered',
        backgroundColor: '#37EA61',
        borderColor: '#127729',
        borderWidth: 1,
        data: [recoveredArr[0], recoveredArr[1], recoveredArr[2], recoveredArr[3], recoveredArr[4]]
      },
      {
        label: 'Deaths',
        backgroundColor: '#F34943',
        borderColor: '#ff073a',
        borderWidth: 1,
        data: [deathsArr[0], deathsArr[1], deathsArr[2], deathsArr[3], deathsArr[4]]
      }
    ]
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonRow>
            <IonCol size="3"><IonImg class="appIcon" src="assets/icon/coronatracker_favicon.png" alt="WorldIcon"></IonImg></IonCol>
            <IonCol class="appTitle">Corona Tracker</IonCol>
            <IonCol size="3" class="appDate">{moment().format('MMMM Do')}</IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={showLoading} onDidDismiss={() => setShowLoading(false)} message={'Fetching latest count for your country...'} />
        <IonRow>
          <IonCol class="pageTitle"> COVID19 Cases in {selectedCountry}</IonCol>
          <IonPopover isOpen={showPopover} onDidDismiss={e => setShowPopover(false)}>
            <p>This is popover content</p>
          </IonPopover>
          <IonSelectPopover>kp</IonSelectPopover>
          <IonButton onClick={() => setShowPopover(true)}>Show Popover</IonButton>
        </IonRow>
        <IonRow class="casesBox">
          <IonCol class="totalCases">Total <AddNumFunc a={confirmed} b={recovered} c={deaths} /></IonCol>
          <IonCol class="confirmedBox">Confirmed {confirmed?.toLocaleString()}</IonCol>
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
                  anchor: 'center',
                  clamp: 'true',
                  align: 'center',
                  color: 'black',
                  labels: {
                    title: {
                      font: {
                        weight: ''
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
                text: 'Cases in the current week',
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