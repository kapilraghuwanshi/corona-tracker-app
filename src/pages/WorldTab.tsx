import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonImg, IonRow, IonCol, IonLoading, IonCard, IonSlides, IonSlide, IonGrid } from '@ionic/react';
import moment from 'moment';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import './WorldTab.css';
import codesToCountryNames from './../datafiles/Country3Codes.json';

interface IGLobalCount {
  count: number;
  date: string;
  result: ICaseCount;
}

interface ICaseCount {
  confirmed: number;
  recovered: number;
  deaths: number;
}

interface IGLobalCountryWiseCount {
  count: number;
  date: string;
  result: ICountry[];
}

interface ICountry {
  country: ICaseCount
}

interface ICountryCodeNamesJson {
  countryCodes: ICountryCodeNames;
}

interface ICountryCodeNames {
  code: string;
  name: string;
}


const slideOpts = {
  initialSlide: 1,
  speed: 50,
  slideShadows: true,
  loop: true,
  autoplay: true
};

export function AddNumFunc(props: any) {
  return (props.a + props.b + props.c).toLocaleString();
}

export function CountryCodesToNames(props: any): any {
  let country: ICountryCodeNames = codesToCountryNames[codesToCountryNames.map(item => { return item.code; }).indexOf(props.code)];
  return country ? country.name : props.code;
}

const WorldTab: React.FC = () => {

  const [data, setData] = useState<IGLobalCount>();
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    const getGlobalData = async () => {
      //latest global count
      const result = await axios('https://covidapi.info/api/v1/global');
      // console.log(result);
      setData(result.data);
      setShowLoading(false);
    };
    getGlobalData();
  }, []);

  const confirmed = data?.result?.confirmed;
  const recovered = data?.result?.recovered;
  const deaths = data?.result?.deaths;

  const GlobalCasesPieChart = {
    labels: ['Confirmed', 'Recovered', 'Deaths'],
    datasets: [
      {
        label: 'Covid-19',
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

  const [countryWiseData, setCountryWiseData] = useState<ICountry[]>([]);
  useEffect(() => {
    const getGlobalCountryData = async () => {
      //latest global country wise count
      const result = await axios('https://covidapi.info/api/v1/global/latest');
      setCountryWiseData(result.data.result);
    };
    getGlobalCountryData();
  }, []);

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
        <IonLoading isOpen={showLoading} onDidDismiss={() => setShowLoading(false)} message={'Fetching total cases...'} />
        <IonRow>
          <IonCol class="pageTitle">COVID-19 Dashboard</IonCol>
        </IonRow>
        <IonRow class="casesBox">
          <IonCol class="totalCases">Total <AddNumFunc a={confirmed} b={recovered} c={deaths} /></IonCol>
          <IonCol class="confirmedBox">Confirmed {confirmed?.toLocaleString()}</IonCol>
          <IonCol class="recoveredBox">Recovered {recovered?.toLocaleString()}</IonCol>
          <IonCol class="deathsBox">Deaths {deaths?.toLocaleString()}</IonCol>
        </IonRow>

        <IonCard class="pieCard">
          <Pie data={GlobalCasesPieChart}
            options={{
              legend: {
                display: true,
                position: 'bottom',
              },
              plugins: {
                datalabels: {
                  anchor: 'end',
                  clamp: 'true',
                  align: 'bottom',
                  color: 'black',
                  labels: {
                    title: {
                      font: {
                        weight: 'bold'
                      }
                    }
                  }
                }
              }
            }} />
        </IonCard>
        <IonSlides class="tipsSlides" options={slideOpts}>
          <IonSlide class="slide">
            Maintain at least 1 metre (3 feet) distance between yourself and anyone who is coughing or sneezing.
          </IonSlide>
          <IonSlide class="slide">
            Regularly and thoroughly clean your hands with an alcohol-based hand rub or wash them with soap and water.
          </IonSlide>
          <IonSlide class="slide">
            If you have fever, cough and difficulty breathing, seek medical care early.
          </IonSlide>
          <IonSlide class="slide">
            Avoid touching eyes, nose and mouth. #StayHomeStaySafe
          </IonSlide>
          <IonSlide class="slide">
            WHO Health Alert brings COVID-19 facts to billions via WhatsApp.
          </IonSlide>
        </IonSlides>
        <IonCard>
          <IonGrid>
            <IonRow class="tableTitle">
              <IonCol col-4 class="tableCountry">Country</IonCol>
              <IonCol class="tableCol">Total</IonCol>
              <IonCol class="tableCol">Active</IonCol>
              <IonCol class="tableCol">Recovered</IonCol>
              <IonCol class="tableCol">Deaths</IonCol>
            </IonRow>
            {countryWiseData.map((item, idx) => (
              <IonRow class="tableZebraStrip" key={idx} >
                <IonCol col-4 class="tableCountry"><CountryCodesToNames code={Object.keys(item)[0]} /></IonCol>
                <IonCol class="tableCol"><AddNumFunc a={Object.values(item)[0].confirmed} b={Object.values(item)[0].recovered} c={Object.values(item)[0].deaths} /></IonCol>
                <IonCol class="tableCol">{Object.values(item)[0].confirmed?.toLocaleString()}</IonCol>
                <IonCol class="tableCol">{Object.values(item)[0].recovered?.toLocaleString()}</IonCol>
                <IonCol class="tableCol">{Object.values(item)[0].deaths?.toLocaleString()}</IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonCard>
      </IonContent>
      <IonRow class="tableFooter">
        <IonCol col-4 class="tableCountry">World</IonCol>
        <IonCol class="tableCol"><AddNumFunc a={confirmed} b={recovered} c={deaths} /></IonCol>
        <IonCol class="tableCol">{confirmed?.toLocaleString()}</IonCol>
        <IonCol class="tableCol">{recovered?.toLocaleString()}</IonCol>
        <IonCol class="tableCol">{deaths?.toLocaleString()}</IonCol>
      </IonRow>
    </IonPage>
  );
};

export default WorldTab;