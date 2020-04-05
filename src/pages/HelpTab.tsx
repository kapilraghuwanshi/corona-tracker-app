import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonImg, IonButtons, IonButton, IonIcon, IonGrid, IonList, IonItem, IonLabel } from '@ionic/react';
import moment from 'moment';
import './HelpTab.css';
import { callSharp, mailOutline, walletSharp } from 'ionicons/icons';

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
        <IonRow>
          <IonCol class="pageTitle">Help & Feedback</IonCol>
        </IonRow>

        <IonList>
          <IonItem>
            <IonLabel>Call WHO helpline Number</IonLabel>
            <IonButton href="tel:+41-22-7912111"><IonIcon slot="start" icon={callSharp} /> Call</IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Email WHO Team</IonLabel>
            <IonButton href="mailto:mediainquiries@who.int"><IonIcon slot="start" icon={mailOutline} /> Email</IonButton>
          </IonItem>
          <IonItem>
            <IonLabel>Donate via WHO</IonLabel>
            <IonButton href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/donate:"><IonIcon slot="start" icon={walletSharp} /> Donate</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HelpTab;
