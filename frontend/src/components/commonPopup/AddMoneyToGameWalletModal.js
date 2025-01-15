import React, {useState} from 'react';
import {IonModal, IonRow, IonCol, IonContent, IonGrid, IonItem, IonLabel} from '@ionic/react';
import {useDispatch, useSelector} from "react-redux";
import {actionAddMoneyToGameWallet} from "../../redux/CommonAction";

const AddMoneyToGameWalletModal = ({setIsAddMoneyOpen,isAddMoneyOpen}) => {
    const {walletBalance} = useSelector((state) => state.userWalletAndGameBalance);
    const [amount, setAmount] = useState('');
    const [amountError,setAmountError] = useState(false);
    const [amountErrorMessage,setAmountErrorMessage] = useState('');
    const dispatch = useDispatch();
    const handleCloseModal = () => {
        setIsAddMoneyOpen(false); // Close the modal
    };

    const openModal = () =>{
        setAmountErrorMessage('');
        setAmountError(false);
        setAmount('');
        setIsAddMoneyOpen(true);
    }

    const validateAmount = () =>{
        let isFormValid = true;
        setAmountError(false);
        setAmountErrorMessage('');
        if (amount.trim() === ''){
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

    const addMoneyToGameWalletAction = () => {
        const isAmountValid = validateAmount();
        if (isAmountValid){
            setIsAddMoneyOpen(false);
            dispatch(actionAddMoneyToGameWallet(amount));
        }
    };

    return (
        <React.Fragment>
            <div className="Wallet__C-balance-l3" onClick={() => openModal()}>
                <div>Add Money</div>
            </div>
            <IonModal
                className="add-money-to-game-wallet-modal"
                isOpen={isAddMoneyOpen}
                onDidDismiss={handleCloseModal}
                initialBreakpoint={0.5} breakpoints={[0.5, 1]}>
                <IonContent className="ion-padding">
                    <div className="add_money_game_wallet_heading">
                        <h2>Add money to game wallet</h2>
                    </div>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                <IonItem>
                                    <IonLabel position="stacked" className="enter_amount_label">Amount</IonLabel>
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