import "./App.css";
import NextWeek from "./next-week.jsx"
import PreviousWeeks from "./previous-weeks.jsx";
import Home from "./Home.jsx"
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/next-week">Next Week</NavLink>
          <NavLink to="/previous-weeks">Previous Weeks</NavLink>

        </nav>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/next-week" element={<NextWeek />} />
          <Route path="/previous-weeks" element={<PreviousWeeks />} />
        </Routes>
      </BrowserRouter>

      <footer>
        <p></p>
      </footer>
    </>
  )
}

export default App;
