import { HStack, Image, useColorModeValue  } from "@chakra-ui/react";
import logo from "../assets/PanoramaPlotsLogo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";

interface Props {
    onSearch: (search: string) => void;
  }

const Navbar = ({ onSearch }: Props) => {
    const bgColor = useColorModeValue("white.9", "black.9");
    const color = useColorModeValue("black", "white");

  return (
    <HStack bg={bgColor} padding='10px' color={color}>
      <Image src={logo} width="70px" height="50px" />
      <SearchInput onSearch={onSearch}/>
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
