import { useState } from "react";
import "./App.css";
import CardItem from "./CardItem";

function App() {
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
      title: "Whitney Leavitt",
      partner: "Mark Ballas",
      image: "https://hips.hearstapps.com/hmg-prod/images/178793-3327-v1-68b84c018c9e2.jpg?crop=0.898xw:0.842xh;0.0204xw,0.126xh",
      votes: 0,
    },
    {
      id: 5,
      title: "Elaine Hendrix",
      partner: "Alan Bersten",
      image: "https://hips.hearstapps.com/hmg-prod/images/178793-9495-v1-68b8582796d68.jpg?crop=0.793xw:0.742xh;0.0935xw,0.209xh",
      votes: 0,
    },
    {
      id: 6,
      title: "Dylan Efron",
      partner: "Dani Karagach",
      image: "https://hips.hearstapps.com/hmg-prod/images/178793-5699-v1-68b84a728827c.jpg?crop=0.876xw:0.821xh;0.0595xw,0.122xh",
      votes: 0,
    },
    {
      id: 7,
      title: "Andy Ritcher",
      partner: "Emma Slater",
      image: "https://hips.hearstapps.com/hmg-prod/images/178793-4760-v1-68b8540b4ac27.jpg?crop=0.798xw:0.747xh;0.112xw,0.175xh",
      votes: 0,
    },
  ]);

  const [selectedContestant, setSelectedContestant] = useState("");

  const contestantOptions = {
    "Danielle Fischer": {
      partner: "Pasha Pashkov",
      image: "https://hips.hearstapps.com/hmg-prod/images/178793-8035-v1-68b85749ade6e.jpg?crop=0.827xw:0.774xh;0.0799xw,0.175xh",
    },
    "Jen Affleck": {
      partner: "Jan Ravnick",
      image: "https://hips.hearstapps.com/hmg-prod/images/178793-2482-v1-68b84b6d8d779.jpg?crop=0.716xw:0.671xh;0.126xw,0.251xh",
    },
    "Scott Hoying": {
      partner: "Rylee Arnold",
      image: "https://hips.hearstapps.com/hmg-prod/images/178793-3997-v2-68b850cc0ba4b.jpg?crop=0.854xw:0.800xh;0.0629xw,0.117xh",
    },
    "Hilaria Baldwin": {
      partner: "Gleb Savchenk",
      image: "https://hips.hearstapps.com/hmg-prod/images/178793-6442-v1-68b84a03cf6d8.jpg?crop=0.793xw:0.744xh;0.0850xw,0.186xh",
    },
  };

  function addVote(id) {
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === id) {
          if (card.votes < 10) {
            return { ...card, votes: card.votes + 1 };
          } else {
            return card;
          }
        } else {
          return card;
        }
      })
    );
  }

  function addContestant() {

    if (!selectedContestant) {
      return;
    }

  for (let i = 0; i < cards.length; i++) {
    if (cards[i].title === selectedContestant) {
      return; 
    }
  }

    const newContestant = contestantOptions[selectedContestant];
    const newCard = {
      id: cards.length + 1,
      title: selectedContestant,
      partner: newContestant.partner,
      image: newContestant.image,
      votes: 0,
    };

    setCards([...cards, newCard]);

    setSelectedContestant("");
  }

  return (
    <>
      <div className="app-background">
        <img
          className="banner-image"
          src="https://whatsondisneyplus.b-cdn.net/wp-content/uploads/2022/09/dancing-with-the-stars-c.png"
          alt="Dancing With the Stars Banner"
        />

        <div className="add-contestant">

          <select
            value={selectedContestant}
            onChange={(e) => setSelectedContestant(e.target.value)}
          >
            <option value="">Select contestant to add</option>
            {Object.keys(contestantOptions).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          <button id="add-contestant" className="card-button" onClick={addContestant}>
            Add Contestant
          </button>
        </div>

        <p class="instructions">Although some of your favorite contestants have been sent home, you have the ability to bring them back into the competiton! 
          Select anyone from the dropdown menu to bring them back into the compeition!
        </p>

        <main className="card-container">
          {cards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              onVote={() => addVote(card.id)}
            />
          ))}
        </main>

        <button id="submit-button" className="card-button">Submit Votes</button>
      </div>
    </>
  );
}

export default App;
