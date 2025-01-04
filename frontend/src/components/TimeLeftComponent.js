import React, { useState, useEffect } from "react";

const TimeLeftComponent = ({ totalSeconds }) => {
    const [time, setTime] = useState({
        minutes: Math.floor(totalSeconds / 60),
        seconds: totalSeconds % 60,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime.minutes === 0 && prevTime.seconds === 0) {
                    clearInterval(timer);
                    return prevTime;
                }

                const newSeconds = prevTime.seconds - 1;
                const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;

                return {
                    minutes: newMinutes,
                    seconds: newSeconds < 0 ? 59 : newSeconds,
                };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTimeUnit = (unit) => unit.toString().padStart(2, "0");

    return (
        <div className="TimeLeft__C-time">
            <div>{formatTimeUnit(time.minutes)[0]}</div>
            <div>{formatTimeUnit(time.minutes)[1]}</div>
            <div>{formatTimeUnit(time.minutes)[1]}</div>
            <div>{formatTimeUnit(time.seconds)[0]}</div>
            <div>{formatTimeUnit(time.seconds)[1]}</div>
        </div>
    );
};

export default TimeLeftComponent;
