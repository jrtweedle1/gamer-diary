import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SignUp/>} />
          <Route path="/dashboard" />
        </Routes>
      </Router>
  );
}

export default App;
