import { useEffect } from 'react';
import { KeepAwake } from '@capacitor-community/keep-awake';

const useKeepAwake = () => {
    useEffect(() => {
        const enableKeepAwake = async () => {
            try {
                await KeepAwake.keepAwake();
                console.log('🔋 Screen Wake Lock Enabled');
            } catch (error) {
                console.error('⚠️ Keep Awake Error:', error);
            }
        };

        enableKeepAwake();

        return () => {
            const disableKeepAwake = async () => {
                try {
                    await KeepAwake.allowSleep();
                    console.log('💤 Screen Wake Lock Disabled');
                } catch (error) {
                    console.error('⚠️ Allow Sleep Error:', error);
                }
            };

            disableKeepAwake();
        };
    }, []);
};

export default useKeepAwake;
