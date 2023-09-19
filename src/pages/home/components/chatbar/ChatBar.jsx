import {
  Card,
  CardHeader,
  Avatar,
  //   Button,
} from "@nextui-org/react";

const ChatBar = () => {
  return (
    <Card className="flex max-w-full m-2 rounded-[8px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="/avatars/avatar-1.png"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              User Name
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
