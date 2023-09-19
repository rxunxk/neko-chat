// import { useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  // NavbarItem,
  // Link,
  // Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
const TopNavBar = () => {
  // const navigate = useNavigate();

  return (
    <Navbar isBordered className="h-[7vh] w-full">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <div className="text-[1.5rem] flex gap-2 items-center">
            <img
              src="https://res.cloudinary.com/dhqzb4ngs/image/upload/v1695116226/icon-cute_fikhap.png"
              className="h-[30px] w-[30px]"
            />
            <p className="font-bold text-inherit">Neko Chat</p>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        {/* <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        /> */}
        <Dropdown
          className="dark text-foreground bg-[#18181b]"
          placement="bottom-end"
        >
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">Settings</DropdownItem>
            <DropdownItem key="team_settings">Profile</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default TopNavBar;
