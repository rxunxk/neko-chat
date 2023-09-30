import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/authentication/SignIn";
import SignUp from "../pages/authentication/SignUp";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import { PrivateRoute } from "./PrivateRoute";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute Component={SignIn} />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default Navigation;
