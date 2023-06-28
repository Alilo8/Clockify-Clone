import React, { useEffect, useState } from 'react'

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

const Timer = ({isRunning, time, setTime}) => {
    const [temp, setTemp] = useState(time)

    useEffect(() => {
        let interval;
        if(isRunning)
            interval = setInterval(() => {setTemp(temp + 2); setTime(temp + 2)}, 1)
        return () => clearInterval(interval);
    }, [isRunning, temp]);

    return (
        <div className='text-black'>
            <p>
                {`${Math.floor(temp / HOUR) % 24}`.padStart(2, '0')}:
                {`${Math.floor(temp / MINUTE) % 60}`.padStart(2, '0')}:
                {`${Math.floor(temp / SECOND) % 60}`.padStart(2, '0')}
            </p>
        </div>
    )
}

export default Timer;