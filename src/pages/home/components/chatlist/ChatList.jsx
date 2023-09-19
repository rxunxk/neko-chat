import ChatBar from "../chatbar/ChatBar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Card,
} from "@nextui-org/react";
import { Plus } from "lucide-react";

const ChatList = () => {
  return (
    <div className="bg-[#18181b] flex gap-2 h-[93vh] w-full ">
      <div className="bg-[#333] h-[full] min-w-[390px] w-[400px] max-[700px]:w-full overflow-auto ">
        <Card className="p-2 px-4 rounded-[8px] flex flex-row justify-between items-center">
          <p className="font-bold text-[1.2rem]">My Chats</p>
          <Dropdown className="dark text-foreground bg-[#18181b]">
            <DropdownTrigger>
              <Button isIconOnly variant="bordered">
                <Plus />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">New Chat</DropdownItem>
              <DropdownItem key="copy">New Group Chat</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Card>

        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
      </div>
      <div className="bg-[#333] h-full w-full max-[700px]:hidden">
        Mini Chat Component
      </div>
    </div>
  );
};

export default ChatList;
