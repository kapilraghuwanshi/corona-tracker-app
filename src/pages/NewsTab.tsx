import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonRow, IonCol, IonImg, IonLoading, IonList, IonItem, IonCard, IonGrid } from '@ionic/react';
import moment from 'moment';
import axios from 'axios';
import './NewsTab.css';
import NEWS_API_KEY from '../newsApikey';

interface INewsResponse {
  status: string;
  totalResults: number;
  articles: Array<IArticles>;
}

interface IArticles {
  author: string;
  title: string;
  description: string;
  url: string;
  image: string;
  published: string;
  category: [];
}

const NewsTab: React.FC = () => {
  const [data, setData] = useState<IArticles[]>([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const getNewsData = async () => {
      // Changed News API from newsapi.org to currentsapi due to developer account's limits
      const result = await axios('https://api.currentsapi.services/v1/search?q=coronavirus&q=covid19&language=en&apiKey=' + NEWS_API_KEY);
      // console.log(result);
      setData(result.data.news);
      setShowLoading(false);
    };

    getNewsData();
  }, []);

  function trimSourceDetails(source: string): string {
    return (source ? (source.split(' ')[1] ? source.split(' ')[0] + ' ' + source.split(' ')[1] : source.split(' ')[0]) : source);
  }

  function showImageIfExists(imageUrl: string): any {
    if (imageUrl !== 'None') {
      return <IonImg src={imageUrl} class="newsImage" ></IonImg>
    } else {
      return <IonImg src="assets/images/ImageNotAvailable.png" class="newsImage" ></IonImg>
    }
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
        <IonLoading isOpen={showLoading} onDidDismiss={() => setShowLoading(false)} message={'Fetching latest news for you...'} />
        <IonRow>
          <IonCol class="pageTitle">Related News Bulletins</IonCol>
        </IonRow>
        <IonList>
          {data.map((news, idx) => (
            <IonItem key={idx}>
              <IonCard>
                <IonGrid>
                  <IonRow class="newsTitle">{news?.title}</IonRow>
                  <IonRow class="newsSource">
                    <IonCol>{news?.category}</IonCol>
                    <IonCol>{trimSourceDetails(news?.author)}</IonCol>
                    <IonCol text-right>{moment(news?.published).format('DD MMM YYYY')}</IonCol>
                  </IonRow>
                  <IonRow >{showImageIfExists(news.image)}</IonRow>
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
