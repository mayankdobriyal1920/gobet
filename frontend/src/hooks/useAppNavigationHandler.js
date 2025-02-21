import { useEffect } from "react";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";

const useAppNavigationHandler = (goBack) => {
    useEffect(() => {
        if(Capacitor.isNativePlatform()) {
            const handleAppExit = () => {
                goBack();
            };

            const exitListener = App.addListener("appExit", handleAppExit);

            return () => {
                exitListener.remove(); // Remove only this listener
            };
        }
    }, [goBack]); // Dependency to prevent stale closure

    useEffect(() => {
        if(Capacitor.isNativePlatform()) {
            const handleAppStateChange = (state) => {
                if (!state.isActive) {
                    goBack();
                }
            };

            const stateListener = App.addListener("appStateChange", handleAppStateChange);

            return () => {
                stateListener.remove(); // Remove only this listener
            };
        }
    }, [goBack]); // Ensure latest goBack function
};

export default useAppNavigationHandler;
