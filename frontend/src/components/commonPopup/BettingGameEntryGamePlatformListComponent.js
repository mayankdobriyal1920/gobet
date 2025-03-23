import React from 'react';
import {IonModal,useIonToast} from '@ionic/react';
import GetBetGameSessionListPage from "../../pages/admin/GetBetGameSessionListPage";

const BettingGameEntryGamePlatformListComponent = ({setUserEnterInGameConfirm,userEnterInGameConfirm,callFunctionToActiveSectionAndStartGame,callFunctionToDeductBalanceAndEnterInGame}) => {
    const [present] = useIonToast();

    const handleCloseModal = () => {
        setUserEnterInGameConfirm(false); // Close the modal
    }

    const callFunctionToEnterBet =(sessionData,platformId)=>{
        if (sessionData.is_active) {
            callFunctionToDeductBalanceAndEnterInGame(sessionData?.id, platformId);
        }else{
            present({
                message: 'The session has not started yet!',
                duration: 2000,
                position: 'bottom'
            });
        }
    }

    return (
        <IonModal
            className="add-money-to-game-wallet-modal"
            isOpen={userEnterInGameConfirm}
            onDidDismiss={handleCloseModal}
            initialBreakpoint={1} breakpoints={[0, 0.5, 1]}>
            <GetBetGameSessionListPage handleCloseModal={handleCloseModal} callFunctionToActiveSectionAndStartGame={callFunctionToActiveSectionAndStartGame} callFunctionToEnterBetUserRole={callFunctionToEnterBet}/>
        </IonModal>
    );
};

export default BettingGameEntryGamePlatformListComponent;