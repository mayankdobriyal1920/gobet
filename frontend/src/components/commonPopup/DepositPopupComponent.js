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
        if (!amount){
            isFormValid = false;
            setAmountError(true);
            setAmountErrorMessage('Please enter amount');
        }
        if (amount > 300000){
            isFormValid = false;
            setAmountError(true);
            setAmountErrorMessage('Deposit above ₹3,00,000 are not allowed. Please enter a lower amount.');
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
        setTimeout(()=>{
            document.querySelector('#deposit_input_cont')?.focus();
        },200)
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
                            <IonLabel position="stacked" className="enter_amount_label">Deposit Amount</IonLabel>
                            <input
                                className="add-money-input input"
                                onChange={(e) => {
                                    // Remove non-digit characters using a regular expression
                                    const value = e.target.value.replace(/\D/g, '');
                                    // Update the state with the numeric value
                                    setAmount(value ? Number(value) : ''); // Use empty string instead of null
                                }}
                                value={amount || ''} // Ensure value is always a string
                                id="deposit_input_cont"
                                placeholder="Enter Amount"
                                type="text"
                            />
                        </IonCol>
                    </IonRow>
                    {amountError &&<IonRow>
                        <IonCol size="12">
                            {amountError && <p className="error fontsize2 error_amount_betting_transfer">{amountErrorMessage}</p>}
                        </IonCol>
                    </IonRow>}
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