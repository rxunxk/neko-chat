import TopNavbar from "../../layout/navbar/TopNavbar";
import ChatList from "./components/chatlist/ChatList";

const Home = () => {
  return (
    <div className=" w-screen h-screen">
      <TopNavbar />
      <ChatList />
    </div>
  );
};

export default Home;
