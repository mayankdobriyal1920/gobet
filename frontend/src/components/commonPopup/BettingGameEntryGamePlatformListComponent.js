import React from 'react';
import {useParams,useHistory} from "react-router";
import {
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonPage,
    IonRefresher, IonRefresherContent,
    IonRow
} from "@ionic/react";
import {arrowBack, arrowForwardOutline, beakerSharp, todaySharp} from "ionicons/icons";
import {useDispatch, useSelector} from "react-redux";
import GetBetGameSessionListPage from "../../pages/admin/GetBetGameSessionListPage";
import RunningTimerComponent from "../RunningTimerComponent";
import {
    actionToGetAdminAllDashboardCountData, actionToGetGameSessionOrAllSessionAndGamePlatform,
    actionToGetNearestGameSessionOrActiveSessionAndGamePlatform
} from "../../redux/CommonAction";

const BettingGameEntryGamePlatformListComponent = () => {
    const {gameType} = useParams();
    const history = useHistory();
    const {dashboardCount} = useSelector((state) => state.adminDashboardAllCountData);
    const {userInfo} = useSelector((state) => state.userAuthDetail);
    const dispatch = useDispatch();

    const goBack = ()=>{
        history.goBack();
        window.history.back();
    }
    const goToPage = (page)=>{
        history.push(page);
    }
    function handleRefresh(event) {
        dispatch(actionToGetNearestGameSessionOrActiveSessionAndGamePlatform(gameType))
        dispatch(actionToGetGameSessionOrAllSessionAndGamePlatform(gameType))
        dispatch(actionToGetAdminAllDashboardCountData(event))
    }
    return (
        <IonPage className={"home_welcome_page_container"}>
            <IonHeader>
                <div className={"content-getbet content"}>
                    <div className="navbar">
                        <div className="navbar-fixed">
                            <div className="navbar__content">
                                <div onClick={goBack} className="navbar__content-left">
                                    <IonIcon icon={arrowBack}
                                             style={{color: "#ffffff", width: "24px", height: "24px"}}/>
                                </div>
                                <div className="navbar__content-center">
                                    <div className="navbar__content-title">
                                        <span>{gameType?.toUpperCase()}</span>
                                    </div>
                                </div>
                                <div className="navbar__content-right">
                                    <RunningTimerComponent/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </IonHeader>
            <IonContent className={"content-theme-off-white-bg-color"}>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {(userInfo?.role === 1) ?
                    <div className={"sysMessage__container"}>
                        <div className="settingPanel__container" style={{paddingTop: '1rem'}}>
                            <div className="getbet-title getbet-line">
                                <div className="getbet-title-left">
                                    <span>Active Users</span>
                                </div>
                            </div>
                            <div className="">
                                <IonGrid onClick={() => goToPage('/admin-admin-users-list')}
                                         className="grid_for_dashboard_data_grid">
                                    <IonRow className="grid_for_dashboard_data_row">
                                        {/* First Column */}
                                        <IonCol className="grid_for_dashboard_data_col">
                                            <IonCard className="dashboard-card">
                                                <IonCardContent className="dashboard-card-content">
                                                    <IonIcon icon={todaySharp} className="dashboard-icon"/>
                                                    <div className="title_for_das_heading">Online Users</div>
                                                    <div
                                                        className="title_for_das_text">{dashboardCount?.online_users}</div>
                                                    <div className="title_for_das_text_link">
                                                        Click to open list
                                                        <IonIcon icon={arrowForwardOutline} className="arrow-icon"/>
                                                    </div>
                                                </IonCardContent>
                                            </IonCard>
                                        </IonCol>

                                        {/* Second Column */}
                                        <IonCol onClick={() => goToPage('/admin-admin-users-list')}
                                                className="grid_for_dashboard_data_col">
                                            <IonCard className="dashboard-card">
                                                <IonCardContent className="dashboard-card-content">
                                                    <IonIcon icon={beakerSharp} className="dashboard-icon"/>
                                                    <div className="title_for_das_heading">Playing Users</div>
                                                    <div
                                                        className="title_for_das_text">{dashboardCount?.playing_users}</div>
                                                    <div className="title_for_das_text_link">
                                                        Click to open list
                                                        <IonIcon icon={arrowForwardOutline} className="arrow-icon"/>
                                                    </div>
                                                </IonCardContent>
                                            </IonCard>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </div>
                            <div className="getbet-title getbet-line">
                                <div className="getbet-title-left">
                                    <span>Orders</span>
                                </div>
                            </div>
                            <div className="">
                                <IonGrid className="grid_for_dashboard_data_grid">
                                    <IonRow className="grid_for_dashboard_data_row">
                                        {/* First Column */}
                                        <IonCol onClick={() => goToPage('/game-history')}
                                                className="grid_for_dashboard_data_col">
                                            <IonCard className="dashboard-card">
                                                <IonCardContent className="dashboard-card-content">
                                                    <IonIcon icon={todaySharp} className="dashboard-icon"/>
                                                    <div className="title_for_das_heading">{`Today's`} Orders</div>
                                                    <div
                                                        className="title_for_das_text">
                                                        Count: {dashboardCount?.current_orders_count} Cost: {dashboardCount?.today_orders_amount_sum}
                                                    </div>
                                                    <div className="title_for_das_text_link">
                                                        Click to open list
                                                        <IonIcon icon={arrowForwardOutline} className="arrow-icon"/>
                                                    </div>
                                                </IonCardContent>
                                            </IonCard>
                                        </IonCol>

                                        {/* Second Column */}
                                        <IonCol onClick={() => goToPage('/game-history')}
                                                className="grid_for_dashboard_data_col">
                                            <IonCard className="dashboard-card">
                                                <IonCardContent className="dashboard-card-content">
                                                    <IonIcon icon={beakerSharp} className="dashboard-icon"/>
                                                    <div className="title_for_das_heading">Total Orders</div>
                                                    <div
                                                        className="title_for_das_text">
                                                        Count: {dashboardCount?.total_orders_count} Cost:
                                                        ₹{dashboardCount?.total_orders_amount_sum}
                                                    </div>
                                                    <div className="title_for_das_text_link">
                                                        Click to open list
                                                        <IonIcon icon={arrowForwardOutline} className="arrow-icon"/>
                                                    </div>
                                                </IonCardContent>
                                            </IonCard>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </div>
                        </div>
                    </div> : ''
                }
                <GetBetGameSessionListPage gameType={gameType}/>
            </IonContent>
        </IonPage>
    );
};

export default BettingGameEntryGamePlatformListComponent;