import React, {useEffect} from "react";
import {
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonGrid, IonHeader, IonIcon,
    IonPage, IonRefresher, IonRefresherContent,
    IonRow,
} from "@ionic/react";
import {useDispatch, useSelector} from "react-redux";
import {
    actionToGetAdminAllDashboardCountData,
} from "../../redux/CommonAction";
import {arrowForwardOutline, beakerSharp, cashOutline, cashSharp, todaySharp} from "ionicons/icons";
import LineLoaderComponent from "../../components/LineLoaderComponent";
import {useHistory} from "react-router";


export default function DashboardPage() {
    const {loading,dashboardCount} = useSelector((state) => state.adminDashboardAllCountData);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(actionToGetAdminAllDashboardCountData())
    }, []);

    function handleRefresh(event) {
        dispatch(actionToGetAdminAllDashboardCountData(event))
    }

    const goToPage = (page)=>{
        history.push(page);
    }

    return (
        <IonPage>
            <IonHeader>
                <div className={"content-getbet content"}>
                    <div className="navbar">
                        <div className="navbar-fixed">
                            <div className="navbar__content">
                                <div className="navbar__content-center">
                                    <div className="navbar__content-title">
                                        <span>Admin Dashboard</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </IonHeader>
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <div className={"profile_account_main_page_header_container"}>
                    <div className={"profile_account_main_page_header_container_background_dashboard"}>
                        {(loading) ?
                            <IonGrid className="grid_for_dashboard_data_grid">
                                <IonRow className="grid_for_dashboard_data_row">
                                    {/* First Column */}
                                    <IonCol className="grid_for_dashboard_data_col">
                                        <IonCardContent className="dashboard-card-content">
                                            <LineLoaderComponent/>
                                            <LineLoaderComponent/>
                                        </IonCardContent>
                                    </IonCol>
                                    <IonCol className="grid_for_dashboard_data_col">
                                        <IonCardContent className="dashboard-card-content">
                                            <LineLoaderComponent/>
                                            <LineLoaderComponent/>
                                        </IonCardContent>
                                    </IonCol>
                                </IonRow>
                                <IonRow className="grid_for_dashboard_data_row">
                                    {/* First Column */}
                                    <IonCol className="grid_for_dashboard_data_col">
                                        <IonCardContent className="dashboard-card-content">
                                            <LineLoaderComponent/>
                                            <LineLoaderComponent/>
                                        </IonCardContent>
                                    </IonCol>
                                    <IonCol className="grid_for_dashboard_data_col">
                                        <IonCardContent className="dashboard-card-content">
                                            <LineLoaderComponent/>
                                            <LineLoaderComponent/>
                                        </IonCardContent>
                                    </IonCol>
                                </IonRow>
                                <IonRow className="grid_for_dashboard_data_row">
                                    {/* First Column */}
                                    <IonCol className="grid_for_dashboard_data_col">
                                        <IonCardContent className="dashboard-card-content">
                                            <LineLoaderComponent/>
                                            <LineLoaderComponent/>
                                        </IonCardContent>
                                    </IonCol>
                                    <IonCol className="grid_for_dashboard_data_col">
                                        <IonCardContent className="dashboard-card-content">
                                            <LineLoaderComponent/>
                                            <LineLoaderComponent/>
                                        </IonCardContent>
                                    </IonCol>
                                </IonRow>
                                <IonRow className="grid_for_dashboard_data_row">
                                    {/* First Column */}
                                    <IonCol className="grid_for_dashboard_data_col">
                                        <IonCardContent className="dashboard-card-content">
                                            <LineLoaderComponent/>
                                            <LineLoaderComponent/>
                                        </IonCardContent>
                                    </IonCol>
                                    <IonCol className="grid_for_dashboard_data_col">
                                        <IonCardContent className="dashboard-card-content">
                                            <LineLoaderComponent/>
                                            <LineLoaderComponent/>
                                        </IonCardContent>
                                    </IonCol>
                                </IonRow>
                                <IonRow className="grid_for_dashboard_data_row">
                                    {/* First Column */}
                                    <IonCol className="grid_for_dashboard_data_col">
                                        <IonCardContent className="dashboard-card-content">
                                            <LineLoaderComponent/>
                                            <LineLoaderComponent/>
                                        </IonCardContent>
                                    </IonCol>
                                    <IonCol className="grid_for_dashboard_data_col">
                                        <IonCardContent className="dashboard-card-content">
                                            <LineLoaderComponent/>
                                            <LineLoaderComponent/>
                                        </IonCardContent>
                                    </IonCol>
                                </IonRow>
                                <IonRow className="grid_for_dashboard_data_row">
                                    {/* First Column */}
                                    <IonCol className="grid_for_dashboard_data_col">
                                        <IonCardContent className="dashboard-card-content">
                                            <LineLoaderComponent/>
                                            <LineLoaderComponent/>
                                        </IonCardContent>
                                    </IonCol>
                                    <IonCol className="grid_for_dashboard_data_col">
                                        <IonCardContent className="dashboard-card-content">
                                            <LineLoaderComponent/>
                                            <LineLoaderComponent/>
                                        </IonCardContent>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                            :
                            <IonGrid className="grid_for_dashboard_data_grid">
                                <IonRow className="grid_for_dashboard_data_row">
                                    {/* First Column */}
                                    <IonCol onClick={()=>goToPage('/money-transaction')} className="grid_for_dashboard_data_col">
                                        <IonCard className="dashboard-card">
                                            <IonCardContent className="dashboard-card-content">
                                                <IonIcon icon={todaySharp} className="dashboard-icon"/>
                                                <div className="title_for_das_heading">Total Transactions</div>
                                                <div className="title_for_das_text">₹{dashboardCount?.total_transaction_amount}</div>
                                                <div className="title_for_das_text_link">
                                                    Click to open list
                                                    <IonIcon icon={arrowForwardOutline} className="arrow-icon" />
                                                </div>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>

                                    {/* Second Column */}
                                    <IonCol onClick={()=>goToPage('/game-history')} className="grid_for_dashboard_data_col">
                                        <IonCard className="dashboard-card">
                                            <IonCardContent className="dashboard-card-content">
                                                <IonIcon icon={cashSharp} className="dashboard-icon" />
                                                <div className="title_for_das_heading">Game Transactions</div>
                                                <div className="title_for_das_text">₹{dashboardCount?.game_transaction_amount}</div>
                                                <div className="title_for_das_text_link">
                                                    Click to open list
                                                    <IonIcon icon={arrowForwardOutline} className="arrow-icon" />
                                                </div>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                                <IonRow className="grid_for_dashboard_data_row">
                                    {/* First Column */}
                                    <IonCol onClick={()=>goToPage('/all-user-subscriptions')} className="grid_for_dashboard_data_col">
                                        <IonCard className="dashboard-card">
                                            <IonCardContent className="dashboard-card-content">
                                                <IonIcon icon={todaySharp} className="dashboard-icon"/>
                                                <div className="title_for_das_heading">{`Today's`} Earning</div>
                                                <div className="title_for_das_text">₹{dashboardCount?.todays_earning}</div>
                                                <div className="title_for_das_text_link">
                                                    Click to open list
                                                    <IonIcon icon={arrowForwardOutline} className="arrow-icon" />
                                                </div>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>

                                    {/* Second Column */}
                                    <IonCol onClick={()=>goToPage('/all-user-subscriptions')} className="grid_for_dashboard_data_col">
                                        <IonCard className="dashboard-card">
                                            <IonCardContent className="dashboard-card-content">
                                                <IonIcon icon={cashOutline} className="dashboard-icon" />
                                                <div className="title_for_das_heading">Total Earning</div>
                                                <div className="title_for_das_text">₹{dashboardCount?.total_earning}</div>
                                                <div className="title_for_das_text_link">
                                                    Click to open list
                                                    <IonIcon icon={arrowForwardOutline} className="arrow-icon" />
                                                </div>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                                <IonRow className="grid_for_dashboard_data_row">
                                    {/* First Column */}
                                    <IonCol onClick={()=>goToPage('/game-history')} className="grid_for_dashboard_data_col">
                                        <IonCard className="dashboard-card">
                                            <IonCardContent className="dashboard-card-content">
                                                <IonIcon icon={todaySharp} className="dashboard-icon"/>
                                                <div className="title_for_das_heading">{`Today's`} Betting</div>
                                                <div className="title_for_das_text">₹{dashboardCount?.todays_betting}</div>
                                                <div className="title_for_das_text_link">
                                                    Click to open list
                                                    <IonIcon icon={arrowForwardOutline} className="arrow-icon" />
                                                </div>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>

                                    {/* Second Column */}
                                    <IonCol onClick={()=>goToPage('/game-history')} className="grid_for_dashboard_data_col">
                                        <IonCard className="dashboard-card">
                                            <IonCardContent className="dashboard-card-content">
                                                <IonIcon icon={beakerSharp} className="dashboard-icon" />
                                                <div className="title_for_das_heading">Total Betting</div>
                                                <div className="title_for_das_text">₹{dashboardCount?.total_betting}</div>
                                                <div className="title_for_das_text_link">
                                                    Click to open list
                                                    <IonIcon icon={arrowForwardOutline} className="arrow-icon" />
                                                </div>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                                <IonRow className="grid_for_dashboard_data_row">
                                    {/* First Column */}
                                    <IonCol onClick={()=>goToPage('/all-user-subscriptions')} className="grid_for_dashboard_data_col">
                                        <IonCard className="dashboard-card">
                                            <IonCardContent className="dashboard-card-content">
                                                <IonIcon icon={todaySharp} className="dashboard-icon"/>
                                                <div className="title_for_das_heading">Active Subscriptions</div>
                                                <div className="title_for_das_text">{dashboardCount?.total_active_subscriptions}</div>
                                                <div className="title_for_das_text_link">
                                                    Click to open list
                                                    <IonIcon icon={arrowForwardOutline} className="arrow-icon" />
                                                </div>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>

                                    {/* Second Column */}
                                    <IonCol onClick={()=>goToPage('/all-user-subscriptions')} className="grid_for_dashboard_data_col">
                                        <IonCard className="dashboard-card">
                                            <IonCardContent className="dashboard-card-content">
                                                <IonIcon icon={beakerSharp} className="dashboard-icon" />
                                                <div className="title_for_das_heading">Total Subscriptions</div>
                                                <div className="title_for_das_text">{dashboardCount?.total_subscriptions}</div>
                                                <div className="title_for_das_text_link">
                                                    Click to open list
                                                    <IonIcon icon={arrowForwardOutline} className="arrow-icon" />
                                                </div>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                                <IonRow className="grid_for_dashboard_data_row">
                                    {/* First Column */}
                                    <IonCol className="grid_for_dashboard_data_col">
                                        <IonCard className="dashboard-card">
                                            <IonCardContent className="dashboard-card-content">
                                                <IonIcon icon={todaySharp} className="dashboard-icon"/>
                                                <div className="title_for_das_heading">Online Users</div>
                                                <div className="title_for_das_text">{dashboardCount?.online_users}</div>
                                                <div className="title_for_das_text_link">
                                                    Click to open list
                                                    <IonIcon icon={arrowForwardOutline} className="arrow-icon" />
                                                </div>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>

                                    {/* Second Column */}
                                    <IonCol className="grid_for_dashboard_data_col">
                                        <IonCard className="dashboard-card">
                                            <IonCardContent className="dashboard-card-content">
                                                <IonIcon icon={beakerSharp} className="dashboard-icon" />
                                                <div className="title_for_das_heading">Current Order</div>
                                                <div className="title_for_das_text">₹{dashboardCount?.total_betting_balance}</div>
                                                <div className="title_for_das_text_link">
                                                    Click to open list
                                                    <IonIcon icon={arrowForwardOutline} className="arrow-icon" />
                                                </div>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        }
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}
