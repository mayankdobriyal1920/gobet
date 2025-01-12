import React, {useState} from "react";
import {IonAlert, IonContent, IonLoading, IonPage} from "@ionic/react";
import {useDispatch, useSelector} from "react-redux";
import {actionToLogoutUserSession, actionUpdateUserName} from "../redux/CommonAction";
import UserAvatarModal from "../components/commonPopup/UserAvatarModal";

export default function AccountPage() {
    const {userInfo} = useSelector((state) => state.userAuthDetail);
    const {walletBalance} = useSelector((state) => state.userWalletAndGameBalance);
    const [userLogoutLoading,setUserLogoutLoading] = useState(false);
    const [userLogoutAlertConfirm,setUserLogoutAlertConfirm] = useState(false);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(userInfo?.name);

    const callFunctionToLogoutUser = ()=>{
        setUserLogoutLoading(true);
        setUserLogoutAlertConfirm(false);
        dispatch(actionToLogoutUserSession(setUserLogoutLoading));
    }

    const handleEdit = () => {
        setTempName(userInfo?.name);
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        dispatch(actionUpdateUserName(tempName));
    };

    return (
        <IonPage>
            <IonContent>
                <div className={"profile_account_main_page_header_container"}>
                    <div className={"profile_account_main_page_header_container_background"}>
                        <div className={"userInfo__container-content"}>
                            <div className={"profile_account_main_page_header_wrapper"}>
                                <div className={"profile_account_container-content__avatar"}>
                                    <UserAvatarModal/>
                                </div>
                            </div>
                        </div>
                        <div className="userInfo__container-content__name">
                            <div className="userInfo__container-content-nickname">
                                <div className="userInfo__container-content-nickname_edit">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={tempName}
                                            onChange={(e) => setTempName(e.target.value)}
                                            onBlur={handleBlur}
                                            autoFocus
                                            className="userInfo__container-content-nickname_input"
                                        />
                                    ) : (
                                        <>
                                            <h3>{userInfo?.name}</h3>
                                            <button
                                                onClick={handleEdit}
                                                className="userInfo__container-content-nickname_edit_icon"
                                                aria-label="Edit name">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{cursor: "pointer"}}><path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm14.81-10.64c.2-.2.2-.51 0-.71l-2.83-2.83a.5.5 0 0 0-.71 0l-1.06 1.06 3.54 3.54 1.06-1.06z"/></svg>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="userInfo__container-content-uid">
                                <span>UID</span><span>&nbsp;-&nbsp;</span><span>{userInfo?.id}</span>
                            </div>
                            <div className="userInfo__container-content-logintime">
                                <span>Sub Admin:&nbsp;</span><span>{userInfo?.sub_admin?.name}</span>
                            </div>
                        </div>
                    </div>
                    <div className={"profile_account_main_userinfo_content"}>
                        <div className={"totalSavings__container"}>
                            <div className="totalSavings__container-header">
                                <div className="totalSavings__container-header-box ar-1px-b">
                                    <div className="totalSavings__container-header__title">
                                        <span>Total balance</span>
                                    </div>
                                    <p className="totalSavings__container-header__subtitle">
                                        <span>₹{walletBalance ? walletBalance : '0.00'}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon icon-refreshBalance"
                                             viewBox="0 0 24 24" fill="none">
                                            <circle opacity="0.5" cx="12" cy="12" r="10" fill="#1C274C"/>
                                            <path
                                                d="M7.37756 11.6296H6.62756H7.37756ZM7.37756 12.5556L6.81609 13.0528C6.95137 13.2056 7.14306 13.2966 7.34695 13.3049C7.55084 13.3133 7.74932 13.2382 7.89662 13.0969L7.37756 12.5556ZM9.51905 11.5414C9.81805 11.2547 9.82804 10.7799 9.54137 10.4809C9.2547 10.182 8.77994 10.172 8.48095 10.4586L9.51905 11.5414ZM6.56148 10.5028C6.28686 10.1927 5.81286 10.1639 5.50277 10.4385C5.19267 10.7131 5.16391 11.1871 5.43852 11.4972L6.56148 10.5028ZM14.9317 9.0093C15.213 9.31337 15.6875 9.33184 15.9915 9.05055C16.2956 8.76927 16.3141 8.29476 16.0328 7.9907L14.9317 9.0093ZM12.0437 6.25C9.05802 6.25 6.62756 8.653 6.62756 11.6296H8.12756C8.12756 9.49251 9.87531 7.75 12.0437 7.75V6.25ZM6.62756 11.6296L6.62756 12.5556H8.12756L8.12756 11.6296H6.62756ZM7.89662 13.0969L9.51905 11.5414L8.48095 10.4586L6.85851 12.0142L7.89662 13.0969ZM7.93904 12.0583L6.56148 10.5028L5.43852 11.4972L6.81609 13.0528L7.93904 12.0583ZM16.0328 7.9907C15.0431 6.9209 13.6212 6.25 12.0437 6.25V7.75C13.1879 7.75 14.2154 8.23504 14.9317 9.0093L16.0328 7.9907Z"
                                                fill="#ffffff"/>
                                            <path
                                                d="M16.6188 11.4443L17.1795 10.9462C17.044 10.7937 16.8523 10.703 16.6485 10.6949C16.4447 10.6868 16.2464 10.7621 16.0993 10.9034L16.6188 11.4443ZM14.4805 12.4581C14.1817 12.745 14.1722 13.2198 14.4591 13.5185C14.746 13.8173 15.2208 13.8269 15.5195 13.54L14.4805 12.4581ZM17.4393 13.4972C17.7144 13.8068 18.1885 13.8348 18.4981 13.5597C18.8078 13.2846 18.8358 12.8106 18.5607 12.5009L17.4393 13.4972ZM9.04688 15.0047C8.76342 14.7027 8.28879 14.6876 7.98675 14.9711C7.68472 15.2545 7.66966 15.7292 7.95312 16.0312L9.04688 15.0047ZM11.9348 17.7499C14.9276 17.7499 17.3688 15.3496 17.3688 12.3703H15.8688C15.8688 14.5047 14.1158 16.2499 11.9348 16.2499V17.7499ZM17.3688 12.3703V11.4443H15.8688V12.3703H17.3688ZM16.0993 10.9034L14.4805 12.4581L15.5195 13.54L17.1383 11.9853L16.0993 10.9034ZM16.0581 11.9425L17.4393 13.4972L18.5607 12.5009L17.1795 10.9462L16.0581 11.9425ZM7.95312 16.0312C8.94543 17.0885 10.3635 17.7499 11.9348 17.7499V16.2499C10.792 16.2499 9.76546 15.7704 9.04688 15.0047L7.95312 16.0312Z"
                                                fill="#ffffff"/>
                                        </svg>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="financialServices__container">
                            <div className="financialServices__container-box">
                                <div>
                                    <svg className="svg-icon icon-betHistory" viewBox="0 0 80 80" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M54.2259 73.1178H18.4859C12.7419 73.1178 8.08594 68.4617 8.08594 62.7177V16.9937C8.08594 11.2497 12.7419 6.59375 18.4859 6.59375H54.2259C59.9699 6.59375 64.6259 11.2497 64.6259 16.9937V62.7177C64.6259 68.4617 59.9699 73.1178 54.2259 73.1178Z"
                                            fill="#5CA6FF"></path>
                                        <path
                                            d="M49.1664 25.4703H23.7664C21.9984 25.4703 20.5664 24.0383 20.5664 22.2703C20.5664 20.5023 21.9984 19.0703 23.7664 19.0703H49.1664C50.9344 19.0703 52.3664 20.5023 52.3664 22.2703C52.3664 24.0383 50.9344 25.4703 49.1664 25.4703ZM49.1664 38.1583H23.7664C21.9984 38.1583 20.5664 36.7263 20.5664 34.9583C20.5664 33.1903 21.9984 31.7583 23.7664 31.7583H49.1664C50.9344 31.7583 52.3664 33.1903 52.3664 34.9583C52.3664 36.7263 50.9344 38.1583 49.1664 38.1583ZM35.9304 50.8463H23.7664C21.9984 50.8463 20.5664 49.4143 20.5664 47.6463C20.5664 45.8783 21.9984 44.4463 23.7664 44.4463H35.9304C37.6984 44.4463 39.1304 45.8783 39.1304 47.6463C39.1304 49.4143 37.6944 50.8463 35.9304 50.8463Z"
                                            fill="var(--bg_color_L2)"></path>
                                        <path
                                            d="M42.9609 58.008C42.9609 61.9438 44.5244 65.7184 47.3075 68.5014C50.0905 71.2845 53.8651 72.848 57.8009 72.848C61.7367 72.848 65.5113 71.2845 68.2944 68.5014C71.0774 65.7184 72.6409 61.9438 72.6409 58.008C72.6409 54.0722 71.0774 50.2975 68.2944 47.5145C65.5113 44.7315 61.7367 43.168 57.8009 43.168C53.8651 43.168 50.0905 44.7315 47.3075 47.5145C44.5244 50.2975 42.9609 54.0722 42.9609 58.008Z"
                                            fill="#5CA6FF"></path>
                                        <path
                                            d="M57.8205 43.1875C49.6245 43.1875 42.9805 49.8315 42.9805 58.0275C42.9805 65.8395 49.0165 72.2355 56.6805 72.8195C61.2405 71.7195 64.6325 67.6115 64.6325 62.7115V44.8395C62.5264 43.7526 60.1905 43.1862 57.8205 43.1875Z"
                                            fill="#3689FF"></path>
                                        <path d="M68 48H48V68H68V48Z" fill="white" fillOpacity="0.01"></path>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M58.0026 46.4687C58.9231 46.4687 59.6693 47.2149 59.6693 48.1354L59.6693 68.1354C59.6693 69.0559 58.9231 69.8021 58.0026 69.8021C57.0821 69.8021 56.3359 69.0559 56.3359 68.1354L56.3359 48.1354C56.3359 47.2149 57.0821 46.4687 58.0026 46.4687Z"
                                              fill="var(--bg_color_L2)"></path>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M50.918 54.2487C50.918 51.2571 53.3431 48.832 56.3346 48.832H62.5834L62.5846 50.4987L62.5846 52.1654H56.3346C55.184 52.1654 54.2513 53.0981 54.2513 54.2487C54.2513 55.3993 55.184 56.332 56.3346 56.332C57.2551 56.332 58.0013 57.0782 58.0013 57.9987C58.0013 58.9192 57.2551 59.6654 56.3346 59.6654C53.3431 59.6654 50.918 57.2403 50.918 54.2487ZM64.2513 50.4987C64.2513 51.4192 63.5051 52.1654 62.5846 52.1654L62.5846 50.4987L62.5834 48.832C63.5039 48.832 64.2513 49.5782 64.2513 50.4987Z"
                                              fill="var(--bg_color_L2)"></path>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M54.6667 57.9987C54.6667 57.0782 55.4129 56.332 56.3333 56.332H59.6667C62.6582 56.332 65.0833 58.7571 65.0833 61.7487C65.0833 64.7403 62.6582 67.1654 59.6667 67.1654H53.4179L53.4167 65.4987L53.4167 63.832H59.6667C60.8173 63.832 61.75 62.8993 61.75 61.7487C61.75 60.5981 60.8173 59.6654 59.6667 59.6654H56.3333C55.4129 59.6654 54.6667 58.9192 54.6667 57.9987ZM51.75 65.4987C51.75 64.5782 52.4962 63.832 53.4167 63.832L53.4167 65.4987L53.4179 67.1654C52.4974 67.1654 51.75 66.4192 51.75 65.4987Z"
                                              fill="var(--bg_color_L2)"></path>
                                    </svg>
                                    <div className="financialServices__container-box-para">
                                        <h3>Game History</h3><span>My game history</span>
                                    </div>
                                </div>
                                <div>
                                    <svg className="svg-icon icon-tradeHistory" viewBox="0 0 80 80" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M54.2259 73.1178H18.4859C12.7419 73.1178 8.08594 68.4617 8.08594 62.7177V16.9937C8.08594 11.2497 12.7419 6.59375 18.4859 6.59375H54.2259C59.9699 6.59375 64.6259 11.2497 64.6259 16.9937V62.7177C64.6259 68.4617 59.9699 73.1178 54.2259 73.1178Z"
                                            fill="#4BE2AC"></path>
                                        <path
                                            d="M49.1703 25.4703H23.7703C22.0023 25.4703 20.5703 24.0383 20.5703 22.2703C20.5703 20.5023 22.0023 19.0703 23.7703 19.0703H49.1703C50.9383 19.0703 52.3703 20.5023 52.3703 22.2703C52.3703 24.0383 50.9383 25.4703 49.1703 25.4703ZM49.1703 38.1583H23.7703C22.0023 38.1583 20.5703 36.7263 20.5703 34.9583C20.5703 33.1903 22.0023 31.7583 23.7703 31.7583H49.1703C50.9383 31.7583 52.3703 33.1903 52.3703 34.9583C52.3703 36.7263 50.9383 38.1583 49.1703 38.1583ZM35.9343 50.8463H23.7703C22.0023 50.8463 20.5703 49.4143 20.5703 47.6463C20.5703 45.8783 22.0023 44.4463 23.7703 44.4463H35.9343C37.7023 44.4463 39.1343 45.8783 39.1343 47.6463C39.1343 49.4143 37.6983 50.8463 35.9343 50.8463Z"
                                            fill="var(--bg_color_L2)"></path>
                                        <path
                                            d="M42.5 58.008C42.5 61.9438 44.0635 65.7184 46.8465 68.5014C49.6296 71.2845 53.4042 72.848 57.34 72.848C61.2758 72.848 65.0504 71.2845 67.8334 68.5014C70.6165 65.7184 72.18 61.9438 72.18 58.008C72.18 54.0722 70.6165 50.2975 67.8334 47.5145C65.0504 44.7315 61.2758 43.168 57.34 43.168C53.4042 43.168 49.6296 44.7315 46.8465 47.5145C44.0635 50.2975 42.5 54.0722 42.5 58.008Z"
                                            fill="#4BE2AC"></path>
                                        <path
                                            d="M57.8205 43.1875C49.6245 43.1875 42.9805 49.8315 42.9805 58.0275C42.9805 65.8395 49.0165 72.2355 56.6805 72.8195C61.2405 71.7195 64.6325 67.6115 64.6325 62.7115V44.8395C62.5264 43.7526 60.1905 43.1862 57.8205 43.1875Z"
                                            fill="#06CC76"></path>
                                        <path d="M51.25 54.375H63.75" stroke="var(--bg_color_L2)" strokeWidth="3"
                                              strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M51.25 61.875H63.75" stroke="var(--bg_color_L2)" strokeWidth="3"
                                              strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M63.75 54.375L59.375 50" stroke="var(--bg_color_L2)" strokeWidth="3"
                                              strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M55.625 66.25L51.25 61.875" stroke="var(--bg_color_L2)"
                                              strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <div className="financialServices__container-box-para">
                                        <h3>Transaction</h3>
                                        <span>My transaction history</span>
                                    </div>
                                </div>
                            </div>
                            <div className="serviceCenter-wrap">
                                <div className="serviceCenter__container"><h1
                                >Service center</h1>
                                    <div className="serviceCenter__container-items">
                                        <div className="serviceCenter__container-items__item">
                                            <svg className="svg-icon icon-settingCenter" xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 60 60" fill="none">
                                                <path opacity="0.4"
                                                      d="M5 32.2035V27.8035C5 25.2035 7.125 23.0535 9.75 23.0535C14.275 23.0535 16.125 19.8535 13.85 15.9285C12.55 13.6785 13.325 10.7535 15.6 9.4535L19.925 6.9785C21.9 5.8035 24.45 6.5035 25.625 8.4785L25.9 8.9535C28.15 12.8785 31.85 12.8785 34.125 8.9535L34.4 8.4785C35.575 6.5035 38.125 5.8035 40.1 6.9785L44.425 9.4535C46.7 10.7535 47.475 13.6785 46.175 15.9285C43.9 19.8535 45.75 23.0535 50.275 23.0535C52.875 23.0535 55.025 25.1785 55.025 27.8035V32.2035C55.025 34.8035 52.9 36.9535 50.275 36.9535C45.75 36.9535 43.9 40.1535 46.175 44.0785C47.475 46.3535 46.7 49.2535 44.425 50.5535L40.1 53.0285C38.125 54.2035 35.575 53.5035 34.4 51.5285L34.125 51.0535C31.875 47.1285 28.175 47.1285 25.9 51.0535L25.625 51.5285C24.45 53.5035 21.9 54.2035 19.925 53.0285L15.6 50.5535C14.5102 49.926 13.714 48.8919 13.3859 47.6779C13.0578 46.464 13.2247 45.1695 13.85 44.0785C16.125 40.1535 14.275 36.9535 9.75 36.9535C7.125 36.9535 5 34.8035 5 32.2035Z"
                                                      fill="var(--main-color)"></path>
                                                <path
                                                    d="M30 38.125C32.1549 38.125 34.2215 37.269 35.7452 35.7452C37.269 34.2215 38.125 32.1549 38.125 30C38.125 27.8451 37.269 25.7785 35.7452 24.2548C34.2215 22.731 32.1549 21.875 30 21.875C27.8451 21.875 25.7785 22.731 24.2548 24.2548C22.731 25.7785 21.875 27.8451 21.875 30C21.875 32.1549 22.731 34.2215 24.2548 35.7452C25.7785 37.269 27.8451 38.125 30 38.125Z"
                                                    fill="var(--main-color)"></path>
                                            </svg>
                                            <span>Settings</span></div>
                                        <div className="serviceCenter__container-items__item">
                                            <svg className="svg-icon icon-feedback" xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 60 60" fill="none">
                                                <path opacity="0.4"
                                                      d="M40.6016 9.12109H19.4016C13.2266 9.12109 8.22656 14.1461 8.22656 20.2961V43.8211C8.22656 49.9711 13.2516 54.9961 19.4016 54.9961H40.5766C46.7516 54.9961 51.7516 49.9711 51.7516 43.8211V20.2961C51.7766 14.1211 46.7516 9.12109 40.6016 9.12109Z"
                                                      fill="var(--main-color)"></path>
                                                <path
                                                    d="M35.875 5H24.125C21.525 5 19.4 7.1 19.4 9.7V12.05C19.4 14.65 21.5 16.75 24.1 16.75H35.875C38.475 16.75 40.575 14.65 40.575 12.05V9.7C40.6 7.1 38.475 5 35.875 5ZM37.5 32.375H20C18.975 32.375 18.125 31.525 18.125 30.5C18.125 29.475 18.975 28.625 20 28.625H37.5C38.525 28.625 39.375 29.475 39.375 30.5C39.375 31.525 38.525 32.375 37.5 32.375ZM30.95 42.375H20C18.975 42.375 18.125 41.525 18.125 40.5C18.125 39.475 18.975 38.625 20 38.625H30.95C31.975 38.625 32.825 39.475 32.825 40.5C32.825 41.525 31.975 42.375 30.95 42.375Z"
                                                    fill="var(--main-color)"></path>
                                            </svg>
                                            <span>Feedback</span></div>
                                        <div className="serviceCenter__container-items__item">
                                            <svg className="svg-icon icon-notificationCenter" xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 60 60" fill="none">
                                                <path opacity="0.4"
                                                      d="M40.6016 9.12109H19.4016C13.2266 9.12109 8.22656 14.1461 8.22656 20.2961V43.8211C8.22656 49.9711 13.2516 54.9961 19.4016 54.9961H40.5766C46.7516 54.9961 51.7516 49.9711 51.7516 43.8211V20.2961C51.7766 14.1211 46.7516 9.12109 40.6016 9.12109Z"
                                                      fill="var(--main-color)"></path>
                                                <path
                                                    d="M35.875 5H24.125C21.525 5 19.4 7.1 19.4 9.7V12.05C19.4 14.65 21.5 16.75 24.1 16.75H35.875C38.475 16.75 40.575 14.65 40.575 12.05V9.7C40.6 7.1 38.475 5 35.875 5ZM37.5 32.375H20C18.975 32.375 18.125 31.525 18.125 30.5C18.125 29.475 18.975 28.625 20 28.625H37.5C38.525 28.625 39.375 29.475 39.375 30.5C39.375 31.525 38.525 32.375 37.5 32.375ZM30.95 42.375H20C18.975 42.375 18.125 41.525 18.125 40.5C18.125 39.475 18.975 38.625 20 38.625H30.95C31.975 38.625 32.825 39.475 32.825 40.5C32.825 41.525 31.975 42.375 30.95 42.375Z"
                                                    fill="var(--main-color)"></path>
                                            </svg>
                                            <span>Notification</span></div>
                                        <div className="serviceCenter__container-items__item">
                                            <svg className="svg-icon icon-serverTicket" viewBox="0 0 52 52" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <g id="Group 1420069177">
                                                    <path id="Union" fillRule="evenodd" clipRule="evenodd"
                                                          d="M0.501486 25.2499C0.501486 31.7163 2.98132 37.6138 7.0576 42.0809L7.05658 42.0819C3.94138 45.3931 0 45.8223 0 45.8223C5.87741 49.7199 12.9648 51.9961 20.594 51.9961C26.8205 51.9961 32.686 50.4799 37.8274 47.8037C46.2308 43.6469 51.9961 35.1102 51.9961 25.2499C51.9961 11.3048 40.4686 0 26.2487 0C12.029 0 0.501486 11.3048 0.501486 25.2499ZM38.3417 13.6638C45.0029 20.3143 45.0029 31.0966 38.3417 37.747C31.6808 44.3975 20.8812 44.3975 14.22 37.747C9.51028 33.0448 8.13334 26.2774 10.0841 20.3648C10.2825 19.7185 10.5019 19.0869 10.7447 18.4688C10.5338 18.9093 10.3426 19.3569 10.1711 19.8103C11.3425 16.3535 13.3074 13.1056 16.0669 10.3506C19.6652 6.75799 24.1026 4.51343 28.7496 3.61719L28.7484 3.6188L28.7499 3.61854C28.7366 3.63528 27.1093 5.67989 27.2311 8.70353C31.2743 8.92724 35.2529 10.5801 38.3417 13.6638Z"
                                                          fill="var(--main-color)"></path>
                                                    <path id="Vector" opacity="0.4" fillRule="evenodd"
                                                          clipRule="evenodd"
                                                          d="M38.3417 37.747C45.0029 31.0966 45.0029 20.3143 38.3417 13.6638C35.2529 10.5801 31.2743 8.92724 27.2311 8.70353C27.1091 5.67485 28.742 3.62845 28.75 3.61847L28.7484 3.6188L28.7496 3.61719C24.1026 4.51343 19.6652 6.75799 16.0669 10.3506C13.3074 13.1056 11.3425 16.3535 10.1711 19.8103C10.3426 19.3569 10.5338 18.9093 10.7447 18.4688C10.5019 19.0869 10.2825 19.7185 10.0841 20.3648C8.13334 26.2774 9.51028 33.0448 14.22 37.747C20.8812 44.3975 31.6808 44.3975 38.3417 37.747Z"
                                                          fill="var(--main-color)"></path>
                                                    <path id="Vector_2" fillRule="evenodd" clipRule="evenodd"
                                                          d="M17.625 23.9571V26.0727V27.4819C17.625 28.8886 18.767 30.0288 20.176 30.0288C21.5849 30.0288 22.7268 28.8886 22.7268 27.4819V26.0706V23.9571C22.7268 22.5507 21.5849 21.4102 20.176 21.4102C18.767 21.4102 17.625 22.5507 17.625 23.9571Z"
                                                          fill="var(--main-color)"></path>
                                                    <path id="Vector_3" fillRule="evenodd" clipRule="evenodd"
                                                          d="M30.25 23.9571V26.0727V27.4819C30.25 28.8886 31.3921 30.0288 32.8009 30.0288C34.2098 30.0288 35.3519 28.8886 35.3519 27.4819V26.0706V23.9571C35.3519 22.5507 34.2098 21.4102 32.8009 21.4102C31.3921 21.4102 30.25 22.5507 30.25 23.9571Z"
                                                          fill="var(--main-color)"></path>
                                                </g>
                                            </svg>
                                            <span
                                            >Customer Service</span>
                                        </div>
                                        <div className="serviceCenter__container-items__item">
                                            <svg className="svg-icon icon-guide" xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 60 60" fill="none">
                                                <path opacity="0.4"
                                                      d="M30 13.2541V53.3291C29.575 53.3291 29.125 53.2541 28.775 53.0541L28.675 53.0041C23.875 50.3791 15.5 47.6291 10.075 46.9041L9.35 46.8041C6.95 46.5041 5 44.2541 5 41.8541V11.6541C5 8.67913 7.425 6.42913 10.4 6.67913C15.65 7.10413 23.6 9.75413 28.05 12.5291L28.675 12.9041C29.05 13.1291 29.525 13.2541 30 13.2541Z"
                                                      fill="var(--main-color)"></path>
                                                <path
                                                    d="M55 11.6739V41.8489C55 44.2489 53.05 46.4988 50.65 46.7989L49.825 46.8988C44.375 47.6239 35.975 50.3988 31.175 53.0489C30.85 53.2488 30.45 53.3239 30 53.3239V13.2489C30.475 13.2489 30.95 13.1239 31.325 12.8989L31.75 12.6239C36.2 9.82385 44.175 7.14885 49.425 6.69885H49.575C52.55 6.44885 55 8.67385 55 11.6739ZM19.375 23.0939H13.75C12.725 23.0939 11.875 22.2439 11.875 21.2189C11.875 20.1939 12.725 19.3439 13.75 19.3439H19.375C20.4 19.3439 21.25 20.1939 21.25 21.2189C21.25 22.2439 20.4 23.0939 19.375 23.0939ZM21.25 30.5939H13.75C12.725 30.5939 11.875 29.7439 11.875 28.7189C11.875 27.6939 12.725 26.8439 13.75 26.8439H21.25C22.275 26.8439 23.125 27.6939 23.125 28.7189C23.125 29.7439 22.275 30.5939 21.25 30.5939Z"
                                                    fill="var(--main-color)"></path>
                                            </svg>
                                            <span
                                            >{`Beginner's Guide`}</span>
                                        </div>
                                        <div className="serviceCenter__container-items__item">
                                            <svg className="svg-icon icon-about" xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 60 60" fill="none">
                                                <path
                                                    d="M48.3242 14.2031L32.6492 5.75313C30.9992 4.85312 28.9992 4.85312 27.3492 5.75313L11.6742 14.2031C10.5242 14.8281 9.82422 16.0281 9.82422 17.4031C9.82422 18.7531 10.5242 19.9781 11.6742 20.6031L27.3492 29.0531C28.1742 29.5031 29.0992 29.7281 29.9992 29.7281C30.8992 29.7281 31.8242 29.5031 32.6492 29.0531L48.3242 20.6031C49.4742 19.9781 50.1742 18.7781 50.1742 17.4031C50.1742 16.0281 49.4742 14.8281 48.3242 14.2031Z"
                                                    fill="var(--main-color)"></path>
                                                <path opacity="0.4"
                                                      d="M24.775 31.9773L10.175 24.6773C9.05 24.1273 7.75 24.1773 6.7 24.8273C5.625 25.5023 5 26.6273 5 27.8773V41.6523C5 44.0273 6.325 46.1773 8.45 47.2523L23.025 54.5523C23.5699 54.8224 24.1742 54.9503 24.7818 54.9241C25.3894 54.8979 25.9804 54.7184 26.5 54.4023C27.575 53.7523 28.2 52.6023 28.2 51.3523V37.5773C28.225 35.1773 26.9 33.0273 24.775 31.9773ZM53.3 24.8273C52.225 24.1773 50.925 24.1023 49.825 24.6773L35.25 31.9773C33.125 33.0523 31.8 35.1773 31.8 37.5773V51.3523C31.8 52.6023 32.425 53.7523 33.5 54.4023C34.0196 54.7184 34.6106 54.8979 35.2182 54.9241C35.8258 54.9503 36.4301 54.8224 36.975 54.5523L51.55 47.2523C53.675 46.1773 55 44.0523 55 41.6523V27.8773C55 26.6273 54.375 25.5023 53.3 24.8273Z"
                                                      fill="var(--main-color)"></path>

                                            </svg>
                                            <span
                                            >About us</span></div>
                                    </div>
                                </div>
                                <div className="serviceCenter-wrap-header">
                                    <button onClick={()=>setUserLogoutAlertConfirm(true)}>
                                        <svg className="svg-icon icon-logout" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 48 48" fill="none">
                                            <path
                                                d="M14.5 8C13.8406 8.37652 13.2062 8.79103 12.6 9.24051C11.5625 10.0097 10.6074 10.8814 9.75 11.8402C6.79377 15.1463 5 19.4891 5 24.2455C5 34.6033 13.5066 43 24 43C34.4934 43 43 34.6033 43 24.2455C43 19.4891 41.2062 15.1463 38.25 11.8402C37.3926 10.8814 36.4375 10.0097 35.4 9.24051C34.7938 8.79103 34.1594 8.37652 33.5 8"
                                                stroke="var(--main-color)" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round"></path>
                                            <path d="M24 4V24" stroke="var(--main-color)" strokeWidth="2"
                                                  strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                        Log out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <IonAlert
                    header="Are you sure?"
                    message="You want to logout from app?"
                    isOpen={userLogoutAlertConfirm}
                    className={"custom_site_alert_toast"}
                    buttons={[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: () => {
                                setUserLogoutAlertConfirm(false);
                            },
                        },
                        {
                            text: 'Logout',
                            role: 'confirm',
                            handler: () => {
                                callFunctionToLogoutUser()
                            },
                        },
                    ]}
                    onDidDismiss={() => setUserLogoutAlertConfirm(false)}
                />
                <IonLoading isOpen={userLogoutLoading} message={"Logging out..."}/>
            </IonContent>
        </IonPage>
    )
}
