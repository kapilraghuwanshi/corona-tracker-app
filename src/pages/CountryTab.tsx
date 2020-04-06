import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonRow, IonCol, IonImg, IonLoading, IonCard } from '@ionic/react';
import moment from 'moment';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import './CountryTab.css';
import { AddNumFunc } from './WorldTab';

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

const state = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'Cases',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81]
    }
  ]
}

const CountryTab: React.FC = () => {
  const [countryData, setcountryData] = useState<ICountryCount>();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const getCountryData = async () => {
      const result = await axios('https://covidapi.info/api/v1/country/IND/latest');
      console.log(result);
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
          <IonCol class="pageTitle">India COVID19 Cases</IonCol>
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
            data={state}
            options={{
              title: {
                display: true,
                text: 'Average Rainfall per month',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />
        </IonCard>
      </IonContent>
    </IonPage>
  )
};

export default CountryTab;