import ChatBar from "../chatbar/ChatBar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import NewChat from "../../../../modals/NewChat";
import { useEffect, useState } from "react";
import { getChats } from "../../../../util/chatApi";
import { useDispatch, useSelector } from "react-redux";
import { setChatList } from "../../../../redux/slices/chatList";
import NewGroupChat from "../../../../modals/NewGroupChat";
import MiniChatCompenent from "./MiniChatCompenent";

const ChatList = () => {
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chatList);
  const [hideChat, setHideChat] = useState(true);

  const { isOpen: isNewChatOpen, onOpenChange: setIsNewChatOpen } =
    useDisclosure();
  const { isOpen: isNewGroupChatOpen, onOpenChange: setIsNewGroupChatOpen } =
    useDisclosure();

  const callChatsApi = () => {
    getChats().then((res) => {
      dispatch(setChatList(res.data));
    });
  };

  useEffect(() => {
    if (window.innerWidth < 700) {
      setHideChat(true);
    }
    callChatsApi();
  }, []);

  return (
    <>
      <NewChat isOpen={isNewChatOpen} setIsOpen={setIsNewChatOpen} />
      <NewGroupChat
        isOpen={isNewGroupChatOpen}
        setIsOpen={setIsNewGroupChatOpen}
      />

      <div className="bg-[#18181b] flex gap-2 h-[93vh] w-full">
        <div
          // className={`bg-[#333] h-full shrink-0 w-[370px] overflow-y-scroll max-[700px]:w-full max-[700px]:${
          //   hideChat ? "" : "hidden"
          // }`}
          className={`bg-[#333] h-full shrink-0 w-[370px] overflow-y-scroll max-[700px]:w-full ${
            hideChat ? "" : "hide"
          }`}
        >
          <div className="p-2 px-4 bg-[#151515] flex flex-row justify-between items-center">
            <p className="font-bold text-[1.2rem]">My Chats</p>
            <Dropdown className="dark text-foreground bg-[#18181b]">
              <DropdownTrigger>
                <Button isIconOnly variant="bordered">
                  <Plus />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="new"
                  onClick={() => {
                    setIsNewChatOpen();
                  }}
                >
                  New Chat
                </DropdownItem>
                <DropdownItem
                  key="copy"
                  onClick={() => {
                    setIsNewGroupChatOpen();
                  }}
                >
                  New Group Chat
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {chatList?.map((chat, i) => {
            return <ChatBar key={i} chat={chat} setHideChat={setHideChat} />;
          })}
        </div>
        <MiniChatCompenent hideChat={hideChat} setHideChat={setHideChat} />
      </div>
    </>
  );
};

export default ChatList;
