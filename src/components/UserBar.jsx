import PropTypes from "prop-types";
import { User } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { setCurChat } from "../redux/slices/curChat";
import { openChat } from "../util/chatApi";

const UserBar = ({ user, closeModel }) => {
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chatList);

  const callOpenChat = (data) => {
    openChat(data).then((res) => console.log(res.data));
  };

  return (
    <>
      <div
        className="cursor-pointer hover:bg-[#19191c] p-2 rounded-[8px]"
        onClick={() => {
          console.log(user.name);
          if (chatList.some((chat) => chat.users[1].name === user.name)) {
            dispatch(setCurChat(user));
          } else {
            callOpenChat({ userId: user._id });
            dispatch(setCurChat(user));
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
