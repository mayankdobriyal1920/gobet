import React, {useState} from "react";
import {IonAlert, IonContent, IonHeader, IonLoading, IonPage} from "@ionic/react";
import {useDispatch, useSelector} from "react-redux";
import siteSmallIcon from "../theme/img/site-logo-small-white.png";
import aviatorGame from "../theme/img/aviator.png";
import wingoGame from "../theme/img/wingoGame.png";
import limboGame from "../theme/img/limboGame.png";
import {useHistory} from "react-router";
import {
    actionToActivateSubscriptionPlan,
    actionToCallFunctionToActiveSectionAndStartGame,
    actionToGetNearestGameSessionOrActiveSessionAndGamePlatform,
    actionToUpdateUserAliveForGame
} from "../redux/CommonAction";
import AddMoneyToGameWalletModal from "../components/commonPopup/AddMoneyToGameWalletModal";
import BettingGameEntryGamePlatformListComponent
    from "../components/commonPopup/BettingGameEntryGamePlatformListComponent";
import SubscriptionModal from "../components/SubscriptionModal";

export default function HomePage() {
    const {walletBalance,bettingBalance} = useSelector((state) => state.userWalletAndGameBalance);
    const {subscriptionData} = useSelector((state) => state.userSubscriptionData);
    const userInfo = useSelector((state) => state.userAuthDetail.userInfo);
    const history = useHistory();
    const [userEnterInGameConfirm,setUserEnterInGameConfirm] = useState(false);
    const [lowBalanceAlert,setLowBalanceAlert] = useState(false);
    const [userEnterLoading,setUserEnterLoading] = useState(false);
    const dispatch = useDispatch();
    const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
    const [activationPlanLoader, setActivationPlanLoader] = useState(false);
    const [loadingAddAmountSuccess, setLoadingAddAmountSuccess] = useState(false);
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

    const goToPage = (page)=>{
        history.push(page);
    }
    const callFunctionToEnterInGame = ()=>{
        goToPage(`/win-go-betting`);
        setUserEnterLoading(false);
        setUserEnterInGameConfirm(false);
    }
    const callFunctionToSetUserEnterInGameConfirm = (gameType)=>{
        setUserEnterInGameConfirm(true);
        dispatch(actionToGetNearestGameSessionOrActiveSessionAndGamePlatform(gameType))
    }
    const callFunctionToDeductBalanceAndEnterInGame = (sessionId,platformId)=>{
        setUserEnterLoading(true);
        dispatch(actionToUpdateUserAliveForGame(sessionId,platformId,callFunctionToEnterInGame));
    }

    const callFunctionToActiveSectionAndStartGame = (sessionId)=>{
        setUserEnterLoading(true);
        dispatch(actionToCallFunctionToActiveSectionAndStartGame(sessionId,callFunctionToEnterInGame));
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
                        <BettingGameEntryGamePlatformListComponent callFunctionToActiveSectionAndStartGame={callFunctionToActiveSectionAndStartGame} callFunctionToDeductBalanceAndEnterInGame={callFunctionToDeductBalanceAndEnterInGame} setUserEnterInGameConfirm={setUserEnterInGameConfirm} userEnterInGameConfirm={userEnterInGameConfirm}/>
                    </div>
                </div>


                {/*///////////// ADMIN OPTIONS ///////////////////*/}
                {(userInfo?.role === 1) ?
                    <div className="settingPanel__container home_admin">
                        <div className="getbet-title getbet-line">
                            <div className="getbet-title-left">
                                <span>Admin Menu</span>
                            </div>
                        </div>
                        <div className="settingPanel__container-items">
                            <div onClick={() => goToPage('/admin-game-result')}
                                 className="settingPanel__container-items__item ar-1px-b">
                                <div className="settingPanel__container-items__title">
                                    <svg className="svg-icon icon-betHistory svg_min_icon" viewBox="0 0 80 80"
                                         fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M54.2259 73.1178H18.4859C12.7419 73.1178 8.08594 68.4617 8.08594 62.7177V16.9937C8.08594 11.2497 12.7419 6.59375 18.4859 6.59375H54.2259C59.9699 6.59375 64.6259 11.2497 64.6259 16.9937V62.7177C64.6259 68.4617 59.9699 73.1178 54.2259 73.1178Z"
                                            fill="#5CA6FF"></path>
                                        <path
                                            d="M49.1664 25.4703H23.7664C21.9984 25.4703 20.5664 24.0383 20.5664 22.2703C20.5664 20.5023 21.9984 19.0703 23.7664 19.0703H49.1664C50.9344 19.0703 52.3664 20.5023 52.3664 22.2703C52.3664 24.0383 50.9344 25.4703 49.1664 25.4703ZM49.1664 38.1583H23.7664C21.9984 38.1583 20.5664 36.7263 20.5664 34.9583C20.5664 33.1903 21.9984 31.7583 23.7664 31.7583H49.1664C50.9344 31.7583 52.3664 33.1903 52.3664 34.9583C52.3664 36.7263 50.9344 38.1583 49.1664 38.1583ZM35.9304 50.8463H23.7664C21.9984 50.8463 20.5664 49.4143 20.5664 47.6463C20.5664 45.8783 21.9984 44.4463 23.7664 44.4463H35.9304C37.6984 44.4463 39.1304 45.8783 39.1304 47.6463C39.1304 49.4143 37.6944 50.8463 35.9304 50.8463Z"
                                            fill="var(--bg_color_L2)"></path>
                                    </svg>
                                    <span>Game Result</span>
                                </div>
                                <div className="settingPanel__container-items-right">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="van-badge__wrapper van-icon van-icon-arrow"
                                         fill="rgb(136, 136, 136)" height="12px" width="12px" version="1.1"
                                         id="Layer_1"
                                         viewBox="0 0 330 330">
                                        <path id="XMLID_222_"
                                              d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z"/>
                                    </svg>
                                </div>
                            </div>
                            <div onClick={() => goToPage('/admin-generated-passcode-list-for-admin')}
                                 className="settingPanel__container-items__item ar-1px-b">
                                <div className="settingPanel__container-items__title">
                                    <svg fill="#ffaf7b" className="svg-icon icon-rechargeHistory svg_min_icon"
                                         version="1.1" id="Layer_1"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 512 512">
                                        <g>
                                            <g>
                                                <path d="M408.99,52.133h-89.452V33.442C319.538,14.972,304.565,0,286.096,0h-60.192c-18.47,0-33.442,14.972-33.442,33.442v18.691
                                                        H103.01c-9.234,0-16.721,7.487-16.721,16.721v426.425c0,9.234,7.487,16.721,16.721,16.721H408.99
                                                        c9.234,0,16.721-7.487,16.721-16.721V68.854C425.711,59.619,418.224,52.133,408.99,52.133z M319.538,99.709h14.489
                                                        c9.234,0,16.721,7.487,16.721,16.721c0,9.234-7.487,16.721-16.721,16.721h-14.489V99.709z M225.903,33.442h60.192v100.944h-60.192
                                                        V33.442z M256,179.836c33.578,0,60.799,27.221,60.799,60.799c0,33.578-27.221,60.799-60.799,60.799s-60.799-27.221-60.799-60.799
                                                        S222.422,179.836,256,179.836z M177.972,99.709h14.489v33.442h-14.489c-9.234,0-16.721-7.487-16.721-16.721
                                                        C161.251,107.195,168.737,99.709,177.972,99.709z M371.935,457.146h-231.87c-4.617,0-8.36-3.743-8.36-8.36
                                                        c0-33.2,12.929-64.414,36.405-87.89s54.69-36.405,87.89-36.405s64.414,12.929,87.89,36.405s36.406,54.69,36.406,87.89
                                                        C380.295,453.402,376.553,457.146,371.935,457.146z"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <span>Passcodes (For Admin)</span>
                                </div>
                                <div className="settingPanel__container-items-right">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="van-badge__wrapper van-icon van-icon-arrow"
                                         fill="rgb(136, 136, 136)" height="12px" width="12px" version="1.1"
                                         id="Layer_1"
                                         viewBox="0 0 330 330">
                                        <path id="XMLID_222_"
                                              d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z"/>
                                    </svg>
                                </div>
                            </div>
                            <div onClick={() => goToPage('/admin-generated-passcode-list')}
                                 className="settingPanel__container-items__item ar-1px-b">
                                <div className="settingPanel__container-items__title">
                                    <svg fill="#ffaf7b" className="svg-icon icon-rechargeHistory svg_min_icon"
                                         version="1.1" id="Layer_1"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 512 512">
                                        <g>
                                            <g>
                                                <path d="M408.99,52.133h-89.452V33.442C319.538,14.972,304.565,0,286.096,0h-60.192c-18.47,0-33.442,14.972-33.442,33.442v18.691
                                                        H103.01c-9.234,0-16.721,7.487-16.721,16.721v426.425c0,9.234,7.487,16.721,16.721,16.721H408.99
                                                        c9.234,0,16.721-7.487,16.721-16.721V68.854C425.711,59.619,418.224,52.133,408.99,52.133z M319.538,99.709h14.489
                                                        c9.234,0,16.721,7.487,16.721,16.721c0,9.234-7.487,16.721-16.721,16.721h-14.489V99.709z M225.903,33.442h60.192v100.944h-60.192
                                                        V33.442z M256,179.836c33.578,0,60.799,27.221,60.799,60.799c0,33.578-27.221,60.799-60.799,60.799s-60.799-27.221-60.799-60.799
                                                        S222.422,179.836,256,179.836z M177.972,99.709h14.489v33.442h-14.489c-9.234,0-16.721-7.487-16.721-16.721
                                                        C161.251,107.195,168.737,99.709,177.972,99.709z M371.935,457.146h-231.87c-4.617,0-8.36-3.743-8.36-8.36
                                                        c0-33.2,12.929-64.414,36.405-87.89s54.69-36.405,87.89-36.405s64.414,12.929,87.89,36.405s36.406,54.69,36.406,87.89
                                                        C380.295,453.402,376.553,457.146,371.935,457.146z"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <span>Passcodes (For Sub Admin or User)</span>
                                </div>
                                <div className="settingPanel__container-items-right">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="van-badge__wrapper van-icon van-icon-arrow"
                                         fill="rgb(136, 136, 136)" height="12px" width="12px" version="1.1"
                                         id="Layer_1"
                                         viewBox="0 0 330 330">
                                        <path id="XMLID_222_"
                                              d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z"/>
                                    </svg>
                                </div>
                            </div>
                            <div onClick={() => goToPage('/admin-admin-users-list')}
                                 className="settingPanel__container-items__item ar-1px-b">
                                <div className="settingPanel__container-items__title">
                                    <svg className="svg-icon icon-serverTicket svg_min_icon"
                                         viewBox="0 0 52 52"
                                         fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g id="Group 1420069177">
                                            <path id="Union" fillRule="evenodd" clipRule="evenodd"
                                                  d="M0.501486 25.2499C0.501486 31.7163 2.98132 37.6138 7.0576 42.0809L7.05658 42.0819C3.94138 45.3931 0 45.8223 0 45.8223C5.87741 49.7199 12.9648 51.9961 20.594 51.9961C26.8205 51.9961 32.686 50.4799 37.8274 47.8037C46.2308 43.6469 51.9961 35.1102 51.9961 25.2499C51.9961 11.3048 40.4686 0 26.2487 0C12.029 0 0.501486 11.3048 0.501486 25.2499ZM38.3417 13.6638C45.0029 20.3143 45.0029 31.0966 38.3417 37.747C31.6808 44.3975 20.8812 44.3975 14.22 37.747C9.51028 33.0448 8.13334 26.2774 10.0841 20.3648C10.2825 19.7185 10.5019 19.0869 10.7447 18.4688C10.5338 18.9093 10.3426 19.3569 10.1711 19.8103C11.3425 16.3535 13.3074 13.1056 16.0669 10.3506C19.6652 6.75799 24.1026 4.51343 28.7496 3.61719L28.7484 3.6188L28.7499 3.61854C28.7366 3.63528 27.1093 5.67989 27.2311 8.70353C31.2743 8.92724 35.2529 10.5801 38.3417 13.6638Z"
                                                  fill="var(--main-color)"></path>
                                            <path id="Vector" opacity="0.4" fillRule="evenodd"
                                                  clipRule="evenodd"
                                                  d="M38.3417 37.747C45.0029 31.0966 45.0029 20.3143 38.3417 13.6638C35.2529 10.5801 31.2743 8.92724 27.2311 8.70353C27.1091 5.67485 28.742 3.62845 28.75 3.61847L28.7484 3.6188L28.7496 3.61719C24.1026 4.51343 19.6652 6.75799 16.0669 10.3506C13.3074 13.1056 11.3425 16.3535 10.1711 19.8103C10.3426 19.3569 10.5338 18.9093 10.7447 18.4688C10.5019 19.0869 10.2825 19.7185 10.0841 20.3648C8.13334 26.2774 9.51028 33.0448 14.22 37.747C20.8812 44.3975 31.6808 44.3975 38.3417 37.747Z"
                                                  fill="var(--main-color)"></path>
                                            <path id="Vector_2" fillRule="evenodd" clipRule="evenodd"
                                                  d="M17.625 23.9571V26.0727V27.4819C17.625 28.8886 18.767 30.0288 20.176 30.0288C21.5849 30.0288 22.7268 28.8886 22.7268 27.4819V26.0706V23.9571C22.7268 22.5507 21.5849 21.4102 20.176 21.4102C18.767 21.4102 17.625 22.5507 17.625 23.9571Z"
                                                  fill="var(--main-color)"></path>
                                            <path id="Vector_3" fillRule="evenodd" clipRule="evenodd"
                                                  d="M30.25 23.9571V26.0727V27.4819C30.25 28.8886 31.3921 30.0288 32.8009 30.0288C34.2098 30.0288 35.3519 28.8886 35.3519 27.4819V26.0706V23.9571C35.3519 22.5507 34.2098 21.4102 32.8009 21.4102C31.3921 21.4102 30.25 22.5507 30.25 23.9571Z"
                                                  fill="var(--main-color)"></path>
                                        </g>
                                    </svg>
                                    <span>User List</span>
                                </div>
                                <div className="settingPanel__container-items-right">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="van-badge__wrapper van-icon van-icon-arrow"
                                         fill="rgb(136, 136, 136)" height="12px" width="12px" version="1.1"
                                         id="Layer_1"
                                         viewBox="0 0 330 330">
                                        <path id="XMLID_222_"
                                              d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div> : ''
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
                                    Your subscription is active, allowing you to participate in betting predictions.
                                    Ensure you have sufficient balance to place bets.
                                </div>
                                <div className="foot_insub">
                                    <div className="step_txt">Subscription Value: ₹{subscriptionData?.total_value}</div>
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
                                        <div className="progress" onClick={() => setIsSubscriptionModalOpen(true)}>
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