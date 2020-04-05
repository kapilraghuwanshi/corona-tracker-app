import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonRow, IonCol } from '@ionic/react';
import moment from 'moment';
import ExploreContainer from '../components/ExploreContainer';
import './WorldTab.css';

const WorldTab: React.FC = () => {
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
        <IonRow>
          <IonCol class="pageTitle">Advisory & Guidelines</IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default WorldTab;
