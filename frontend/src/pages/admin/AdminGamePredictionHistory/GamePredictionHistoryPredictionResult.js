import React, {useState} from "react";
import {
    IonCard,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonPage,
    IonRow
} from "@ionic/react";
import {arrowBack, arrowForwardOutline} from "ionicons/icons";
import {useHistory} from "react-router";

import {useDispatch, useSelector} from "react-redux";
import moment from "moment-timezone";
import {actionToGetPredictionHistoryData} from "../../../redux/CommonAction";

export default function GamePredictionHistoryPredictionResult() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {predictionResultData} = useSelector((state) => state.locallyStorePredictionHistoryData);
    const [totalBetDistribution, setTotalBetDistribution] = useState({allData:[],big:[], small:[], totalBigAmount:0, totalSmallAmount:0})

    const goBack = ()=>{
        history.goBack();
        window.history.back();
    }


    React.useEffect(()=>{
        if(predictionResultData){
            let betDistribution = predictionResultData.bet_distribution_json ? JSON.parse(predictionResultData.bet_distribution_json) : [];
            if(betDistribution){
                const smallGroup = betDistribution.filter(item => item.option_name.toUpperCase() === "SMALL");
                const bigGroup = betDistribution.filter(item => item.option_name.toUpperCase() === "BIG");

                console.log({smallGroup, bigGroup})
                setTotalBetDistribution({allData:betDistribution,big:bigGroup, small:smallGroup,
                    totalBigAmount: bigGroup[0]?.total_big_amount, totalSmallAmount: smallGroup[0]?.total_small_amount})
            }

        }
    },[predictionResultData])

    const goToPage = (page, data,type) => {
        let payload = {
            session_date :predictionResultData?.session_date,
            period_number: predictionResultData.period_number,
            type,
            data,
            volume: type === "BIG" ? totalBetDistribution.totalBigAmount : totalBetDistribution.totalSmallAmount
        }
        dispatch(actionToGetPredictionHistoryData(payload, "prediction_data_user_list"));
        history.push(page);
    }


    return (
        <IonPage  className={"home_welcome_page_container prediction-history-page"}>
            <IonHeader>
                <div className={"content-getbet content"}>
                    <div className="navbar">
                        <div className="navbar-fixed">
                            <div className="navbar__content">
                                <div onClick={goBack} className="navbar__content-left">
                                    <IonIcon icon={arrowBack} style={{ color: "#ffffff",width: "24px",height: "24px" }} />
                                </div>
                                <div className="navbar__content-center">
                                    <div className="navbar__content-title">
                                        <span>Prediction History</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </IonHeader>
            {/*<div className={"bet-container-sticky"}>*/}
            {/*    <div className={"van-sticky"}>*/}
            {/*        <div className="foot_insub">*/}
            {/*            <div className="progress">*/}
            {/*                <div className="step">Date: {predictionResultData ? moment(predictionResultData?.session_date).format('DD-MM-YYYY') : " - "}</div>*/}
            {/*            </div>*/}
            {/*            <div className="progress">*/}
            {/*                <div className="step">PERIOD NUMBER. {predictionResultData ? predictionResultData.period_number : " - "}</div>*/}
            {/*            </div>*/}
            {/*            <div className="progress">*/}
            {/*                <div className="step">TOTAL VOLUME - {predictionResultData ? (Number(totalBetDistribution.totalBigAmount ?? 0) + Number(totalBetDistribution.totalSmallAmount ?? 0)) : " - "}</div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <IonContent className={"content-theme-off-white-bg-color prediction-history"}>
                <div className={"bet-content__box"}>
                    {/* DATE */}
                    <div className="info-card">
                        <strong>DATE:</strong> {predictionResultData ? moment(predictionResultData?.session_date).format('DD-MM-YYYY') : " - "}
                    </div>
                    <div className="info-card"><strong>PERIOD NUMBER:</strong> {predictionResultData ? predictionResultData.period_number : " - "}</div>
                    <div className="info-card"><strong>TOTAL VOLUME:</strong> {predictionResultData ? (Number(totalBetDistribution.totalBigAmount ?? 0) + Number(totalBetDistribution.totalSmallAmount ?? 0)) : " - "}</div>
                    <div className={"infiniteScroll"}>
                        <div className={"infiniteScroll__loading"}>
                            {(predictionResultData && totalBetDistribution.allData?.length) ?
                                <div className={"sysMessage__container"}>
                                    {/*<div className="add_money_game_wallet_heading">*/}
                                    {/*    <h1>PREDICTION</h1>*/}
                                    {/*</div>*/}
                                    {/*<div className={"list_status_type"}>*/}
                                    {/*    <div className={"update_user_game_prev_result_button"}>*/}
                                    {/*        <div > SMALL</div>*/}
                                    {/*        <div > BIG</div>*/}
                                    {/*    </div>*/}
                                    {/*    <div className={"update_user_game_prev_result_button"}>*/}
                                    {/*        <div className={"order-bet-game-button"}>*/}
                                    {/*            {totalBetDistribution.totalSmallAmount ?? 0}*/}
                                    {/*        </div>*/}
                                    {/*        <div className={"exit-from-game-button big"}>*/}
                                    {/*            {totalBetDistribution.totalBigAmount ?? 0}*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className={"list_status_type"} style={{paddingTop: '2rem'}}>
                                        <div className="getbet-title getbet-line" >
                                            <div className="getbet-title-left">
                                                <span>PREDICTION</span>
                                            </div>
                                        </div>
                                        <div className="">
                                            <IonGrid
                                                className="grid_for_dashboard_data_grid ">
                                                <IonRow className="grid_for_dashboard_data_row dashboard_big_small_prediction">
                                                    {/* First Column */}
                                                    <IonCol className="grid_for_dashboard_data_col">
                                                        <IonCard className="dashboard-card dashboard_prediction_card">
                                                            <div className={"bet-label"}> SMALL</div>
                                                            <div className={"order-bet-game-button bet-box small-box"}>
                                                                {totalBetDistribution.totalSmallAmount ?? 0}
                                                            </div>
                                                        </IonCard>
                                                    </IonCol>

                                                    {/* Second Column */}
                                                    <IonCol className="grid_for_dashboard_data_col">
                                                        <IonCard className="dashboard-card dashboard_prediction_card">
                                                            <div className={"bet-label"}> BIG</div>
                                                            <div className={"exit-from-game-button big bet-box big-box"}>
                                                                {totalBetDistribution.totalBigAmount ?? 0}
                                                            </div>
                                                        </IonCard>
                                                    </IonCol>
                                                </IonRow>
                                            </IonGrid>
                                        </div>
                                    </div>
                                    <div className={"list_status_type"} style={{paddingTop: '2rem'}}>
                                        <div className="getbet-title getbet-line" >
                                            <div className="getbet-title-left">
                                                <span>USER COUNT</span>
                                            </div>
                                        </div>
                                        <div className="">
                                            <IonGrid
                                                className="grid_for_dashboard_data_grid">
                                                <IonRow className="grid_for_dashboard_data_row dashboard_big_small_prediction">
                                                    {/* First Column */}
                                                    <IonCol className="grid_for_dashboard_data_col" onClick={()=>goToPage('/prediction-history-user-list', totalBetDistribution.small, 'SMALL')}>
                                                        <IonCard className="dashboard-card prediction-small-big-count-box">
                                                            <div className={"exit-from-game-button small"}>
                                                                {totalBetDistribution.small?.length ?? 0}
                                                            </div>
                                                            <div className="title_for_das_text_link">
                                                                Click to open
                                                                <IonIcon icon={arrowForwardOutline} className="arrow-icon"/>
                                                            </div>
                                                        </IonCard>
                                                    </IonCol>

                                                    {/* Second Column */}
                                                    <IonCol onClick={() => goToPage('/prediction-history-user-list', totalBetDistribution.big, "BIG")}
                                                            className="grid_for_dashboard_data_col">
                                                        <IonCard className="dashboard-card prediction-small-big-count-box">
                                                            <div className={"exit-from-game-button big"}>
                                                                {totalBetDistribution.big?.length ?? 0}
                                                            </div>
                                                            <div className="title_for_das_text_link">
                                                                Click to open
                                                                <IonIcon icon={arrowForwardOutline} className="arrow-icon"/>
                                                            </div>
                                                        </IonCard>
                                                    </IonCol>
                                                </IonRow>
                                            </IonGrid>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className={"empty__container empty"}>
                                    <svg className={"svg-icon icon-empty"} xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 20 20">
                                        <path fill="#555"
                                              d="M12.8890921,0 L17.5,5.19179195 L17.5,19.0909091 C17.5,19.5929861 17.1049571,20 16.6176471,20 L3.38235294,20 C2.89504287,20 2.5,19.5929861 2.5,19.0909091 L2.5,0.909090909 C2.5,0.407013864 2.89504287,0 3.38235294,0 L12.8890921,0 Z M12.3061651,1.36363636 L3.82352941,1.36363636 L3.82352941,18.6363636 L16.1764706,18.6363636 L16.176511,6.34246852 L13.3474204,6.34196239 C12.6417682,6.36999151 12.0962002,6.25589945 11.706457,5.94817639 C11.2531904,5.59029821 11.0867064,4.98037308 11.10865,4.16662087 L11.10865,1.36739306 L12.31,1.367 L12.3061651,1.36363636 Z M9.01509627,14.9791746 C9.40494433,14.9791746 9.72097863,15.2922622 9.72097863,15.6784753 C9.72097863,16.0646884 9.40494433,16.377776 9.01509627,16.377776 C8.62524821,16.377776 8.30921392,16.0646884 8.30921392,15.6784753 C8.30921392,15.2922622 8.62524821,14.9791746 9.01509627,14.9791746 Z M11.1827155,8.48219134 C11.7596649,9.06011092 11.9556072,9.75942613 11.8818293,10.4800176 C11.8265271,11.0201556 11.4779753,11.5509802 10.9947767,12.0505594 L10.9460794,12.1005594 L10.9460794,12.1005594 L10.8408488,12.2063462 C10.7641308,12.2825287 10.6701753,12.3741416 10.534329,12.5058727 C10.3893855,12.6464238 10.2890121,12.7442705 10.2120648,12.8206852 L10.1115703,12.9218921 C10.0821667,12.9520424 10.0559765,12.9794937 10.0303569,13.006905 C9.82641639,13.2251078 9.76260226,13.3170885 9.72854047,13.4181966 C9.69459728,13.5189526 9.64965619,13.73941 9.60228918,14.0591422 C9.54714237,14.4313887 9.20954705,14.6870941 8.84824894,14.6302762 C8.48695082,14.5734583 8.23876616,14.2256328 8.29391297,13.8533862 C8.35258575,13.4573391 8.4111532,13.1700378 8.47818729,12.9710557 C8.58800251,12.6450833 8.75186564,12.4088935 9.07699042,12.0610316 C9.20092661,11.9284281 9.31857892,11.8121689 9.62440373,11.5156121 C9.85403277,11.2929392 9.95768805,11.1909631 10.0572705,11.0880047 C10.3397662,10.7959324 10.5516497,10.4732459 10.5656029,10.3369643 C10.5996372,10.0045498 10.5199654,9.72020231 10.2601126,9.45991256 C9.9148549,9.11407421 9.49243177,8.95163821 9.06509601,8.9849994 C8.57490635,9.02326746 8.18677184,9.20493363 7.86942647,9.56406039 C7.63826622,9.82565499 7.48192741,10.1361318 7.39737772,10.5061904 C7.31363213,10.8727296 6.9573436,11.0999218 6.60158501,11.0136385 C6.24582642,10.9273551 6.02531631,10.56027 6.10906189,10.1937308 C6.24453674,9.60078215 6.50611003,9.08131772 6.89074945,8.64603703 C7.44488347,8.01894624 8.15005931,7.68888903 8.96509653,7.62526082 C9.77527949,7.56201157 10.5686439,7.86708705 11.1827155,8.48219134 Z M12.384,1.45 L12.4321669,1.50876156 L12.4319299,4.18534141 C12.4202482,4.62352755 12.4794774,4.84051752 12.5115121,4.86581065 C12.6070703,4.9412589 12.8701302,4.99627139 13.3219266,4.97883216 L15.5154486,4.97883216 L15.8904383,5.40279396 L16.1764706,5.7215246 L12.384,1.45 Z"/>
                                    </svg>
                                    <p>No data</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </IonContent>


        </IonPage>
    )
}
