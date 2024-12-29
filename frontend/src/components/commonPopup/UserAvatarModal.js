import React, {useEffect, useState, useRef} from 'react';
import {IonModal, IonRow, IonCol, IonContent, IonList, IonAvatar} from '@ionic/react';
import {useDispatch, useSelector} from "react-redux";
import {actionUpdateUserAvatar} from "../../redux/CommonAction";
const UserAvatarModal = () => {
    const {userInfo} = useSelector((state) => state.userAuthDetail);
    const changeUserAvatarModal = useSelector((state) => state.changeUserAvatarModal);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        setIsOpen(changeUserAvatarModal.open);
    },[changeUserAvatarModal])

    const updateUserAvatar = (avatar) =>{
        modalRef.current?.dismiss();
        if (userInfo?.profile_url !== avatar){
            dispatch(actionUpdateUserAvatar(userInfo?.id, avatar));
        }
    }

    const modalRef = useRef(null);

    return (
        <>
            <IonAvatar className="userAvatarWrapper" id="open-modal" expand="block">
                <img alt={"userInfo"} src={`assets/avatar/${userInfo?.profile_url}.png`}
                     className="userAvatar"/>
            </IonAvatar>
        <IonModal
            ref={modalRef}
            trigger="open-modal"
            isOpen={isOpen}
            initialBreakpoint={0.5} breakpoints={[0.5, 1]}
        >
            <IonContent className="ion-padding">
                <IonList>
                    <IonRow className="avatarListTableRow">
                        <IonCol size="4" className="ion-text-center">
                            <IonAvatar>
                                <img alt="avatar-1" src={`assets/avatar/avatar-1.png`} onClick={() => updateUserAvatar('avatar-1')} className="userAvatar" />
                            </IonAvatar>
                        </IonCol>
                        <IonCol size="4" className="ion-text-center">
                            <IonAvatar>
                                <img alt="avatar-2" src={`assets/avatar/avatar-2.png`} onClick={() => updateUserAvatar('avatar-2')} className="userAvatar" />
                            </IonAvatar>
                        </IonCol>
                        <IonCol size="4" className="ion-text-center">
                            <IonAvatar>
                                <img alt="avatar-3" src={`assets/avatar/avatar-3.png`} onClick={() => updateUserAvatar('avatar-3')} className="userAvatar" />
                            </IonAvatar>
                        </IonCol>
                    </IonRow>

                    {/* Repeat for the next row of avatars */}
                    <IonRow className="avatarListTableRow">
                        <IonCol size="4" className="ion-text-center">
                            <IonAvatar>
                                <img alt="avatar-4" src={`assets/avatar/avatar-4.png`} onClick={() => updateUserAvatar('avatar-4')} className="userAvatar" />
                            </IonAvatar>
                        </IonCol>
                        <IonCol size="4" className="ion-text-center">
                            <IonAvatar>
                                <img alt="avatar-5" src={`assets/avatar/avatar-5.png`} onClick={() => updateUserAvatar('avatar-5')} className="userAvatar" />
                            </IonAvatar>
                        </IonCol>
                        <IonCol size="4" className="ion-text-center">
                            <IonAvatar>
                                <img alt="avatar-6" src={`assets/avatar/avatar-6.png`} onClick={() => updateUserAvatar('avatar-6')} className="userAvatar" />
                            </IonAvatar>
                        </IonCol>
                    </IonRow>
                </IonList>
            </IonContent>
        </IonModal>
        </>
    );
};

export default UserAvatarModal;