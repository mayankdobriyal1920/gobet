import React, {useEffect, useState} from 'react';
import {IonModal, IonRow, IonCol, IonContent, IonGrid, IonItem, IonLabel} from '@ionic/react';
import {useDispatch, useSelector} from "react-redux";
import {actionToGenerateWithdrawalRequestAndDeductAmount} from "../../redux/CommonAction";

const WithdrawalPopupComponent = ({setShowSuccessAlertToWithdrawalRequest,isWithdrawalPopupOpen,setIsWithdrawalPopupOpen,setLoadingWithdrawalAmountSuccess}) => {
    const {walletBalance} = useSelector((state) => state.userWalletAndGameBalance);
    const [amount, setAmount] = useState('');
    const [amountError,setAmountError] = useState(false);
    const [amountErrorMessage,setAmountErrorMessage] = useState('');
    const dispatch = useDispatch();
    const handleCloseModal = () => {
        setIsWithdrawalPopupOpen(false); // Close the modal
    };

    const validateAmount = () =>{
        let isFormValid = true;
        setAmountError(false);
        setAmountErrorMessage('');
        if (!amount){
            isFormValid = false;
            setAmountError(true);
            setAmountErrorMessage('Please enter amount');
        }
        if (amount > walletBalance){
            isFormValid = false;
            setAmountError(true);
            setAmountErrorMessage('Amount is greater than wallet balance');
        }
        return isFormValid;
    }

    const callWithdrawalRequest = () => {
        const isAmountValid = validateAmount();
        if (isAmountValid){
            setLoadingWithdrawalAmountSuccess(true);
            setIsWithdrawalPopupOpen(false);
            dispatch(actionToGenerateWithdrawalRequestAndDeductAmount(amount,setLoadingWithdrawalAmountSuccess,setShowSuccessAlertToWithdrawalRequest));
        }
    };

    useEffect(() => {
        setAmount('');
        setAmountError(false);
        setAmountErrorMessage('');
        setTimeout(()=>{
            document.querySelector('#withdrawal_input_cont')?.focus();
        },200)
    }, [isWithdrawalPopupOpen]);

    return (
        <IonModal
            className="add-money-to-game-wallet-modal"
            isOpen={isWithdrawalPopupOpen}
            onDidDismiss={handleCloseModal}
            initialBreakpoint={0.5} breakpoints={[0.5, 1]}>
            <IonContent className="ion-padding">
                <div className="add_money_game_wallet_heading">
                    <h2>Withdrawal request</h2>
                </div>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonLabel position="stacked" className="enter_amount_label">Withdrawal Amount</IonLabel>
                            <input
                                className="add-money-input input"
                                onChange={(e) => {
                                    // Remove non-digit characters using a regular expression
                                    const value = e.target.value.replace(/\D/g, '');
                                    // Update the state with the numeric value
                                    setAmount(value ? Number(value) : ''); // Use empty string instead of null
                                }}
                                value={amount || ''} // Ensure value is always a string
                                id="withdrawal_input_cont"
                                placeholder="Enter Amount"
                                type="text"
                            />
                        </IonCol>
                    </IonRow>
                    {amountError &&<IonRow>
                        <IonCol size="12">
                            {amountError && <p className="error fontsize2">{amountErrorMessage}</p>}
                        </IonCol>
                    </IonRow>}
                    <IonRow>
                        <IonCol size="12">
                            <button onClick={callWithdrawalRequest} type={"button"}
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

export default WithdrawalPopupComponent;