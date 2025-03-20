import React,{ useState } from "react";
import {
    IonModal,
    IonButton,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonRadio,
    IonRadioGroup,
    IonButtons
} from "@ionic/react";
import {useSelector} from "react-redux";
import moment from "moment-timezone";

const SubscriptionModal = ({ isOpen, onClose, onSelectPlan }) => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const {subscriptionPlan} = useSelector((state) => state.appSubscriptionPlanData);

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} initialBreakpoint={0.8} breakpoints={[0,0.8, 1]}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Choose Plan</IonTitle>
                    <IonButtons slot="end">
                        <button className={"ion_cancel_button_subscription"} onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            onClick={() => selectedPlan && onSelectPlan(selectedPlan)}
                            disabled={!selectedPlan}
                            className={"ion_confirm_button_subscription"}
                        >
                            Confirm
                        </button>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonList>
                    <IonRadioGroup value={selectedPlan} onIonChange={(e) => setSelectedPlan(e.detail.value)}>
                        {subscriptionPlan?.map((plan) => (
                            <IonItem className={"sub_item_text"} key={plan.id}>
                                <IonLabel>
                                    <div className="sysMessage__container-msgWrapper__item">
                                        <div className="sysMessage__container-msgWrapper__item-title">
                                            <div>
                                                <span className={"title"}>{plan.name}</span>
                                            </div>
                                            <span className={`action_button`}>
                                                <IonRadio slot="end" value={plan}/>
                                            </span>
                                        </div>
                                        <div className="sysMessage__container-msgWrapper__item-time">
                                            <strong>Duration :</strong> 30 Days
                                            <br/>
                                            <strong>Value :</strong> ₹{plan.value}
                                            <br/>
                                            <strong>Price</strong> : ₹{plan.price}
                                         </div>
                                    </div>
                                </IonLabel>
                            </IonItem>
                        ))}
                    </IonRadioGroup>
                </IonList>
            </IonContent>
        </IonModal>
    );
};

export default SubscriptionModal;
