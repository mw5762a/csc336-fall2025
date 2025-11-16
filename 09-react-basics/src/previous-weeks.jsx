import { useState } from "react";
import weeksData from "./weeksData.json";
import ContestantCard from "./weeks-cards.jsx";
import "./previous-weeks.css";

function PreviousWeeks() {
    const [currentWeek, setCurrentWeek] = useState("Week 1");

    const handleWeekChange = (week) => {
        setCurrentWeek(week);
    };

    const weekData = weeksData[currentWeek];

    return (
        <div className="container">
            <div>
            <h1>{currentWeek}</h1>
            <p className ="theme">Theme: {weekData.Theme}</p>
            </div>
            <div className="week-buttons">
                {Object.keys(weeksData).map((week) => (
                    <button key={week} onClick={() => handleWeekChange(week)}>
                        {week}
                    </button>
                ))}
            </div>

            <div className="featured-video">
                {weekData.FeaturedVideo && (
                    <iframe
                        width="800"
                        height="450"
                        src={weekData.FeaturedVideo}
                        title={`Featured Video ${currentWeek}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
            </div>

            <div className="cards-grid">
                {weekData.Contestants.map((contestant, index) => (
                    <ContestantCard
                        key={index}
                        star={contestant["Star"]}
                        danceSong={contestant["Dance-Song"]}
                        danceType={contestant["Dance-Type"]}
                        scores={contestant["Scores"]}
                        eliminated={contestant["Eliminated"]}
                    />
                ))}
            </div>
        </div>
    );
}

export default PreviousWeeks;
