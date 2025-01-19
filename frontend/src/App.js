import React, {useEffect, useState} from 'react';
import { Redirect, Route } from 'react-router-dom';
import {IonAlert, IonApp, IonLoading, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/additional.css';
import './theme/common-style.css';
import {useDispatch, useSelector} from "react-redux";
import {actionToGetUserSessionData, actionToGetUserWalletAndGameBalance} from "./redux/CommonAction";
import LoginPage from "./pages/LoginPage";
import MainAppTabsRoutePage from "./pages/MainAppTabsRoutePage";
import SignupPage from "./pages/SignupPage";
import WinAndGoBettingMainPage from "./pages/WinAndGoBettingMainPage";
import SettingPage from "./pages/SettingPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import GameTransactionPage from "./pages/GameTransactionPage";
import MoneyTransactionPage from "./pages/MoneyTransactionPage";
import {Capacitor} from "@capacitor/core";
import {NavigationBar} from "@mauricewegner/capacitor-navigation-bar";
import {StatusBar, Style} from "@capacitor/status-bar";
import WithdrawalHistoryListPage from "./pages/WithdrawalHistoryListPage";
import DepositHistoryListPage from "./pages/DepositHistoryListPage";
import {useHistory} from "react-router";
import { App as CapacitorApp } from '@capacitor/app';
setupIonicReact();

const PublicRoutes = () => {
    return (
        <IonReactRouter>
            <IonRouterOutlet>
                <Route path="/login" exact={true} component={LoginPage} />
                <Route path="/signup" exact={true} component={SignupPage} />
                <Redirect  exact from="/"  to="/login" />
                <Route render={() => <Redirect to="/login" />} />
            </IonRouterOutlet>
        </IonReactRouter>
    );
};
const AppEnterMainPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actionToGetUserWalletAndGameBalance());
    }, []);

    return (
        <IonReactRouter>
            <IonRouterOutlet>
                <Route path="/dashboard" component={MainAppTabsRoutePage}/>
                <Route exact={true} path="/win-go-betting/:betting_active_users_id" component={WinAndGoBettingMainPage}/>
                <Route exact={true} path="/setting" component={SettingPage}/>
                <Route exact={true} path="/game-history" component={GameTransactionPage}/>
                <Route exact={true} path="/money-transaction" component={MoneyTransactionPage}/>
                <Route exact={true} path="/coming-soon" component={ComingSoonPage}/>
                <Route exact={true} path="/withdrawal-history" component={WithdrawalHistoryListPage}/>
                <Route exact={true} path="/deposit-history" component={DepositHistoryListPage}/>
                <Redirect  exact from="/"  to="/dashboard" />
                <Route render={() => <Redirect to="/dashboard" />} />
            </IonRouterOutlet>
        </IonReactRouter>
    );
};

const App = () => {
    const dispatch = useDispatch();
    const userSession = useSelector((state) => state.userSession);
    const {userInfo} = useSelector((state) => state.userAuthDetail);
    const history = useHistory();
    const [showExitAlert, setShowExitAlert] = useState(false);

    useEffect(() => {
        dispatch(actionToGetUserSessionData());
    }, []);

    useEffect(()=>{
        if(Capacitor.isNativePlatform()){
            NavigationBar.setColor({ color: '#ffffff' , darkButtons:true});
            StatusBar.setBackgroundColor({ color: '#f57b2c' }).then(()=>{
                StatusBar.setStyle({ style:Style.Light });
            });

            const backButtonListener = CapacitorApp.addListener('backButton', () => {
                console.log(history)
                if (history.length <= 1) {
                    // If there's no more history, show exit confirmation alert
                    setShowExitAlert(true);
                } else {
                    // Navigate to the previous page
                    history.goBack();
                }
            });

            return () => {
                // Remove listener on unmount
                backButtonListener.remove();
            };
        }

    },[])

    const exitApp = ()=>{
        if(Capacitor.isNativePlatform()){
            CapacitorApp.exitApp();
        }
    }


    return (
        <IonApp>
            {(!userSession?.loading) ?
                <React.Fragment>
                    {userInfo?.id ? <AppEnterMainPage/> : <PublicRoutes/>}
                </React.Fragment>:''
            }
            <IonLoading className={"loading_loader_spinner_container"} isOpen={userSession?.loading} message={"Loading..."}/>
            <IonAlert
                isOpen={showExitAlert}
                onDidDismiss={() => setShowExitAlert(false)} // Close the alert
                header="Exit App"
                message="Do you really want to exit the app?"
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            setShowExitAlert(false); // Close alert
                        },
                    },
                    {
                        text: 'Exit',
                        handler: () => {
                            exitApp(); // Exit the app
                        },
                    },
                ]}
            />
        </IonApp>
    )
}

export default App;