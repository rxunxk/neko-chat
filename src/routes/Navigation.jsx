import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/authentication/SignIn";
import SignUp from "../pages/authentication/SignUp";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Chat from "../pages/home/components/chat/Chat";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default Navigation;
