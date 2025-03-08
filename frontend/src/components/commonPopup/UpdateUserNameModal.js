import React, {useEffect, useState} from 'react';
import {IonModal, IonRow, IonCol, IonContent, IonGrid, IonItem, IonLabel} from '@ionic/react';
import {useDispatch, useSelector} from "react-redux";
import {actionUpdateUserName} from "../../redux/CommonAction";
const UpdateUserNameModal = ({setIsEditing,isEditing}) => {
    const {userInfo} = useSelector((state) => state.userAuthDetail);
    const [tempName, setTempName] = useState(userInfo?.name);
    const [nameError,setNameError] = useState(false);
    const [nameErrorMessage,setNameErrorMessage] = useState('');
    const dispatch = useDispatch();

    const updateUserNameAction = () => {
        const isFormValid = validateName();
        if (isFormValid){
            setIsEditing(false);
            dispatch(actionUpdateUserName(tempName));
        }
    };

    useEffect(() => {
        setTempName(userInfo?.name);
    }, [userInfo?.name])

    const handleCloseModal = () => {
        setIsEditing(false); // Close the modal
    };

    const validateName = () =>{
        let isFormValid = true;
        setNameError(false);
        setNameErrorMessage('');
        if (tempName.trim() === ''){
            isFormValid = false;
            setNameError(true);
            setNameErrorMessage('Please enter name');
        }
        return isFormValid;
    }

    useEffect(() => {
        setTempName(userInfo?.name);
        setNameError(false);
        setNameErrorMessage('');
        setTimeout(()=>{
            document.querySelector('#update_user_name_input')?.focus();
        },500)
    }, [isEditing]);



    return (
        <React.Fragment>
            <IonModal
                isOpen={isEditing}
                onDidDismiss={handleCloseModal}
                initialBreakpoint={0.5} breakpoints={[0.5, 1]}>
                <IonContent className="ion-padding">
                    <div className={"user_name_change_modal_heading"}>
                        <h2>Update Name</h2>
                    </div>
                    <IonGrid className="">
                        <IonRow className={""}>
                            <IonCol size="12" className="">
                                <IonLabel position="stacked" className="enter_modal_user_label">Name</IonLabel>
                                <input
                                    type="text"
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                    autoFocus
                                    className="update_user_name_input"
                                    id={"update_user_name_input"}
                                    placeholder={"Enter Name"}  required={true}
                                />
                            </IonCol>
                        </IonRow>
                        {nameError &&<IonRow className={""}>
                            <IonCol size="12" className="">
                                {nameError && <p className="error fontsize2">{nameErrorMessage}</p>}
                            </IonCol>
                        </IonRow>}
                        <IonRow>
                            <IonCol size="12" className="">
                                <button onClick={updateUserNameAction} type={"button"}
                                        className={"submit_user_name_update_btn"}>
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

export default UpdateUserNameModal;