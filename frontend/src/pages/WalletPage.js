import React, {useEffect, useState} from "react";
import {IonAlert, IonContent, IonLoading, IonPage} from "@ionic/react";
import {useSelector, useDispatch} from "react-redux";
import "./Home.css";
import withdrawHistory from "../theme/img/withdrawHistory.png";
import rechargeHistory from "../theme/img/rechargeHistory.png";
import widthdrawBlue from "../theme/img/widthdrawBlue.png";
import rechargeIcon from "../theme/img/rechargeIcon.png";
import {actionTransferMoneyToMainWallet} from "../redux/CommonAction";
import WithdrawalPopupComponent from "../components/commonPopup/WithdrawalPopupComponent";
import DepositPopupComponent from "../components/commonPopup/DepositPopupComponent";
import WithdrawalHistoryListPage from "./WithdrawalHistoryListPage";
import {useHistory} from "react-router";

export default function WalletPage() {
    const [totalWalletBalancePercentage,setTotalWalletBalancePercentage] = useState(0);
    const [totalBettingBalancePercentage,setTotalBettingBalancePercentage] = useState(0);
    const [totalGameBalancePercentage,setTotalGameBalancePercentage] = useState(0);
    const [walletTotalBalance,setWalletTotalBalance] = useState(0);
    const [walletTransferLoader,setWalletTransferLoader] = useState(false);
    const [loadingWithdrawalAmountSuccess,setLoadingWithdrawalAmountSuccess] = useState(false);
    const [isWithdrawalPopupOpen,setIsWithdrawalPopupOpen] = useState(false);
    const [showSuccessAlertToWithdrawalRequest,setShowSuccessAlertToWithdrawalRequest] = useState(false);
    const history = useHistory();


    const [loadingDepositAmountSuccess,setLoadingDepositAmountSuccess] = useState(false);
    const [isDepositPopupOpen,setIsDepositPopupOpen] = useState(false);
    const [showSuccessAlertToDepositRequest,setShowSuccessAlertToDepositRequest] = useState(false);


    const {walletBalance,gameBalance,bettingBalance} = useSelector((state) => state.userWalletAndGameBalance);
    const dispatch = useDispatch();
    useEffect(() => {
        let totalBalance = Number(walletBalance)+Number(gameBalance)+Number(bettingBalance);
        setWalletTotalBalance(totalBalance);
        if(totalBalance) {
            setTotalWalletBalancePercentage(Math.round(walletBalance * 100 / totalBalance));
            setTotalGameBalancePercentage(Math.round(gameBalance * 100 / totalBalance));
            setTotalBettingBalancePercentage(Math.round(bettingBalance * 100 / totalBalance));
        }
    }, [walletBalance,gameBalance,bettingBalance]);

    const addMoneyToGameWalletAction = () => {
        setWalletTransferLoader(true);
        dispatch(actionTransferMoneyToMainWallet(setWalletTransferLoader));
    };

    const goToPage = (page)=>{
        history.push(page);
    }

    return (
        <IonPage className={"home_welcome_page_container"}>
            <IonContent>
                <div className={"wallet-container"}>
                    <div className="wallet-container-header">
                        <div className="wallet-container-header-belly">
                            <svg className="svg-icon icon-wallet1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"
                                 fill="none">
                                <path opacity="0.4"
                                      d="M60.134 45.1654C58.734 46.532 57.934 48.4987 58.134 50.5987C58.434 54.1987 61.734 56.832 65.334 56.832H71.6673V60.7987C71.6673 67.6987 66.034 73.332 59.134 73.332H20.8673C13.9673 73.332 8.33398 67.6987 8.33398 60.7987V38.3654C8.33398 31.4654 13.9673 25.832 20.8673 25.832H59.134C66.034 25.832 71.6673 31.4654 71.6673 38.3654V43.1654H64.934C63.0673 43.1654 61.3673 43.8987 60.134 45.1654Z"
                                      fill="white"></path>
                                <path
                                    d="M49.5007 13.1719V25.8385H20.8673C13.9673 25.8385 8.33398 31.4719 8.33398 38.3719V26.1385C8.33398 22.1719 10.7673 18.6385 14.4673 17.2385L40.934 7.23854C45.0673 5.7052 49.5007 8.73854 49.5007 13.1719ZM75.1973 46.5652V53.4319C75.1973 55.2652 73.7307 56.7652 71.864 56.8319H65.3307C61.7307 56.8319 58.4306 54.1985 58.1306 50.5985C57.9306 48.4985 58.7307 46.5319 60.1307 45.1652C61.364 43.8985 63.064 43.1652 64.9307 43.1652H71.864C73.7307 43.2319 75.1973 44.7319 75.1973 46.5652ZM46.6673 42.4985H23.334C21.9673 42.4985 20.834 41.3652 20.834 39.9985C20.834 38.6319 21.9673 37.4985 23.334 37.4985H46.6673C48.034 37.4985 49.1673 38.6319 49.1673 39.9985C49.1673 41.3652 48.034 42.4985 46.6673 42.4985Z"
                                    fill="white"></path>
                            </svg>
                            <div>₹{walletTotalBalance ? walletTotalBalance : '0.00'}</div>
                            <span className={"wallet_header"}>Total balance</span>
                        </div>
                    </div>
                    <div className={"wallet-container-content"}>
                        <div className="container">
                            <div className="progressBars">
                                <div className="progressBarsM">
                                    <div className="van-circle">
                                        <svg viewBox="0 0 1100 1100">
                                            <path className="van-circle__layer"
                                                  d="M 550 550 m 0, -500 a 500, 500 0 1, 1 0, 1000 a 500, 500 0 1, 1 0, -1000"
                                                  style={{"fill": "none", strokeWidth: "100px"}}></path>
                                            <path
                                                d="M 550 550 m 0, -500 a 500, 500 0 1, 1 0, 1000 a 500, 500 0 1, 1 0, -1000"
                                                className="van-circle__hover"
                                                style={{
                                                    strokeWidth: "101px",
                                                    strokeLinecap: "butt",
                                                    strokeDasharray: `${totalWalletBalancePercentage * 31.4}px,3140px`
                                                }}></path>
                                        </svg>
                                        <div className="van-circle__text">{totalWalletBalancePercentage}%</div>
                                    </div>
                                    <h3>₹{walletBalance ? walletBalance : '0.00'}</h3><span>Main wallet</span>
                                </div>
                            </div>
                            <div className="progressBars">
                                <div className="progressBarsL">
                                    <div className="van-circle">
                                        <svg viewBox="0 0 1100 1100">
                                            <path className="van-circle__layer"
                                                  d="M 550 550 m 0, -500 a 500, 500 0 1, 1 0, 1000 a 500, 500 0 1, 1 0, -1000"
                                                  style={{"fill": "none", strokeWidth: "100px"}}></path>
                                            <path
                                                d="M 550 550 m 0, -500 a 500, 500 0 1, 1 0, 1000 a 500, 500 0 1, 1 0, -1000"
                                                className="van-circle__hover"
                                                style={{
                                                    strokeWidth: "101px",
                                                    strokeLinecap: "butt",
                                                    strokeDasharray: `${totalBettingBalancePercentage * 31.4}px,3140px`
                                                }}></path>
                                        </svg>
                                        <div className="van-circle__text">{totalBettingBalancePercentage}%</div>
                                    </div>
                                    <h3>₹{bettingBalance ? bettingBalance : '0.00'}</h3><span>Betting wallet</span>
                                </div>
                                <div className="progressBarsR">
                                    <div className="van-circle">
                                        <svg viewBox="0 0 1100 1100">
                                            <path className="van-circle__layer"
                                                  d="M 550 550 m 0, -500 a 500, 500 0 1, 1 0, 1000 a 500, 500 0 1, 1 0, -1000"
                                                  style={{"fill": "none", strokeWidth: "100px"}}></path>
                                            <path
                                                d="M 550 550 m 0, -500 a 500, 500 0 1, 1 0, 1000 a 500, 500 0 1, 1 0, -1000"
                                                className="van-circle__hover"
                                                style={{
                                                    strokeWidth: "101px",
                                                    strokeLinecap: "butt",
                                                    strokeDasharray: `${totalGameBalancePercentage * 31.4}px,3140px`
                                                }}></path>
                                        </svg>
                                        <div className="van-circle__text">{totalGameBalancePercentage}%</div>
                                    </div>
                                    <h3>₹{gameBalance ? gameBalance : 0.00}</h3><span>Game wallet</span></div>
                            </div>
                            <div className="recycleBtnD">
                                <button onClick={addMoneyToGameWalletAction} className="recycleBtn">Main wallet
                                    transfer
                                </button>
                            </div>
                            <div className="userDetail">
                                <div>
                                    <div onClick={() => setIsDepositPopupOpen(true)} className="imgD">
                                        <img src={rechargeIcon}/>
                                    </div>
                                    <span>Deposit</span>
                                </div>
                                <div>
                                    <div onClick={() => setIsWithdrawalPopupOpen(true)} className="imgD">
                                        <img src={widthdrawBlue}/>
                                    </div>
                                    <span>Withdraw</span>
                                </div>
                            </div>
                            <div className="userDetail">
                                <div>
                                    <div onClick={() => goToPage('/deposit-history')} className="imgD">
                                        <img src={rechargeHistory}/>
                                    </div>
                                    <span>Deposit history</span>
                                </div>
                                <div>
                                    <div onClick={() => goToPage('/withdrawal-history')} className="imgD">
                                        <img src={withdrawHistory}/>
                                    </div>
                                    <span>Withdrawal history</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </IonContent>
            <IonAlert
                header="Withdrawal Success!!"
                message="We have initiated your withdrawal request and will transfer amount to your bank account shortly"
                isOpen={showSuccessAlertToWithdrawalRequest}
                className={"custom_site_alert_toast"}
                buttons={[
                    {
                        text: 'Okay',
                        role: 'confirm',
                        handler: () => {
                            setShowSuccessAlertToWithdrawalRequest(false)
                        },
                    },
                ]}
                onDidDismiss={() => setShowSuccessAlertToWithdrawalRequest(false)}
            />
            <IonAlert
                header="Deposit request Success!!"
                message="We have initiated your deposit request our customer representative will contact you shortly"
                isOpen={showSuccessAlertToDepositRequest}
                className={"custom_site_alert_toast"}
                buttons={[
                    {
                        text: 'Okay',
                        role: 'confirm',
                        handler: () => {
                            setShowSuccessAlertToDepositRequest(false)
                        },
                    },
                ]}
                onDidDismiss={() => setShowSuccessAlertToDepositRequest(false)}
            />
            <IonLoading isOpen={walletTransferLoader || loadingWithdrawalAmountSuccess || loadingDepositAmountSuccess} message={"Please wait..."}/>
            <WithdrawalPopupComponent setShowSuccessAlertToWithdrawalRequest={setShowSuccessAlertToWithdrawalRequest} setLoadingWithdrawalAmountSuccess={setLoadingWithdrawalAmountSuccess} setIsWithdrawalPopupOpen={setIsWithdrawalPopupOpen} isWithdrawalPopupOpen={isWithdrawalPopupOpen}/>
            <DepositPopupComponent setShowSuccessAlertToDepositRequest={setShowSuccessAlertToDepositRequest} setLoadingDepositAmountSuccess={setLoadingDepositAmountSuccess} setIsDepositPopupOpen={setIsDepositPopupOpen} isDepositPopupOpen={isDepositPopupOpen}/>
        </IonPage>
    )
}