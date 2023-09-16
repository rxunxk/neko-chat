import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Link,
  Input,
  Checkbox,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const SignIn = () => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const navigate = useNavigate();

  const passToggle = () => {
    setIsPassVisible(!isPassVisible);
  };

  const createNewAccHandler = () => {
    navigate("/signup");
  };

  return (
    <div className=" bg-blue-200 w-screen h-screen flex justify-center items-center">
      <Card className="w-[600px] max-w-[600px]">
        <CardHeader className="flex flex-col w-full items-start">
          <p className="font-bold text-[1.3rem]">Log in</p>
          <p className="text-gray-400">
            Enter your email & password to continue
          </p>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-4">
          <Input
            autoFocus
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
          />
          <Input
            endContent={
              isPassVisible ? (
                <Eye
                  className="cursor-pointer hover:text-[#A5A6A7]"
                  onClick={passToggle}
                />
              ) : (
                <EyeOff
                  className="cursor-pointer hover:text-[#A5A6A7]"
                  onClick={passToggle}
                />
              )
            }
            label="Password"
            placeholder="Enter your password"
            type={isPassVisible ? "text" : "password"}
            variant="bordered"
          />
          <div className="flex py-2 px-1 justify-between">
            <Checkbox
              classNames={{
                label: "text-small",
              }}
            >
              Remember me
            </Checkbox>
            <Link color="primary" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button color="primary" onPress="">
            Sign in
          </Button>
          <div className="relative">
            <Divider />
            <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[5px] text-[15px] bg-[#18181b] text-gray-400">
              OR
            </p>
          </div>
          <Link
            color="primary"
            href="#"
            size="sm"
            className="self-center"
            onPress={createNewAccHandler}
          >
            Create a new account
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignIn;
