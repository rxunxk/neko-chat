import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Chip,
  Avatar,
} from "@nextui-org/react";
import { getCurrentUser } from "../util/utilFunctions";
import { DARK } from "../util/constants";
import PropTypes from "prop-types";
import { Search } from "lucide-react";
import { getAllUsers, searchUsers } from "../util/userApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserSkeleton from "../skeletons/UsersSkeleton";
import UserBar from "../components/UserBar";
import { createGC } from "../util/chatApi";
import {
  // useSelector,
  useDispatch,
} from "react-redux";
import { pushIntoChatList } from "../redux/slices/chatList";

let users;
const NewGroupChat = ({ setIsOpen, isOpen }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const currentUser = getCurrentUser();
  const [userChips, setUserChips] = useState([]);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const dispatch = useDispatch();
  // const chatList = useSelector((state) => state.chatList);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const callAllUsers = () => {
    getAllUsers().then((res) => {
      let temp = res.data.filter((user) => user.name !== currentUser.name);
      setUsersList(temp);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    callAllUsers();
    return () => {
      setUsersList([]);
      setUserChips([]);
      setIsBtnLoading(false);
      setIsLoading(true);
    };
  }, []);

  const searchHandler = () => {
    const fData = getValues();
    if (!fData?.NewGC?.searchUser?.length) return;
    searchUsers(fData.NewGC.searchUser).then((res) => {
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

  const onSubmit = (fData) => {
    if (userChips.length) {
      setIsBtnLoading(true);
      const newUsers = JSON.stringify(userChips);
      createGC({ name: fData?.NewGC?.groupName, users: newUsers })
        .then((res) => {
          dispatch(pushIntoChatList(res.data));
          setIsBtnLoading(false);
          setIsOpen();
        })
        .catch((err) => console.log(err.message));
    }
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
            isGC={true}
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
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className={`${DARK} w-[600px] max-w-full shrink-0 m-0 min-h-[400px]`}
      >
        <ModalContent className="flex ">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Group Chat
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2 ">
                  <Input
                    isClearable
                    type="text"
                    variant="flat"
                    label="Group Name"
                    placeholder="Enter Group name"
                    className=""
                    errorMessage={errors?.NewGC?.groupName?.message}
                    validationState={
                      errors?.NewGC?.groupName ? "invalid" : "valid"
                    }
                    {...register("NewGC.groupName", {
                      required: "Group Name cannot be empty!",
                    })}
                  />
                  <Input
                    isClearable
                    type="text"
                    variant="flat"
                    label="Members"
                    placeholder="Enter user name"
                    className=""
                    onClear={() => {
                      setIsLoading(true);
                      callAllUsers();
                    }}
                    {...register("NewGC.searchUser", {
                      required: false,
                    })}
                  />
                  <Button
                    color="primary"
                    isIconOnly
                    className="self-end"
                    onPress={searchHandler}
                  >
                    <Search />
                  </Button>
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
                          color="secondary"
                          avatar={<Avatar name="JW" src={user.pic} />}
                        >
                          {user.name}
                        </Chip>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-2 max-h-[25vh] overflow-auto">
                  {users}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={handleSubmit(onSubmit)}
                  isLoading={isBtnLoading}
                >
                  Create
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

export default NewGroupChat;
NewGroupChat.propTypes = {
  setIsOpen: PropTypes.any,
  isOpen: PropTypes.any,
};
