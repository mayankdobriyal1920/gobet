import React, {useState} from "react";
import {IonAlert, IonContent, IonLoading, IonPage} from "@ionic/react";
import {useDispatch, useSelector} from "react-redux";
import {
    actionToGetUserWalletAndGameBalance,
    actionToLogoutUserSession
} from "../redux/CommonAction";
import UserAvatarModal from "../components/commonPopup/UserAvatarModal";
import {useHistory} from "react-router";
import UpdateUserNameModal from "../components/commonPopup/UpdateUserNameModal";

export default function AccountPage() {
    const {userInfo} = useSelector((state) => state.userAuthDetail);
    const {walletBalance,bettingBalance,gameBalance} = useSelector((state) => state.userWalletAndGameBalance);
    const [userLogoutLoading,setUserLogoutLoading] = useState(false);
    const [userLogoutAlertConfirm,setUserLogoutAlertConfirm] = useState(false);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingAvatar, setIsChangingAvatar] = useState(false);
    const [balanceLoading, setBalanceLoading] = useState(false);
    const history = useHistory();

    const callFunctionToLogoutUser = ()=>{
        setUserLogoutLoading(true);
        setUserLogoutAlertConfirm(false);
        dispatch(actionToLogoutUserSession(setUserLogoutLoading));
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChangeAvatar = () => {
        setIsChangingAvatar(true);
    };

    const goToPage = (page)=>{
        history.push(page);
    }

    const reloadMainBalance = ()=>{
        setBalanceLoading(true);
        dispatch(actionToGetUserWalletAndGameBalance(setBalanceLoading))
    }

    return (
        <IonPage>
            <IonContent>
                <div className={"profile_account_main_page_header_container"}>
                    <div className={"profile_account_main_page_header_container_background"}>
                        <div className={"userInfo__container-content"}>
                            <div className={"profile_account_main_page_header_wrapper"}>
                                <div className={"profile_account_container-content__avatar"}>
                                    <img alt={"userInfo"} onClick={handleChangeAvatar}
                                         src={`assets/avatar/${userInfo?.profile_url}.png`}
                                         className="userAvatar 12345"/>
                                    <UserAvatarModal setIsChangingAvatar={setIsChangingAvatar} isChangingAvatar={isChangingAvatar}/>
                                </div>
                            </div>
                        </div>
                        <div className="userInfo__container-content__name">
                            <div className="userInfo__container-content-nickname">
                                <div className="userInfo__container-content-nickname_edit">
                                    <h3>{userInfo?.name}</h3>
                                    <button
                                        onClick={handleEdit}
                                        className="userInfo__container-content-nickname_edit_icon"
                                        aria-label="Edit name">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20"
                                             height="20" fill="currentColor" style={{cursor: "pointer"}}>
                                            <path
                                                d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm14.81-10.64c.2-.2.2-.51 0-.71l-2.83-2.83a.5.5 0 0 0-.71 0l-1.06 1.06 3.54 3.54 1.06-1.06z"/>
                                        </svg>
                                    </button>
                                    <UpdateUserNameModal setIsEditing={setIsEditing} isEditing={isEditing} />
                                </div>
                            </div>
                            <div className="userInfo__container-content-uid">
                                <span>UID</span><span>&nbsp;-&nbsp;</span><span>{userInfo?.uid}</span>
                            </div>
                            <div className="userInfo__container-content-logintime">
                                <span>Sub Admin:&nbsp;</span><span>{userInfo?.sub_admin?.name}</span>
                            </div>
                        </div>
                    </div>
                    <div className={"profile_account_main_userinfo_content"}>
                        <div className={"totalSavings__container"}>
                            <div className="totalSavings__container-header">
                                <div className="totalSavings__container-header-box blanc_title">
                                    <div className="totalSavings__container-header__title">
                                        <span className={"acc_balance_title_tip"}>Wallet balance</span>
                                        <span
                                            className={"acc_balance_tip"}>₹{walletBalance ? walletBalance : '0.00'}</span>
                                    </div>
                                    <div className="totalSavings__container-header__title">
                                        <span className={"acc_balance_title_tip"}>Game balance</span>
                                        <span
                                            className={"acc_balance_tip"}>₹{gameBalance ? gameBalance : '0.00'}</span>
                                    </div>
                                    <div className="totalSavings__container-header__title">
                                        <span className={"acc_balance_title_tip"}>Betting balance</span>
                                        <span className={"acc_balance_tip"}>₹{bettingBalance ? bettingBalance : '0.00'}</span>
                                    </div>
                                </div>
                                <div className="totalSavings__container-header-box re_svg">
                                    <svg onClick={reloadMainBalance} xmlns="http://www.w3.org/2000/svg"
                                         className="svg-icon icon-refreshBalance"
                                         viewBox="0 0 24 24" fill="none">
                                        <circle opacity="0.5" cx="12" cy="12" r="10" fill="#1C274C"/>
                                        <path
                                            d="M7.37756 11.6296H6.62756H7.37756ZM7.37756 12.5556L6.81609 13.0528C6.95137 13.2056 7.14306 13.2966 7.34695 13.3049C7.55084 13.3133 7.74932 13.2382 7.89662 13.0969L7.37756 12.5556ZM9.51905 11.5414C9.81805 11.2547 9.82804 10.7799 9.54137 10.4809C9.2547 10.182 8.77994 10.172 8.48095 10.4586L9.51905 11.5414ZM6.56148 10.5028C6.28686 10.1927 5.81286 10.1639 5.50277 10.4385C5.19267 10.7131 5.16391 11.1871 5.43852 11.4972L6.56148 10.5028ZM14.9317 9.0093C15.213 9.31337 15.6875 9.33184 15.9915 9.05055C16.2956 8.76927 16.3141 8.29476 16.0328 7.9907L14.9317 9.0093ZM12.0437 6.25C9.05802 6.25 6.62756 8.653 6.62756 11.6296H8.12756C8.12756 9.49251 9.87531 7.75 12.0437 7.75V6.25ZM6.62756 11.6296L6.62756 12.5556H8.12756L8.12756 11.6296H6.62756ZM7.89662 13.0969L9.51905 11.5414L8.48095 10.4586L6.85851 12.0142L7.89662 13.0969ZM7.93904 12.0583L6.56148 10.5028L5.43852 11.4972L6.81609 13.0528L7.93904 12.0583ZM16.0328 7.9907C15.0431 6.9209 13.6212 6.25 12.0437 6.25V7.75C13.1879 7.75 14.2154 8.23504 14.9317 9.0093L16.0328 7.9907Z"
                                            fill="#ffffff"/>
                                        <path
                                            d="M16.6188 11.4443L17.1795 10.9462C17.044 10.7937 16.8523 10.703 16.6485 10.6949C16.4447 10.6868 16.2464 10.7621 16.0993 10.9034L16.6188 11.4443ZM14.4805 12.4581C14.1817 12.745 14.1722 13.2198 14.4591 13.5185C14.746 13.8173 15.2208 13.8269 15.5195 13.54L14.4805 12.4581ZM17.4393 13.4972C17.7144 13.8068 18.1885 13.8348 18.4981 13.5597C18.8078 13.2846 18.8358 12.8106 18.5607 12.5009L17.4393 13.4972ZM9.04688 15.0047C8.76342 14.7027 8.28879 14.6876 7.98675 14.9711C7.68472 15.2545 7.66966 15.7292 7.95312 16.0312L9.04688 15.0047ZM11.9348 17.7499C14.9276 17.7499 17.3688 15.3496 17.3688 12.3703H15.8688C15.8688 14.5047 14.1158 16.2499 11.9348 16.2499V17.7499ZM17.3688 12.3703V11.4443H15.8688V12.3703H17.3688ZM16.0993 10.9034L14.4805 12.4581L15.5195 13.54L17.1383 11.9853L16.0993 10.9034ZM16.0581 11.9425L17.4393 13.4972L18.5607 12.5009L17.1795 10.9462L16.0581 11.9425ZM7.95312 16.0312C8.94543 17.0885 10.3635 17.7499 11.9348 17.7499V16.2499C10.792 16.2499 9.76546 15.7704 9.04688 15.0047L7.95312 16.0312Z"
                                            fill="#ffffff"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="financialServices__container">
                            <div className="financialServices__container-box">
                                <div onClick={() => goToPage('/game-history')}>
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
                                <div onClick={() => goToPage('/money-transaction')}>
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
                        </div>


                        {/*///////////// ADMIN OPTIONS ///////////////////*/}
                        {(userInfo?.role === 1 || userInfo?.role === 2) ?
                         <div className="settingPanel__container">
                            <div className="content-sub_title">
                                <div>Admin menu options</div>
                            </div>
                             <div className="settingPanel__container-items">
                                 <div onClick={() => goToPage('/admin-game-result')}
                                      className="settingPanel__container-items__item ar-1px-b">
                                     <div className="settingPanel__container-items__title">
                                         <svg className="svg-icon icon-betHistory svg_min_icon" viewBox="0 0 80 80"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg">
                                             <path
                                                 d="M54.2259 73.1178H18.4859C12.7419 73.1178 8.08594 68.4617 8.08594 62.7177V16.9937C8.08594 11.2497 12.7419 6.59375 18.4859 6.59375H54.2259C59.9699 6.59375 64.6259 11.2497 64.6259 16.9937V62.7177C64.6259 68.4617 59.9699 73.1178 54.2259 73.1178Z"
                                                 fill="#5CA6FF"></path>
                                             <path
                                                 d="M49.1664 25.4703H23.7664C21.9984 25.4703 20.5664 24.0383 20.5664 22.2703C20.5664 20.5023 21.9984 19.0703 23.7664 19.0703H49.1664C50.9344 19.0703 52.3664 20.5023 52.3664 22.2703C52.3664 24.0383 50.9344 25.4703 49.1664 25.4703ZM49.1664 38.1583H23.7664C21.9984 38.1583 20.5664 36.7263 20.5664 34.9583C20.5664 33.1903 21.9984 31.7583 23.7664 31.7583H49.1664C50.9344 31.7583 52.3664 33.1903 52.3664 34.9583C52.3664 36.7263 50.9344 38.1583 49.1664 38.1583ZM35.9304 50.8463H23.7664C21.9984 50.8463 20.5664 49.4143 20.5664 47.6463C20.5664 45.8783 21.9984 44.4463 23.7664 44.4463H35.9304C37.6984 44.4463 39.1304 45.8783 39.1304 47.6463C39.1304 49.4143 37.6944 50.8463 35.9304 50.8463Z"
                                                 fill="var(--bg_color_L2)"></path>
                                         </svg>
                                         <span>Game Result</span>
                                     </div>
                                     <div className="settingPanel__container-items-right">
                                         <svg xmlns="http://www.w3.org/2000/svg"
                                              className="van-badge__wrapper van-icon van-icon-arrow"
                                              fill="rgb(136, 136, 136)" height="12px" width="12px" version="1.1"
                                              id="Layer_1"
                                              viewBox="0 0 330 330">
                                             <path id="XMLID_222_"
                                                   d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z"/>
                                         </svg>
                                     </div>
                                 </div>
                                 <div onClick={() => goToPage('/admin-withdrawal-pending-request')}
                                      className="settingPanel__container-items__item ar-1px-b">
                                     <div className="settingPanel__container-items__title">
                                         <svg className="icon-myWithdrawHistory svg-icon svg_min_icon"
                                              viewBox="0 0 80 80" fill="none"
                                              xmlns="http://www.w3.org/2000/svg">
                                             <path
                                                 d="M16.6654 50.0012C9.2987 50.0012 3.33203 55.9678 3.33203 63.3345C3.33203 65.8345 4.03203 68.2012 5.26536 70.2012C6.44047 72.1761 8.10965 73.811 10.1086 74.9449C12.1075 76.0788 14.3672 76.6726 16.6654 76.6678C21.532 76.6678 25.7654 74.0678 28.0654 70.2012C29.2987 68.2012 29.9987 65.8345 29.9987 63.3345C29.9987 55.9678 24.032 50.0012 16.6654 50.0012ZM23.232 62.2345L16.132 68.8012C15.6654 69.2345 15.032 69.4678 14.432 69.4678C13.7987 69.4678 13.1654 69.2345 12.6654 68.7345L9.36536 65.4345C8.90043 64.964 8.63969 64.3293 8.63969 63.6678C8.63969 63.0064 8.90043 62.3716 9.36536 61.9012C10.332 60.9345 11.932 60.9345 12.8987 61.9012L14.4987 63.5012L19.832 58.5678C20.832 57.6345 22.432 57.7012 23.3654 58.7012C24.2987 59.7012 24.232 61.3012 23.232 62.2345ZM59.1687 23.5012C58.3687 23.3678 57.5354 23.3345 56.6687 23.3345H23.3354C22.402 23.3345 21.502 23.4012 20.6354 23.5345C21.102 22.6012 21.7687 21.7345 22.5687 20.9345L33.402 10.0678C35.6021 7.88976 38.5729 6.66797 41.6687 6.66797C44.7645 6.66797 47.7353 7.88976 49.9354 10.0678L55.7687 15.9678C57.902 18.0678 59.0354 20.7345 59.1687 23.5012Z"
                                                 fill="#FF891D"></path>
                                             <path opacity="0.4"
                                                   d="M73.3346 40.0026V56.6693C73.3346 66.6693 66.668 73.3359 56.668 73.3359H25.4346C26.468 72.4693 27.368 71.4026 28.068 70.2026C29.3013 68.2026 30.0013 65.8359 30.0013 63.3359C30.0013 55.9693 24.0346 50.0026 16.668 50.0026C12.668 50.0026 9.1013 51.7693 6.66797 54.5359V40.0026C6.66797 30.9359 12.1346 24.6026 20.6346 23.5359C21.5013 23.4026 22.4013 23.3359 23.3346 23.3359H56.668C57.5346 23.3359 58.368 23.3693 59.168 23.5026C67.768 24.5026 73.3346 30.8693 73.3346 40.0026Z"
                                                   fill="#FF891D"></path>
                                             <path
                                                 d="M73.3346 41.6641H63.3346C59.668 41.6641 56.668 44.6641 56.668 48.3307C56.668 51.9974 59.668 54.9974 63.3346 54.9974H73.3346"
                                                 fill="#FF891D"></path>
                                         </svg>
                                         <span>Withdrawal Request</span>
                                     </div>
                                     <div className="settingPanel__container-items-right">
                                         <svg xmlns="http://www.w3.org/2000/svg"
                                              className="van-badge__wrapper van-icon van-icon-arrow"
                                              fill="rgb(136, 136, 136)" height="12px" width="12px" version="1.1"
                                              id="Layer_1"
                                              viewBox="0 0 330 330">
                                             <path id="XMLID_222_"
                                                   d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z"/>
                                         </svg>
                                     </div>
                                 </div>
                                 <div onClick={() => goToPage('/admin-deposit-pending-request')}
                                      className="settingPanel__container-items__item ar-1px-b">
                                     <div className="settingPanel__container-items__title">
                                         <svg className="svg-icon icon-rechargeHistory svg_min_icon"
                                              viewBox="0 0 80 80" fill="none"
                                              xmlns="http://www.w3.org/2000/svg">
                                             <path opacity="0.4"
                                                   d="M70 23.3346V56.668C70 66.668 65 73.3346 53.3333 73.3346H26.6667C15 73.3346 10 66.668 10 56.668V23.3346C10 13.3346 15 6.66797 26.6667 6.66797H53.3333C65 6.66797 70 13.3346 70 23.3346Z"
                                                   fill="#F95959"></path>
                                             <path
                                                 d="M51.6667 6.66797V32.868C51.6667 34.3346 49.9333 35.068 48.8667 34.1013L41.1333 26.968C40.8266 26.6792 40.4213 26.5184 40 26.5184C39.5787 26.5184 39.1734 26.6792 38.8667 26.968L31.1333 34.1013C30.8949 34.3225 30.5969 34.4691 30.2761 34.523C29.9553 34.5768 29.6258 34.5357 29.3281 34.4046C29.0305 34.2735 28.7777 34.0581 28.6009 33.7851C28.4241 33.512 28.3311 33.1932 28.3333 32.868V6.66797H51.6667ZM58.3333 49.168H44.1667C42.8 49.168 41.6667 48.0346 41.6667 46.668C41.6667 45.3013 42.8 44.168 44.1667 44.168H58.3333C59.7 44.168 60.8333 45.3013 60.8333 46.668C60.8333 48.0346 59.7 49.168 58.3333 49.168ZM58.3333 62.5013H30C28.6333 62.5013 27.5 61.368 27.5 60.0013C27.5 58.6346 28.6333 57.5013 30 57.5013H58.3333C59.7 57.5013 60.8333 58.6346 60.8333 60.0013C60.8333 61.368 59.7 62.5013 58.3333 62.5013Z"
                                                 fill="#F95959"></path>
                                         </svg>
                                         <span>Deposit Request</span>
                                     </div>
                                     <div className="settingPanel__container-items-right">
                                         <svg xmlns="http://www.w3.org/2000/svg"
                                              className="van-badge__wrapper van-icon van-icon-arrow"
                                              fill="rgb(136, 136, 136)" height="12px" width="12px" version="1.1"
                                              id="Layer_1"
                                              viewBox="0 0 330 330">
                                             <path id="XMLID_222_"
                                                   d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z"/>
                                         </svg>
                                     </div>
                                 </div>
                                 <div onClick={() => goToPage('/admin-generated-passcode-list')}
                                      className="settingPanel__container-items__item ar-1px-b">
                                     <div className="settingPanel__container-items__title">
                                         <svg fill="#ffaf7b" className="svg-icon icon-rechargeHistory svg_min_icon"
                                              version="1.1" id="Layer_1"
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 512 512">
                                             <g>
                                                 <g>
                                                     <path d="M408.99,52.133h-89.452V33.442C319.538,14.972,304.565,0,286.096,0h-60.192c-18.47,0-33.442,14.972-33.442,33.442v18.691
                                                        H103.01c-9.234,0-16.721,7.487-16.721,16.721v426.425c0,9.234,7.487,16.721,16.721,16.721H408.99
                                                        c9.234,0,16.721-7.487,16.721-16.721V68.854C425.711,59.619,418.224,52.133,408.99,52.133z M319.538,99.709h14.489
                                                        c9.234,0,16.721,7.487,16.721,16.721c0,9.234-7.487,16.721-16.721,16.721h-14.489V99.709z M225.903,33.442h60.192v100.944h-60.192
                                                        V33.442z M256,179.836c33.578,0,60.799,27.221,60.799,60.799c0,33.578-27.221,60.799-60.799,60.799s-60.799-27.221-60.799-60.799
                                                        S222.422,179.836,256,179.836z M177.972,99.709h14.489v33.442h-14.489c-9.234,0-16.721-7.487-16.721-16.721
                                                        C161.251,107.195,168.737,99.709,177.972,99.709z M371.935,457.146h-231.87c-4.617,0-8.36-3.743-8.36-8.36
                                                        c0-33.2,12.929-64.414,36.405-87.89s54.69-36.405,87.89-36.405s64.414,12.929,87.89,36.405s36.406,54.69,36.406,87.89
                                                        C380.295,453.402,376.553,457.146,371.935,457.146z"/>
                                                 </g>
                                             </g>
                                         </svg>
                                         <span>Passcodes (For Sub Admin or User)</span>
                                     </div>
                                     <div className="settingPanel__container-items-right">
                                         <svg xmlns="http://www.w3.org/2000/svg"
                                              className="van-badge__wrapper van-icon van-icon-arrow"
                                              fill="rgb(136, 136, 136)" height="12px" width="12px" version="1.1"
                                              id="Layer_1"
                                              viewBox="0 0 330 330">
                                             <path id="XMLID_222_"
                                                   d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z"/>
                                         </svg>
                                     </div>
                                 </div>
                                 {(userInfo?.role === 1) ?
                                     <div onClick={() => goToPage('/admin-generated-passcode-list-for-admin')}
                                          className="settingPanel__container-items__item ar-1px-b">
                                         <div className="settingPanel__container-items__title">
                                             <svg fill="#ffaf7b" className="svg-icon icon-rechargeHistory svg_min_icon"
                                                  version="1.1" id="Layer_1"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 512 512">
                                                 <g>
                                                     <g>
                                                         <path d="M408.99,52.133h-89.452V33.442C319.538,14.972,304.565,0,286.096,0h-60.192c-18.47,0-33.442,14.972-33.442,33.442v18.691
                                                        H103.01c-9.234,0-16.721,7.487-16.721,16.721v426.425c0,9.234,7.487,16.721,16.721,16.721H408.99
                                                        c9.234,0,16.721-7.487,16.721-16.721V68.854C425.711,59.619,418.224,52.133,408.99,52.133z M319.538,99.709h14.489
                                                        c9.234,0,16.721,7.487,16.721,16.721c0,9.234-7.487,16.721-16.721,16.721h-14.489V99.709z M225.903,33.442h60.192v100.944h-60.192
                                                        V33.442z M256,179.836c33.578,0,60.799,27.221,60.799,60.799c0,33.578-27.221,60.799-60.799,60.799s-60.799-27.221-60.799-60.799
                                                        S222.422,179.836,256,179.836z M177.972,99.709h14.489v33.442h-14.489c-9.234,0-16.721-7.487-16.721-16.721
                                                        C161.251,107.195,168.737,99.709,177.972,99.709z M371.935,457.146h-231.87c-4.617,0-8.36-3.743-8.36-8.36
                                                        c0-33.2,12.929-64.414,36.405-87.89s54.69-36.405,87.89-36.405s64.414,12.929,87.89,36.405s36.406,54.69,36.406,87.89
                                                        C380.295,453.402,376.553,457.146,371.935,457.146z"/>
                                                     </g>
                                                 </g>
                                             </svg>
                                             <span>Passcodes (For Admin)</span>
                                         </div>
                                         <div className="settingPanel__container-items-right">
                                             <svg xmlns="http://www.w3.org/2000/svg"
                                                  className="van-badge__wrapper van-icon van-icon-arrow"
                                                  fill="rgb(136, 136, 136)" height="12px" width="12px" version="1.1"
                                                  id="Layer_1"
                                                  viewBox="0 0 330 330">
                                                 <path id="XMLID_222_"
                                                       d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z"/>
                                             </svg>
                                         </div>
                                     </div>
                                     : ''
                                 }
                                 {(userInfo?.role === 2) ?
                                     <div onClick={() => goToPage('/admin-sub-admin-users-list')}
                                          className="settingPanel__container-items__item ar-1px-b">
                                         <div className="settingPanel__container-items__title">
                                             <svg className="svg-icon icon-serverTicket svg_min_icon"
                                                  viewBox="0 0 52 52"
                                                  fill="none"
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
                                             <span>User List</span>
                                         </div>
                                         <div className="settingPanel__container-items-right">
                                             <svg xmlns="http://www.w3.org/2000/svg"
                                                  className="van-badge__wrapper van-icon van-icon-arrow"
                                                  fill="rgb(136, 136, 136)" height="12px" width="12px" version="1.1"
                                                  id="Layer_1"
                                                  viewBox="0 0 330 330">
                                                 <path id="XMLID_222_"
                                                       d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z"/>
                                             </svg>
                                         </div>
                                     </div> : ''
                                 }
                                 {(userInfo?.role === 1) ?
                                     <div onClick={() => goToPage('/admin-admin-users-list')}
                                          className="settingPanel__container-items__item ar-1px-b">
                                         <div className="settingPanel__container-items__title">
                                             <svg className="svg-icon icon-serverTicket svg_min_icon"
                                                  viewBox="0 0 52 52"
                                                  fill="none"
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
                                             <span>User List</span>
                                         </div>
                                         <div className="settingPanel__container-items-right">
                                             <svg xmlns="http://www.w3.org/2000/svg"
                                                  className="van-badge__wrapper van-icon van-icon-arrow"
                                                  fill="rgb(136, 136, 136)" height="12px" width="12px" version="1.1"
                                                  id="Layer_1"
                                                  viewBox="0 0 330 330">
                                                 <path id="XMLID_222_"
                                                       d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z"/>
                                             </svg>
                                         </div>
                                     </div>
                                     : ''
                                 }
                                 <div onClick={() => goToPage('/admin-game-session-list')}
                                      className="settingPanel__container-items__item ar-1px-b">
                                     <div className="settingPanel__container-items__title">
                                         <svg className="svg-icon icon-serverTicket svg_min_icon"  id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path style={{fill:"#E0E0E0"}} d="M256,512c-54.624,0-106.273-8.809-145.435-24.803c-44.671-18.245-69.273-44.658-69.273-74.371
                                                    c0-29.715,24.601-56.127,69.272-74.373C149.726,322.459,201.376,313.65,256,313.65s106.273,8.809,145.436,24.803
                                                    c44.671,18.245,69.272,44.658,69.272,74.373c0,29.714-24.601,56.126-69.273,74.371C362.273,503.191,310.624,512,256,512z"/>
                                                                                             <path style={{fill:"#F0A479"}} d="M419.944,259.914c-28.845-29.98-90.778-48.947-161.629-49.498c-1.047-0.008-2.078-0.012-3.121-0.012
                                                    c-45.319,0-88.327,7.7-121.099,21.684c-37.809,16.133-59.082,39.634-59.898,66.176c-0.459,14.903,5.715,29.45,17.857,42.068
                                                    c28.845,29.981,90.779,48.949,161.629,49.498c1.047,0.008,2.081,0.012,3.124,0.012c45.32,0,88.327-7.7,121.098-21.683
                                                    c37.809-16.132,59.08-39.633,59.898-66.175C438.262,287.081,432.085,272.533,419.944,259.914z"/>
                                                                                             <path style={{fill:"#E0E0E0"}} d="M256,99.693c-74.844,0-150.611,24.799-150.611,72.196S181.155,244.085,256,244.085
                                                    c74.844,0,150.61-24.799,150.61-72.196S330.844,99.693,256,99.693z"/>
                                                                                             <path style={{fill:"#F0A479"}} d="M252.483,116.419c-42.701,0-75.767-23.383-76.915-54.392c-1.201-32.413,33.068-59.591,78.015-61.874
                                                    C255.557,0.052,257.554,0,259.518,0c42.7,0,75.766,23.383,76.914,54.392c1.201,32.415-33.069,59.594-78.018,61.875
                                                    C256.443,116.367,254.446,116.419,252.483,116.419z"/>
                                                                                             <path style={{fill:"#F4F4F4"}} d="M256.785,313.657c-0.263,0-0.523-0.008-0.785-0.008c-54.624,0-106.273,8.809-145.435,24.803
                                                    c-44.671,18.245-69.272,44.658-69.272,74.373c0,29.714,24.601,56.126,69.273,74.371c39.162,15.995,90.811,24.803,145.435,24.803
                                                    c0.263,0,0.523-0.008,0.785-0.008V313.657H256.785z"/>
                                                                                             <path style={{fill:"#F5CDB3"}} d="M256.785,210.409c-0.529-0.001-1.06-0.006-1.59-0.006c-45.319,0-88.327,7.7-121.099,21.684
                                                    c-37.809,16.133-59.082,39.634-59.898,66.176c-0.459,14.903,5.715,29.45,17.857,42.068c28.845,29.981,90.779,48.948,161.629,49.497
                                                    c1.04,0.008,2.068,0.012,3.103,0.012V210.409H256.785z"/>
                                                                                             <path style={{fill:"#F4F4F4"}} d="M256.785,99.697c-0.261,0-0.523-0.004-0.785-0.004c-74.844,0-150.611,24.799-150.611,72.196
                                                    S181.157,244.084,256,244.084c0.261,0,0.523-0.004,0.785-0.004V99.697L256.785,99.697z"/>
                                                                                             <path style={{fill:"#F5CDB3"}} d="M256.785,0.035c-1.069,0.026-2.139,0.062-3.203,0.116c-44.948,2.284-79.216,29.463-78.016,61.874
                                                    c1.148,31.009,34.214,54.392,76.915,54.392c1.425,0,2.865-0.036,4.302-0.089V0.035H256.785z"/>
                                                </svg>
                                         <span>Game Sessions</span>
                                     </div>
                                     <div className="settingPanel__container-items-right">
                                         <svg xmlns="http://www.w3.org/2000/svg"
                                              className="van-badge__wrapper van-icon van-icon-arrow"
                                              fill="rgb(136, 136, 136)" height="12px" width="12px" version="1.1"
                                              id="Layer_1"
                                              viewBox="0 0 330 330">
                                             <path id="XMLID_222_"
                                                   d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z"/>
                                         </svg>
                                     </div>
                                 </div>
                             </div>
                         </div> : ''
                        }
                        {/*///////////// ADMIN OPTIONS ///////////////////*/}


                        <div className="serviceCenter-wrap">
                            <div className="serviceCenter__container"><h1
                            >Service center</h1>
                                <div className="serviceCenter__container-items">
                                    <div className="serviceCenter__container-items__item"
                                         onClick={() => goToPage('/setting')}>
                                        <svg className="svg-icon icon-settingCenter"
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 60 60" fill="none">
                                            <path opacity="0.4"
                                                  d="M5 32.2035V27.8035C5 25.2035 7.125 23.0535 9.75 23.0535C14.275 23.0535 16.125 19.8535 13.85 15.9285C12.55 13.6785 13.325 10.7535 15.6 9.4535L19.925 6.9785C21.9 5.8035 24.45 6.5035 25.625 8.4785L25.9 8.9535C28.15 12.8785 31.85 12.8785 34.125 8.9535L34.4 8.4785C35.575 6.5035 38.125 5.8035 40.1 6.9785L44.425 9.4535C46.7 10.7535 47.475 13.6785 46.175 15.9285C43.9 19.8535 45.75 23.0535 50.275 23.0535C52.875 23.0535 55.025 25.1785 55.025 27.8035V32.2035C55.025 34.8035 52.9 36.9535 50.275 36.9535C45.75 36.9535 43.9 40.1535 46.175 44.0785C47.475 46.3535 46.7 49.2535 44.425 50.5535L40.1 53.0285C38.125 54.2035 35.575 53.5035 34.4 51.5285L34.125 51.0535C31.875 47.1285 28.175 47.1285 25.9 51.0535L25.625 51.5285C24.45 53.5035 21.9 54.2035 19.925 53.0285L15.6 50.5535C14.5102 49.926 13.714 48.8919 13.3859 47.6779C13.0578 46.464 13.2247 45.1695 13.85 44.0785C16.125 40.1535 14.275 36.9535 9.75 36.9535C7.125 36.9535 5 34.8035 5 32.2035Z"
                                                  fill="var(--main-color)"></path>
                                            <path
                                                d="M30 38.125C32.1549 38.125 34.2215 37.269 35.7452 35.7452C37.269 34.2215 38.125 32.1549 38.125 30C38.125 27.8451 37.269 25.7785 35.7452 24.2548C34.2215 22.731 32.1549 21.875 30 21.875C27.8451 21.875 25.7785 22.731 24.2548 24.2548C22.731 25.7785 21.875 27.8451 21.875 30C21.875 32.1549 22.731 34.2215 24.2548 35.7452C25.7785 37.269 27.8451 38.125 30 38.125Z"
                                                fill="var(--main-color)"></path>
                                        </svg>
                                        <span>Settings</span>
                                    </div>
                                    <div className="serviceCenter__container-items__item"
                                         onClick={() => goToPage('/coming-soon')}>
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
                                    <div className="serviceCenter__container-items__item"
                                         onClick={() => goToPage('/coming-soon')}>
                                        <svg className="svg-icon icon-notificationCenter"
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 60 60" fill="none">
                                            <path opacity="0.4"
                                                  d="M40.6016 9.12109H19.4016C13.2266 9.12109 8.22656 14.1461 8.22656 20.2961V43.8211C8.22656 49.9711 13.2516 54.9961 19.4016 54.9961H40.5766C46.7516 54.9961 51.7516 49.9711 51.7516 43.8211V20.2961C51.7766 14.1211 46.7516 9.12109 40.6016 9.12109Z"
                                                  fill="var(--main-color)"></path>
                                            <path
                                                d="M35.875 5H24.125C21.525 5 19.4 7.1 19.4 9.7V12.05C19.4 14.65 21.5 16.75 24.1 16.75H35.875C38.475 16.75 40.575 14.65 40.575 12.05V9.7C40.6 7.1 38.475 5 35.875 5ZM37.5 32.375H20C18.975 32.375 18.125 31.525 18.125 30.5C18.125 29.475 18.975 28.625 20 28.625H37.5C38.525 28.625 39.375 29.475 39.375 30.5C39.375 31.525 38.525 32.375 37.5 32.375ZM30.95 42.375H20C18.975 42.375 18.125 41.525 18.125 40.5C18.125 39.475 18.975 38.625 20 38.625H30.95C31.975 38.625 32.825 39.475 32.825 40.5C32.825 41.525 31.975 42.375 30.95 42.375Z"
                                                fill="var(--main-color)"></path>
                                        </svg>
                                        <span>Notification</span></div>
                                    <div className="serviceCenter__container-items__item"
                                         onClick={() => goToPage('/coming-soon')}>
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
                                    <div className="serviceCenter__container-items__item"
                                         onClick={() => goToPage('/coming-soon')}>
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
                                    <div className="serviceCenter__container-items__item"
                                         onClick={() => goToPage('/coming-soon')}>
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
                                <button onClick={() => setUserLogoutAlertConfirm(true)}>
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
                <IonLoading isOpen={balanceLoading} message={"Refreshing Balance..."}/>
            </IonContent>
        </IonPage>
    )
}
