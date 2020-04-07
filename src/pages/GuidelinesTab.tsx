import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonImg, IonRow, IonCol, IonList, IonCard, IonCardHeader } from '@ionic/react';
import moment from 'moment';
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
        <IonList>
          <IonCard>
            <iframe title="WHO" width="100%" height="200" src="https://www.youtube.com/embed/5jD2xd3Cv80"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
            </iframe>
          </IonCard>
          <IonCard>
            <IonCardHeader>Covid-19 Symptoms</IonCardHeader>
            <IonImg class="guidlineImages" src="assets/images/Symptoms2.png"></IonImg>
          </IonCard>
          <IonCard>
            <IonCardHeader>Covid-19 Diseases</IonCardHeader>
            <IonImg class="guidlineImages"  src="assets/images/Symptoms.png"></IonImg>
          </IonCard>
          <IonCard>
            <IonCardHeader>Stress Distraction Tips</IonCardHeader>
            <IonImg class="guidlineImages"  src="assets/images/Stress.jpg"></IonImg>
          </IonCard>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default WorldTab;
