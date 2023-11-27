import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard"


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SignUp/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </Router>
  );
}

export default App;
