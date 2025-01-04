import React, {useEffect} from "react";
import {IonContent, IonHeader, IonIcon, IonPage} from "@ionic/react";
import {arrowBack} from "ionicons/icons";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {actionToGetUserBetPredictionData} from "../redux/CommonAction";
import noDataImage from "../theme/img/no_data_img.png";
import moment from "moment-timezone";
import LineLoaderComponent from "../components/LineLoaderComponent";

export default function WinAndGoBettingMainPage() {
    const history = useHistory();
    const {gameBalance} = useSelector((state) => state.userWalletAndGameBalance);
    const {status,prediction} = useSelector((state) => state.userBetPredictionStatus);
    const userBetPredictionHistory = useSelector((state) => state.userBetPredictionHistory);
    const dispatch = useDispatch();
    const goBack = ()=>{
        history.goBack();
    }

    useEffect(() => {
        dispatch(actionToGetUserBetPredictionData());
    }, []);

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
                <div className="Wallet__C inner_page">
                    <div className="Wallet__C-balance">
                        <div className="Wallet__C-balance-l1">
                            <div>₹{gameBalance}</div>
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
                            <div>Current game play balance</div>
                        </div>
                    </div>
                </div>
                <div className="Betting__C">
                    {/*///////// WAITING MODE SECTION /////////*/}
                    {(!status) ?
                        <div className="Betting__C-mark">
                            <div>W</div>
                            <div>A</div>
                            <div>I</div>
                            <div>T</div>
                        </div>
                        :''
                    }
                    {/*///////// WAITING MODE SECTION /////////*/}
                    <div className={"Betting__C-numC"}>
                        <div className="Betting__C-numC-head">
                            Bet Prediction Tip
                        </div>
                        <div className={"GameList__C"}>
                            <div className={"GameList__C-item active"}>
                                <div>Win Go<br/>${prediction?.min} Min</div>
                            </div>
                            <div className={"GameList__C-item not_active"}>
                                <div className={"bet_pre_txt_1"}>{prediction?.option_name}</div>
                                <div className={"bet_pre_txt_2"}>₹{prediction?.amount ?? '0.00'}</div>
                            </div>
                        </div>
                        <div className={"TimeLeft__C TimeLeft__C-up"}>
                            <div className="TimeLeft__C-id">ID - {prediction?.bet_id}</div>
                            <div className="TimeLeft__C-time">
                                <div>0</div>
                                <div>0</div>
                                <div>:</div>
                                <div>2</div>
                                <div>6</div>
                            </div>
                        </div>
                    </div>
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
                            <div className="van-col van-col--9">Betting Id</div>
                            <div className="van-col van-col--5">Big Small</div>
                            <div className="van-col van-col--5">Time</div>
                        </div>
                    </div>
                    <div className={"GameRecord__C-body"}>
                        {(userBetPredictionHistory?.loading) ?
                            <LineLoaderComponent/>
                            :
                            (userBetPredictionHistory?.predictionHistory?.length) ?
                                (userBetPredictionHistory?.predictionHistory?.map((predictionHistory)=> (
                                    <div className="van-row" key={predictionHistory?.id}>
                                        <div className="van-col van-col--9">{predictionHistory?.bet_id}</div>
                                        <div className="van-col van-col--5">
                                            <span>{predictionHistory?.option_name}</span>
                                        </div>
                                        <div className="van-col van-col--5">
                                            <span>{moment(predictionHistory?.created_at)?.format('HH:mm')}</span>
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
            </IonContent>
        </IonPage>
    )
}