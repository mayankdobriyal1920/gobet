import React, {useEffect} from 'react';
import { Redirect, Route } from 'react-router-dom';
import {IonApp, IonLoading, IonRouterOutlet, setupIonicReact} from '@ionic/react';
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
import {
    actionToConnectSocketServer,
    actionToGetAllUsersUnderSubAdminList, actionToGetAppSubscriptionPlanData, actionToGetUserActiveSubscriptionData,
    actionToGetUserSessionData,
    actionToGetUserWalletAndGameBalance
} from "./redux/CommonAction";
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
import AdminGameResultListPage from "./pages/admin/AdminGameResultListPage";
import PendingWithdrawalRequestListPage from "./pages/admin/PendingWithdrawalRequestListPage";
import PendingDepositRequestListPage from "./pages/admin/PendingDepositRequestListPage";
import GeneratedPasscodeListPage from "./pages/admin/GeneratedPasscodeListPage";
import AllUsersUnderSubAdminPage from "./pages/admin/AllUsersUnderSubAdminPage";
import AllUserListNormalAndSubAdminPage from "./pages/admin/AllUserListNormalAndSubAdminPage";
import AppBackButtonHandler from "./components/AppBackButtonHandler";
import GetBetGameSessionListPage from "./pages/admin/GetBetGameSessionListPage";
import AllUsersSubscriptionPage from "./pages/AllUsersSubscriptionPage";
import BettingGameEntryGamePlatformListComponent
    from "./components/commonPopup/BettingGameEntryGamePlatformListComponent";
import GamePredictionHistoryDetailPage from "./pages/admin/AdminGamePredictionHistory/GamePredictionHistoryDetailPage";
import GamePredictionHistorySessionList from "./pages/admin/AdminGamePredictionHistory/GamePredictionHistorySessionList";
import GamePredictionHistoryPeriodList from "./pages/admin/AdminGamePredictionHistory/GamePredictionHistoryPeriodList";
import GamePredictionHistoryPredictionResult from "./pages/admin/AdminGamePredictionHistory/GamePredictionHistoryPredictionResult"
import GamePredictionHistoryPredictionUserList
    from "./pages/admin/AdminGamePredictionHistory/GamePredictionHistoryPredictionUserList";
import GameResultHistoryComponent from "./pages/admin/AdminGameResultHistory/GameResultHistoryComponent"
import GameResultHistorySessionListComponent
    from "./pages/admin/AdminGameResultHistory/GameResultHistorySessionListComponent";
import GameResultHistoryPeriodListStatusComponent
    from "./pages/admin/AdminGameResultHistory/GameResultHistoryPeriodListStatusComponent";
import GameUsersOrderStatusListComponent from "./pages/admin/GameUsersOrderStatusListComponent";
import GameUsersOrderStatusDetailComponent from "./pages/admin/GameUsersOrderStatusDetailComponent";
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
        dispatch(actionToGetAllUsersUnderSubAdminList());
        dispatch(actionToConnectSocketServer());
        dispatch(actionToGetUserActiveSubscriptionData());
        dispatch(actionToGetAppSubscriptionPlanData());
    }, []);

    return (
        <IonReactRouter>
            <AppBackButtonHandler/>
            <IonRouterOutlet>
                <Route path="/dashboard" component={MainAppTabsRoutePage}/>
                <Route exact={true} path="/win-go-betting" component={WinAndGoBettingMainPage}/>
                <Route exact={true} path="/setting" component={SettingPage}/>
                <Route exact={true} path="/game-history" component={GameTransactionPage}/>
                <Route exact={true} path="/money-transaction" component={MoneyTransactionPage}/>
                <Route exact={true} path="/coming-soon" component={ComingSoonPage}/>
                <Route exact={true} path="/withdrawal-history" component={WithdrawalHistoryListPage}/>
                <Route exact={true} path="/all-user-subscriptions" component={AllUsersSubscriptionPage}/>
                <Route exact={true} path="/deposit-history" component={DepositHistoryListPage}/>
                <Route exact={true} path="/admin-game-result" component={AdminGameResultListPage}/>
                <Route exact={true} path="/admin-withdrawal-pending-request" component={PendingWithdrawalRequestListPage}/>
                <Route exact={true} path="/admin-deposit-pending-request" component={PendingDepositRequestListPage}/>
                <Route exact={true} path="/admin-generated-passcode-list" component={GeneratedPasscodeListPage}/>
                <Route
                    exact
                    path="/admin-generated-passcode-list-for-admin"
                    render={(props) => <GeneratedPasscodeListPage {...props} isAdminPasscodePage={true} />}
                />
                <Route exact={true} path="/admin-sub-admin-users-list" component={AllUsersUnderSubAdminPage}/>
                <Route exact={true} path="/admin-admin-users-list" component={AllUserListNormalAndSubAdminPage}/>
                <Route exact={true} path="/admin-game-session-list" component={GetBetGameSessionListPage}/>
                <Route exact={true} path="/betting-app-with-platform-data/:game_type" component={BettingGameEntryGamePlatformListComponent}/>
                {/*/// PREDICTION HISTORY PAGE ///*/}
                <Route exact={true} path="/admin-game-prediction-history-list" component={GamePredictionHistoryDetailPage}/>
                <Route exact={true} path="/prediction-session-list" component={GamePredictionHistorySessionList}/>
                <Route exact={true} path="/prediction-period-list" component={GamePredictionHistoryPeriodList}/>
                <Route exact={true} path="/prediction-result" component={GamePredictionHistoryPredictionResult}/>
                <Route exact={true} path="/prediction-history-user-list" component={GamePredictionHistoryPredictionUserList} />
                {/*/// PREDICTION HISTORY PAGE ///*/}
                <Route exact={true} path="/game-result-history" component={GameResultHistoryComponent} />
                <Route exact={true} path="/result-history-session-list" component={GameResultHistorySessionListComponent} />
                <Route exact={true} path="/game-result-period-list" component={GameResultHistoryPeriodListStatusComponent} />
                <Route exact={true} path="/game-users-order-status-list" component={GameUsersOrderStatusListComponent} />
                <Route exact={true} path={"/game-users-order-status-detail"} component={GameUsersOrderStatusDetailComponent}/>


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

    useEffect(() => {
        dispatch(actionToGetUserSessionData());
    }, []);

    useEffect(()=>{
        if(Capacitor.isNativePlatform()){
            NavigationBar.setColor({ color: '#ffffff' , darkButtons:true});
            StatusBar.setBackgroundColor({ color: '#f57b2c' }).then(()=>{
                StatusBar.setStyle({ style:Style.Light });
            });
        }
    },[])

    return (
        <IonApp>
            {(!userSession?.loading) ?
                <React.Fragment>
                    {userInfo?.id ? <AppEnterMainPage/> : <PublicRoutes/>}
                </React.Fragment>:''
            }
            <IonLoading className={"loading_loader_spinner_container"} isOpen={userSession?.loading} message={"Loading..."}/>
        </IonApp>
    )
}

export default App;