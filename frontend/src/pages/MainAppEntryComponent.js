import React, {useState} from 'react';
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
import HomePage from "./HomePage";
import siteSmallLogo from "../theme/img/get-bet-app-logo-small.png";

function Wallet() {
    return <h1 className="text-center text-xl font-bold">Wallet Page</h1>;
}

function Account() {
    return <h1 className="text-center text-xl font-bold">Account Page</h1>;
}

export default function MainAppEntryComponent() {
    const [isFirstTimeEnterInApp,setIsFirstTimeEnterInApp] = useState(localStorage.getItem('isFirstTimeEnterInApp'));
    const closeFirstTimeScreen = ()=>{
        setIsFirstTimeEnterInApp('yes');
        localStorage.setItem('isFirstTimeEnterInApp','yes');
    }
    return (
        <IonApp>
            {(!isFirstTimeEnterInApp) ?
                <div className={"first_time_user_container_screen"}>
                    <div className={"logo_in_container"}>
                        <img src={siteSmallLogo} className={"logo"} alt={"logo"}/>
                    </div>
                    <div className={"welcome_screen_text"}>
                        <div className={"welcome_txt"}>
                            Welcome To The
                        </div>
                        <div className={"welcome_txt2"}>
                            Get Bet Platform
                        </div>
                    </div>
                    <hr></hr>
                    <div className={"welcome_screen_text_2_sec"}>
                        <button onClick={closeFirstTimeScreen} className={"welcome_txt_se_button"}>
                            Play Your Bet With Us
                        </button>
                        <div className={"welcome_txt_se_2"}>
                            Play securely play responsibly
                        </div>
                    </div>
                </div>
                :
                <IonReactRouter>
                    <IonTabs>
                        <IonRouterOutlet>
                            <Route path="/dashboard/home" component={HomePage} exact={true} />
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
            }
        </IonApp>
    );
}