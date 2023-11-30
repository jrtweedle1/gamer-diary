import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard"
import Diary from "./Components/Diary"


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SignUp/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/diary/:diaryId" element={<Diary />} />
        </Routes>
      </Router>
  );
}

export default App;
