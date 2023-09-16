import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Link,
  Input,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const SignUp = () => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);
  const navigate = useNavigate();

  console.log(isPassVisible, isConfirmPassVisible);

  const passToggle = () => {
    setIsPassVisible(!isPassVisible);
  };
  const confirmPassToggle = () => {
    setIsConfirmPassVisible(!isConfirmPassVisible);
  };

  const logInHandler = () => {
    navigate("/");
  };
  return (
    <div className=" bg-blue-200 w-screen h-screen flex justify-center items-center">
      <Card className="w-[600px] max-w-[600px]">
        <CardHeader className="flex flex-col w-full items-start">
          <p className="font-bold text-[1.3rem]">Create an account</p>
          <p className="text-gray-400">
            Enter your details below to create your account
          </p>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-4">
          <Input
            autoFocus
            label="Name"
            placeholder="Enter your Name"
            variant="bordered"
          />
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
          <Input
            endContent={
              isConfirmPassVisible ? (
                <Eye
                  className="cursor-pointer hover:text-[#A5A6A7]"
                  onClick={confirmPassToggle}
                />
              ) : (
                <EyeOff
                  className="cursor-pointer hover:text-[#A5A6A7]"
                  onClick={confirmPassToggle}
                />
              )
            }
            label="Password"
            placeholder="Confirm password"
            type={isConfirmPassVisible ? "text" : "password"}
            variant="bordered"
          />

          <Button color="primary" onPress="">
            Sign Up
          </Button>
          <div className="relative">
            <Divider />
            <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[5px] text-[15px] bg-[#18181b] text-gray-400">
              OR
            </p>
          </div>
          <Link
            color="primary"
            size="sm"
            className="self-center cursor-pointer"
            onPress={logInHandler}
          >
            Login to your account
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUp;
