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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
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
      setIsLoading(true);
    } else {
      console.log("password invalid");
    }
  };
  console.log(watch(SignUp.confirmPassword));
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
            errorMessage={errors?.SignUp?.name?.message}
            validationState={errors?.SignUp?.name ? "invalid" : "valid"}
            {...register("SignUp.name", {
              required: "Name cannot be empty. Please try again",
            })}
          />
          <Input
            autoFocus
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
            isRequired
            errorMessage={errors?.SignUp?.email?.message}
            validationState={errors?.SignUp?.email ? "invalid" : "valid"}
            {...register("SignUp.email", {
              required: "Email cannot be empty. Please try again",
              pattern: {
                value:
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                message: "Please enter a valid email address",
              },
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
            errorMessage={errors?.SignUp?.password?.message}
            validationState={errors?.SignUp?.password ? "invalid" : "valid"}
            {...register("SignUp.password", {
              required: "Password cannot be empty. Please try again",
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain an Alphabet, a number & a digt. please try again.",
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
            label="Confirm Password"
            placeholder="Confirm password"
            type={isConfirmPassVisible ? "text" : "password"}
            isRequired
            variant="bordered"
            errorMessage={errors?.SignUp?.confirmPassword?.message}
            validationState={
              errors?.SignUp?.confirmPassword ? "invalid" : "valid"
            }
            {...register("SignUp.confirmPassword", {
              required: "Confirm password field cannot be empty.",
              validate: (val) => {
                if (watch("SignUp.password") !== val) {
                  return "Passwords do not match. Please try again";
                }
              },
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
