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
import { getCurrentUser } from "../../util/utilFunctions";

const TopNavBar = () => {
  const navigate = useNavigate();
  const [isProfileModelOpen, setIsProfileModelOpen] = useState(false);
  const user = getCurrentUser();

  return (
    <>
      <ProfileModal
        isOpen={isProfileModelOpen}
        setIsOpen={setIsProfileModelOpen}
        user={user}
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
                className="transition-transform h-[40px] w-[40px]"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={user.pic}
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
