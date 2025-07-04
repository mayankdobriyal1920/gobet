import React, { useState, useEffect } from "react";

const RunningTimerComponent = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString("en-US", { hour12: false });
    };

    return <span style={{color:'#ffffff',fontSize:'1.1rem'}}>TIME: {formatTime(time)}</span>;
};

export default RunningTimerComponent;
