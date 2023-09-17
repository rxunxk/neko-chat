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
import { useForm } from "react-hook-form";

const SignUp = () => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState();
  const [isPassValid, setIsPassValid] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formStat: { errors },
  } = useForm();

  const navigate = useNavigate();

  const passToggle = () => {
    setIsPassVisible(!isPassVisible);
  };
  const confirmPassToggle = () => {
    setIsConfirmPassVisible(!isConfirmPassVisible);
  };

  const handleSignUp = (fData) => {
    if (fData.SignUp.password === fData.SignUp.confirmPassword) {
      setIsPassValid(true);
      setIsLoading(true);
    } else {
      setIsPassValid(false);
    }
  };
  return (
    <div className=" bg-blue-200 w-screen h-screen flex justify-center items-center">
      <Card className="w-[600px] max-w-[600px] max-h-[90vh]">
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
            isRequired
            {...register("SignUp.name", {
              required: true,
            })}
          />
          <Input
            autoFocus
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
            isRequired
            {...register("SignUp.email", {
              required: true,
            })}
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
            isRequired
            placeholder="Enter your password"
            type={isPassVisible ? "text" : "password"}
            variant="bordered"
            validationState={isPassValid ? "valid" : "invalid"}
            errorMessage={
              isPassValid ? "" : "Passwords do not match. Please try again."
            }
            {...register("SignUp.password", {
              required: true,
              validate: (val) => {
                if (watch(SignUp.password) != val) {
                  return "Passwords do not match";
                }
              },
            })}
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
            isRequired
            variant="bordered"
            validationState={isPassValid ? "valid" : "invalid"}
            errorMessage={
              isPassValid ? "" : "Passwords do not match. Please try again."
            }
            {...register("SignUp.confirmPassword", {
              required: true,
            })}
          />
          <Input
            autoFocus
            label="Profile Picture"
            placeholder="Upload a picture"
            variant="bordered"
            type="file"
            accept="image/png, image/jpeg"
            {...register("SignUp.pic", {
              onChange: (e) => {
                setPreview(URL.createObjectURL(e.target.files[0]));
              },
            })}
          />

          <img
            src={preview}
            className=" border border-[#333] mt-4 rounded-[10px]"
          />

          <Button
            color="primary"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
            className="shrink-0"
          >
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
            onPress={() => {
              navigate("/");
            }}
          >
            Login to your account
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUp;
