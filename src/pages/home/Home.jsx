import TopNavbar from "../../layout/navbar/TopNavbar";
import Chat from "./components/chat/Chat";
import ChatList from "./components/chatlist/ChatList";

const Home = () => {
  return (
    <div className=" w-screen h-screen">
      <TopNavbar />
      <ChatList />
      <Chat />
    </div>
  );
};

export default Home;
