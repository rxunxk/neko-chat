import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from "@nextui-org/react";
import { DARK } from "../util/constants";
import PropTypes from "prop-types";

const GroupInfo = ({ groupChat, setIsOpen, isOpen }) => {
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
              <ModalBody className="flex flex-col gap-2 items-center">
                <Divider />
                {groupChat.users.map((user, i) => (
                  <h1 key={i}>{user.name}</h1>
                ))}
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

export default GroupInfo;

GroupInfo.propTypes = {
  groupChat: PropTypes.any,
  isOpen: PropTypes.any,
  setIsOpen: PropTypes.any,
};
