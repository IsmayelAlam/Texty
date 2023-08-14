import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import { useContext } from "react";
import { AuthContext } from "./components/context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={currentUser ? <Homepage /> : <Navigate to="login" />}
          />
          <Route
            path="login"
            element={!currentUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="signup"
            element={!currentUser ? <SignUp /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
