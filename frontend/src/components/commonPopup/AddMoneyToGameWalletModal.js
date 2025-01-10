import React, {useState, useRef} from 'react';
import {IonModal, IonButton, IonRow, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonInput} from '@ionic/react';
import {useDispatch, useSelector} from "react-redux";
import {actionAddMoneyToGameWallet} from "../../redux/CommonAction";

const AddMoneyToGameWalletModal = () => {
    const {walletBalance,gameBalance} = useSelector((state) => state.userWalletAndGameBalance);
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [amountError,setAmountError] = useState(false);
    const [amountErrorMessage,setAmountErrorMessage] = useState('');
    const dispatch = useDispatch();
    const handleCloseModal = () => {
        setIsOpen(false); // Close the modal
    };

    const openModal = () =>{
        setAmountErrorMessage('');
        setAmountError(false);
        setAmount('');
        setIsOpen(true);
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
            setIsOpen(false);
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
                //ref={modalRef}
                isOpen={isOpen}
                onDidDismiss={handleCloseModal}
                initialBreakpoint={0.5} breakpoints={[0.5, 1]}>
                <IonContent className="ion-padding">
                    <div className="add_money_game_wallet_heading">
                        <h2>Add money to game wallet</h2>
                    </div>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                {/* Input field for transfer amount */}
                                <IonItem>
                                    <IonLabel position="stacked" className="enter_amount_label">Enter Amount</IonLabel>
                                    {/*<IonInput
                                        placeholder="Enter amount"
                                        type="number"
                                        className="add-money-input"
                                    />*/}
                                    <input className={"form_input_section input"}
                                           onChange={(e)=>setAmount(e.target.value)}
                                           value={amount}
                                           placeholder={"Enter Amount"} type={"text"} required={true}/>
                                </IonItem>
                            </IonCol>
                            {amountError && <p className="error fontsize2">{amountErrorMessage}</p>}
                        </IonRow>
                        <IonRow>
                            <IonCol size="12">
                                {/* Add a button for submission */}
                                <IonButton expand="block" className="submit-transfer-btn" onClick={() => addMoneyToGameWalletAction()}>
                                    Submit
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>
        </React.Fragment>
    );
};

export default AddMoneyToGameWalletModal;