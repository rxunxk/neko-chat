import PropTypes from "prop-types";
import { User } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { setCurChat } from "../redux/slices/curChat";
import { openChat } from "../util/chatApi";
import { pushIntoChatList } from "../redux/slices/chatList";

const UserBar = ({ user, closeModel }) => {
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chatList);

  return (
    <>
      <div
        className="cursor-pointer hover:bg-[#19191c] p-2 rounded-[8px]"
        onClick={() => {
          if (chatList.some((chat) => chat.users[1].name === user.name)) {
            //for existing chat
            openChat({ userId: user._id }).then((res) => {
              dispatch(setCurChat(res.data));
            });
          } else {
            openChat({ userId: user._id }).then((res) => {
              //for new chat
              dispatch(pushIntoChatList(res.data));
              dispatch(setCurChat(res.data));
            });
          }
          closeModel(false);
        }}
      >
        <User
          name={user?.name}
          // description="Product Designer"
          avatarProps={{
            src: `${user?.pic}`,
            className: "h-[50px] w-[50px]",
          }}
        />
      </div>
    </>
  );
};

export default UserBar;

UserBar.propTypes = {
  user: PropTypes.object,
  closeModel: PropTypes.any,
};
