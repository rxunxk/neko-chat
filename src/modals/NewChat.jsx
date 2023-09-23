/* eslint-disable react/prop-types */
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
// import { getCurrentUser } from "../util/utilFunctions";

let users;
const NewChat = ({ setIsOpen, isOpen }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsersList(res.data);
      setIsLoading(false);
    });

    return () => {
      setUsersList([]);
      setIsLoading(true);
    };
  }, []);

  const onSubmit = (fData) => {
    console.log(fData.searchUser);
    searchUsers(fData.searchUser).then((res) => {
      if (res.data.length > 0) {
        setUsersList(res.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setUsersList([]);
      }
      console.log(res.data);
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
        return <UserBar user={user} key={i} />;
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
                    type="text"
                    variant="flat"
                    label="search"
                    placeholder="username"
                    className="flex-1"
                    errorMessage={errors?.searchUser?.message}
                    validationState={errors?.searchUser ? "invalid" : "valid"}
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
                {users}
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
