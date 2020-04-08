import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonRow, IonCol, IonImg, IonLoading, IonList, IonItem, IonCard, IonGrid } from '@ionic/react';
import moment from 'moment';
import axios from 'axios';
import './NewsTab.css';

interface INewsResponse {
  status: string;
  totalResults: number;
  articles: Array<IArticles>;
}

interface IArticles {
  source: ISource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface ISource {
  id: string;
  name: string;
}

const NewsTab: React.FC = () => {
  const [data, setData] = useState<IArticles[]>([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const getNewsData = async () => {
      const result = await axios('https://newsapi.org/v2/top-headlines?q=coronavirus&language=en&apiKey=e9052d3beea84071b88f4f55e12f9fe1');
      // console.log(result);
      setData(result.data.articles);
      setShowLoading(false);
    };

    getNewsData();
  }, []);

  function trimSourceDetails(source: string): string {
    return (source ? (source.split(' ')[1] ? source.split(' ')[0] + ' ' + source.split(' ')[1] : source.split(' ')[0]) : source);
  }

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
        <IonLoading isOpen={showLoading} onDidDismiss={() => setShowLoading(false)} message={'Fetching latest updates...'} />
        <IonRow>
          <IonCol class="pageTitle">Latest News Bulletins</IonCol>
        </IonRow>
        <IonList>
          {data.map((news, idx) => (
            <IonItem key={idx}>
              <IonCard>
                <IonImg src={news?.urlToImage} class="newsImage" ></IonImg>
                <IonGrid>
                  <IonRow class="newsTitle">{news?.title}</IonRow>
                  <IonRow class="newsSource">
                    <IonCol>{news?.source?.name}</IonCol>
                    <IonCol>{trimSourceDetails(news?.author)}</IonCol>
                    {/* <IonCol text-right>{moment(news?.publishedAt).format('DD MMM YYYY')}</IonCol> */}
                  </IonRow>
                  <IonRow class="newsContent">{news?.description}</IonRow>
                </IonGrid>
              </IonCard>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonRow>
        <IonCol class="pageTitle">#StayAlertedStaySafe</IonCol>
      </IonRow>
    </IonPage>
  );
};

export default NewsTab;
