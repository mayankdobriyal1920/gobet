import React from 'react';
import {
    IonApp,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
    IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { home, wallet, person } from 'ionicons/icons';

function Home() {
    return <h1 className="text-center text-xl font-bold">Home Page</h1>;
}

function Wallet() {
    return <h1 className="text-center text-xl font-bold">Wallet Page</h1>;
}

function Account() {
    return <h1 className="text-center text-xl font-bold">Account Page</h1>;
}

export default function MainAppEntryComponent() {
    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/dashboard/home" component={Home} exact={true} />
                        <Route path="/dashboard/wallet" component={Wallet} exact={true} />
                        <Route path="/dashboard/account" component={Account} exact={true} />
                        <Redirect exact from="/dashboard" to="/dashboard/home" />
                        <Route render={()=><Redirect to={"/dashboard/home"}/>}/>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom" className="bg-gray-200">
                        <IonTabButton tab="home" href="/dashboard/home">
                            <IonIcon icon={home} />
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="wallet" href="/dashboard/wallet">
                            <IonIcon icon={wallet} />
                            <IonLabel>Wallet</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="account" href="/dashboard/account">
                            <IonIcon icon={person} />
                            <IonLabel>Account</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
}