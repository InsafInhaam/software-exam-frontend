import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Popup from "./components/Popup";
import ApprovePost from "./pages/ApprovePost";
import {useSelector } from "react-redux";

// Move user-related state to the Redux store
const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};


const Routing = () => {
  const user = useSelector((state) => state.user);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={user ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        exact
        path="/approvepost"
        element={
          user && user.userType === 1 ? (
            <ApprovePost />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>
  );
};

function App() {
  return (
    // Wrap Routing component with Provider and pass in store
    <>
      <Popup />
      <Router>
        <Routing />
      </Router>
    </>
  );
}

export default App;
