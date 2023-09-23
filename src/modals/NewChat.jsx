import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { DARK } from "../util/constants";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import UserSkeleton from "../skeletons/UsersSkeleton";
import { useEffect, useState } from "react";
import { getAllUsers, searchUsers } from "../util/userApi";
import UserBar from "../components/UserBar";
import PropTypes from "prop-types";
import { getCurrentUser } from "../util/utilFunctions";

let users;
const NewChat = ({ setIsOpen, isOpen }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const currentUser = getCurrentUser();

  const {
    register,
    handleSubmit,
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
      setIsLoading(true);
    };
  }, []);

  const onSubmit = (fData) => {
    searchUsers(fData.searchUser).then((res) => {
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

  if (isLoading) {
    users = <UserSkeleton />;
  } else {
    if (usersList.length === 0) {
      users = <h1>No User Found!</h1>;
    } else {
      users = usersList.map((user, i) => {
        return <UserBar user={user} key={i} closeModel={setIsOpen} />;
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
                New Chat
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-row gap-2 items-center">
                  <Input
                    isClearable
                    type="text"
                    variant="flat"
                    label="search"
                    placeholder="username"
                    className="flex-1"
                    errorMessage={errors?.searchUser?.message}
                    validationState={errors?.searchUser ? "invalid" : "valid"}
                    onClear={() => {
                      setIsLoading(true);
                      callAllUsers();
                    }}
                    {...register("searchUser", {
                      required: "user name cannot be empty",
                    })}
                  />
                  <Button
                    className="self-stretch"
                    isIconOnly
                    onClick={handleSubmit(onSubmit)}
                  >
                    <Search />
                  </Button>
                </div>
                <div className="flex flex-col gap-2 max-h-[40vh] overflow-auto">
                  {users}
                </div>
              </ModalBody>
              <ModalFooter>
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

export default NewChat;

NewChat.propTypes = {
  setIsOpen: PropTypes.any,
  isOpen: PropTypes.any,
};
