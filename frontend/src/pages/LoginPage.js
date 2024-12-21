import React,{useState,useEffect} from 'react';
import {
    IonCol,
    IonContent, IonLoading,
    IonModal,
    IonPage,
    IonRow
} from "@ionic/react";
import {countries as countriesList} from 'countries-list';
import {useHistory} from "react-router-dom";
import siteBigLogo from "../theme/img/get-bet-app-logo-big.png";
import OTPInput from "react-otp-input";
import {useDispatch, useSelector} from "react-redux";
import {actionToLoginUserAndSendOtp, actionToVerifyLoginUserOtp} from "../redux/CommonAction";

export default function LoginPage(){
    const history = useHistory();
    const [isValidateOtpModalOpen,setIsValidateOtpModalOpen] = useState(false);
    const [otp,setOtp] = useState('');
    const userAuthDetail = useSelector((state) => state.userAuthDetail);
    const [phone,setPhone] = useState('');
    const goToPage = (page) =>{
        history.replace(page);
    }
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(
        {
            code: "IN",
            mobileCode: 91,
            name: "India"
        }
    );
    const dispatch = useDispatch();

    const callFunctionToValidateOtpAndLoginUser = (otp)=>{
        dispatch(actionToVerifyLoginUserOtp(phone,otp))
    }
    const callFunctionToLoginUser = ()=>{
        if(phone?.length === 10) {
            //dispatch(actionToLoginUserAndSendOtp(phone))
            setIsValidateOtpModalOpen(true);
        }
    }

    useEffect(() => {
        // Convert the countries object into an array
        const countriesArray = Object.entries(countriesList).map(([code, details]) => ({
            code,
            name: details.name,
            mobileCode: details.phone[0],
        }));

        setCountries(countriesArray);
    }, []);

    const onChangePhoneNumber = (value) => {
        if(value?.length <= 10 && !isNaN(value)) {
            setPhone(value);
        }
    }
    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    return (
        <IonPage>
            <IonContent className={"top_padding"}>
                <div className={"login_main_container_outer"}>
                    <div className={"login_main_container_inner"}>
                        {/*///////////// LOGO SLOGAN CONTAINER /////////////////////*/}
                        <div className={"main_logo_and_slogan_container_header"}>
                            <div className={"main_welcome_header_logo_section"}>
                                <img src={siteBigLogo} className={"logo"} alt={"logo"}/>
                            </div>
                            <div className={"welcome_slogan_container"}>
                                Welcome To Get Bet
                                <p>Login to your account</p>
                            </div>
                        </div>
                        {/*///////////// LOGO SLOGAN CONTAINER /////////////////////*/}
                        <div className={"main_form_container_section"}>
                            <IonRow>
                                <IonCol size={3}>
                                    <select className={"form_input_section select"} value={selectedCountry.mobileCode} onChange={handleCountryChange}>
                                        {countries.map(country => (
                                            <option key={country.code} value={country.mobileCode}>
                                                +{country.mobileCode}
                                            </option>
                                        ))}
                                    </select>
                                </IonCol>
                                <IonCol size={9}>
                                    <input className={"form_input_section input"}
                                           onChange={(e)=>onChangePhoneNumber(e.target.value)}
                                           value={phone}
                                           placeholder={"Mobile Number"} type={"text"}/>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <button onClick={callFunctionToLoginUser} disabled={phone?.length !== 10} className={"signup_button_main_form"}>
                                        Login
                                    </button>
                                </IonCol>
                            </IonRow>
                        </div>
                    </div>
                </div>


                {/*/////////////// OTP VALIDATION SHEET MODAL //////////////*/}
                <IonModal
                    isOpen={isValidateOtpModalOpen}
                    breakpoints={[0.4]}
                    initialBreakpoint={0.4}
                    className={"sheet_ion_modal"}
                    onIonModalDidDismiss={() => setIsValidateOtpModalOpen(false)}>
                    <div className={"otp_modal_container"}>
                        <div className={"otp_verify_modal_header"}>
                            <div className={"otp_verify_modal_main_heading sub_heading"}>
                                OTP VERIFICATION
                            </div>
                            <div className={"otp_verify_modal_sub_heading main_text"}>
                                {`WE SENT OTP TO +${selectedCountry?.mobileCode}${phone}`}
                            </div>
                        </div>
                        <div className={"otp_container_inner"}>
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                placeholder={'0000'}
                                containerStyle={"otp_container_inputs"}
                                numInputs={4}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} />}
                            />
                            <button onClick={()=>callFunctionToValidateOtpAndLoginUser(otp)} className={"theme_button otp_verification_button"}>
                                VERIFY
                            </button>
                            <div className={"otp_verify_resend_section main_text"}>
                                {`Didn't Receive Code?`} <a className={"theme_logo_color"}>Resend OTP</a>
                            </div>
                        </div>
                    </div>
                </IonModal>
                {/*/////////////// OTP VALIDATION SHEET MODAL //////////////*/}
            </IonContent>
            <IonLoading isOpen={userAuthDetail?.loading} message={"Please Wait..."}/>
        </IonPage>
    )
}