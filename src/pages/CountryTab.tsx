import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonImg, IonLoading, IonCard } from '@ionic/react';
import moment from 'moment';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import './CountryTab.css';

interface ICountries {
  countryName: Array<ICases>;
}

interface ICases {
  date: string;
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
  const [data, setData] = useState<ICases[]>([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const getCountryData = async () => {
      const result = await axios('https://pomber.github.io/covid19/timeseries.json');
      console.log(result);
      setData(result.data);
      setShowLoading(false);
    };

    getCountryData();
  }, []);

  console.log(data[60]);

  const TotalCasesPieChart = {
    labels: ['Total', 'Confirmed', 'Recovered', 'Deaths'],
    datasets: [
      {
        label: 'Covid-19',
        backgroundColor: [
          '#ff073a',
          '#007bff',
          '#28a745',
          '#6c757d'
        ],
        hoverBackgroundColor: [
          '#AD0E2E',
          '#0B55A5',
          '#0C6A21',
          '#3E454B'
        ],
        data: [65, 59, 80, 81]
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
        <IonLoading isOpen={showLoading} onDidDismiss={() => setShowLoading(false)} message={'Fetching total cases...'} />
        <IonRow>
          <IonCol class="pageTitle">India COVID19 Cases</IonCol>
        </IonRow>
        <IonCard>
          <Doughnut data={TotalCasesPieChart}
            options={{
              legend: {
                display: true,
                position: 'right'
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
  );
};

export default CountryTab;
