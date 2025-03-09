import React, {useEffect} from "react";
import {IonContent, IonHeader, IonIcon, IonPage} from "@ionic/react";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    actionToCancelNextBetOrderActivateUser,
    actionToGetBetActiveUserData,
    actionToGetBetGameSessionData,
    actionToGetGameLastResultData,
    actionToGetUserBetPredictionData,
    actionToGetUserBetPredictionHistory,
    actionToGetUserWalletAndGameBalance,
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
    const {bettingBalance} = useSelector((state) => state.userWalletAndGameBalance);
    const {status,prediction,timer} = useSelector((state) => state.userBetPredictionStatus);
    const userBetPredictionHistory = useSelector((state) => state.userBetPredictionHistory);
    const {userInfo} = useSelector((state) => state.userAuthDetail);
    const {activeUserData} = useSelector((state) => state.betActiveUserData);
    const {loading,sessionData} = useSelector((state) => state.betGameSessionData);
    const gameLastResult = useSelector((state) => state.gameLastResult);
    const dispatch = useDispatch();
    const {session_id} = useParams();
    useKeepAwake();
    const goBack = ()=>{
        history.goBack();
        window.history.back();
        dispatch(actionToGetUserWalletAndGameBalance())
        callFunctionToHandleAppExit();
    }

    useAppNavigationHandler(goBack);

    const callFunctionToHandleAppExit = ()=>{
        if(status !== 2 && status !== 1){
            dispatch(actionToMakeCurrentUserInactive(activeUserData?.id));
        }
    }

    useEffect(() => {
        dispatch(actionToGetUserBetPredictionHistory());
        dispatch(actionToGetBetActiveUserData());
        dispatch(actionToGetBetGameSessionData(session_id));
        dispatch(actionToGetGameLastResultData(session_id));
    }, [session_id]);

    const orderNextBetActivateUser = (betId)=>{
        dispatch(actionToOrderNextBetActivateUser(betId));
    }

    const cancelNextBetOrderActivateUser = (betId)=>{
        dispatch(actionToCancelNextBetOrderActivateUser(betId));
    }

    const updatePreviousGameResult = (result,gameResultId)=>{
        dispatch(actionToUpdatePreviousGameResult(result,gameResultId,session_id));
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
            dispatch(actionToGetUserBetPredictionData(activeUserData?.id));
            dispatch(actionToGetGameLastResultData(session_id));
        }
    },[timer,activeUserData])

    useEffect(()=>{
        dispatch(actionToGetUserBetPredictionData(activeUserData?.id))
    },[activeUserData])


    return (
        <IonPage className={"home_welcome_page_container"}>
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
                    :(sessionData?.id && sessionData?.is_active && moment().isBetween(
                        moment(sessionData?.start_time, 'HH:mm:ss'),
                        moment(sessionData?.end_time, 'HH:mm:ss'),
                        null,
                        '[]' // Inclusive of both start and end times
                    )) ?
                   <React.Fragment>
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
                    <div className="Betting__C">
                        {(timer >= 10) ?
                            <div className={"Betting__C-numC"}>
                                <div className={"order_ber_button_section"}>
                                    <div className={"order_button_and_text"}>
                                        {(prediction?.status !== 1) ?
                                            <React.Fragment>
                                                <button onClick={()=>orderNextBetActivateUser(activeUserData?.id)} type={"button"} className={"order-bet-game-button"}>
                                                    ORDER BET
                                                </button>
                                                <button onClick={goBack} type={"button"} className={"exit-from-game-button"}>
                                                    EXIT GAME
                                                </button>
                                            </React.Fragment>
                                            :
                                            <button onClick={()=>cancelNextBetOrderActivateUser(activeUserData?.id)} type={"button"} className={"order-bet-game-button cancel_button"}>
                                                CANCEL NEXT BET ORDER
                                            </button>
                                        }
                                    </div>
                                </div>
                                {(prediction?.bet_id) ?
                                    <div className={"GameList__C"}>
                                        <div className={"GameList__C-item active"}>
                                            <div>Win Go<br/>{prediction?.min} Min</div>
                                        </div>
                                        <div className={"GameList__C-item not_active"}>
                                            <div className={"bet_pre_txt_1"}>{prediction?.option_name}</div>
                                            <div className={"bet_pre_txt_2"}>₹{prediction?.amount ?? '0.00'}</div>
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
                                {(userInfo?.role === 1 && gameLastResult?.gameResult?.id) ?
                                    <div className={"update_user_game_prev_result"}>
                                        {(gameLastResult?.gameResult?.result) ?
                                            <div className={"text_up"}>
                                                PREVIOUS GAME RESULT
                                                - <strong>{gameLastResult?.gameResult?.result}</strong>
                                            </div>
                                            :
                                            ''
                                        }
                                        <div className={"text_up"}>
                                            UPDATE PREVIOUS GAME RESULT
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
                                    ''
                                }
                            </div>
                            :
                                    <div className={"Betting__C-numC"}>
                                <div className="Betting__C-mark full_screen_timer">
                                    <div>{timer}</div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className={"TimeLeft__C_bottom TimeLeft__C"}>
                    <div className="TimeLeft__C-id">
                            {(status) ?
                                <>Please check the above bet prediction and ensure you place this bet within the given time. If you lose, we will refund your bet amount to your main wallet in our app.</>
                                :
                                <>You are in waiting mode. Please stay on this page while we provide your bet prediction.</>
                            }
                        </div>
                    </div>
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
                                    (userBetPredictionHistory?.predictionHistory?.map((predictionHistory)=> (
                                        <div className="van-row" key={predictionHistory?.id}>
                                            <div className="van-col van-col--9">{moment(predictionHistory?.created_at).format('YYYY-MM-DD HH:mm')}</div>
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
                </React.Fragment>
                   :''
                }
            </IonContent>
        </IonPage>
    )
}