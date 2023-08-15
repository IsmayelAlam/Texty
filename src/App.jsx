import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./components/context/AuthContext";
import Homepage from "./components/pages/Homepage";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import PageNotFound from "./components/pages/PageNotFound";

function App() {
  const { currentUser } = useContext(AuthContext);
  let location = useLocation();

  let element;
  let path = "/";

  if (currentUser || currentUser === undefined) {
    if (
      (location.pathname === "/login" || location.pathname === "/signup") &&
      currentUser !== undefined
    )
      return <Navigate to="/" />;
    element = <Homepage />;
  } else if (currentUser === null) {
    if (location.pathname === "/login") {
      element = <Login />;
      path = "/login";
    } else if (location.pathname === "/signup") {
      element = <SignUp />;
      path = "/signup";
    } else {
      element = <Navigate to="/login" />;
    }
  }

  return (
    <Routes>
      <Route path={path} element={element} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
