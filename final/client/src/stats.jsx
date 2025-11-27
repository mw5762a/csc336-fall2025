import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import weeksData from './weeksData.json';
import './Stats.css';
import ComparisonModal from './comparison-modal.jsx';
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useState, useEffect } from "react";

function Stats() {
    const [selectedContestant1, setSelectedContestant1] = useState("");
    const [selectedContestant2, setSelectedContestant2] = useState("");
    const [barChartData, setBarChartData] = useState([]);
    const [rankerChartData, setRankerChartData] = useState([])
    const [pieChartData, setPieChartData] = useState([])
    const [showComparisonModal, setComparisonModal] = useState(false);
    const [showAlert, setAlert] = useState(false);
    const COLORS = ["#2B0139", "#a873ff"]

    const contestantOptions = [
        {
            id: 1,
            name: "Robert",
        },
        {
            id: 2,
            name: "Alix",
        },
        {
            id: 3,
            name: "Jordan",
        },
        {
            id: 4,
            name: "Whitney",
        },
        {
            id: 5,
            name: "Elaine",
        },
        {
            id: 6,
            name: "Dylan",
        },
        {
            id: 7,
            name: "Andy",
        },
        {
            id: 8,
            name: "Danielle",
        },
        {
            id: 9,
            name: "Jen",
        },
        {
            id: 10,
            name: "Scott",
        },
        {
            id: 11,
            name: "Hilaria",
        },
        {
            id: 12,
            name: "Lauren",
        },
        {
            id: 13,
            name: "Baron",
        },
        {
            id: 14,
            name: "Corey",
        }
    ]

    useEffect(() => {
        const weeksArray = Object.values(weeksData);

        const totals = {};
        let lowestVotedOutCounter = 0

        weeksArray.forEach(week => {
            let lowestScoreCalculator = {}
            let eliminatedStar = ""
            for (const c of week.Contestants) {
                if (totals[c.Star]) {
                    totals[c.Star] += c.Scores;
                } else {
                    totals[c.Star] = c.Scores;
                }

                if (c.Eliminated) {
                    eliminatedStar = c.Star
                }

                lowestScoreCalculator[c.Star] = c.Scores
            }

            let weeklySorted = Object.entries(lowestScoreCalculator)
                .map(([star, score]) => ({ star, score }))
                .sort((a, b) => a.score - b.score);

            let lowestOfWeek = weeklySorted[0];

            if (lowestOfWeek.star === eliminatedStar) {
                lowestVotedOutCounter += 1;
            }

            console.log(lowestVotedOutCounter)
        });

        let rankData = Object.entries(totals).map(([star, total]) => ({ star, total }));

        rankData.sort((a, b) => b.total - a.total); // highest to lowest

        // pie chart data calculation 
        const percentCorrect = (lowestVotedOutCounter / weeksArray.length) * 100;
        const percentWrong = 100 - percentCorrect;

        const lowestVoteData = [
            { name: "Correct: Lowest Score Eliminated", value: percentCorrect },
            { name: "Incorrect: Higher Score Eliminated", value: percentWrong }
        ];

        setRankerChartData(rankData);
        setPieChartData(lowestVoteData)
    }, []);


    function setBarGraph(star1, star2) {
        const weeksArray = Object.values(weeksData);

        const newData = weeksArray.map((week, index) => {
            const weekObj = { week: `Week ${index + 1}` };
            const judges = week.NumberJudges;

            weekObj[star1] = 0;
            weekObj[star2] = 0;

            for (const c of week.Contestants) {
                if (c.Star === star1) {
                    weekObj[star1] = c.Scores / judges;
                }
                if (c.Star === star2) {
                    weekObj[star2] = c.Scores / judges;
                }
            }

            return weekObj;
        });

        setBarChartData(newData);
    }


    return (
        <>
            <h1>Stars Total Points Earned</h1>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={rankerChartData}>
                        <XAxis dataKey="star" type="category" angle={-10} textAnchor='end'
                        />
                        <YAxis width="auto" label={{ value: 'Total Score', position: 'insideLeft', dx: 0, dy: 20, angle: -90 }} />
                        <Tooltip
                        />
                        <Legend verticalAlign="top" height={36} iconType="circle" />
                        <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>

            </div>

            <ToastContainer position="top-center" className="p-3">
                <Toast
                    className="error-toast"
                    onClose={() => setAlert(false)}
                    show={showAlert}
                    delay={5000}
                    autohide
                    bg="danger"
                >
                    <Toast.Header>
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body style={{ color: "white" }}>
                        You must select two contestants to compare.
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            <h1>Compare Two Stars Scores</h1>
            <div className="select-contestants">
                <div className="add-contestant">
                    <select
                        value={selectedContestant1}
                        onChange={(e) => setSelectedContestant1(e.target.value)}
                        style={{ marginRight: 40 }}
                    >
                        <option value="">Select contestant</option>
                        {contestantOptions.map(c => (
                            <option key={c.id} value={c.name}>
                                {c.name}
                            </option>

                        ))}
                    </select>

                    <select
                        value={selectedContestant2}
                        onChange={(e) => setSelectedContestant2(e.target.value)}
                        style={{ marginRight: 40 }}
                    >
                        <option value="">Select contestant</option>
                        {contestantOptions.map(c => (
                            <option key={c.id} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="button-container">
                <button
                    id="add-contestant"
                    className="card-button"
                    onClick={() => {
                        if (selectedContestant1 === "" || selectedContestant2 === "") {
                            setAlert(true);
                        }
                        else {
                            setBarGraph(selectedContestant1, selectedContestant2);
                            setComparisonModal(true);
                        }
                    }}>
                    Compare Contestants
                </button>
            </div>

            <h1>Elimination Statistics</h1>
            <div className="chart-container">
                <PieChart
                    style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
                    responsive
                >
                    <Pie
                        data={pieChartData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius="70%"
                        label
                    >
                        {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>

                    <Tooltip
                        formatter={(value) => `${value}%`}
                    />
                    <Legend
                        verticalAlign="bottom"
                        align="center"
                        iconType="circle"
                        wrapperStyle={{ paddingTop: 20, fontSize: 14 }}
                    />
                </PieChart>
            </div>

            <ComparisonModal
                show={showComparisonModal}
                onHide={() => setComparisonModal(false)}
                barChartData={barChartData}
                selectedContestant1={selectedContestant1}
                selectedContestant2={selectedContestant2}
            />
        </>
    );
}

export default Stats;
