import React, {useEffect, useState} from 'react';
import {IonButton, IonModal, IonHeader, IonRow, IonCol, IonToolbar, IonTitle, IonButtons} from '@ionic/react';
import {useDispatch, useSelector} from "react-redux";
import {actionUpdateUserAvatar} from "../../redux/CommonAction";
const UserAvatarModal = () => {
    const {userInfo} = useSelector((state) => state.userAuthDetail);
    const changeUserAvatarModal = useSelector((state) => state.changeUserAvatarModal);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    // Function to close the sheet
    const closeSheet = () => setIsOpen(false);

    useEffect(()=>{
        setIsOpen(changeUserAvatarModal.open);
    },[changeUserAvatarModal])

    const updateUserAvatar = (avatar) =>{
        if (userInfo?.profile_url !== avatar){
            console.log('change avatar');
            dispatch(actionUpdateUserAvatar(userInfo?.id, avatar));
        }
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={closeSheet}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Update Your Avatar</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={closeSheet}>X</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonRow>
                <IonCol>
                    <img alt={"avatar-1"} src={`assets/avatar/avatar-1.png`} onClick={()=>updateUserAvatar('avatar-1')} className="userAvatar"/>
                </IonCol>
                <IonCol>
                    <img alt={"avatar-2"} src={`assets/avatar/avatar-2.png`} onClick={()=>updateUserAvatar('avatar-2')} className="userAvatar"/>
                </IonCol>
                <IonCol>
                    <img alt={"avatar-3"} src={`assets/avatar/avatar-3.png`} onClick={()=>updateUserAvatar('avatar-3')} className="userAvatar"/>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <img alt={"avatar-4"} src={`assets/avatar/avatar-4.png`} onClick={()=>updateUserAvatar('avatar-4')} className="userAvatar"/>
                </IonCol>
                <IonCol>
                    <img alt={"avatar-5"} src={`assets/avatar/avatar-5.png`} onClick={()=>updateUserAvatar('avatar-5')} className="userAvatar"/>
                </IonCol>
                <IonCol>
                    <img alt={"avatar-6"} src={`assets/avatar/avatar-6.png`} onClick={()=>updateUserAvatar('avatar-6')} className="userAvatar"/>
                </IonCol>
            </IonRow>
            {/*<div style={{ padding: "20px" }}>
                <p>This is a sliding sheet component that you can use to display content or options.</p>
                <IonButton onClick={closeSheet}>Close Sheet</IonButton>
            </div>*/}
        </IonModal>
    );
};

export default UserAvatarModal;