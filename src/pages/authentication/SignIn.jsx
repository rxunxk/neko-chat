import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Link,
  Input,
  Checkbox,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { authUser } from "../../api/auth";
import { getCurrentUser } from "../../util/utilFunctions";

const SignIn = () => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alerMsg, setAlerMsg] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      // dispatch(setCurrentUser(currentUser));
      navigate("/Home");
    }
  }, []);

  const passToggle = () => {
    setIsPassVisible(!isPassVisible);
  };

  const handleSignIn = (fData) => {
    setIsLoading(true);
    console.log(fData.SignIn);
    authUser(fData.SignIn)
      .then((res) => {
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        setIsAlertOpen(true);
        setAlerMsg("Log in successful! Redirecting to home page...");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch((err) => {
        if (err?.response?.data) {
          setAlerMsg(err?.response?.data);
          setIsAlertOpen(true);
          setIsLoading(false);
        }
      });
  };

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        className="dark text-foreground bg-background"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Alert</ModalHeader>
              <ModalBody>
                <p>{alerMsg}</p>
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
              isRequired
              //Invalid doesnt seem to work with my code
              // isInvalid={errors?.SignIn?.email ? true : false}
              validationState={errors?.SignIn?.email ? "invalid" : "valid"}
              errorMessage={errors?.SignIn?.email?.message}
              {...register("SignIn.email", {
                required: "Email cannot be empty",
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
              placeholder="Enter your password"
              type={isPassVisible ? "text" : "password"}
              variant="bordered"
              isRequired
              validationState={errors?.SignIn?.password ? "invalid" : "valid"}
              errorMessage={errors?.SignIn?.password?.message}
              {...register("SignIn.password", {
                required: "Password cannot be empty. Please try again",
              })}
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
            <Button
              color="primary"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            >
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
              onPress={() => {
                navigate("/signup");
              }}
            >
              Create a new account
            </Link>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default SignIn;
