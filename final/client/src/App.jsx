import "./App.css";
import PreviousWeeks from "./previous-weeks.jsx";
import Home from "./Home.jsx"
import FinaleWinner from "./finale-winner.jsx"
import Stats from "./stats.jsx";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/finale-winner">Finale Voting</NavLink>
          <NavLink to="/previous-weeks">Previous Weeks</NavLink>
          <NavLink to="/stats">Stars Stats</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/previous-weeks" element={<PreviousWeeks />} />
          <Route path="/finale-winner" element={<FinaleWinner />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </BrowserRouter>

      <footer>
        <p></p>
      </footer>
    </>
  )
}

export default App;
