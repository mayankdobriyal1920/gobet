import React, {useEffect, useState} from "react";
import {IonAlert, IonContent, IonHeader, IonIcon, IonPage, useIonAlert} from "@ionic/react";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    actionToCancelNextBetOrderActivateUser, actionToGetAdminGameResultListData,
    actionToGetBetActiveUserData,
    actionToGetBetGameSessionData,
    actionToGetGameLastResultData, actionToGetUserActiveSubscriptionData,
    actionToGetUserBetPredictionData,
    actionToGetUserBetPredictionHistory,
    actionToGetUserWalletAndGameBalance, actionToInactiveCurrentSession,
    actionToMakeCurrentUserInactive,
    actionToOrderNextBetActivateUser, actionToUpdatePreviousGameResult
} from "../redux/CommonAction";
import noDataImage from "../theme/img/no_data_img.png";
import moment from "moment-timezone";
import LineLoaderComponent from "../components/LineLoaderComponent";
import {_formatTimeMMSS} from "../redux/CommonHelper";
import useAppNavigationHandler from "../hooks/useAppNavigationHandler";
import useKeepAwake from "../hooks/useKeepAwake";
import {arrowBack} from "ionicons/icons";

export default function WinAndGoBettingMainPage() {
    const history = useHistory();
    const {subscriptionData} = useSelector((state) => state.userSubscriptionData);
    const {bettingBalance} = useSelector((state) => state.userWalletAndGameBalance);
    const {status,prediction,timer} = useSelector((state) => state.userBetPredictionStatus);
    const userBetPredictionHistory = useSelector((state) => state.userBetPredictionHistory);
    const {userInfo} = useSelector((state) => state.userAuthDetail);
    const userGameHistory = useSelector((state) => state.adminGameResultList);
    const {activeUserData} = useSelector((state) => state.betActiveUserData);
    const {loading,sessionData} = useSelector((state) => state.betGameSessionData);
    const gameLastResult = useSelector((state) => state.gameLastResult);
    const [lowBalanceAlert,setLowBalanceAlert] = useState(false);
    const [loadingStatus,setLoadingStatus] = useState(false);
    const dispatch = useDispatch();
    const {session_id} = useParams();
    const [presentAlert] = useIonAlert();

    useKeepAwake();
    const goBack = ()=>{
        history.goBack();
        window.history.back();
        dispatch(actionToGetUserWalletAndGameBalance())
        callFunctionToHandleAppExit();
    }

    useAppNavigationHandler(goBack);

    const callFunctionToHandleAppExit = ()=>{
        if(userInfo?.role === 1) {
            dispatch(actionToInactiveCurrentSession(session_id));
        }else{
            if(status !== 2 && status !== 1){
                dispatch(actionToMakeCurrentUserInactive(activeUserData?.id));
            }
        }
    }

    useEffect(() => {
        if(userInfo?.role === 1) {
            dispatch(actionToGetGameLastResultData(session_id));
            dispatch(actionToGetAdminGameResultListData(false,{session_id:session_id,created_at:moment().format('YYYY-MM-DD')}))
        }else{
            dispatch(actionToGetUserBetPredictionHistory());
            dispatch(actionToGetBetActiveUserData(true,true));
        }
        dispatch(actionToGetBetGameSessionData(session_id));
     }, [session_id]);

    const orderNextBetActivateUser = (betId)=>{

        if(sessionData?.id && sessionData?.is_active && moment().isBetween(
            moment(`${moment().format('YYYY-MM-DD')} ${sessionData?.start_time}`),
            moment(`${moment().format('YYYY-MM-DD')} ${sessionData?.end_time}`),
            null,
            '[]' // Inclusive of both start and end times
        )) {
            if (subscriptionData?.id && subscriptionData?.balance >= 10 && bettingBalance >= 10) {
                if(loadingStatus) {
                    setLoadingStatus(true);
                    dispatch(actionToOrderNextBetActivateUser(betId,setLoadingStatus));
                }
            } else {
                setLowBalanceAlert(true);
            }
        }else{
            presentAlert({
                header: "Alert",
                cssClass: 'custom_site_alert_toast',
                subHeader: "Session Expired",
                message: "Sorry, your bet can't be placed. The session is expired.",
                buttons: [
                    {
                        text: "OK",
                        handler: () => {
                            goBack();
                        },
                    },
                ],
            });
        }
    }

    const cancelNextBetOrderActivateUser = (betId)=>{
        if(!loadingStatus) {
            setLoadingStatus(true);
            dispatch(actionToCancelNextBetOrderActivateUser(betId, setLoadingStatus));
        }
    }

    const callFunctionToInactiveCurrentSession = ()=>{
        presentAlert({
            header: "Alert",
            cssClass: 'custom_site_alert_toast',
            subHeader: "Are you sure?",
            message: "You want to make current session inactive.",
            buttons: [
                {
                    text: "OK",
                    handler: () => {
                        dispatch(actionToInactiveCurrentSession(session_id));
                        goBack();
                    },
                },
            ],
        });
    }

    const updatePreviousGameResult = (result,gameResultId)=>{
        if(!loadingStatus) {
            setLoadingStatus(true);
            dispatch(actionToUpdatePreviousGameResult(result, gameResultId, session_id, setLoadingStatus));
        }
    }

    useEffect(()=>{
        const handlePopState = ()=>{
            callFunctionToHandleAppExit();
        }
        window.addEventListener('popstate',handlePopState);
        return()=>{
            window.removeEventListener('popstate',handlePopState)
        }

    },[])

    useEffect(()=>{
        if(timer === 60){
            if(userInfo?.role === 1) {
                dispatch(actionToGetGameLastResultData(session_id,false));
              }else{
                dispatch(actionToGetUserBetPredictionHistory(false));
                dispatch(actionToGetBetActiveUserData(false,false));
                dispatch(actionToGetUserBetPredictionData(activeUserData?.id));
                dispatch(actionToGetUserWalletAndGameBalance());
                dispatch(actionToGetUserActiveSubscriptionData());
            }
            setTimeout(()=>{
                dispatch(actionToGetBetGameSessionData(session_id,false));
            },1000 * 40)
        }
    },[timer,activeUserData])

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
                                        <span>Win Go</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </IonHeader>
            <IonContent className={"content-theme-off-white-bg-color"}>
                {(loading) ?
                    <React.Fragment>
                        <LineLoaderComponent/>
                        <LineLoaderComponent/>
                        <LineLoaderComponent/>
                        <LineLoaderComponent/>
                        <LineLoaderComponent/>
                        <LineLoaderComponent/>
                        <LineLoaderComponent/>
                    </React.Fragment>
                    : (sessionData?.id && sessionData?.is_active && moment().isBetween(
                        moment(`${moment().format('YYYY-MM-DD')} ${sessionData?.start_time}`),
                        moment(`${moment().format('YYYY-MM-DD')} ${sessionData?.end_time}`),
                        null,
                        '[]' // Inclusive of both start and end times
                    )) ?
                        <React.Fragment>
                            {(userInfo?.role !== 1) ?
                                <div className="Wallet__C inner_page">
                                    <div className="Wallet__C-balance">
                                        <div className="Wallet__C-balance-l1">
                                            <div>₹{bettingBalance}</div>
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
                                    </div>
                                </div>
                                :''
                            }
                            <div className="Betting__C">
                                {(timer >= 10) ?
                                    <div className={"Betting__C-numC"}>
                                        <div className={"order_ber_button_section"}>
                                            {(userInfo?.role !== 1) ?
                                                <div className={"order_button_and_text"}>
                                                    {(activeUserData?.status !== 1) ?
                                                        <React.Fragment>
                                                            <button
                                                                onClick={() => orderNextBetActivateUser(activeUserData?.id)}
                                                                type={"button"} className={"order-bet-game-button"}>
                                                                ORDER BET
                                                            </button>
                                                            <button onClick={goBack} type={"button"}
                                                                    className={"exit-from-game-button"}>
                                                                EXIT GAME
                                                            </button>
                                                        </React.Fragment>
                                                        :
                                                        <button
                                                            onClick={() => cancelNextBetOrderActivateUser(activeUserData?.id)}
                                                            type={"button"}
                                                            className={"order-bet-game-button cancel_button"}>
                                                            CANCEL NEXT BET ORDER
                                                        </button>
                                                    }
                                                </div>
                                                :
                                                <div className={"order_button_and_text"}>
                                                    <button
                                                        onClick={() => callFunctionToInactiveCurrentSession()}
                                                        type={"button"}
                                                        className={"order-bet-game-button cancel_button"}>
                                                        INACTIVE CURRENT SESSION
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                        {(userInfo?.role === 1) ?
                                            <React.Fragment>
                                                {(gameLastResult?.gameResult?.id) ?
                                                    <div className={"update_user_game_prev_result"}>
                                                        <div className={"text_up"}>
                                                            UPDATE PREVIOUS GAME
                                                            RESULT <br/> {gameLastResult?.gameResult?.game_id}
                                                        </div>
                                                        <div className={"update_user_game_prev_result_button"}>
                                                            <button
                                                                onClick={() => updatePreviousGameResult('SMALL', gameLastResult?.gameResult?.id)}
                                                                type={"button"} className={"order-bet-game-button"}>
                                                                SMALL
                                                            </button>
                                                            <button
                                                                onClick={() => updatePreviousGameResult('BIG', gameLastResult?.gameResult?.id)}
                                                                type={"button"}
                                                                className={"exit-from-game-button big"}>
                                                                BIG
                                                            </button>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="Betting__C-mark">
                                                        <div>W</div>
                                                        <div>A</div>
                                                        <div>I</div>
                                                        <div>T</div>
                                                    </div>
                                                }
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                {(prediction?.bet_id) ?
                                                    <div className={"GameList__C"}>
                                                        <div className={"GameList__C-item active"}>
                                                            <div>Win Go<br/>{prediction?.min} Min</div>
                                                        </div>
                                                        <div className={"GameList__C-item not_active"}>
                                                            <div className={"bet_pre_txt_1"}>{prediction?.option_name}</div>
                                                            <div
                                                                className={"bet_pre_txt_2"}>₹{prediction?.amount ?? '0.00'}</div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="Betting__C-mark">
                                                        <div>W</div>
                                                        <div>A</div>
                                                        <div>I</div>
                                                        <div>T</div>
                                                    </div>
                                                }
                                            </React.Fragment>
                                        }
                                        <div className={"TimeLeft__C TimeLeft__C-up"}>
                                            {(prediction?.bet_id) &&
                                                <div className="TimeLeft__C-id">ID - {prediction?.bet_id}</div>
                                            }
                                            {(timer) ?
                                                <div className="TimeLeft__C-time">
                                                    <div>{_formatTimeMMSS(timer)[0]}</div>
                                                    <div>{_formatTimeMMSS(timer)[1]}</div>
                                                    <div>{_formatTimeMMSS(timer)[2]}</div>
                                                    <div>{_formatTimeMMSS(timer)[3]}</div>
                                                    <div>{_formatTimeMMSS(timer)[4]}</div>
                                                </div>
                                                :
                                                <div className="TimeLeft__C-time">
                                                    <div>0</div>
                                                    <div>0</div>
                                                    <div>:</div>
                                                    <div>0</div>
                                                    <div>0</div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className={"Betting__C-numC"}>
                                        <div className="Betting__C-mark full_screen_timer">
                                            <div>{timer}</div>
                                        </div>
                                    </div>
                                }
                            </div>
                            {(userInfo?.role !== 1) ?
                                <div className={"GameRecord__C game-record"}>
                                    <div className="getbet-title getbet-line">
                                        <div className="getbet-title-left">
                                            <span>Prediction History</span>
                                        </div>
                                    </div>
                                    <div className="GameRecord__C-head">
                                        <div className="van-row">
                                            <div className="van-col van-col--9">Period</div>
                                            <div className="van-col van-col--5">Option</div>
                                            <div className="van-col van-col--5">Amount</div>
                                        </div>
                                    </div>
                                    <div className={"GameRecord__C-body"}>
                                        {(userBetPredictionHistory?.loading) ?
                                            <LineLoaderComponent/>
                                            :
                                            (userBetPredictionHistory?.predictionHistory?.length) ?
                                                (userBetPredictionHistory?.predictionHistory?.map((predictionHistory) => (
                                                    <div className="van-row" key={predictionHistory?.id}>
                                                        <div
                                                            className="van-col van-col--9">{predictionHistory?.bet_id}</div>
                                                        <div className="van-col van-col--5">
                                                            <span>{predictionHistory?.option_name}</span>
                                                        </div>
                                                        <div className="van-col van-col--5">
                                                            <span>₹{predictionHistory?.amount}</span>
                                                        </div>
                                                    </div>
                                                )))
                                                :
                                                <div className={"no_data_img"}>
                                                    <img src={noDataImage} alt={'noDataImage'}/>
                                                </div>
                                        }
                                    </div>
                                </div>
                                :
                                <div className={"GameRecord__C game-record game-result-records"}>
                                    <div className="getbet-title getbet-line">
                                        <div className="getbet-title-left">
                                            <span>Game Results</span>
                                        </div>
                                    </div>
                                    <div className={"GameRecord__C-body"}>
                                        {(userGameHistory?.loading) ?
                                            <LineLoaderComponent/>
                                            : (userGameHistory?.gameResult?.length) ?
                                                <div className={"sysMessage__container_game_result"}>

                                                    {(userGameHistory?.gameResult?.map((dataItems)=> (
                                                        <div key={dataItems?.id} className="sysMessage__container-msgWrapper__item">
                                                            <div className="sysMessage__container-msgWrapper__item-title">
                                                                <div>
                                                                    <span className={"title"}>Period: {dataItems?.game_id}</span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="sysMessage__container-msgWrapper__item-time">
                                                                <strong>GAME ID
                                                                    :</strong> {dataItems?.game_id}
                                                                <br/>
                                                                <strong>GAME TYPE
                                                                    :</strong> {dataItems?.game_type?.replace('_', ' ').toUpperCase()}
                                                                <br/>
                                                                <strong>GAME RESULT
                                                                    :</strong> {dataItems?.result ? dataItems?.result : 'PENDING'}
                                                            </div>
                                                            <div
                                                                className="sysMessage__container-msgWrapper__item-content">
                                                            Created at date
                                                                time {moment(dataItems?.created_at).format('YYYY/MM/DD hh:mm a')}
                                                            </div>
                                                        </div>
                                                    )))}

                                                </div>
                                                :
                                                <div className={"no_data_img"}>
                                                    <img src={noDataImage} alt={'noDataImage'}/>
                                                </div>
                                        }
                                    </div>
                                </div>
                            }
                        </React.Fragment>
                        :
                        <div className={"empty__container empty"}>
                            <svg className={"svg-icon icon-empty"} xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path fill="#555"
                                      d="M12.8890921,0 L17.5,5.19179195 L17.5,19.0909091 C17.5,19.5929861 17.1049571,20 16.6176471,20 L3.38235294,20 C2.89504287,20 2.5,19.5929861 2.5,19.0909091 L2.5,0.909090909 C2.5,0.407013864 2.89504287,0 3.38235294,0 L12.8890921,0 Z M12.3061651,1.36363636 L3.82352941,1.36363636 L3.82352941,18.6363636 L16.1764706,18.6363636 L16.176511,6.34246852 L13.3474204,6.34196239 C12.6417682,6.36999151 12.0962002,6.25589945 11.706457,5.94817639 C11.2531904,5.59029821 11.0867064,4.98037308 11.10865,4.16662087 L11.10865,1.36739306 L12.31,1.367 L12.3061651,1.36363636 Z M9.01509627,14.9791746 C9.40494433,14.9791746 9.72097863,15.2922622 9.72097863,15.6784753 C9.72097863,16.0646884 9.40494433,16.377776 9.01509627,16.377776 C8.62524821,16.377776 8.30921392,16.0646884 8.30921392,15.6784753 C8.30921392,15.2922622 8.62524821,14.9791746 9.01509627,14.9791746 Z M11.1827155,8.48219134 C11.7596649,9.06011092 11.9556072,9.75942613 11.8818293,10.4800176 C11.8265271,11.0201556 11.4779753,11.5509802 10.9947767,12.0505594 L10.9460794,12.1005594 L10.9460794,12.1005594 L10.8408488,12.2063462 C10.7641308,12.2825287 10.6701753,12.3741416 10.534329,12.5058727 C10.3893855,12.6464238 10.2890121,12.7442705 10.2120648,12.8206852 L10.1115703,12.9218921 C10.0821667,12.9520424 10.0559765,12.9794937 10.0303569,13.006905 C9.82641639,13.2251078 9.76260226,13.3170885 9.72854047,13.4181966 C9.69459728,13.5189526 9.64965619,13.73941 9.60228918,14.0591422 C9.54714237,14.4313887 9.20954705,14.6870941 8.84824894,14.6302762 C8.48695082,14.5734583 8.23876616,14.2256328 8.29391297,13.8533862 C8.35258575,13.4573391 8.4111532,13.1700378 8.47818729,12.9710557 C8.58800251,12.6450833 8.75186564,12.4088935 9.07699042,12.0610316 C9.20092661,11.9284281 9.31857892,11.8121689 9.62440373,11.5156121 C9.85403277,11.2929392 9.95768805,11.1909631 10.0572705,11.0880047 C10.3397662,10.7959324 10.5516497,10.4732459 10.5656029,10.3369643 C10.5996372,10.0045498 10.5199654,9.72020231 10.2601126,9.45991256 C9.9148549,9.11407421 9.49243177,8.95163821 9.06509601,8.9849994 C8.57490635,9.02326746 8.18677184,9.20493363 7.86942647,9.56406039 C7.63826622,9.82565499 7.48192741,10.1361318 7.39737772,10.5061904 C7.31363213,10.8727296 6.9573436,11.0999218 6.60158501,11.0136385 C6.24582642,10.9273551 6.02531631,10.56027 6.10906189,10.1937308 C6.24453674,9.60078215 6.50611003,9.08131772 6.89074945,8.64603703 C7.44488347,8.01894624 8.15005931,7.68888903 8.96509653,7.62526082 C9.77527949,7.56201157 10.5686439,7.86708705 11.1827155,8.48219134 Z M12.384,1.45 L12.4321669,1.50876156 L12.4319299,4.18534141 C12.4202482,4.62352755 12.4794774,4.84051752 12.5115121,4.86581065 C12.6070703,4.9412589 12.8701302,4.99627139 13.3219266,4.97883216 L15.5154486,4.97883216 L15.8904383,5.40279396 L16.1764706,5.7215246 L12.384,1.45 Z"/>
                            </svg>
                            <p>Session expired</p>
                        </div>
                }
            </IonContent>
            <IonAlert
                header="Sorry!!"
                message="Insufficient balance in your betting balance or subscription balance. The balance must be greater than or equal to 10."
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
        </IonPage>
    )
}