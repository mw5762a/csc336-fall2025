import { useEffect, useState } from "react";
import "./next-week.css";

function NextWeek() {

    const [timeLeft, setTimeLeft] = useState({
        days: "--",
        hours: "--",
        minutes: "--",
        seconds: "--",
    });

    useEffect(() => {
        let timer;

        async function fetchTime() {
            const res = await fetch("http://worldtimeapi.org/api/timezone/America/New_York");
            const data = await res.json();
            const now = new Date(data.datetime); //built in type in jsx for formatted date
            updateCountdown(now);
        }

        function updateCountdown(currentTime) {
            const nextTuesday = new Date(currentTime);
            
            // 2 represents Tuesday (in days) 
            nextTuesday.setDate(nextTuesday.getDate() + ((2 - nextTuesday.getDay() + 7) % 7));
            nextTuesday.setHours(20, 0, 0, 0);

            const diff = nextTuesday - currentTime;

            if (diff <= 0) {
                setTimeLeft({ 
                    days: 0, 
                    hours: 0, 
                    minutes: 0, 
                    seconds: 0 });
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        }

        fetchTime();

        timer = setInterval(() => {
            updateCountdown(new Date());
        }, 1000); //update every second

        return () => clearInterval(timer); 
    }, []);


    return (
        <div className="countdown-container">
            <h1>Countdown to Next Episode</h1>
            <div className="countdown-boxes">
                <div className="countdown-box">
                    <span className="number">{timeLeft.days}</span>
                    <span className="label">Days</span>
                </div>
                <div className="countdown-box">
                    <span className="number">{timeLeft.hours}</span>
                    <span className="label">Hours</span>
                </div>
                <div className="countdown-box">
                    <span className="number">{timeLeft.minutes}</span>
                    <span className="label">Minutes</span>
                </div>
                <div className="countdown-box">
                    <span className="number">{timeLeft.seconds}</span>
                    <span className="label">Seconds</span>
                </div>
            </div>
        </div>
    );
}

export default NextWeek; 