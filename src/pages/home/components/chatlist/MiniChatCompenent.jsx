import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { MoreHorizontal } from "lucide-react";
import ProfileModal from "../../../../modals/ProfileModal";
import GroupInfo from "../../../../modals/GroupInfo";

const MiniChatCompenent = () => {
  const curChat = useSelector((state) => state.curChat);
  const { isOpen: isProfileModelOpen, onOpenChange: setIsProfileModel } =
    useDisclosure();
  const { isOpen: isGroupInfoModelOpen, onOpenChange: setIsGroupInfoModel } =
    useDisclosure();

  return (
    <>
      {Object.keys(curChat).length ? (
        <div className="bg-[#333] h-full w-full max-[700px]:hidden">
          {curChat?.isGroupChat ? (
            <GroupInfo
              groupChat={curChat}
              isOpen={isGroupInfoModelOpen}
              setIsOpen={setIsGroupInfoModel}
            />
          ) : (
            <ProfileModal
              user={curChat?.users[1]}
              isOpen={isProfileModelOpen}
              setIsOpen={setIsProfileModel}
            />
          )}
          <div className="bg-[#1d1c1c] w-full h-[65px] p-2 px-2 flex gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <Avatar
                className="h-[45px] w-[45px]"
                src={
                  curChat?.isGroupChat
                    ? "https://res.cloudinary.com/dhqzb4ngs/image/upload/v1695116226/icon-cute_fikhap.png"
                    : curChat.users[1].pic
                }
              />
              <div>
                {!curChat?.isGroupChat
                  ? curChat.users[1].name
                  : curChat.chatName}
              </div>
            </div>
            <Dropdown className="dark text-foreground bg-[#18181b]">
              <DropdownTrigger>
                <Button isIconOnly>
                  <MoreHorizontal />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions">
                {!curChat.isGroupChat ? (
                  <DropdownItem
                    onPress={() => {
                      setIsProfileModel();
                    }}
                  >
                    Profile
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    onPress={() => {
                      setIsGroupInfoModel();
                    }}
                  >
                    Info
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      ) : (
        "Click on of the chats on the left to open a chat"
      )}
    </>
  );
};

export default MiniChatCompenent;
