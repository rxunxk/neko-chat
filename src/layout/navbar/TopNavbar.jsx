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
import ProfileModal from "../../modals/ProfileModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TopNavBar = () => {
  const navigate = useNavigate();
  const [isProfileModelOpen, setIsProfileModelOpen] = useState(false);

  return (
    <>
      <ProfileModal
        isOpen={isProfileModelOpen}
        setIsOpen={setIsProfileModelOpen}
        user={{
          name: "Raunak Pandey",
          pic: "https://res.cloudinary.com/dhqzb4ngs/image/upload/v1695116226/icon-cute_fikhap.png",
          email: "raunak@mail.com",
        }}
      />
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
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem
                key="team_settings"
                onClick={() => {
                  setIsProfileModelOpen(true);
                }}
              >
                Profile
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => {
                  localStorage.removeItem("currentUser");
                  navigate("/");
                }}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default TopNavBar;
