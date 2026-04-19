import React, { useState, useEffect } from 'react'

function Timer({ initialTime }) {
    const [time, setTime] = useState(initialTime)
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        setTime(initialTime)
        setIsActive(true)
    }, [initialTime])

    useEffect(() => {
        let interval = null

        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime - 1)
            }, 1000)
        } else if (time === 0) {
            setIsActive(false)
        }

        return () => clearInterval(interval)
    }, [isActive, time])

    const resetTimer = () => {
        setTime(initialTime)
        setIsActive(true)
    }

    return (
        <div>
            <div>{time}</div>
        </div>
    )
}

export default Timer