import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/authentication/SignIn";
import Chat from "../pages/chat/Chat";
import SignUp from "../pages/authentication/SignUp";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default Navigation;
