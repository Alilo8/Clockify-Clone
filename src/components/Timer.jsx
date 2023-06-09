import React, { useEffect, useState } from 'react'

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

const Timer = ({isRunning, time, setTime}) => {
    useEffect(() => {
        let interval;
        if(isRunning)
            interval = setInterval(() => setTime(time + 3), 1)
        return () => clearInterval(interval);
    }, [isRunning, time]);

    return (
        <div className='text-black'>
            <p>
                {`${Math.floor(time / HOUR) % 24}`.padStart(2, '0')}:
                {`${Math.floor(time / MINUTE) % 60}`.padStart(2, '0')}:
                {`${Math.floor(time / SECOND) % 60}`.padStart(2, '0')}
            </p>
        </div>
    )
}

export default Timer;