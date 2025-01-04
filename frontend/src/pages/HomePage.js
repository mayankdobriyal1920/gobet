import React, {useState} from "react";
import {IonAlert, IonContent, IonHeader, IonLoading, IonPage} from "@ionic/react";
import {useDispatch, useSelector} from "react-redux";
import siteSmallIcon from "../theme/img/site-logo-small-white.png";
import aviatorGame from "../theme/img/aviator.png";
import wingoGame from "../theme/img/wingoGame.png";
import limboGame from "../theme/img/limboGame.png";
import {useHistory} from "react-router-dom";
import {actionToUpdateUserAliveForGame} from "../redux/CommonAction";

export default function HomePage() {
    const {walletBalance,gameBalance} = useSelector((state) => state.userWalletAndGameBalance);
    const history = useHistory();
    const [userEnterInGameConfirm,setUserEnterInGameConfirm] = useState(false);
    const [userEnterLoading,setUserEnterLoading] = useState(false);
    const dispatch = useDispatch();
    const goToPage = (page)=>{
        history.push(page);
    }
    const callFunctionToEnterInGame = ()=>{
        goToPage('/win-go-betting');
        setUserEnterLoading(false);
    }
    const callFunctionToDeductBalanceAndEnterInGame = ()=>{
        setUserEnterLoading(true);
        dispatch(actionToUpdateUserAliveForGame(callFunctionToEnterInGame))
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
                                <div className="navbar__content-right">
                                    <div className="content-getbet__right">
                                        <div className="message">
                                            Wallet Balance
                                            ₹{walletBalance ? walletBalance : '0.00'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </IonHeader>
            <IonContent>
                <div className="Wallet__C">
                    <div className="Wallet__C-balance">
                        <div className="Wallet__C-balance-l1">
                            <div>₹{gameBalance ? gameBalance : '0.00'}</div>
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
                        <div className="Wallet__C-balance-l3">
                            <div>Add Money</div>
                        </div>
                    </div>
                </div>
                <div className="getbet__container_main_body">
                    <div className="getbet-title getbet-line">
                        <div className="getbet-title-left">
                            <span>Betting Apps</span>
                        </div>
                    </div>
                    <div className="getbet__container allGame">
                        <div onClick={()=>setUserEnterInGameConfirm(true)} className="item">
                            <img className="gameImg"
                                 src={wingoGame}/>
                        </div>
                        <div onClick={()=>goToPage('/win-go-betting')} className="item">
                            <img className="gameImg"
                                 src={aviatorGame}/>
                        </div>
                        <div onClick={()=>goToPage('/win-go-betting')} className="item">
                            <img className="gameImg"
                                 src={limboGame}/>
                        </div>
                    </div>
                </div>
                <div className="first_list-item processing_fee_container">
                    <div className="head">
                        <div className="title">
                            Processing Fee
                        </div>
                        <div className="orange">1%</div>
                    </div>
                    <div className="description">
                        We deduct 1% of the amount when you transfer funds from your main wallet to your game wallet. You will receive 99% of the transferred amount in your game wallet, which can be used for betting predictions.
                    </div>
                    <div className="foot">
                        <div className="progress">
                            <div className="step">Eligible bet ₹{gameBalance}</div>
                        </div>
                    </div>
                </div>
            </IonContent>
            <IonAlert
                header="Warning!!"
                message="To get a prediction for this game, press the I AM IN button to proceed if you are sure."
                isOpen={userEnterInGameConfirm}
                className={"custom_site_alert_toast"}
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            setUserEnterInGameConfirm(false);
                        },
                    },
                    {
                        text: 'I AM IN',
                        role: 'confirm',
                        handler: () => {
                            callFunctionToDeductBalanceAndEnterInGame()
                        },
                    },
                ]}
                onDidDismiss={() => setUserEnterInGameConfirm(false)}
            />
            <IonLoading isOpen={userEnterLoading} message={"Entering in game..."}/>
        </IonPage>
    )
}