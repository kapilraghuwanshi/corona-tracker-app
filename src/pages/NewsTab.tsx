import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonImg, IonLoading, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
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
      const result = await axios('http://newsapi.org/v2/everything?q=coronavirus&sortBy=publishedAt&apiKey=e9052d3beea84071b88f4f55e12f9fe1&language=en');
      console.log(result);
      setData(result.data.articles);
      setShowLoading(false);
    };

    getNewsData();
  }, []);

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
        <IonToolbar>
          <IonTitle>Latest News</IonTitle>
        </IonToolbar>
        <IonLoading isOpen={showLoading} onDidDismiss={() => setShowLoading(false)} message={'Fetching latest updates...'} />
        <IonList>
          {data.map((news, idx) => (
            <IonItem key={idx}>
              <IonCard>
                <IonImg src={news?.urlToImage} class="newsImage" ></IonImg>
                <IonCardSubtitle>{news?.title}</IonCardSubtitle>
                <IonRow>
                  <IonCol>{news?.source?.name}</IonCol>
                  <IonCol>By {news?.author}</IonCol>
                  {/* <IonCol text-right>{moment(news?.publishedAt).format('DD MMM YYYY')}</IonCol> */}
                </IonRow>
                <IonCardContent>{news?.description}</IonCardContent>
              </IonCard>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NewsTab;
