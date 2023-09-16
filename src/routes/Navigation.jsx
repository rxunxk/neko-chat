import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/authentication/SignIn";
import Chat from "../pages/chat/Chat";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default Navigation;
