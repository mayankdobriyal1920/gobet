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
    IonFooter, IonButtons
} from "@ionic/react";
import {useSelector} from "react-redux";

const SubscriptionModal = ({ isOpen, onClose, onSelectPlan }) => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const {subscriptionPlan} = useSelector((state) => state.appSubscriptionPlanData);

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} initialBreakpoint={0.5} breakpoints={[0,0.5, 1]}>
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
                                    {plan.name} Duration 30 Days (Value: ₹{plan.value})
                                </IonLabel>
                                <IonRadio slot="end" value={plan} />
                            </IonItem>
                        ))}
                    </IonRadioGroup>
                </IonList>
            </IonContent>
        </IonModal>
    );
};

export default SubscriptionModal;
