// src/components/Navbar.tsx
import React from 'react';
import { Box, Input, Button, Flex, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import '../styles/Navbar.css';

interface NavbarProps {
  onSearch: (searchText: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = React.useState('');
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.900');
  const color = useColorModeValue('black', 'white');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <Box bg={bg} px={4} py={2} boxShadow="md">
      <Flex alignItems="center" justifyContent="space-between">
        <RouterLink to="/">
          <Text fontSize="xl" fontWeight="bold" color={color}>
            Panorama Plot
          </Text>
        </RouterLink>
        <Flex alignItems="center">
          <Input
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            bg="white"
            color="black"
            width="300px"
            borderRadius="md"
            mr={2}
          />
          <Button colorScheme="teal" onClick={handleSearch}>
            Search
          </Button>
        </Flex>
        <Button onClick={toggleColorMode} ml={4}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
