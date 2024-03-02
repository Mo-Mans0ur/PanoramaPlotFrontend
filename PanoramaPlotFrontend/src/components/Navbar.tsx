import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/PanoramaPlotsLogo.png";
import { px } from "framer-motion";

const Navbar = () => {
  return (
    <HStack>
      <Image src={logo} width="70px" height="50px" />
      <Text>NavBar</Text>
    </HStack>
  );
};

export default Navbar;
