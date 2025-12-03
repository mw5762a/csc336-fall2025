import { useState, useEffect } from "react";
import CardItem from "./CardItem";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Button from "react-bootstrap/Button";
import "./finale-winner.css";

function FinaleWinner() {
    const [votesFromServer, setVotesFromServer] = useState()
    const [submitted, setSubmitted] = useState(false);
    const [showAlert, setAlert] = useState(false);

    useEffect(() => {
        fetch("/api/votes")
            .then(result => result.json())
            .then(data => setVotesFromServer(data))
            .catch(err => console.error("Failed to load votes", err));
    }, []);

    const [cards, setCards] = useState([
        {
            id: 1,
            title: "Robert Irwin",
            partner: "Witney Carson",
            image: "https://hips.hearstapps.com/hmg-prod/images/178793-1635-v1-68b84c40b8925.jpg?crop=0.867xw:0.813xh;0.0867xw,0.145xh",
            votes: 0,
        },
        {
            id: 2,
            title: "Alix Earle",
            partner: "Val Chmerkovskiy",
            image: "https://hips.hearstapps.com/hmg-prod/images/178793-2281-v1-68b84c9884606.jpg?crop=0.825xw:0.773xh;0.0714xw,0.152xh",
            votes: 0,
        },
        {
            id: 3,
            title: "Jordan Chiles",
            partner: "Ezra Sosa",
            image: "https://hips.hearstapps.com/hmg-prod/images/178793-8775-v1-68b84d11d7170.jpg?crop=0.842xw:0.790xh;0.100xw,0.161xh",
            votes: 0,
        },
        {
            id: 4,
            title: "Dylan Efron",
            partner: "Danille Karagach",
            image: "https://hips.hearstapps.com/hmg-prod/images/178793-5699-v1-68b84a728827c.jpg?crop=0.876xw:0.821xh;0.0595xw,0.122xh",
            votes: 0
        },
    ]);

    // increment votes for specific couple, update value 
    function addVote(id) {
        setCards((prevCards) =>
            prevCards.map((card) => {
                if (card.id === id) {
                    if (card.votes < 10) {
                        return { ...card, votes: card.votes + 1 };
                    } else {
                        setAlert(true);
                        return card;
                    }
                } else {
                    return card;
                }
            })
        )
    }

    async function submitVotes() {
        const userVotes = cards.map(card => ({
            id: card.id,
            name: card.title,
            votes: card.votes
        }));

        const response = await fetch("/api/votes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ votes: userVotes }),
        });

        if (!response.ok) {
            alert("Server error submitting votes");
            return;
        }

        const updatedVotes = await response.json();

        setCards(prevCards =>
            prevCards.map(card => {
                const updated = updatedVotes.find(v => v.id === card.id);
                return updated ? { ...card, votes: updated.votes } : card;
            })
        );

        setSubmitted(true);
    }

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setAlert(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const sortedCards = [...cards].sort((a, b) => b.votes - a.votes);

    const closeModal = () => setSubmitted(false);

    return (
        <>
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
                        Votes per star cannot exceed 10.
                    </Toast.Body>
                </Toast>
            </ToastContainer>


            <h1 className="header">
                Vote for the Mirrorball Champion
            </h1>

            <main className="card-container">
                {cards.map((card) => (
                    <CardItem key={card.id} card={card} onVote={() => addVote(card.id)} />
                ))}
            </main>

            <div className="button-container">
                <button className="submit-button" onClick={submitVotes}>
                    Submit Votes
                </button>
            </div>

            <Modal show={submitted} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Leaderboard</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {sortedCards.map(card => (
                            <li key={card.id}>
                                <span><b>{card.title}</b></span> - <span>{card.votes} votes</span>
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default FinaleWinner;
