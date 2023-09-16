import { useEffect, useState } from "react";
import { getChats } from "../../util/chatApi";

const Chat = () => {
  const [chats, setChats] = useState([]);

  console.log(chats);

  const callGetChats = () => {
    getChats()
      .then((res) => {
        setChats(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    callGetChats();
  }, []);

  return (
    <>
      {chats?.map((c, index) => {
        return <div key={index}>{c?.chatName}</div>;
      })}
    </>
  );
};

export default Chat;
