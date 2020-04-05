import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonImg, IonButtons, IonButton } from '@ionic/react';
import moment from 'moment';
import ExploreContainer from '../components/ExploreContainer';
import './HelpTab.css';

const HelpTab: React.FC = () => {
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
          <IonTitle>Help & Feedback</IonTitle>
        </IonToolbar>
        <IonButtons>
          <IonButton>https://www.who.int/emergencies/diseases/novel-coronavirus-2019/donate</IonButton>
          <IonButton href="mailto:">Email to WHO</IonButton>
          <IonButton href="tel:">Email to WHO</IonButton>
          <IonButton>https://www.who.int/emergencies/diseases/novel-coronavirus-2019/donate</IonButton>
        </IonButtons>
      </IonContent>
    </IonPage>
  );
};

export default HelpTab;
