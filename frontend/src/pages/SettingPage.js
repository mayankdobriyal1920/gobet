import React from "react";
import {IonContent, IonHeader, IonIcon, IonPage} from "@ionic/react";
import {useSelector} from "react-redux";
import {arrowBack} from "ionicons/icons";
import {useHistory} from "react-router";

export default function SettingPage() {
    const {userInfo} = useSelector((state) => state.userAuthDetail);
    const history = useHistory();
    const goBack = ()=>{
        history.goBack();
    }

    return (
        <IonPage  className={"home_welcome_page_container"}>
            <IonHeader>
                <div className={"content-getbet content"}>
                    <div className="navbar">
                        <div className="navbar-fixed">
                            <div className="navbar__content">
                                <div onClick={goBack} className="navbar__content-left">
                                    <IonIcon icon={arrowBack} style={{ color: "#ffffff",width: "24px",height: "24px" }} />
                                </div>
                                <div className="navbar__content-center">
                                    <div className="navbar__content-title">
                                        <span>App Settings</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </IonHeader>
            <IonContent className={"content-theme-off-white-bg-color"}>
                <div className="Wallet__C inner_page">
                    <div className="userInfo__container-setting-center">
                        <div className="userInfo__container-setting-center-header">
                            <div className="userInfo__container-content__avatar">
                                <img alt={"userInfo"} src={`assets/avatar/${userInfo?.profile_url}.png`}
                                     className="userAvatar"/>
                            </div>
                            <div className="userInfo__container-setting-center-header-edit"><span
                            >Change avatar</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="van-badge__wrapper van-icon van-icon-arrow"
                                     fill="rgb(136, 136, 136)" height="12px" width="12px" version="1.1" id="Layer_1"
                                     viewBox="0 0 330 330">
                                    <path id="XMLID_222_"
                                          d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z"/>
                                    </svg>
                            </div>
                        </div>
                        <div className="userInfo__container-setting-center-content ar-1px-b">
                            <h5>Nickname</h5>
                            <div>
                                <span>{userInfo?.name}</span>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="van-badge__wrapper van-icon van-icon-arrow"
                                     fill="rgb(136, 136, 136)" height="12px" width="12px" version="1.1" id="Layer_1"
                                     viewBox="0 0 330 330">
                                    <path id="XMLID_222_"
                                          d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="userInfo__container-setting-center-content"><h5>
                            UID
                        </h5>
                            <div>
                                <span>{userInfo?.id}</span>
                                <svg className="svg-icon icon-copy" viewBox="0 0 48 48" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13 12.4316V7.8125C13 6.2592 14.2592 5 15.8125 5H40.1875C41.7408 5 43 6.2592 43 7.8125V32.1875C43 33.7408 41.7408 35 40.1875 35H35.5163"
                                        stroke="currentColor" strokeWidth="4" strokeLinecap="round"
                                            strokeLinejoin="round"></path>
                                        <path
                                            d="M32.1875 13H7.8125C6.2592 13 5 14.2592 5 15.8125V40.1875C5 41.7408 6.2592 43 7.8125 43H32.1875C33.7408 43 35 41.7408 35 40.1875V15.8125C35 14.2592 33.7408 13 32.1875 13Z"
                                            stroke="currentColor" strokeWidth="4" strokeLinejoin="round"></path>

                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"content_setting-wrapper"}>
                    <div className={"setting-items-wrapper"}>
                        <div className="content-sub_title">
                            <div>Security information</div>
                            <div className={"setting_container"}>
                              <div className="setting_container_item">
                                <div>
                                    <figure className="icon">
                                        <svg className="svg-icon icon-versionUpdateIcon" viewBox="0 0 80 80" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.2"
                                                      d="M0 20C0 8.95431 8.95431 0 20 0H60C71.0457 0 80 8.95431 80 20V60C80 71.0457 71.0457 80 60 80H20C8.95431 80 0 71.0457 0 60V20Z"
                                                      fill="var(--main-color)"></path>
                                                <circle opacity="0.5" cx="40.5" cy="40.5" r="20.5"
                                                        fill="var(--main-color)"></circle>
                                                <path
                                                    d="M67 40.5C67 36.8886 66.2887 33.3127 64.9067 29.9762C63.5247 26.6398 61.4991 23.6082 58.9454 21.0546C56.3918 18.501 53.3602 16.4753 50.0238 15.0933C46.6873 13.7113 43.1114 13 39.5 13C35.8886 13 32.3127 13.7113 28.9762 15.0933C25.6398 16.4753 22.6082 18.501 20.0546 21.0546C17.501 23.6082 15.4753 26.6398 14.0933 29.9762C12.7113 33.3127 12 36.8886 12 40.5C12.0004 47.7935 14.8981 54.788 20.0557 59.945C25.2132 65.102 32.2081 67.9989 39.5015 67.9985C46.795 67.9981 53.7896 65.1004 58.9465 59.9428C64.1035 54.7853 67.0004 47.7904 67 40.4969V40.5ZM43.4233 53.1271C39.3587 57.4621 34.2249 58.8538 33.6135 55.5849C33.1496 53.1271 35.5798 44.1867 36.0652 40.8287C36.228 39.7258 34.8363 40.8287 34.8363 40.8287C34.8363 40.8287 30.8485 43.6368 29.9329 42.0577C29.7885 41.8057 30.7716 41.0346 31.1618 40.8287C31.1618 40.8287 39.4816 34.7149 42.2005 35.9069C44.9195 37.099 41.2451 44.6322 40.9716 45.7475C40.7013 46.8627 38.9746 55.3944 44.6522 50.6631C44.6522 50.6631 47.4849 48.7798 43.4233 53.124V53.1271ZM41.3434 32.211C40.2067 32.146 39.1422 31.6326 38.3836 30.7836C37.625 29.9346 37.2343 28.8193 37.2972 27.6824C37.3575 26.5447 37.8671 25.4775 38.714 24.7153C39.5608 23.9531 40.6757 23.5584 41.8134 23.6178C44.1822 23.7468 45.9917 25.7807 45.8627 28.1464C45.8328 28.7103 45.6921 29.2627 45.4487 29.7722C45.2052 30.2817 44.8637 30.7383 44.4437 31.1157C44.0237 31.4932 43.5335 31.7842 43.001 31.9722C42.4685 32.1601 41.9042 32.2412 41.3403 32.211H41.3434Z"
                                                    fill="var(--main-color)"></path>
                                        </svg>
                                    </figure>
                                    <span>Updated version</span>
                                </div>
                                <div>
                                    <h5>1.0.0</h5>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="van-badge__wrapper van-icon van-icon-arrow"
                                         fill="rgb(136, 136, 136)" height="12px" width="12px" version="1.1" id="Layer_1"
                                         viewBox="0 0 330 330">
                                        <path id="XMLID_222_"
                                              d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z"/>
                                    </svg>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}
