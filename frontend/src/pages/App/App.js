import { useStyles } from "./styles";
import SignIn from "../SignInPage/SignIn";
import SignUp from "../SignUpPage/SignUp";
import AuthContext from "../../context/auth-context";
import HistoryPage from "../HistoryPage/HistoryPage";
import HomePage from "../HomePage/HomePage";
import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { useContext } from "react";


const App = () => {
  const ctx = useContext(AuthContext);
  const classes = useStyles();
  return (
    <div className="App">
      <Routes>
        <Route path="/sign-in" element={!ctx.isLoggedIn && <SignIn />} />
        <Route path="/sign-up" element={!ctx.isLoggedIn && <SignUp />} />
        <Route
          path="/"
          
          element={
            ctx.isLoggedIn ?<HomePage/> : <Navigate replace to="/sign-in"/>
          }
        />
        <Route
          path="/history"
          element={
            ctx.isLoggedIn ? (
              <HistoryPage />
            ) : (
              <Navigate replace to="/sign-in" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;