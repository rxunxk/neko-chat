import {
  Card,
  CardHeader,
  Avatar,
  //   Button,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import {
  // useSelector,
  useDispatch,
} from "react-redux";
import { setCurChat } from "../../../../redux/slices/curChat";
import { getCurrentUser } from "../../../../util/utilFunctions";
const ChatBar = ({ chat, setHideChat }) => {
  // const curChat = useSelector((state) => state.curChat);
  const dispatch = useDispatch();

  return (
    <Card className="flex max-w-full m-2 rounded-[8px] cursor-pointer">
      <CardHeader
        className="justify-between"
        onClick={() => {
          setHideChat(false);
          dispatch(setCurChat(chat));
        }}
      >
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={`${
              chat?.chatName === "sender"
                ? chat?.users[0].name === getCurrentUser().name
                  ? chat?.users[1].pic
                  : chat?.users[0].pic
                : "https://res.cloudinary.com/dhqzb4ngs/image/upload/v1695116226/icon-cute_fikhap.png"
            }`}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {chat?.chatName === "sender"
                ? chat?.users[0].name === getCurrentUser().name
                  ? chat?.users[1].name
                  : chat?.users[0].name
                : chat?.chatName}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              User Message
            </h5>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ChatBar;

ChatBar.propTypes = {
  chat: PropTypes.any,
  setHideChat: PropTypes.any,
};
