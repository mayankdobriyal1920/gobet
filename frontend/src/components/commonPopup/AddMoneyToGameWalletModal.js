import React, {useEffect, useState} from 'react';
import {IonModal, IonRow, IonCol, IonContent, IonGrid, IonItem, IonLabel} from '@ionic/react';
import {useDispatch, useSelector} from "react-redux";
import {actionAddMoneyToGameWallet} from "../../redux/CommonAction";

const AddMoneyToGameWalletModal = ({setIsAddMoneyOpen,isAddMoneyOpen,setLoadingAddAmountSuccess}) => {
    const {walletBalance} = useSelector((state) => state.userWalletAndGameBalance);
    const [amount, setAmount] = useState(null);
    const [amountError,setAmountError] = useState(false);
    const [amountErrorMessage,setAmountErrorMessage] = useState('');
    const dispatch = useDispatch();
    const handleCloseModal = () => {
        setIsAddMoneyOpen(false); // Close the modal
    };

    const openModal = () =>{
        setAmountErrorMessage('');
        setAmountError(false);
        setAmount(null);
        setIsAddMoneyOpen(true);
    }

    const validateAmount = () =>{
        let isFormValid = true;
        setAmountError(false);
        setAmountErrorMessage('');
        if (!amount){
            isFormValid = false;
            setAmountError(true);
            setAmountErrorMessage('Please enter amount');
        }
        if (amount + Math.round((0.01 * amount)) > walletBalance){
            isFormValid = false;
            setAmountError(true);
            setAmountErrorMessage('Amount is greater than wallet balance');
        }
        if (amount + Math.round((0.01 * amount)) > 300000){
            isFormValid = false;
            setAmountError(true);
            setAmountErrorMessage('Transfers above ₹3,00,000 are not allowed. Please enter a lower amount.');
        }
        return isFormValid;
    }

    const addMoneyToGameWalletAction = () => {
        const isAmountValid = validateAmount();
        if (isAmountValid){
            setLoadingAddAmountSuccess(true);
            setIsAddMoneyOpen(false);
            dispatch(actionAddMoneyToGameWallet(amount,setLoadingAddAmountSuccess));
        }
    };

    useEffect(() => {
        setAmount(null);
        setAmountError(false);
        setAmountErrorMessage('');
        setTimeout(()=>{
            document.querySelector('#deposit_game_input_cont')?.focus();
        },200)
    }, [isAddMoneyOpen]);

    return (
        <React.Fragment>
            <div className="Wallet__C-balance-l3" onClick={() => openModal()}>
                <div>Add Money</div>
            </div>
            <IonModal
                className="add-money-to-game-wallet-modal"
                isOpen={isAddMoneyOpen}
                onDidDismiss={handleCloseModal}
                initialBreakpoint={0.5} breakpoints={[0,0.5, 1]}>
                <IonContent className="ion-padding">
                    <div className="add_money_game_wallet_heading">
                        <h2>Add money to betting wallet</h2>
                    </div>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <IonLabel position="stacked" className="enter_amount_label">
                                    Betting amount
                                </IonLabel>
                                <input
                                    className="add-money-input input"
                                    onChange={(e) => {
                                        // Remove non-digit characters using a regular expression
                                        const value = e.target.value.replace(/\D/g, '');
                                        // Update the state with the numeric value
                                        setAmount(value ? Number(value) : ''); // Use empty string instead of null
                                    }}
                                    value={amount || ''} // Ensure value is always a string
                                    id="deposit_game_input_cont"
                                    placeholder="Enter Amount"
                                    type="text"
                                />
                            </IonCol>
                        </IonRow>
                        {(amountError) &&
                            <IonRow>
                                <IonCol size="12">
                                    {amountError &&
                                        <p className="error fontsize2 error_amount_betting_transfer">{amountErrorMessage}</p>}
                                </IonCol>
                            </IonRow>}
                        <IonRow>
                            <IonCol size="12">
                            <button onClick={addMoneyToGameWalletAction} type={"button"}
                                        className={"submit-transfer-btn"}>
                                    Submit
                                </button>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>
        </React.Fragment>
    );
};

export default AddMoneyToGameWalletModal;