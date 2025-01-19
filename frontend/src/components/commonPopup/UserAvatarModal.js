import React, {useEffect, useState, useRef} from 'react';
import {IonModal, IonRow, IonCol, IonContent, IonGrid, IonList, IonAvatar} from '@ionic/react';
import {useDispatch, useSelector} from "react-redux";
import {actionUpdateUserAvatar} from "../../redux/CommonAction";
const UserAvatarModal = ({setIsChangingAvatar, isChangingAvatar}) => {
    const {userInfo} = useSelector((state) => state.userAuthDetail);
    const dispatch = useDispatch();

    const updateUserAvatar = (avatar) =>{
        setIsChangingAvatar(false);
        if (userInfo?.profile_url !== avatar){
            dispatch(actionUpdateUserAvatar(userInfo?.id, avatar));
        }
    }

    const handleCloseModal = () => {
        setIsChangingAvatar(false); // Close the modal
    };

    return (
        <React.Fragment>
            <IonModal
                isOpen={isChangingAvatar}
                initialBreakpoint={0.5}
                breakpoints={[0.5, 1]}
                onDidDismiss={handleCloseModal}
            >
                <IonContent className="ion-padding avatar-modal-main-wrapper">
                    <div className={"avatar_heading_choose"}>
                      <h2>Choose Avatar</h2>
                    </div>
                    <IonGrid className="avatar-grid">
                        <IonRow className={"avatar_user_row"}>
                            <IonCol size="4" className="avatar-col">
                                <IonAvatar>
                                    <img alt="avatar-1" src={`assets/avatar/avatar-1.png`}
                                         onClick={() => updateUserAvatar('avatar-1')}
                                         className={userInfo?.profile_url === 'avatar-1' ? "selected-avatar userAvatar" : "userAvatar"}/>
                                </IonAvatar>
                            </IonCol>
                            <IonCol size="4" className="avatar-col">
                                <IonAvatar>
                                    <img alt="avatar-2" src={`assets/avatar/avatar-2.png`}
                                         onClick={() => updateUserAvatar('avatar-2')}
                                         className={userInfo?.profile_url === 'avatar-2' ? "selected-avatar userAvatar" : "userAvatar"}/>
                                </IonAvatar>
                            </IonCol>
                            <IonCol size="4" className="avatar-col">
                                <IonAvatar>
                                    <img alt="avatar-3" src={`assets/avatar/avatar-3.png`}
                                         onClick={() => updateUserAvatar('avatar-3')}
                                         className={userInfo?.profile_url === 'avatar-3' ? "selected-avatar userAvatar" : "userAvatar"}/>
                                </IonAvatar>
                            </IonCol>
                        </IonRow>

                        {/* Repeat for the next row of avatars */}
                        <IonRow>
                            <IonCol size="4" className="avatar-col">
                                <IonAvatar>
                                    <img alt="avatar-4" src={`assets/avatar/avatar-4.png`}
                                         onClick={() => updateUserAvatar('avatar-4')}
                                         className={userInfo?.profile_url === 'avatar-4' ? "selected-avatar userAvatar" : "userAvatar"}/>
                                </IonAvatar>
                            </IonCol>
                            <IonCol size="4" className="avatar-col">
                                <IonAvatar>
                                    <img alt="avatar-5" src={`assets/avatar/avatar-5.png`}
                                         onClick={() => updateUserAvatar('avatar-5')}
                                         className={userInfo?.profile_url === 'avatar-5' ? "selected-avatar userAvatar" : "userAvatar"}/>
                                </IonAvatar>
                            </IonCol>
                            <IonCol size="4" className="avatar-col">
                                <IonAvatar>
                                    <img alt="avatar-6" src={`assets/avatar/avatar-6.png`}
                                         onClick={() => updateUserAvatar('avatar-6')}
                                         className={userInfo?.profile_url === 'avatar-6' ? "selected-avatar userAvatar" : "userAvatar"}/>
                                </IonAvatar>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>
        </React.Fragment>
    );
};

export default UserAvatarModal;