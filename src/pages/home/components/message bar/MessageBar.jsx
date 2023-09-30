import { Avatar } from "@nextui-org/react";
import PropTypes from "prop-types";
import { getCurrentUser } from "../../../../util/utilFunctions";

let isPrevMsgBySameUser;
let isNextMsgBySameUser;
const MessageBar = ({ message, messageList, msgIndex }) => {
  let isMsgByCurrUser = message.sender.name === getCurrentUser().name;

  if (msgIndex === 0) {
    isPrevMsgBySameUser = false;
  } else {
    isPrevMsgBySameUser =
      messageList[msgIndex - 1].sender.name === message.sender.name;
  }

  if (msgIndex === messageList.length - 1) {
    isNextMsgBySameUser = false;
  } else {
    isNextMsgBySameUser =
      messageList[msgIndex + 1].sender.name === message.sender.name;
  }

  return (
    <>
      {isMsgByCurrUser ? (
        <div className="flex gap-2 justify-end">
          <div
            className={`${isPrevMsgBySameUser ? "mt-[1px]" : "mt-1"} ${
              isNextMsgBySameUser ? "mb-[1px]" : "mb-1"
            } max-w-full flex-shrink rounded-md p-2 bg-green-700`}
          >
            {message.content}
          </div>
          {isPrevMsgBySameUser ? (
            <div className="h-[40px] w-[40px] shrink-0 mt-1" />
          ) : (
            <Avatar
              isBordered
              className="h-[40px] w-[40px] shrink-0 mt-1"
              size="sm"
              src={message.sender.pic}
            />
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          {isPrevMsgBySameUser ? (
            <div className="h-[40px] w-[40px] shrink-0 mt-1" />
          ) : (
            <Avatar
              isBordered
              className="h-[40px] w-[40px] shrink-0 mt-1"
              size="sm"
              src={message.sender.pic}
            />
          )}
          <div
            className={`${isPrevMsgBySameUser ? "mt-[1px]" : "mt-1"} ${
              isNextMsgBySameUser ? "mb-[1px]" : "mb-1"
            } max-w-full flex-shrink rounded-md p-2 bg-purple-700`}
          >
            {message.content}
          </div>
        </div>
      )}
    </>
  );
};

export default MessageBar;

MessageBar.propTypes = {
  message: PropTypes.any,
  messageList: PropTypes.any,
  msgIndex: PropTypes.any,
};
