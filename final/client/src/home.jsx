import { useEffect, useState } from "react";
import "./home.css";
import CardItem from "./CardItem";

function Home() {
    const [cards, setCards] = useState([
        {
            id: 1,
            title: "Robert Irwin",
            partner: "Witney Carson",
            image: "https://hips.hearstapps.com/hmg-prod/images/178793-1635-v1-68b84c40b8925.jpg?crop=0.867xw:0.813xh;0.0867xw,0.145xh",
        },
        {
            id: 2,
            title: "Alix Earle",
            partner: "Val Chmerkovskiy",
            image: "https://hips.hearstapps.com/hmg-prod/images/178793-2281-v1-68b84c9884606.jpg?crop=0.825xw:0.773xh;0.0714xw,0.152xh",
        },
        {
            id: 3,
            title: "Jordan Chiles",
            partner: "Ezra Sosa",
            image: "https://hips.hearstapps.com/hmg-prod/images/178793-8775-v1-68b84d11d7170.jpg?crop=0.842xw:0.790xh;0.100xw,0.161xh",
        },
        {
            id: 4,
            title: "Whitney Leavitt",
            partner: "Mark Ballas",
            image: "https://hips.hearstapps.com/hmg-prod/images/178793-3327-v1-68b84c018c9e2.jpg?crop=0.898xw:0.842xh;0.0204xw,0.126xh",
        },
        {
            id: 5,
            title: "Elaine Hendrix",
            partner: "Alan Bersten",
            image: "https://hips.hearstapps.com/hmg-prod/images/178793-9495-v1-68b8582796d68.jpg?crop=0.793xw:0.742xh;0.0935xw,0.209xh",
        },
        {
            id: 6,
            title: "Dylan Efron",
            partner: "Danille Karagach",
            image: "https://hips.hearstapps.com/hmg-prod/images/178793-5699-v1-68b84a728827c.jpg?crop=0.876xw:0.821xh;0.0595xw,0.122xh",
        },
        {
            id: 7,
            title: "Andy Ritcher",
            partner: "Emma Slater",
            image: "https://hips.hearstapps.com/hmg-prod/images/178793-4760-v1-68b8540b4ac27.jpg?crop=0.798xw:0.747xh;0.112xw,0.175xh",
        },
        {
            id: 8,
            title: "Danielle Fischer",
            partner: "Pasha Pashkov",
            image: "https://hips.hearstapps.com/hmg-prod/images/178793-8035-v1-68b85749ade6e.jpg?crop=0.827xw:0.774xh;0.0799xw,0.175xh",
        },
        {
            id: 9,
            title: "Jen Affleck",
            partner: "Jan Ravnick",
            image: "https://hips.hearstapps.com/hmg-prod/images/178793-2482-v1-68b84b6d8d779.jpg?crop=0.716xw:0.671xh;0.126xw,0.251xh",
        },
        {
            id: 10,
            title: "Scott Hoying",
            partner: "Rylee Arnold",
            image: "https://hips.hearstapps.com/hmg-prod/images/178793-3997-v2-68b850cc0ba4b.jpg?crop=0.854xw:0.800xh;0.0629xw,0.117xh",
        },
        {
            id: 11,
            title: "Hilaria Baldwin",
            partner: "Gleb Savchenk",
            image: "https://hips.hearstapps.com/hmg-prod/images/178793-6442-v1-68b84a03cf6d8.jpg?crop=0.793xw:0.744xh;0.0850xw,0.186xh",
        },
        {
            id: 12,
            title: "Lauren Jauregui",
            partner: "Brandon Armstrong",
            image: "https://hips.hearstapps.com/hmg-prod/images/snapinsta-to-543299330-18527632093014486-4756510974709944281-n-1-68d3ed3c141b8.jpg?crop=0.837xw:0.789xh;0.0850xw,0.155xh",
        },
        {
            id: 13,
            title: "Baron Davis",
            partner: "Britt Stewart",
            image: "https://hips.hearstapps.com/hmg-prod/images/178793-0217-v1-68b851f02badc.jpg?crop=0.867xw:0.814xh;0.0510xw,0.138xh",
        },
        {
            id: 14,
            title: "Corey Feldman",
            partner: "Jenna Johnson",
            image: "https://hips.hearstapps.com/hmg-prod/images/178793-7199-v1-68b8555e610fb.jpg?crop=0.786xw:0.736xh;0.107xw,0.208xh",
        }
    ]);

    const [timeLeft, setTimeLeft] = useState({
        days: "--",
        hours: "--",
        minutes: "--",
        seconds: "--",
    });

    useEffect(() => {
        let timer;

        async function fetchTime() {
            try {
                const res = await fetch("https://worldtimeapi.org/api/timezone/America/New_York");
                const data = await res.json();

                const now = new Date(data.utc_datetime);
                updateCountdown(now);

            } catch (error) {
                console.error("Time API failed:", error);
            }
        }

        function updateCountdown(currentTime) {
            const nextTuesday = new Date(currentTime);

            // 2 represents Tuesday (in days) 
            nextTuesday.setDate(nextTuesday.getDate() + ((2 - nextTuesday.getDay() + 7) % 7));
            nextTuesday.setHours(17, 0, 0, 0); //5pm in military time 

            const diff = nextTuesday - currentTime;

            if (diff <= 0) {
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
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
        <div className="app-background">
            <img
                className="banner-image"
                src="https://whatsondisneyplus.b-cdn.net/wp-content/uploads/2022/09/dancing-with-the-stars-c.png"
                alt="Dancing With the Stars Banner"
            />

            <main className="card-container">
                {cards.map((card) => (
                    <CardItem key={card.id} card={card} />
                ))}
            </main>

            <h4>Countdown to the Season Finale</h4>
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

export default Home;
