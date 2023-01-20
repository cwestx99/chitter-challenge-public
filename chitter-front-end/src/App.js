import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Login from "./components/forms/Login.jsx";
import Register from "./components/forms/Register.jsx";
import Header from "./components/Header.jsx";
import Homepage from "./components/Homepage.jsx";

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    const currentUser = sessionStorage.getItem("user");
    if (currentUser) {
      const converted = JSON.parse(currentUser)
      setUser(converted)
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <Header user={user} setUser={setUser} loggedIn={loggedIn} />
      <div className="container bg-light border 2-50 w-50">
        <Routes>
          <Route path="/" element={<Homepage user={user} loggedIn={loggedIn} setUser={setUser} />} />
        </Routes>
      </div>
      <div className="container bg-light border 2-50 w-75">
        <Routes>
          <Route path="/login" element={<Login user={user} setUser={setUser} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </div >
  );
}

export default App;
