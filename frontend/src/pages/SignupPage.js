import React,{useState,useEffect} from 'react';
import {
    IonCol, IonContent,
    IonLoading,
    IonPage,
    IonRow
} from "@ionic/react";
import {countries as countriesList} from 'countries-list';
import {useDispatch, useSelector} from "react-redux";
import {actionToSendOtp, actionToSignupUser, actionToVerifyLoginUserOtp} from "../redux/CommonAction";
import {Capacitor} from "@capacitor/core";
import {NavigationBar} from "@mauricewegner/capacitor-navigation-bar";
import {StatusBar, Style} from "@capacitor/status-bar";
import {useHistory} from "react-router";
import {USER_GET_OTP_REQUEST_FAIL} from "../redux/CommonConstants";

export default function SignupPage(){
    const [otp,setOtp] = useState('');
    const [passcode,setPasscode] = useState('');
    const userAuthDetail = useSelector((state) => state.userAuthDetail);
    const userOtpDetails = useSelector((state) => state.userOtpDetails);
    const signupFormError = useSelector((state) => state.signupSigninFormError);
    const [phone,setPhone] = useState('');
    const [countries, setCountries] = useState([]);
    const [timer, setTimer] = useState(60);
    const [isOtpExpired, setIsOtpExpired] = useState(true);
    const [phoneError,setPhoneError] = useState(false);
    const [phoneErrorMessage,setPhoneErrorMessage] = useState('');

    const [otpError,setOtpError] = useState(false);
    const [otpErrorMessage,setOtpErrorMessage] = useState('');

    const [passCodeError,setPassCodeError] = useState(false);
    const [passCodeErrorMessage,setPassCodeErrorMessage] = useState('');

    const [selectedCountry, setSelectedCountry] = useState(
        {
            code: "IN",
            mobileCode: 91,
            name: "India"
        }
    );
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        if(Capacitor.isNativePlatform()){
            NavigationBar.setColor({ color: '#ffffff' , darkButtons:true});
            StatusBar.setBackgroundColor({ color: '#f57b2c' });
            StatusBar.setStyle({ style:Style.Dark });
        }
    },[])

    useEffect(()=>{
        if (userOtpDetails.loading){
            setIsOtpExpired(false);
            const interval = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer <= 1) {
                        clearInterval(interval);
                        setIsOtpExpired(true); // OTP expired
                        dispatch({ type: USER_GET_OTP_REQUEST_FAIL, payload: {}});
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }
    },[userOtpDetails])


    useEffect(()=>{
        if (signupFormError?.error && signupFormError?.message){
            if (signupFormError?.error === 'phone'){
                setPhoneError(true);
                setPhoneErrorMessage(signupFormError?.message);
            }
            if (signupFormError?.error === 'otp'){
                setOtpError(true);
                setOtpErrorMessage(signupFormError?.message);
            }
            if (signupFormError?.error === 'passcode'){
                setPassCodeError(true);
                setPassCodeErrorMessage(signupFormError?.message);
            }
        }
    },[signupFormError])

    const callFunctionToGoToLoginPage = ()=>{
        history.replace('/login');
    }
    const callFunctionToValidateOtpAndLoginUser = ()=>{
        if(otp) {
            dispatch(actionToVerifyLoginUserOtp(phone, otp))
        }
    }

    const callFunctionToSignupUser = ()=>{
        const isValidate = validateFields('signup');
        if (isValidate){
            dispatch(actionToSignupUser(phone, otp, passcode));
        }
    }

    const callFunctionToLoginUser = ()=>{
        if(phone?.length === 10) {
            //dispatch(actionToLoginUserAndSendOtp(phone))
        }
    }

    const callFunctionToSendOtp = () =>{
        //if(phone?.length === 10) {
            const isValidate = validateFields('get otp');
            if (isValidate){
                dispatch(actionToSendOtp(phone))
            }
        //}
    }

    /**
     * This function is used to validate the form for get otp and signup actions
     * @param action
     * @returns {boolean}
     */
    const validateFields = (action) =>{
        let isFormValid = true;
        setPhoneError(false);
        setOtpError(false);
        setPassCodeError(false);
        setPhoneErrorMessage('');
        setOtpErrorMessage('');
        setPassCodeErrorMessage('');
        if (phone.trim() === '') {
            isFormValid = false;
            setPhoneErrorMessage('Phone number is required');
            setPhoneError(true);
        } else if (!/^\d{10}$/.test(phone)) {
            isFormValid = false;
            setPhoneErrorMessage('Phone number must be 10 digits');
            setPhoneError(true);
        }
        if (action === 'signup'){
            if (otp.trim() === ''){
                isFormValid = false;
                setOtpErrorMessage('OTP is required');
                setOtpError(true);
            }
            if (passcode.trim() === ''){
                isFormValid = false;
                setPassCodeErrorMessage('OTP is required');
                setPassCodeError(true);
            }
        }
        return isFormValid;
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
            <IonContent>
            <div className={"login_main_container_outer"}>
                <div className={"login_main_container_inner"}>
                    {/*///////////// LOGO SLOGAN CONTAINER /////////////////////*/}
                    <div className={"main_logo_and_slogan_container_header logo_section"}>
                        <div className={"main_welcome_header_logo_section"}>
                            <svg width={'70px'} height={'70px'} viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd"
                                      d="M12.052 1.25h-.104c-.899 0-1.648 0-2.242.08-.628.084-1.195.27-1.65.726s-.641 1.022-.726 1.65c-.057.426-.074 1.446-.078 2.32-2.022.066-3.236.302-4.08 1.146C2 8.343 2 10.229 2 14s0 5.657 1.172 6.828S6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.172S22 17.771 22 14s0-5.657-1.172-6.828c-.844-.844-2.058-1.08-4.08-1.146l-.078-2.32c-.084-.628-.27-1.195-.726-1.65s-1.022-.641-1.65-.726c-.595-.08-1.344-.08-2.242-.08zm3.196 4.752l-.064-2.096c-.062-.461-.169-.659-.3-.789s-.328-.238-.789-.3c-.483-.065-1.131-.067-2.095-.067l-2.095.067c-.461.062-.659.169-.789.3s-.238.328-.3.789c-.046.339-.06 1.25-.064 2.096L10 6h4l1.248.002zM12 9.25a.75.75 0 0 1 .75.75v.01c1.089.274 2 1.133 2 2.323a.75.75 0 1 1-1.5 0c0-.384-.426-.917-1.25-.917s-1.25.533-1.25.917.426.917 1.25.917c1.385 0 2.75.96 2.75 2.417 0 1.19-.911 2.049-2 2.323V18a.75.75 0 1 1-1.5 0v-.01c-1.089-.274-2-1.133-2-2.323a.75.75 0 1 1 1.5 0c0 .384.426.917 1.25.917s1.25-.533 1.25-.917-.426-.917-1.25-.917c-1.385 0-2.75-.96-2.75-2.417 0-1.19.911-2.049 2-2.323V10a.75.75 0 0 1 .75-.75z"
                                      fill="#ffffff"/>
                            </svg>
                            <div className={"logo_login_text"}>GET BET</div>
                        </div>
                    </div>
                    <div className={"main_logo_and_slogan_container_header login_text_in_page"}>
                        <div className={"main_welcome_header_logo_section"}>
                            <div className={"welcome_slogan_container"}>
                                <div className={"login_head"}>Signup</div>
                                <div className={"login_text"}>
                                    Please log in using your phone number and OTP.
                                    <br/>
                                    Ensure you are registered by a sub-admin before logging in.
                                    <br/>
                                    If you are not registered, please contact your nearest sub-admin for assistance.
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*///////////// LOGO SLOGAN CONTAINER /////////////////////*/}
                    <div className={"main_form_container_section"}>
                        <form>
                            <IonRow className={"form_second_label_input"}>
                                <div className={"login_form_label"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"
                                         fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M9.93417 2C9.95604 2 9.97799 2 10 2L14.0658 2C14.9523 1.99995 15.7161 1.99991 16.3278 2.08215C16.9833 2.17028 17.6117 2.36902 18.1213 2.87868C18.631 3.38835 18.8297 4.0167 18.9179 4.67221C19.0001 5.28387 19.0001 6.04769 19 6.93417V17.0658C19.0001 17.9523 19.0001 18.7161 18.9179 19.3278C18.8297 19.9833 18.631 20.6117 18.1213 21.1213C17.6117 21.631 16.9833 21.8297 16.3278 21.9179C15.7161 22.0001 14.9523 22.0001 14.0658 22H9.9342C9.0477 22.0001 8.28388 22.0001 7.67221 21.9179C7.0167 21.8297 6.38835 21.631 5.87868 21.1213C5.36902 20.6117 5.17028 19.9833 5.08215 19.3278C4.99991 18.7161 4.99995 17.9523 5 17.0658L5 7C5 6.97799 5 6.95604 5 6.93417C4.99995 6.04769 4.99991 5.28387 5.08215 4.67221C5.17028 4.0167 5.36902 3.38835 5.87868 2.87868C6.38835 2.36902 7.0167 2.17028 7.67221 2.08215C8.28387 1.99991 9.04769 1.99995 9.93417 2ZM10.5 18C10.5 17.4477 10.9477 17 11.5 17H12.5C13.0523 17 13.5 17.4477 13.5 18C13.5 18.5523 13.0523 19 12.5 19H11.5C10.9477 19 10.5 18.5523 10.5 18Z"
                                              fill="#f57b2c"/>
                                    </svg>
                                    Phone Number
                                </div>
                            </IonRow>

                            <IonRow>
                                <IonCol size={3}>
                                    <select className={"form_input_section select"} value={selectedCountry.mobileCode}
                                            onChange={handleCountryChange}>
                                        {countries.map(country => (
                                            <option key={country.code} value={country.mobileCode}>
                                                +{country.mobileCode}
                                            </option>
                                        ))}
                                    </select>
                                </IonCol>
                                <IonCol size={9}>
                                    <input className={"form_input_section input"}
                                           onChange={(e) => onChangePhoneNumber(e.target.value)}
                                           value={phone}
                                           placeholder={"Enter Phone Number"} type={"text"} required={true}/>
                                </IonCol>
                            </IonRow>
                            {phoneError && <p className="error">{phoneErrorMessage}</p>}
                            <IonRow className={"form_second_label_input"}>
                                <div className={"login_form_label"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"
                                         fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H14C17.7712 20 19.6569 20 20.8284 18.8284C22 17.6569 22 15.7712 22 12C22 8.22876 22 6.34315 20.8284 5.17157C19.6569 4 17.7712 4 14 4H10C6.22876 4 4.34315 4 3.17157 5.17157ZM12.7502 10C12.7502 9.58579 12.4144 9.25 12.0002 9.25C11.586 9.25 11.2502 9.58579 11.2502 10V10.7012L10.6428 10.3505C10.2841 10.1434 9.8254 10.2663 9.61829 10.625C9.41119 10.9837 9.53409 11.4424 9.89281 11.6495L10.4997 11.9999L9.89258 12.3505C9.53386 12.5576 9.41095 13.0163 9.61806 13.375C9.82517 13.7337 10.2839 13.8566 10.6426 13.6495L11.2502 13.2987V14C11.2502 14.4142 11.586 14.75 12.0002 14.75C12.4144 14.75 12.7502 14.4142 12.7502 14V13.2993L13.3569 13.6495C13.7156 13.8566 14.1743 13.7337 14.3814 13.375C14.5885 13.0163 14.4656 12.5576 14.1069 12.3505L13.4997 11.9999L14.1067 11.6495C14.4654 11.4424 14.5883 10.9837 14.3812 10.625C14.1741 10.2663 13.7154 10.1434 13.3567 10.3505L12.7502 10.7006V10ZM6.73266 9.25C7.14687 9.25 7.48266 9.58579 7.48266 10V10.7006L8.0891 10.3505C8.44782 10.1434 8.90651 10.2663 9.11362 10.625C9.32073 10.9837 9.19782 11.4424 8.8391 11.6495L8.23217 11.9999L8.83934 12.3505C9.19806 12.5576 9.32096 13.0163 9.11386 13.375C8.90675 13.7337 8.44806 13.8566 8.08934 13.6495L7.48266 13.2993V14C7.48266 14.4142 7.14687 14.75 6.73266 14.75C6.31844 14.75 5.98266 14.4142 5.98266 14V13.2987L5.375 13.6495C5.01628 13.8566 4.55759 13.7337 4.35048 13.375C4.14337 13.0163 4.26628 12.5576 4.625 12.3505L5.23217 11.9999L4.62523 11.6495C4.26652 11.4424 4.14361 10.9837 4.35072 10.625C4.55782 10.2663 5.01652 10.1434 5.37523 10.3505L5.98266 10.7012V10C5.98266 9.58579 6.31844 9.25 6.73266 9.25ZM18.0181 10C18.0181 9.58579 17.6823 9.25 17.2681 9.25C16.8539 9.25 16.5181 9.58579 16.5181 10V10.7012L15.9106 10.3505C15.5519 10.1434 15.0932 10.2663 14.8861 10.625C14.679 10.9837 14.8019 11.4424 15.1606 11.6495L15.7676 11.9999L15.1604 12.3505C14.8017 12.5576 14.6788 13.0163 14.8859 13.375C15.093 13.7337 15.5517 13.8566 15.9104 13.6495L16.5181 13.2987V14C16.5181 14.4142 16.8539 14.75 17.2681 14.75C17.6823 14.75 18.0181 14.4142 18.0181 14V13.2993L18.6247 13.6495C18.9835 13.8566 19.4422 13.7337 19.6493 13.375C19.8564 13.0163 19.7335 12.5576 19.3747 12.3505L18.7676 11.9999L19.3745 11.6495C19.7332 11.4424 19.8561 10.9837 19.649 10.625C19.4419 10.2663 18.9832 10.1434 18.6245 10.3505L18.0181 10.7006V10Z"
                                              fill="#f57b2c"/>
                                    </svg>
                                    OTP
                                </div>
                            </IonRow>
                            <IonRow>
                                <IonCol size={9}>
                                    <input className={"form_input_section input"}
                                           value={otp}
                                           onChange={(e)=>setOtp(e.target.value)}
                                           placeholder={"Enter OTP"} type={"text"} required={true}/>
                                </IonCol>
                                <IonCol size={3}>
                                    <button onClick={callFunctionToSendOtp} disabled={phone?.length !== 10 || userOtpDetails?.loading} type={"button"}
                                            className={"otp_button_main_form"}>
                                        GET
                                    </button>
                                </IonCol>
                            </IonRow>
                            {otpError && <p className="error">{otpErrorMessage}</p>}
                            {!isOtpExpired
                                ? <>
                                    <IonRow>
                                        <IonCol size={12}>
                                            <p>Get new OTP in: {timer} seconds</p>
                                        </IonCol>
                                    </IonRow>
                                </>
                                :
                                ''
                            }
                            <IonRow className={"form_second_label_input"}>
                                <div className={"login_form_label"}>
                                    <svg fill="#f57b2c" width="20px" height="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
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
                                    Pass Code
                                </div>
                            </IonRow>
                            <IonRow>
                                <IonCol size={12}>
                                    <input className={"form_input_section input"}
                                           value={passcode}
                                           onChange={(e)=>setPasscode(e.target.value)}
                                           placeholder={"Enter pass code"} type={"text"} required={true}/>
                                </IonCol>
                            </IonRow>
                            {passCodeError && <p className="error">{passCodeErrorMessage}</p>}
                            <IonRow>
                                <IonCol>
                                    <button onClick={callFunctionToSignupUser} type={"button"}
                                            className={"signup_button_main_form"}>
                                        Signup
                                    </button>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <button onClick={callFunctionToGoToLoginPage} type={"button"}
                                            className={"signup_button_main_form login"}>
                                        Login
                                    </button>
                                </IonCol>
                            </IonRow>
                        </form>
                    </div>
                </div>
            </div>
            <IonLoading isOpen={userAuthDetail?.loading} className={"loading_loader_spinner_container"} message={"Please Wait..."}/>
            </IonContent>
        </IonPage>
    )
}