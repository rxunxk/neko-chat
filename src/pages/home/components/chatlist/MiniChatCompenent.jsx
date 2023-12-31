/* eslint-disable react/prop-types */
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { ArrowLeft, SendHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { MoreHorizontal } from "lucide-react";
import ProfileModal from "../../../../modals/ProfileModal";
import GroupInfo from "../../../../modals/GroupInfo";
import { useEffect, useRef, useState } from "react";
import { getCurrentUser } from "../../../../util/utilFunctions";
import { getAllMessages, sendMessage } from "../../../../util/messageApi";
import MessageBar from "../messageBar/MessageBar";
import io from "socket.io-client";
import { BASE_URL } from "../../../../config/axios";

let socket, selectedChatCompare;

const MiniChatCompenent = ({ hideChat, setHideChat }) => {
  const curChat = useSelector((state) => state.curChat);
  const { isOpen: isProfileModelOpen, onOpenChange: setIsProfileModel } =
    useDisclosure();
  const { isOpen: isGroupInfoModelOpen, onOpenChange: setIsGroupInfoModel } =
    useDisclosure();
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const containerRef = useRef(null);
  const currUser = getCurrentUser();

  const callGetAllMessages = () => {
    if (Object.keys(curChat).length) {
      getAllMessages(curChat?._id)
        .then((res) => {
          setMessageList(res.data);
          socket.emit("join chat", curChat._id);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const setUpSocket = () => {
    socket = io(BASE_URL);
    socket.emit("setup", currUser);
    socket.on("connection", () => {});
    socket.on("message received", (newMsgReceived) => {
      console.log("hi from received use effect");
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMsgReceived.chat._id
      ) {
        //send notification
      } else {
        setMessageList((prevState) => [...prevState, newMsgReceived]);
      }
    });
  };

  useEffect(() => {
    setUpSocket();
  }, []);

  useEffect(() => {
    scrollToBottom();
  });

  useEffect(() => {
    callGetAllMessages();
    selectedChatCompare = curChat;
  }, [curChat]);

  const sendMessageHandler = () => {
    //Empty the message input
    let temp = message;
    setMessage("");

    //Append the message to the messages list

    //Api Call
    sendMessage({
      content: message,
      chatId: curChat._id,
    })
      .then((res) => {
        socket.emit("new message", res.data);
        setMessageList((prevState) => [...prevState, res.data]);
      })
      .catch((err) => {
        setMessage(temp);
        console.log(err.message);
      });
    //Remove the appended message if response failed
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      // Scroll to the bottom of the container
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  return (
    <div
      // className={`bg-[#333] h-full shrink-0 flex-1 max-[700px]:w-full max-[700px]:${
      //   hideChat ? "hidden" : ""
      // }`}
      className={`bg-[#333] h-full shrink-0 flex-1 max-[700px]:w-full ${
        hideChat ? "hide" : ""
      }`}
    >
      {Object.keys(curChat).length ? (
        <div className="flex flex-col h-full">
          {curChat?.isGroupChat ? (
            <GroupInfo
              groupChat={curChat}
              isOpen={isGroupInfoModelOpen}
              setIsOpen={setIsGroupInfoModel}
            />
          ) : (
            <ProfileModal
              user={
                curChat?.users[0].name === getCurrentUser().name
                  ? curChat.users[1]
                  : curChat.users[0]
              }
              isOpen={isProfileModelOpen}
              setIsOpen={setIsProfileModel}
            />
          )}
          <div className="bg-[#1d1c1c] w-full h-[65px] p-2 px-2 flex gap-2 items-center justify-between self-start">
            <div className="flex gap-2 items-center">
              <ArrowLeft
                className="h-[30px] w-[30px] mr-2 hidden max-[700px]:flex cursor-pointer"
                onClick={() => {
                  setHideChat(true);
                }}
              />

              <Avatar
                className="h-[45px] w-[45px]"
                src={
                  curChat?.isGroupChat
                    ? "https://res.cloudinary.com/dhqzb4ngs/image/upload/v1695116226/icon-cute_fikhap.png"
                    : curChat?.users[0].name === getCurrentUser().name
                    ? curChat?.users[1].pic
                    : curChat?.users[0].pic
                }
              />
              <div>
                {!curChat?.isGroupChat
                  ? curChat?.users[0].name === getCurrentUser().name
                    ? curChat?.users[1].name
                    : curChat?.users[0].name
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
          <div className="flex-grow overflow-auto">
            {Object.keys(messageList).length ? (
              <div className="p-2" ref={containerRef}>
                {messageList?.map((message, i) => {
                  return (
                    <MessageBar
                      key={i}
                      message={message}
                      messageList={messageList}
                      msgIndex={i}
                    />
                  );
                })}
              </div>
            ) : (
              <h1>No Chats to display</h1>
            )}
          </div>
          <div className="self-end w-full flex gap-2 p-2">
            <Input
              onKeyDown={(e) => {
                if (e.key === "Enter" && message) {
                  sendMessageHandler();
                }
              }}
              radius="full"
              placeholder="Enter message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <Button
              isIconOnly
              onPress={() => {
                if (message !== "") {
                  sendMessageHandler();
                }
              }}
            >
              <SendHorizontal />
            </Button>
          </div>
        </div>
      ) : (
        "Click on of the chats on the left to open a chat"
      )}
    </div>
  );
};

export default MiniChatCompenent;
