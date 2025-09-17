import React, {useEffect, useState} from 'react';
import {useParams,useHistory} from "react-router";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon, IonLoading,
    IonPage,
    IonRefresher, IonRefresherContent,
    IonRow
} from "@ionic/react";
import {arrowBack, arrowForwardOutline, beakerSharp, todaySharp} from "ionicons/icons";
import {useDispatch, useSelector} from "react-redux";
import GetBetGameSessionListPage from "../../pages/admin/GetBetGameSessionListPage";
// import RunningTimerComponent from "../RunningTimerComponent";
import {
    actionToCreateNewSession,
    actionToGetAdminAllDashboardCountData,
    actionToGetGameSessionOrAllSessionAndGamePlatform, actionToGetLastGameSessionBasedOnGameType,
    actionToGetNearestGameSessionBasedOnGameType,
    actionToGetNearestGameSessionOrActiveSessionAndGamePlatform
} from "../../redux/CommonAction";
import moment from "moment-timezone";

const BettingGameEntryGamePlatformListComponent = () => {
    const {gameType} = useParams();
    const history = useHistory();
    const {userInfo} = useSelector((state) => state.userAuthDetail);
    const {gameSessionData} = useSelector(state => state.latestGameSessionData);
    const dispatch = useDispatch();

    const [time, setTime] = useState(new Date());
    const [isActivatable, setIsActivatable] = useState(false);
    const [serialNumber, setSerialNumber] = useState(
        gameSessionData?.serial_number?.toString() || ""
    );
    const [userEnterLoading,setUserEnterLoading] = useState(false);


    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now);
            const seconds = now.getSeconds();
            // Only active between 50 and 59 seconds
            if (seconds >= 50 && seconds <= 59) {
                setIsActivatable(true);
            } else {
                setIsActivatable(false);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString("en-US", { hour12: false });
    };

    useEffect(() => {
        if (gameSessionData.serial_number) {
            setSerialNumber(gameSessionData.serial_number)
        }
    }, [gameSessionData])

    useEffect(()=>{
        dispatch(actionToGetNearestGameSessionBasedOnGameType(gameType));
        dispatch(actionToGetLastGameSessionBasedOnGameType(gameType));
    },[gameType])

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
        dispatch(actionToGetNearestGameSessionBasedOnGameType(gameType))
        dispatch(actionToGetLastGameSessionBasedOnGameType(gameType))
    }

    const callFunctionToEnterInGame = ()=>{
        goToPage(`/win-go-betting`);
        setUserEnterLoading(false);
    }

    const callFunctionToCreateNewSession = () =>{
        setUserEnterLoading(true);
        let payload = {
            currentSessionId: gameSessionData.id,
            newSessionSerialNumber: serialNumber ? serialNumber : gameSessionData.serial_number,
            sessionNumber: gameSessionData.session_number + 1,
            start_time: moment(new Date()).format("HH:mm:ss"),
            is_active: 1,
            game_type:gameType,
            betting_platform_id:gameSessionData.betting_platform_id
        }
        dispatch(actionToCreateNewSession(payload,callFunctionToEnterInGame))
    }


    return (
        <React.Fragment>
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
                                        {/*<RunningTimerComponent/>*/}
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
                            <IonGrid>
                                {/* Period Number & Time */}
                                <IonRow className="period-row">
                                    <IonCol className="period-col">
                                        <div className="label">PERIOD NUMBER</div>
                                        <input
                                            value={serialNumber}
                                            type="number"
                                            onChange={(e) => setSerialNumber(e.target.value)}
                                            className="period-input"
                                        />
                                        {/*<div className="value">{gameSessionData.serial_number}</div>*/}
                                        {/*<IonButton size="small" color="medium" className="edit-btn">*/}
                                        {/*    EDIT*/}
                                        {/*</IonButton>*/}
                                    </IonCol>
                                    <IonCol className="time-col">
                                        <div className="label">TIME</div>
                                        <div className="value"> {formatTime(time)}</div>
                                    </IonCol>
                                </IonRow>

                                {/* Activate Session */}
                                {/* Activate Session */}
                                <IonRow className="ion-justify-content-center ion-margin-top">
                                    {isActivatable ? (
                                        <div className={"GameList__C"}>
                                            <div className={"GameList__C-item active"}>
                                                <div>START<br/>Session</div>
                                            </div>
                                            <div className={"GameList__C-item not_active"} onClick={callFunctionToCreateNewSession}>
                                                <div className={"bet_pre_txt_1"}>
                                                    Click here
                                                </div>
                                                <div className={"bet_pre_txt_2"}>
                                                    <IonIcon icon={arrowForwardOutline}/>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="Betting__C-mark">
                                            <div>W</div>
                                            <div>A</div>
                                            <div>I</div>
                                            <div>T</div>
                                        </div>
                                    )}
                                </IonRow>

                            </IonGrid>

                            <div className="settingPanel__container" style={{paddingTop: '1rem'}}>
                                <div className="getbet-title getbet-line">
                                    <div className="getbet-title-left">
                                        <span>HISTORY</span>
                                    </div>
                                </div>
                                <div className="">
                                    <IonGrid className="grid_for_dashboard_data_grid">
                                        <IonRow className="grid_for_dashboard_data_row">
                                            {/* First Column */}
                                            <IonCol className="grid_for_dashboard_data_col" onClick={()=>goToPage('/game-result-history')}>
                                                <IonCard className="dashboard-card">
                                                    <IonCardContent className="dashboard-card-content">
                                                        <IonIcon icon={todaySharp} className="dashboard-icon"/>
                                                        <div className="title_for_das_heading">RESULT HISTORY</div>
                                                        <div className="title_for_das_text_link">
                                                            Click to open
                                                            <IonIcon icon={arrowForwardOutline} className="arrow-icon"/>
                                                        </div>
                                                    </IonCardContent>
                                                </IonCard>
                                            </IonCol>

                                            {/* Second Column */}
                                            <IonCol onClick={() => goToPage('/admin-game-prediction-history-list')}
                                                    className="grid_for_dashboard_data_col">
                                                <IonCard className="dashboard-card">
                                                    <IonCardContent className="dashboard-card-content">
                                                        <IonIcon icon={beakerSharp} className="dashboard-icon"/>
                                                        <div className="title_for_das_heading">PREDICTION HISTORY</div>
                                                        <div className="title_for_das_text_link">
                                                            Click to open
                                                            <IonIcon icon={arrowForwardOutline} className="arrow-icon"/>
                                                        </div>
                                                    </IonCardContent>
                                                </IonCard>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </div>
                                {/*<div className="getbet-title getbet-line">*/}
                                {/*    <div className="getbet-title-left">*/}
                                {/*        <span>Active Users</span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="">*/}
                                {/*    <IonGrid onClick={() => goToPage('/admin-admin-users-list')}*/}
                                {/*             className="grid_for_dashboard_data_grid">*/}
                                {/*        <IonRow className="grid_for_dashboard_data_row">*/}
                                {/*            /!* First Column *!/*/}
                                {/*            <IonCol className="grid_for_dashboard_data_col">*/}
                                {/*                <IonCard className="dashboard-card">*/}
                                {/*                    <IonCardContent className="dashboard-card-content">*/}
                                {/*                        <IonIcon icon={todaySharp} className="dashboard-icon"/>*/}
                                {/*                        <div className="title_for_das_heading">Online Users</div>*/}
                                {/*                        <div*/}
                                {/*                            className="title_for_das_text">{dashboardCount?.online_users}</div>*/}
                                {/*                        <div className="title_for_das_text_link">*/}
                                {/*                            Click to open*/}
                                {/*                            <IonIcon icon={arrowForwardOutline} className="arrow-icon"/>*/}
                                {/*                        </div>*/}
                                {/*                    </IonCardContent>*/}
                                {/*                </IonCard>*/}
                                {/*            </IonCol>*/}

                                {/*            /!* Second Column *!/*/}
                                {/*            <IonCol onClick={() => goToPage('/admin-admin-users-list')}*/}
                                {/*                    className="grid_for_dashboard_data_col">*/}
                                {/*                <IonCard className="dashboard-card">*/}
                                {/*                    <IonCardContent className="dashboard-card-content">*/}
                                {/*                        <IonIcon icon={beakerSharp} className="dashboard-icon"/>*/}
                                {/*                        <div className="title_for_das_heading">Playing Users</div>*/}
                                {/*                        <div*/}
                                {/*                            className="title_for_das_text">{dashboardCount?.playing_users}</div>*/}
                                {/*                        <div className="title_for_das_text_link">*/}
                                {/*                            Click to open*/}
                                {/*                            <IonIcon icon={arrowForwardOutline} className="arrow-icon"/>*/}
                                {/*                        </div>*/}
                                {/*                    </IonCardContent>*/}
                                {/*                </IonCard>*/}
                                {/*            </IonCol>*/}
                                {/*        </IonRow>*/}
                                {/*    </IonGrid>*/}
                                {/*</div>*/}
                                {/*<div className="getbet-title getbet-line">*/}
                                {/*    <div className="getbet-title-left">*/}
                                {/*        <span>Orders</span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="">*/}
                                {/*    <IonGrid className="grid_for_dashboard_data_grid">*/}
                                {/*        <IonRow className="grid_for_dashboard_data_row">*/}
                                {/*            /!* First Column *!/*/}
                                {/*            <IonCol onClick={() => goToPage('/game-history')}*/}
                                {/*                    className="grid_for_dashboard_data_col">*/}
                                {/*                <IonCard className="dashboard-card">*/}
                                {/*                    <IonCardContent className="dashboard-card-content">*/}
                                {/*                        <IonIcon icon={todaySharp} className="dashboard-icon"/>*/}
                                {/*                        <div className="title_for_das_heading">{`Today's`} Orders</div>*/}
                                {/*                        <div*/}
                                {/*                            className="title_for_das_text">*/}
                                {/*                            Count: {dashboardCount?.current_orders_count} Cost: {dashboardCount?.today_orders_amount_sum}*/}
                                {/*                        </div>*/}
                                {/*                        <div className="title_for_das_text_link">*/}
                                {/*                            Click to open*/}
                                {/*                            <IonIcon icon={arrowForwardOutline} className="arrow-icon"/>*/}
                                {/*                        </div>*/}
                                {/*                    </IonCardContent>*/}
                                {/*                </IonCard>*/}
                                {/*            </IonCol>*/}

                                {/*            /!* Second Column *!/*/}
                                {/*            <IonCol onClick={() => goToPage('/game-history')}*/}
                                {/*                    className="grid_for_dashboard_data_col">*/}
                                {/*                <IonCard className="dashboard-card">*/}
                                {/*                    <IonCardContent className="dashboard-card-content">*/}
                                {/*                        <IonIcon icon={beakerSharp} className="dashboard-icon"/>*/}
                                {/*                        <div className="title_for_das_heading">Total Orders</div>*/}
                                {/*                        <div*/}
                                {/*                            className="title_for_das_text">*/}
                                {/*                            Count: {dashboardCount?.total_orders_count} Cost:*/}
                                {/*                            ₹{dashboardCount?.total_orders_amount_sum}*/}
                                {/*                        </div>*/}
                                {/*                        <div className="title_for_das_text_link">*/}
                                {/*                            Click to open*/}
                                {/*                            <IonIcon icon={arrowForwardOutline} className="arrow-icon"/>*/}
                                {/*                        </div>*/}
                                {/*                    </IonCardContent>*/}
                                {/*                </IonCard>*/}
                                {/*            </IonCol>*/}
                                {/*        </IonRow>*/}
                                {/*    </IonGrid>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        :
                        <GetBetGameSessionListPage gameType={gameType}/>
                    }
                </IonContent>
            </IonPage>
            <IonLoading isOpen={userEnterLoading} message={"Please wait..."}/>
        </React.Fragment>

    );
};

export default BettingGameEntryGamePlatformListComponent;