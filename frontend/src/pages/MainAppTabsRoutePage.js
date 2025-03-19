import React, {useEffect, useState} from 'react';
import {
    IonApp,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
    IonTabs, IonAlert
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { home, wallet, person } from 'ionicons/icons';
import AccountPage from "./AccountPage";
import WalletPage from "./WalletPage";
import HomePage from "./HomePage";
import {actionToGetGamePlatformData} from "../redux/CommonAction";
import {useDispatch} from "react-redux";

export default function MainAppTabsRoutePage() {
    const [isFirstTimeEnterInApp,setIsFirstTimeEnterInApp] = useState(localStorage.getItem('isFirstTimeEnterInApp'));
    const dispatch = useDispatch();
    const closeFirstTimeScreen = ()=>{
        setIsFirstTimeEnterInApp('yes');
        localStorage.setItem('isFirstTimeEnterInApp','yes');
    }

    useEffect(() => {
        dispatch(actionToGetGamePlatformData())
    }, []);

    return (
        <IonApp>
            {(!isFirstTimeEnterInApp) ?
                <div className={"first_time_user_container_screen"}>
                    <div className={"logo_in_container"}>
                        <svg width={'150px'} height={'150px'} viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd"
                                  d="M12.052 1.25h-.104c-.899 0-1.648 0-2.242.08-.628.084-1.195.27-1.65.726s-.641 1.022-.726 1.65c-.057.426-.074 1.446-.078 2.32-2.022.066-3.236.302-4.08 1.146C2 8.343 2 10.229 2 14s0 5.657 1.172 6.828S6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.172S22 17.771 22 14s0-5.657-1.172-6.828c-.844-.844-2.058-1.08-4.08-1.146l-.078-2.32c-.084-.628-.27-1.195-.726-1.65s-1.022-.641-1.65-.726c-.595-.08-1.344-.08-2.242-.08zm3.196 4.752l-.064-2.096c-.062-.461-.169-.659-.3-.789s-.328-.238-.789-.3c-.483-.065-1.131-.067-2.095-.067l-2.095.067c-.461.062-.659.169-.789.3s-.238.328-.3.789c-.046.339-.06 1.25-.064 2.096L10 6h4l1.248.002zM12 9.25a.75.75 0 0 1 .75.75v.01c1.089.274 2 1.133 2 2.323a.75.75 0 1 1-1.5 0c0-.384-.426-.917-1.25-.917s-1.25.533-1.25.917.426.917 1.25.917c1.385 0 2.75.96 2.75 2.417 0 1.19-.911 2.049-2 2.323V18a.75.75 0 1 1-1.5 0v-.01c-1.089-.274-2-1.133-2-2.323a.75.75 0 1 1 1.5 0c0 .384.426.917 1.25.917s1.25-.533 1.25-.917-.426-.917-1.25-.917c-1.385 0-2.75-.96-2.75-2.417 0-1.19.911-2.049 2-2.323V10a.75.75 0 0 1 .75-.75z"
                                  fill="#ffffff"/>
                        </svg>
                    </div>
                    <div className={"welcome_screen_text"}>
                        <div className={"welcome_txt"}>
                            WELCOME TO THE
                        </div>
                        <div className={"welcome_txt2"}>
                            GET BET PLATFORM
                        </div>
                    </div>
                    <hr></hr>
                    <div className={"welcome_screen_text_2_sec"}>
                        <button onClick={closeFirstTimeScreen} className={"welcome_txt_se_button"}>
                            Play Your Bet With Us
                        </button>
                        <div className={"welcome_txt_se_2"}>
                            Play securely play responsibly.
                        </div>
                        <div className={"welcome_txt_se_3"}>
                            At Get Bet, we provide a secure, exciting, and responsible betting experience. Your personal and financial information is safeguarded with top-tier encryption. Our platform ensures fair play, transparent odds, and smooth transactions.

                            We emphasize responsible betting—set limits, stay in control, and take breaks when needed. If you feel your betting habits are becoming problematic, we offer tools to help you make informed decisions. With sub-admin support available, you can manage your account and monitor your bets with ease. Sign up today for a secure and responsible betting experience.
                        </div>
                    </div>
                </div>
                :
                <IonTabs>
                    {/* Main Router Outlet */}
                    <IonRouterOutlet>
                        <Route path="/dashboard/wallet" component={WalletPage} exact={true} />
                        <Route path="/dashboard/account" component={AccountPage} exact={true} />
                        <Route path="/dashboard/home" component={HomePage} exact={true} />
                        <Route exact path="/dashboard">
                            <Redirect to="/dashboard/home" />
                        </Route>
                    </IonRouterOutlet>
                    {/* Tab Bar */}
                    <IonTabBar slot="bottom" className="bg-gray-200">
                        <IonTabButton className={"ion_tab_button_cont"} tab="home" href="/dashboard/home">
                            <IonIcon icon={home} />
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton className={"ion_tab_button_cont"} tab="wallet" href="/dashboard/wallet">
                            <IonIcon icon={wallet} />
                            <IonLabel>Wallet</IonLabel>
                        </IonTabButton>
                        <IonTabButton className={"ion_tab_button_cont"} tab="account" href="/dashboard/account">
                            <IonIcon icon={person} />
                            <IonLabel>Account</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            }
        </IonApp>
    );
}