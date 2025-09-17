import React, {useEffect, useState} from "react";
import {
    IonCol,
    IonContent, IonDatetime,
    IonHeader,
    IonIcon, IonLoading, IonModal,
    IonPage, IonRow, IonSelect, IonSelectOption, useIonAlert, useIonToast,
} from "@ionic/react";
import {arrowBack} from "ionicons/icons";
import {useHistory} from "react-router";
import moment from "moment-timezone";
import {useDispatch, useSelector} from "react-redux";
import { Virtuoso } from 'react-virtuoso'
import {
    actionToCallFunctionToActiveSectionAndStartGame,
    actionToDeleteGameSessionData,
    actionToGetGameSessionOrAllSessionAndGamePlatform,
    actionToGetNearestGameSessionOrActiveSessionAndGamePlatform,
    actionToSaveGameSessionData, actionToUpdateUserAliveForGame,
} from "../../redux/CommonAction";
import LineLoaderComponent from "../../components/LineLoaderComponent";

export default function GetBetGameSessionListPage({gameType}) {
    const history = useHistory();
    const nearestGameSessionAndActiveSession = useSelector((state) => state.nearestGameSessionAndActiveSession);
    const {platformData} = useSelector((state) => state.gamePlatformData);
    const {userInfo} = useSelector((state) => state.userAuthDetail);
    const [isAddEditSessionPopupOpen,setIsAddEditSessionPopupOpen] = useState(false);
    const [sessionDataToEdit,setSessionDataToEdit] = useState(null);
    const [sessionGamePlatform, setSessionGamePlatform] = useState(
        platformData.find((plat) => plat.id === 1) || null
    );
    const [present] = useIonToast();
    const [userEnterLoading,setUserEnterLoading] = useState(false);
    const [updateLoading,setUpdateLoading] = useState(false);
    const [sessionStartTime,setSessionStartTime] = useState(moment().format());
    const dispatch = useDispatch();
    const [presentAlert] = useIonAlert();

    const resetDelete = () =>{
        setUpdateLoading(false);
        dispatch(actionToGetGameSessionOrAllSessionAndGamePlatform(gameType))
        dispatch(actionToGetNearestGameSessionOrActiveSessionAndGamePlatform(gameType))
    }

    const callFunctionToActiveSectionAndStartGame = (sessionId,customNumberId)=>{
        setUserEnterLoading(true);
        dispatch(actionToCallFunctionToActiveSectionAndStartGame(sessionId,customNumberId,callFunctionToEnterInGame));
    }

    const goToPage = (page)=>{
        history.push(page);
    }

    const callFunctionToEnterBetUserRole = (sessionData,platformId)=>{
        if (sessionData.is_active) {
            setUserEnterLoading(true);
            dispatch(actionToUpdateUserAliveForGame(sessionData?.id,platformId,callFunctionToEnterInGame));
        }else{
            present({
                message: 'The session has not started yet!',
                duration: 2000,
                position: 'bottom'
            });
        }
    }

    const callFunctionToEnterInGame = ()=>{
        goToPage(`/win-go-betting`);
        setUserEnterLoading(false);
    }

    const resetUpdate = (data = {}) =>{
        setSessionDataToEdit(null);
        setSessionGamePlatform(platformData.find((plat) => plat.id === 1))
        setUpdateLoading(false);
        setSessionStartTime(moment().format())
        setIsAddEditSessionPopupOpen(false);
        if(data.status === 1) {
            dispatch(actionToGetGameSessionOrAllSessionAndGamePlatform(gameType))
            dispatch(actionToGetNearestGameSessionOrActiveSessionAndGamePlatform(gameType))
        }else{
            present({
                message: data?.message,
                duration: 2000,
                position: 'bottom'
            });
        }
    }
   
    const callFunctionToDeleteSessionData = (data = null) =>{
        if(data?.id){
            presentAlert({
                header: 'Are you sure?',
                cssClass: 'custom_site_alert_toast',
                message: 'You want to delete the session.',
                buttons: [
                    {text: 'Cancel', role: 'cancel'},
                    {text: 'Delete', role: 'confirm', handler: () => {
                            setUpdateLoading(true);
                            dispatch(actionToDeleteGameSessionData(data?.id,resetDelete))
                    }},
                ],
            });
        }
    }

    const callFunctionToSetIsAddEditSessionPopupOpen = (data = null) =>{
        setIsAddEditSessionPopupOpen(true);
        if(data?.id){
            setSessionDataToEdit(data);
            setSessionStartTime(moment(`${moment().format('YYYY-MM-DD')} ${data?.start_time}`,'YYYY-MM-DD HH:mm:ss').format());
            setSessionGamePlatform(platformData.find((plat) => plat.id === data?.betting_platform_id));
        }else{
            setSessionDataToEdit(null);
            setSessionGamePlatform(platformData.find((plat) => plat.id === 1))
            setSessionStartTime(moment().format())
        }
    }

    const callFunctionToSaveSessionData = () =>{
        if(sessionGamePlatform?.id && sessionStartTime){
            setUpdateLoading(true);
            dispatch(actionToSaveGameSessionData(sessionDataToEdit,sessionGamePlatform?.id,'win_go',sessionStartTime,resetUpdate))
        }
    }

    const callFunctionToEnterBet =(sessionData)=>{
        const continueWithInputId = () => {
            presentAlert({
                header: 'Enter ID',
                message: 'Please enter a session serial number to continue:',
                inputs: [
                    {
                        name: 'customId',
                        type: 'number',
                        placeholder: 'Enter serial number here',
                        attributes: {
                            autofocus: true
                        }
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel'
                    },
                    {
                        text: 'Continue',
                        handler: (data) => {
                            if (data.customId) {
                                callFunctionToActiveSectionAndStartGame(sessionData?.id,data.customId);
                            } else {
                                presentAlert({
                                    header: 'Error',
                                    message: 'ID cannot be empty.',
                                    buttons: ['OK']
                                });
                            }
                        }
                    }
                ]
            });
        };

        if (sessionData.is_active) {
            continueWithInputId();
        }else{
            const now = moment();
            const startTime = moment(sessionData?.start_time, 'HH:mm:ss');
            const endTime = moment(sessionData?.end_time, 'HH:mm:ss');
            if (now.isBetween(startTime, endTime, null, '[]')) {
                continueWithInputId();
            } else if (now.isBefore(startTime)) {
                present({
                    message: 'It\'s too early to start the session!',
                    duration: 2000,
                    position: 'bottom'
                });
            } else {
                present({
                    message: 'The session has already ended!',
                    duration: 2000,
                    position: 'bottom'
                });
            }
        }
    }


    const callToReloadSessionNearestData = ()=>{
        dispatch(actionToGetNearestGameSessionOrActiveSessionAndGamePlatform(gameType))
        dispatch(actionToGetGameSessionOrAllSessionAndGamePlatform(gameType))
    }

    useEffect(() => {
        callToReloadSessionNearestData();
    },[gameType])

    return (
        <React.Fragment>
            <div className={"bet-content__box"}>
                <div className={"infiniteScroll"}>
                    <div className={"sysMessage__container session_container_active"}>
                        <div className="getbet-title getbet-line">
                            <div className="getbet-title-left"><span>Current Session</span></div>
                        </div>
                        {(nearestGameSessionAndActiveSession?.loading) ?
                            <React.Fragment>
                                <LineLoaderComponent/>
                                <LineLoaderComponent/>
                                <LineLoaderComponent/>
                                <LineLoaderComponent/>
                                <LineLoaderComponent/>
                                <LineLoaderComponent/>
                            </React.Fragment>
                            : (nearestGameSessionAndActiveSession?.gameSessionData?.id) ?
                                <div className={"sysMessage__container_item"}>
                                    <div className="sysMessage__container-msgWrapper__item">
                                        <div className="sysMessage__container-msgWrapper__item-title">
                                            <div>
                                                <span className={"title"}>Session Number: {nearestGameSessionAndActiveSession?.gameSessionData?.session_number}</span>
                                            </div>
                                            <span onClick={() => callFunctionToEnterBetUserRole(nearestGameSessionAndActiveSession?.gameSessionData, nearestGameSessionAndActiveSession?.gameSessionData?.betting_platform_id)} className={`action_button update`}>
                                                ENTER
                                            </span>
                                        </div>
                                        <div className="sysMessage__container-msgWrapper__item-content">
                                            <div>
                                                <strong>
                                                    Start time:
                                                </strong>
                                                {moment(nearestGameSessionAndActiveSession?.gameSessionData?.start_time, 'HH:mm:ss').format('hh:mm A')}
                                            </div>
                                            <div><strong>Game type:</strong> WIN GO</div>
                                            {(nearestGameSessionAndActiveSession?.gameSessionData?.is_active !== 1 && userInfo?.role !== 1) ?
                                                <div><strong>The admin has not started the session yet. Please wait
                                                    while the session starts, then pull to refresh
                                                    check.</strong></div>
                                                : ''
                                            }
                                        </div>
                                        {(userInfo?.role === 1) ?
                                            <div className="sysMessage__container-msgWrapper__item-footer">
                                            <span
                                                onClick={() => callFunctionToDeleteSessionData(nearestGameSessionAndActiveSession?.gameSessionData)}
                                                className={`action_button delete`}>
                                                DELETE
                                            </span>
                                                <span
                                                    onClick={() => callFunctionToEnterBet(nearestGameSessionAndActiveSession?.gameSessionData)}
                                                    className={`action_button start-session`}>
                                                START
                                            </span>
                                            </div> : ''
                                        }
                                    </div>
                                </div>
                                :
                                <div className={"empty__container empty"}>
                                    <svg className={"svg-icon icon-empty"} xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 20 20">
                                        <path fill="#555"
                                              d="M12.8890921,0 L17.5,5.19179195 L17.5,19.0909091 C17.5,19.5929861 17.1049571,20 16.6176471,20 L3.38235294,20 C2.89504287,20 2.5,19.5929861 2.5,19.0909091 L2.5,0.909090909 C2.5,0.407013864 2.89504287,0 3.38235294,0 L12.8890921,0 Z M12.3061651,1.36363636 L3.82352941,1.36363636 L3.82352941,18.6363636 L16.1764706,18.6363636 L16.176511,6.34246852 L13.3474204,6.34196239 C12.6417682,6.36999151 12.0962002,6.25589945 11.706457,5.94817639 C11.2531904,5.59029821 11.0867064,4.98037308 11.10865,4.16662087 L11.10865,1.36739306 L12.31,1.367 L12.3061651,1.36363636 Z M9.01509627,14.9791746 C9.40494433,14.9791746 9.72097863,15.2922622 9.72097863,15.6784753 C9.72097863,16.0646884 9.40494433,16.377776 9.01509627,16.377776 C8.62524821,16.377776 8.30921392,16.0646884 8.30921392,15.6784753 C8.30921392,15.2922622 8.62524821,14.9791746 9.01509627,14.9791746 Z M11.1827155,8.48219134 C11.7596649,9.06011092 11.9556072,9.75942613 11.8818293,10.4800176 C11.8265271,11.0201556 11.4779753,11.5509802 10.9947767,12.0505594 L10.9460794,12.1005594 L10.9460794,12.1005594 L10.8408488,12.2063462 C10.7641308,12.2825287 10.6701753,12.3741416 10.534329,12.5058727 C10.3893855,12.6464238 10.2890121,12.7442705 10.2120648,12.8206852 L10.1115703,12.9218921 C10.0821667,12.9520424 10.0559765,12.9794937 10.0303569,13.006905 C9.82641639,13.2251078 9.76260226,13.3170885 9.72854047,13.4181966 C9.69459728,13.5189526 9.64965619,13.73941 9.60228918,14.0591422 C9.54714237,14.4313887 9.20954705,14.6870941 8.84824894,14.6302762 C8.48695082,14.5734583 8.23876616,14.2256328 8.29391297,13.8533862 C8.35258575,13.4573391 8.4111532,13.1700378 8.47818729,12.9710557 C8.58800251,12.6450833 8.75186564,12.4088935 9.07699042,12.0610316 C9.20092661,11.9284281 9.31857892,11.8121689 9.62440373,11.5156121 C9.85403277,11.2929392 9.95768805,11.1909631 10.0572705,11.0880047 C10.3397662,10.7959324 10.5516497,10.4732459 10.5656029,10.3369643 C10.5996372,10.0045498 10.5199654,9.72020231 10.2601126,9.45991256 C9.9148549,9.11407421 9.49243177,8.95163821 9.06509601,8.9849994 C8.57490635,9.02326746 8.18677184,9.20493363 7.86942647,9.56406039 C7.63826622,9.82565499 7.48192741,10.1361318 7.39737772,10.5061904 C7.31363213,10.8727296 6.9573436,11.0999218 6.60158501,11.0136385 C6.24582642,10.9273551 6.02531631,10.56027 6.10906189,10.1937308 C6.24453674,9.60078215 6.50611003,9.08131772 6.89074945,8.64603703 C7.44488347,8.01894624 8.15005931,7.68888903 8.96509653,7.62526082 C9.77527949,7.56201157 10.5686439,7.86708705 11.1827155,8.48219134 Z M12.384,1.45 L12.4321669,1.50876156 L12.4319299,4.18534141 C12.4202482,4.62352755 12.4794774,4.84051752 12.5115121,4.86581065 C12.6070703,4.9412589 12.8701302,4.99627139 13.3219266,4.97883216 L15.5154486,4.97883216 L15.8904383,5.40279396 L16.1764706,5.7215246 L12.384,1.45 Z"/>
                                    </svg>
                                    <p>Current session data is not available</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <IonModal
                className="add-money-to-game-wallet-modal"
                isOpen={isAddEditSessionPopupOpen}
                onDidDismiss={() => setIsAddEditSessionPopupOpen(false)}
                initialBreakpoint={0.7} breakpoints={[0.6, 1, 1]}>
                <IonContent className="ion-padding">
                    <div className="add_money_game_wallet_heading">
                        <h2>Add Edit Session</h2>
                    </div>
                    <div className={"list_status_type"}>
                        <IonRow>
                            <IonCol size="12">
                                <IonSelect
                                    label="Select platforms"
                                    value={sessionGamePlatform}
                                    multiple={false}
                                    onIonChange={(e) => {
                                        const selectedValues = e.detail.value; // This will be an array
                                        setSessionGamePlatform(selectedValues);
                                    }}
                                >
                                    {platformData?.map((platform) => (
                                        <IonSelectOption
                                            key={platform.id}
                                            value={platform}
                                        >
                                            {platform.name}
                                        </IonSelectOption>
                                    ))}
                                </IonSelect>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="6" className={"text-left"}>
                                <div>Select time</div>
                            </IonCol>
                            <IonCol size="6">
                                <IonDatetime
                                    presentation="time"
                                    value={sessionStartTime}
                                    onIonChange={(e) => setSessionStartTime(e.detail.value)}
                                />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="12">
                                <button onClick={callFunctionToSaveSessionData} type={"button"}
                                        className={"submit-transfer-btn"}>
                                    SAVE SESSION
                                </button>
                            </IonCol>
                        </IonRow>
                    </div>
                </IonContent>
            </IonModal>
            <IonLoading isOpen={updateLoading} message={"Please wait..."}/>
            <IonLoading isOpen={userEnterLoading} message={"Please wait..."}/>
        </React.Fragment>
    )
}
