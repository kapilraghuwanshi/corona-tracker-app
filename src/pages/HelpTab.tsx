import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonRow, IonCol, IonImg, IonButton, IonIcon, IonList, IonItem, IonLabel, IonCard, IonCardContent } from '@ionic/react';
import moment from 'moment';
import './HelpTab.css';
import { mailOutline, logoWebComponent, mailSharp, logoWhatsapp, callOutline, walletOutline } from 'ionicons/icons';

const HelpTab: React.FC = () => {
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
        <IonRow>
          <IonCol class="pageTitle">Help & Feedback</IonCol>
        </IonRow>
        <IonCard>
          <IonList>
            <IonItem>
              <IonLabel>Call WHO helpline Number</IonLabel>
              <IonButton color='warning' href="tel:+41-22-7912111"><IonIcon slot="start" icon={callOutline} /> Call</IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>Email WHO Team</IonLabel>
              <IonButton color='warning' href="mailto:mediainquiries@who.int"><IonIcon slot="start" icon={mailOutline} /> Email</IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>Text 'Hi' to WHO helpdesk</IonLabel>
              <IonButton color='warning' href="https://api.whatsapp.com/send?phone=41798931892&text=hi&source=&data="><IonIcon slot="start" icon={logoWhatsapp} /> WhatsApp</IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>Donate via WHO website</IonLabel>
              <IonButton color='warning' href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/donate"><IonIcon slot="start" icon={walletOutline} /> Donate</IonButton>
            </IonItem>
          </IonList>
        </IonCard>
        <IonRow>
          <IonCol class="pageTitle">Our Mission and Purpose<span role="img" aria-label="love">💖</span></IonCol>
        </IonRow>
        <IonCard>
          <IonCardContent class="messageContent">
            Cortona Tracker is cross platform handy app for checking latest numbers, getting updated news, reading official guidelines and other help. <br />
            We dedicate this app to the Doctors, Health workers, Police men and all Corona Warriors around the globe who are helping us against this global pandemic.
            <span role="img" aria-label="hand">🙏</span> <br />
            This app is using COVID19 dataset by John Hopkins University and News from Newsapi.org.
          </IonCardContent>
        </IonCard>
        <IonRow>
          <IonCol class="pageTitle">Connect with Kia Labs development team</IonCol>
        </IonRow>
        <IonCard>
          <IonList>
            <IonItem>
              <IonLabel>Email to Developer</IonLabel>
              <IonButton color="tertiary" href="mailto:kapil.raghuwanshi5@gmail.com"><IonIcon slot="start" icon={mailSharp} /> Write Feedback</IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>Visit Kia Labs <span role="img" aria-label="donut">💌</span></IonLabel>
              <IonButton color='tertiary' href="https://about.me/kialabs"><IonIcon slot="start" icon={logoWebComponent} /> Visit About Us</IonButton>
            </IonItem>
          </IonList>
        </IonCard>
      </IonContent>
      <IonRow>
        <IonCol class="pageTitle">#WorldFightsCorona</IonCol>
      </IonRow>
    </IonPage>
  );
};

export default HelpTab;
