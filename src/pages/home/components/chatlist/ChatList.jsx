import ChatBar from "../chatbar/ChatBar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Card,
  useDisclosure,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import NewChat from "../../../../modals/NewChat";
import { useEffect } from "react";
import { getChats } from "../../../../util/chatApi";
import { useDispatch, useSelector } from "react-redux";
import { setChatList } from "../../../../redux/slices/chatList";

const ChatList = () => {
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chatList);

  console.log(chatList);

  const { isOpen: isNewChatOpen, onOpenChange: setIsNewChatOpen } =
    useDisclosure();

  const callChatsApi = () => {
    getChats().then((res) => {
      dispatch(setChatList(res.data));
      console.log(res.data);
    });
  };

  useEffect(() => {
    callChatsApi();
  }, []);

  return (
    <>
      <NewChat isOpen={isNewChatOpen} setIsOpen={setIsNewChatOpen} />
      <div className="bg-[#18181b] flex gap-2 h-[93vh] w-full ">
        <div className="bg-[#333] h-[full] shrink-0 max-w-full w-[400px] max-[700px]:w-full overflow-auto ">
          <Card className="p-2 px-4 rounded-[8px] flex flex-row justify-between items-center">
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
                <DropdownItem key="copy">New Group Chat</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Card>

          {chatList?.map((chat, i) => {
            return <ChatBar key={i} chat={chat} />;
          })}
        </div>
        <div className="bg-[#333] h-full w-full max-[700px]:hidden">
          Mini Chat Component
        </div>
      </div>
    </>
  );
};

export default ChatList;
