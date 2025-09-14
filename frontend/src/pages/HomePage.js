import React, {useEffect, useState} from "react";
import {
    IonAlert,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent, IonGrid,
    IonHeader, IonIcon,
    IonLoading,
    IonPage, IonRefresher, IonRefresherContent,
    IonRow
} from "@ionic/react";
import {useDispatch, useSelector} from "react-redux";
import siteSmallIcon from "../theme/img/site-logo-small-white.png";
import aviatorGame from "../theme/img/aviator.png";
import wingoGame from "../theme/img/wingoGame.png";
import limboGame from "../theme/img/limboGame.png";
import {useHistory} from "react-router";
import {
    actionToActivateSubscriptionPlan,
    actionToGetAdminAllDashboardCountData, actionToGetAdminOderAndValueCountData,
} from "../redux/CommonAction";
import AddMoneyToGameWalletModal from "../components/commonPopup/AddMoneyToGameWalletModal";
import SubscriptionModal from "../components/SubscriptionModal";
import {arrowForwardCircleOutline, arrowForwardOutline, beakerSharp, todaySharp} from "ionicons/icons";

export default function HomePage() {
    const {walletBalance,bettingBalance} = useSelector((state) => state.userWalletAndGameBalance);
    const {subscriptionData} = useSelector((state) => state.userSubscriptionData);
    const userInfo = useSelector((state) => state.userAuthDetail.userInfo);
    const history = useHistory();
    const [lowBalanceAlert,setLowBalanceAlert] = useState(false);
    const [userEnterLoading] = useState(false);
    const dispatch = useDispatch();
    const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
    const [activationPlanLoader, setActivationPlanLoader] = useState(false);
    const [loadingAddAmountSuccess, setLoadingAddAmountSuccess] = useState(false);
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
    const {dashboardCount} = useSelector((state) => state.adminDashboardAllCountData);
    const {dashboardOrderValueCount} = useSelector(state => state.adminOrderValuesCountDetail)

    useEffect(() => {
        dispatch(actionToGetAdminAllDashboardCountData());
        dispatch(actionToGetAdminOderAndValueCountData());
    }, []);

    const goToPage = (page)=>{
        history.push(page);
    }

    const callFunctionToSetUserEnterInGameConfirm = (gameType)=>{
        goToPage(`/betting-app-with-platform-data/${gameType}`);
    }

    const handlePlanSelect = (plan) => {
        if(walletBalance >= plan.price) {
            setActivationPlanLoader(true);
            setIsSubscriptionModalOpen(false); // Close modal after selection
            dispatch(actionToActivateSubscriptionPlan(plan, setActivationPlanLoader))
        }else{
            setLowBalanceAlert(true);
        }
    };

    function handleRefresh(event) {
        dispatch(actionToGetAdminAllDashboardCountData(event))
    }

    return (
        <IonPage className={"home_welcome_page_container"}>
            <IonHeader>
                <div className={"content-getbet content"}>
                    <div className="navbar">
                        <div className="navbar-fixed">
                            <div className="navbar__content">
                                <div className="navbar__content-left">
                                    <img src={siteSmallIcon} alt=""/>
                                    <span>GET BET</span>
                                </div>
                                <div className="navbar__content-center">
                                    <div className="navbar__content-title"></div>
                                </div>
                                {(userInfo?.role !== 1) ?
                                    <div className="navbar__content-right">
                                        <div className="content-getbet__right">
                                            <div className="message">
                                                Eligible Value
                                                ₹{subscriptionData?.balance ? subscriptionData?.balance : '0.00'}
                                            </div>
                                        </div>
                                    </div>:''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </IonHeader>
            <IonContent>
                {(userInfo?.role === 1) ?
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>:''
                }
                {(userInfo?.role !== 1) ?
                    <div className="Wallet__C">
                        <div className="Wallet__C-balance">
                            <div className="Wallet__C-balance-l1">
                                <div>₹{bettingBalance ? bettingBalance : '0.00'}</div>
                            </div>
                            <div className="Wallet__C-balance-l2">
                                <svg className="svg-icon icon-lottyWallet" viewBox="0 0 40 40" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.5"
                                          d="M24.7493 6.58594L24.7494 23.2826H10.4327C6.98268 23.2826 4.16602 26.0993 4.16602 29.5493V13.0693C4.16602 11.0859 5.38268 9.31927 7.23268 8.61927L20.466 3.61927C22.5327 2.8526 24.7493 4.36927 24.7493 6.58594ZM37.5977 23.2826V26.7159C37.5977 27.6326 36.8643 28.3826 35.931 28.4159H32.6643C30.8643 28.4159 29.2143 27.0993 29.0643 25.2993C28.9643 24.2493 29.3643 23.2659 30.0643 22.5826C30.681 21.9493 31.531 21.5826 32.4643 21.5826H35.931C36.8643 21.6159 37.5977 22.3659 37.5977 23.2826Z"
                                          fill="var(--main-color)"></path>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M29.066 25.2993C28.966 24.2493 29.366 23.266 30.066 22.5827C30.6827 21.9493 31.5327 21.5827 32.466 21.5827H35.8327V19.1827C35.8327 15.7327 33.016 12.916 29.566 12.916H10.4327C6.98268 12.916 4.16602 15.7327 4.16602 19.1827V30.3993C4.16602 33.8493 6.98268 36.666 10.4327 36.666H29.566C33.016 36.666 35.8327 33.8493 35.8327 30.3993V28.416H32.666C30.866 28.416 29.216 27.0993 29.066 25.2993ZM22.4167 22.5H10.75C10.0667 22.5 9.5 21.9333 9.5 21.25C9.5 20.5667 10.0667 20 10.75 20H22.4167C23.1 20 23.6667 20.5667 23.6667 21.25C23.6667 21.9333 23.1 22.5 22.4167 22.5Z"
                                          fill="var(--main-color)"></path>
                                </svg>
                                <div>Betting balance</div>
                            </div>
                            <AddMoneyToGameWalletModal setLoadingAddAmountSuccess={setLoadingAddAmountSuccess}
                                                       setIsAddMoneyOpen={setIsAddMoneyOpen}
                                                       isAddMoneyOpen={isAddMoneyOpen}/>
                        </div>
                    </div> : ''
                }
                <div className="getbet__container_main_body">
                    <div className="getbet-title getbet-line">
                        <div className="getbet-title-left">
                            <span>Betting Apps</span>
                        </div>
                    </div>
                    <div className="getbet__container allGame">
                        <div onClick={()=>callFunctionToSetUserEnterInGameConfirm('win_go')} className="item">
                            <img className="gameImg" src={wingoGame}/>
                        </div>
                        <div onClick={()=>goToPage('/coming-soon')} className="item">
                            <img className="gameImg"
                                 src={aviatorGame}/>
                        </div>
                        <div onClick={()=>goToPage('/coming-soon')} className="item">
                            <img className="gameImg"
                                 src={limboGame}/>
                        </div>
                    </div>
                </div>


                {/*///////////// ADMIN OPTIONS ///////////////////*/}
                {(userInfo?.role === 1) ?
                    <div className="settingPanel__container home_admin">
                        {/*<div className="getbet-title getbet-line">*/}
                        {/*    <div className="getbet-title-left">*/}
                        {/*        <span>ORDER</span>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="">*/}
                        {/*    <IonGrid>*/}
                        {/*        <IonRow className="ion-justify-content-center ion-align-items-center">*/}
                        {/*            /!* Order Card *!/*/}
                        {/*            <IonCol size="12" size-md="4">*/}
                        {/*                <IonCard className="stats-card">*/}
                        {/*                    <IonCardContent>*/}
                        {/*                        <div className="stats-label">Total Order</div>*/}
                        {/*                        <h2 className="stats-value">{dashboardOrderValueCount.total_orders}</h2>*/}

                        {/*                        <div className="stats-label">Completed</div>*/}
                        {/*                        <h2 className="stats-value">{dashboardOrderValueCount.completed_orders}</h2>*/}

                        {/*                        <div className="stats-label">Pending</div>*/}
                        {/*                        <h2 className="stats-value">{dashboardOrderValueCount.pending_orders}</h2>*/}
                        {/*                    </IonCardContent>*/}
                        {/*                </IonCard>*/}
                        {/*            </IonCol>*/}

                        {/*            /!* Volume Card *!/*/}
                        {/*            <IonCol size="12" size-md="4">*/}
                        {/*                <IonCard className="stats-card">*/}
                        {/*                    <IonCardContent>*/}
                        {/*                        <div className="stats-label">Total Volume</div>*/}
                        {/*                        <h2 className="stats-value">{dashboardOrderValueCount.total_values}</h2>*/}

                        {/*                        <div className="stats-label">Completed</div>*/}
                        {/*                        <h2 className="stats-value">{dashboardOrderValueCount.completed_values}</h2>*/}

                        {/*                        <div className="stats-label">Pending</div>*/}
                        {/*                        <h2 className="stats-value">{dashboardOrderValueCount.pending_values}</h2>*/}
                        {/*                    </IonCardContent>*/}
                        {/*                </IonCard>*/}
                        {/*            </IonCol>*/}
                        {/*        </IonRow>*/}

                        {/*        /!* Arrow *!/*/}
                        {/*        <IonRow className="ion-justify-content-center ion-margin-top">*/}
                        {/*            <IonIcon icon={arrowForwardCircleOutline} className="arrow-icon" />*/}
                        {/*        </IonRow>*/}
                        {/*    </IonGrid>*/}
                        {/*</div>*/}

                        <div className="getbet-title getbet-line">
                            <div className="getbet-title-left">
                                <span>ORDER</span>
                            </div>
                        </div>
                        <div className="">
                            <IonGrid className="grid_for_dashboard_data_grid">
                                <IonRow className="grid_for_dashboard_data_row">
                                    {/* First Column */}
                                    <IonCol className="grid_for_dashboard_data_col">
                                        <IonCard className="dashboard-card">
                                            <IonCardContent className="dashboard-card-content">
                                                <div className="stats-label">Total Order</div>
                                                <h2 className="stats-value">{dashboardOrderValueCount.total_orders}</h2>

                                                <div className="stats-label">Completed</div>
                                                <h2 className="stats-value">{dashboardOrderValueCount.completed_orders}</h2>

                                                <div className="stats-label">Pending</div>
                                                <h2 className="stats-value">{dashboardOrderValueCount.pending_orders}</h2>
                                                {/*<div className="title_for_das_text_link">*/}
                                                {/*    Click to open*/}
                                                {/*    <IonIcon icon={arrowForwardOutline} className="arrow-icon"/>*/}
                                                {/*</div>*/}
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>

                                    {/* Second Column */}
                                    <IonCol className="grid_for_dashboard_data_col">
                                        <IonCard className="dashboard-card">
                                            <IonCardContent className="dashboard-card-content">
                                                <div className="stats-label">Total Volume</div>
                                                <h2 className="stats-value">₹{dashboardOrderValueCount.total_values}</h2>

                                                <div className="stats-label">Completed</div>
                                                <h2 className="stats-value">₹{dashboardOrderValueCount.completed_values}</h2>

                                                <div className="stats-label">Pending</div>
                                                <h2 className="stats-value">₹{dashboardOrderValueCount.pending_values}</h2>
                                                {/*<div className="title_for_das_text_link">*/}
                                                {/*    Click to open*/}
                                                {/*    <IonIcon icon={arrowForwardOutline} className="arrow-icon"/>*/}
                                                {/*</div>*/}
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                                <IonRow className="grid_for_dashboard_data_row">
                                    <IonCol className="grid_for_dashboard_data_col">
                                        <div className="title_for_das_text_link" onClick={() => goToPage('/game-users-order-status-list')}>
                                            <IonIcon icon={arrowForwardOutline} className="arrow-icon"/>
                                        </div>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </div>
                        {/*<div className="getbet-title getbet-line">*/}
                        {/*    <div className="getbet-title-left">*/}
                        {/*        <span>Subscriptions</span>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="">*/}
                        {/*    <IonGrid className="grid_for_dashboard_data_grid">*/}
                        {/*        <IonRow className="grid_for_dashboard_data_row">*/}
                        {/*            /!* First Column *!/*/}
                        {/*            <IonCol onClick={() => goToPage('/all-user-subscriptions')}*/}
                        {/*                    className="grid_for_dashboard_data_col">*/}
                        {/*                <IonCard className="dashboard-card">*/}
                        {/*                    <IonCardContent className="dashboard-card-content">*/}
                        {/*                        <IonIcon icon={todaySharp} className="dashboard-icon"/>*/}
                        {/*                        <div className="title_for_das_heading">Active Subscriptions</div>*/}
                        {/*                        <div className="title_for_das_text"></div>*/}
                        {/*                        <div className="title_for_das_text">*/}
                        {/*                            Count: {dashboardCount?.total_active_subscriptions} Cost: ₹{dashboardCount?.total_active_subscriptions_cost}</div>*/}
                        {/*                        <div className="title_for_das_text_link">*/}
                        {/*                            Click to open*/}
                        {/*                            <IonIcon icon={arrowForwardOutline} className="arrow-icon"/>*/}
                        {/*                        </div>*/}
                        {/*                    </IonCardContent>*/}
                        {/*                </IonCard>*/}
                        {/*            </IonCol>*/}

                        {/*            /!* Second Column *!/*/}
                        {/*            <IonCol onClick={() => goToPage('/all-user-subscriptions')}*/}
                        {/*                    className="grid_for_dashboard_data_col">*/}
                        {/*                <IonCard className="dashboard-card">*/}
                        {/*                    <IonCardContent className="dashboard-card-content">*/}
                        {/*                        <IonIcon icon={beakerSharp} className="dashboard-icon"/>*/}
                        {/*                        <div className="title_for_das_heading">Total Subscriptions</div>*/}
                        {/*                        <div className="title_for_das_text">*/}
                        {/*                            Count: {dashboardCount?.total_subscriptions} Cost: ₹{dashboardCount?.total_subscriptions_cost}*/}
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
                    : ''
                }
                {/*///////////// ADMIN OPTIONS ///////////////////*/}


                {(userInfo?.role !== 1) ?
                    <React.Fragment>
                        {(subscriptionData?.id && subscriptionData?.balance > 0 && new Date(subscriptionData?.expiry_date) > new Date()) ? (
                            <div className="first_list-item processing_fee_container">
                                <div className="head">
                                    <div className="title">Active Subscription</div>
                                    <div className="orange">{subscriptionData?.plan_name}</div>
                                </div>
                                <div className="description">
                                    Your subscription is active, allowing you to participate in betting
                                    predictions.
                                    Ensure you have sufficient balance to place bets.
                                </div>
                                <div className="foot_insub">
                                    <div className="step_txt">Subscription Value:
                                        ₹{subscriptionData?.total_value}</div>
                                    <div className="step_txt">Expiry
                                        Date: {new Date(subscriptionData?.expiry_date).toLocaleDateString()}</div>
                                    <div className="progress" onClick={() => setIsSubscriptionModalOpen(true)}>
                                        <div className="step">Upgrade Subscription</div>
                                    </div>
                                    <SubscriptionModal isOpen={isSubscriptionModalOpen}
                                                       onClose={() => setIsSubscriptionModalOpen(false)}
                                                       onSelectPlan={handlePlanSelect}/>

                                </div>
                            </div>
                        ) : (
                            <div className="no-subscription">
                                <div className="first_list-item processing_fee_container">
                                    <div className="head">
                                        <div className="title">Buy a Subscription</div>
                                    </div>
                                    <div className="description">
                                        {subscriptionData?.id ? (
                                            subscriptionData?.balance <= 0 ? (
                                                "Your previous subscription balance has been used up. Renew your plan to continue betting."
                                            ) : new Date(subscriptionData?.expiry_date) <= new Date() ? (
                                                "Your previous subscription has expired. Purchase a new plan to continue."
                                            ) : ""
                                        ) : (
                                                    "You don't have an active subscription. Choose a plan to start betting."
                                                )}
                                            </div>
                                            <div className="foot">
                                                <div className="progress"
                                                     onClick={() => setIsSubscriptionModalOpen(true)}>
                                                    <div className="step">Choose Plans</div>
                                                </div>
                                                <SubscriptionModal isOpen={isSubscriptionModalOpen}
                                                                   onClose={() => setIsSubscriptionModalOpen(false)}
                                                                   onSelectPlan={handlePlanSelect}/>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                            : ''
                        }
                    </IonContent>
                    <IonAlert
                        header="Sorry!!"
                        message="Insufficient balance in your main balance."
                        isOpen={lowBalanceAlert}
                        className={"custom_site_alert_toast"}
                        buttons={[
                            {
                                text: 'Cancel',
                                role: 'cancel',
                                handler: () => {
                                    setLowBalanceAlert(false);
                                },
                            }
                        ]}
                        onDidDismiss={() => setLowBalanceAlert(false)}
                    />
                    <IonLoading isOpen={userEnterLoading || loadingAddAmountSuccess || activationPlanLoader}
                message={"Please wait..."}/>
        </IonPage>
)
}