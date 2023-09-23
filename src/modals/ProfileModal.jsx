/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { DARK } from "../util/constants";

const ProfileModal = ({ user, setIsOpen, isOpen }) => {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen} className={`${DARK}`}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                User Details
              </ModalHeader>
              <ModalBody className="flex flex-col gap-2 items-center">
                <div className="font-bold text-[1.5rem]">{user?.name}</div>
                <div>
                  <img src={user?.pic} className="max-w-full w-full" />
                </div>
                <div className=" text-[1.5rem]">Email: {user?.email}</div>
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

export default ProfileModal;
