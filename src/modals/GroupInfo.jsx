import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  Chip,
  Avatar,
  Input,
} from "@nextui-org/react";
import { DARK } from "../util/constants";
import PropTypes from "prop-types";
import { getCurrentUser } from "../util/utilFunctions";
import { Search, Check } from "lucide-react";
import { getAllUsers, searchUsers } from "../util/userApi";
import { useSelector, useDispatch } from "react-redux";
import {
  // pushIntoChatList,
  setChatList,
} from "../redux/slices/chatList";
import UserSkeleton from "../skeletons/UsersSkeleton";
import UserBar from "../components/UserBar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  addToGC,
  // getChat,
  getChats,
  removeFromGC,
  renameGC,
} from "../util/chatApi";
import { setCurChat } from "../redux/slices/curChat";

let users;
const GroupInfo = ({ setIsOpen, isOpen }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const currentUser = getCurrentUser();
  const currentChat = useSelector((state) => state.curChat);
  const { register, handleSubmit, getValues } = useForm();
  const [gcName, setGcName] = useState(currentChat.chatName);
  const [isSubmitLoading, setSubmitLoading] = useState(false);
  const [userChips, setUserChips] = useState([]);
  const dispatch = useDispatch();

  const callAllUsers = () => {
    getAllUsers().then((res) => {
      let temp = res.data.filter(
        (user) => !currentChat.users.some((user2) => user2._id === user._id)
      );
      console.log(temp);
      setUsersList(temp);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    callAllUsers();
    // callGetChats(curGc._id);
    setGcName(currentChat.chatName);
    return () => {
      // setUsersList([]);
      // setUserChips([]);
      // setCurGc({});
      // setIsBtnLoading(false);
      // setIsLoading(true);
    };
  }, [currentChat]);

  const searchHandler = () => {
    const fData = getValues();
    if (!fData?.gcInfo?.search?.length) return;
    searchUsers(fData.gcInfo.search).then((res) => {
      if (res.data.length > 0) {
        setUsersList(res.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setUsersList([]);
      }
    });
    setIsLoading(true);
  };

  const renameHandler = () => {
    const fData = getValues();
    if (!fData.gcInfo.name.length) return;

    setSubmitLoading(true);
    renameGC({
      chatId: currentChat._id,
      chatName: fData.gcInfo.name,
    })
      .then((res) => {
        setSubmitLoading(false);
        dispatch(setCurChat(res.data));
        getChats().then((res) => {
          dispatch(setChatList(res.data));
        });
      })
      .catch((err) => console.log(err.message));
  };

  // eslint-disable-next-line no-unused-vars
  const onSubmit = (fData) => {
    if (userChips.length) {
      setIsBtnLoading(true);
      const newUsers = userChips.map((user) => user._id);
      addToGC({ chatId: currentChat._id, users: newUsers })
        .then((res) => {
          dispatch(setCurChat(res.data));
          setIsBtnLoading(false);
          setUserChips([]);
          // setIsOpen();
        })
        .catch((err) => console.log(err.message));
    }
  };

  const removeUser = (user) => {
    removeFromGC({
      chatId: currentChat._id,
      userId: user._id,
    })
      .then((res) => {
        dispatch(setCurChat(res.data));
      })
      .catch((err) => console.log(err.message));
  };

  if (isLoading) {
    users = <UserSkeleton />;
  } else {
    if (usersList.length === 0) {
      users = <h1>No User Found!</h1>;
    } else {
      users = usersList.map((user, i) => {
        return (
          <UserBar
            user={user}
            key={i}
            closeModel={setIsOpen}
            noOnClick={true}
            setUserChips={setUserChips}
            userChips={userChips}
          />
        );
      });
    }
  }

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className={`${DARK} w-[600px] max-w-full shrink-0 m-0 min-h-[400px]`}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Group Details
              </ModalHeader>
              <ModalBody className="flex flex-col gap-2">
                <Divider />
                <div className="self-start font-semibold">Members</div>
                <div className="flex max-w-full gap-2 overflow-auto h-[40px]">
                  {currentChat?.users.map((user, i) => (
                    <Chip
                      key={i}
                      variant="solid"
                      color="secondary"
                      avatar={<Avatar src={user.pic} />}
                      className=""
                      onClose={
                        currentChat.groupAdmin._id === currentUser._id
                          ? () => {
                              removeUser(user);
                            }
                          : false
                      }
                    >
                      {user.name}
                    </Chip>
                  ))}
                </div>
                <div className="flex flex-row gap-2">
                  <Input
                    isClearable
                    type="text"
                    variant="flat"
                    label="Group Name"
                    value={gcName}
                    onClear={() => {
                      setGcName("");
                    }}
                    {...register("gcInfo.name", {
                      onChange: (e) => setGcName(e.target.value),
                    })}
                  />
                  <Button
                    color="primary"
                    isIconOnly
                    className="self-center min-h-full"
                    isLoading={isSubmitLoading}
                    onPress={renameHandler}
                  >
                    <Check />
                  </Button>
                </div>
                {currentChat.groupAdmin._id === currentUser._id ? (
                  <>
                    <div className="flex flex-row gap-2">
                      <Input
                        isClearable
                        type="text"
                        variant="flat"
                        label="Members"
                        placeholder="Enter user name"
                        className=""
                        {...register("gcInfo.search", {})}
                        onClear={() => {
                          setIsLoading(true);
                          callAllUsers();
                        }}
                      />
                      <Button
                        color="primary"
                        isIconOnly
                        className="self-center min-h-full"
                        isLoading={isSubmitLoading}
                        onPress={searchHandler}
                      >
                        <Search />
                      </Button>
                    </div>
                    <div className="flex flex-col gap-2 max-h-[25vh] overflow-auto">
                      {users}
                    </div>
                    <div className="flex gap-2 max-w-full overflow-auto">
                      {userChips?.map((user, i) => {
                        return (
                          <Chip
                            key={i}
                            onClose={() => {
                              const array = userChips.filter(
                                (uc) => uc.name !== user.name
                              );
                              setUserChips(array);
                            }}
                            variant="solid"
                            color="success"
                            avatar={<Avatar name="JW" src={user.pic} />}
                          >
                            {user.name}
                          </Chip>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={handleSubmit(onSubmit)}
                  isLoading={isBtnLoading}
                >
                  Add to group
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupInfo;

GroupInfo.propTypes = {
  isOpen: PropTypes.any,
  setIsOpen: PropTypes.any,
};
