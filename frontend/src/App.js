import React,{useEffect} from 'react';
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
import {actionToGetUserSessionData} from "./redux/CommonAction";
import LoginPage from "./pages/LoginPage";
import MainAppTabsRoutePage from "./pages/MainAppTabsRoutePage";
import SignupPage from "./pages/SignupPage";
import WinAndGoBettingMainPage from "./pages/WinAndGoBettingMainPage";

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
  return (
      <IonReactRouter>
           <IonRouterOutlet>
                <Route path="/dashboard" component={MainAppTabsRoutePage}/>
                <Route path="/win-go-betting" component={WinAndGoBettingMainPage}/>
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

    useEffect(() => {
        console.log('userInfo',userInfo)
    }, [userInfo]);

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