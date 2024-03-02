import { HStack, Image,  } from "@chakra-ui/react";
import logo from "../assets/PanoramaPlotsLogo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

const Navbar = () => {
  return (
    <HStack padding='10px'>
      <Image src={logo} width="70px" height="50px" />
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
