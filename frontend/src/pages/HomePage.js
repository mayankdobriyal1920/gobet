import React from "react";
import {IonPage} from "@ionic/react";
import {useSelector} from "react-redux";
import "./Home.css";

export default function HomePage() {
    const {userInfo} = useSelector((state) => state.userAuthDetail);
    return (
        <IonPage className={"home_welcome_page_container"}>

        </IonPage>
    )
}