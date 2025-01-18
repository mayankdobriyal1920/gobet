import React, {useEffect, useState} from 'react';
import {IonModal, IonRow, IonCol, IonContent, IonGrid, IonItem, IonLabel} from '@ionic/react';
import {useDispatch, useSelector} from "react-redux";
import {
    actionToGenerateDepositRequest,
} from "../../redux/CommonAction";

const DepositPopupComponent = ({setShowSuccessAlertToDepositRequest,isDepositPopupOpen,setIsDepositPopupOpen,setLoadingDepositAmountSuccess}) => {
    const {walletBalance} = useSelector((state) => state.userWalletAndGameBalance);
    const [amount, setAmount] = useState('');
    const [amountError,setAmountError] = useState(false);
    const [amountErrorMessage,setAmountErrorMessage] = useState('');
    const dispatch = useDispatch();
    const handleCloseModal = () => {
        setIsDepositPopupOpen(false); // Close the modal
    };

    const validateAmount = () =>{
        let isFormValid = true;
        setAmountError(false);
        setAmountErrorMessage('');
        if (amount.trim() === ''){
            isFormValid = false;
            setAmountError(true);
            setAmountErrorMessage('Please enter amount');
        }
        if (amount > 100000000){
            isFormValid = false;
            setAmountError(true);
            setAmountErrorMessage('Amount is greater 100000000');
        }
        return isFormValid;
    }

    const callDepositRequest = () => {
        const isAmountValid = validateAmount();
        if (isAmountValid){
            setLoadingDepositAmountSuccess(true);
            setIsDepositPopupOpen(false);
            dispatch(actionToGenerateDepositRequest(amount,setLoadingDepositAmountSuccess,setShowSuccessAlertToDepositRequest));
        }
    };

    useEffect(() => {
        setAmount('');
        setAmountError(false);
        setAmountErrorMessage('');
    }, [isDepositPopupOpen]);

    return (
        <IonModal
            className="add-money-to-game-wallet-modal"
            isOpen={isDepositPopupOpen}
            onDidDismiss={handleCloseModal}
            initialBreakpoint={0.5} breakpoints={[0.5, 1]}>
            <IonContent className="ion-padding">
                <div className="add_money_game_wallet_heading">
                    <h2>Deposit request</h2>
                </div>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonItem>
                                <IonLabel position="stacked" className="enter_amount_label">Deposit Amount</IonLabel>
                                <input className={"add-money-input input"}
                                       onChange={(e)=>setAmount(e.target.value)}
                                       value={amount}
                                       placeholder={"Enter Amount"} type={"text"} required={true}/>
                            </IonItem>
                        </IonCol>
                        {amountError && <p className="error fontsize2">{amountErrorMessage}</p>}
                    </IonRow>
                    <IonRow>
                        <IonCol size="12">
                            <button onClick={callDepositRequest} type={"button"}
                                    className={"submit-transfer-btn"}>
                                Submit
                            </button>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    );
};

export default DepositPopupComponent;