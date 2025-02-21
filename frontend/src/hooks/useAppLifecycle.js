import { useEffect } from "react";
import { App } from "@capacitor/app";

const useAppLifecycle = () => {
    useEffect(() => {
        const handleAppStateChange = () => {
            myBackgroundFunction();
        };

        App.addListener("appStateChange", (state) => {
            if (!state.isActive) {
                handleAppStateChange();
            }
        });

        return () => {
            App.removeAllListeners();
        };
    }, []);

    const myBackgroundFunction = () => {
        console.log("App went to background, perform necessary actions...");
    };
};

export default useAppLifecycle;
