import { useEffect } from 'react';
import { App } from '@capacitor/app';
import { useHistory } from 'react-router-dom';
import { useIonAlert } from '@ionic/react';

const AppBackButtonHandler = () => {
    const history = useHistory();
    const [presentAlert] = useIonAlert();

    useEffect(() => {
        App.addListener('backButton', ({ canGoBack }) => {
            if (history.length > 1) {
                history.goBack();
            } else {
                presentAlert({
                    header: 'Exit App',
                    cssClass:'custom_site_alert_toast',
                    message: 'Are you sure you want to exit?',
                    buttons: [
                        { text: 'Cancel', role: 'cancel' },
                        { text: 'Exit',role: 'confirm', handler: () => App.exitApp() },
                    ],
                });
            }
        });

        return () => {
            App.removeAllListeners();
        };
    }, [history, presentAlert]);

    return null;
};

export default AppBackButtonHandler;