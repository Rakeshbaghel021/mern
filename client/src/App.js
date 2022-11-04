import "./App.css";
import Header from ".././src/components/Header";
import Signup from ".././src/components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
