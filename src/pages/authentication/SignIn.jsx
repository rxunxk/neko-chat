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

const SignIn = () => {
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
            // endContent={
            //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            // }
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
          />
          <Input
            // endContent={
            //   <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            // }
            label="Password"
            placeholder="Enter your password"
            type="password"
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
          <Divider />
          <Link color="primary" href="#" size="sm" className="self-center">
            Create a new account
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignIn;
