import React, { useState, useEffect } from 'react';
import {
  Box, Flex, Button, Input, useColorMode,
  useColorModeValue, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure, Tab, Tabs, TabList, TabPanel, TabPanels, Text,
  FormControl, FormLabel, Menu, MenuButton, MenuList, MenuItem, Avatar
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/logos/PanoramaPlotsLogo.png';
import '../styles/Navbar.css';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface NavbarProps {
  onSearch: (data: any) => void;
  onSearchResults: (results: any[]) => void;
}

interface JwtPayload {
  unique_name: string;
  // Add other properties as needed based on your token structure
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onSearchResults }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchText, setSearchText] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.800', 'gray.700');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode<JwtPayload>(token);
      setUsername(decodedToken.unique_name);
    }
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5074/movies/search/${searchText}/1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch movies');
      }

      const data = await response.json();
      onSearch(searchText);
      onSearchResults(data.data);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5074/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Username: loginUsername, Password: loginPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid credentials');
      }

      const data = await response.json();
      Cookies.set('token', data.Token, { expires: 1 / 24 }); // Expires in 1 hour
      setIsLoggedIn(true);
      setUsername(loginUsername);
      onClose();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5074/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Username: registerUsername, Password: registerPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      Cookies.set('token', data.Token, { expires: 1 });
      setIsLoggedIn(true);
      setUsername(registerUsername);
      onClose();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    setUsername('');
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setError(null); // Clear error on tab change
  };

  return (
    <Box bg={bg} px={4} py={2} boxShadow="md">
      <Flex alignItems="center" justifyContent="space-between">
        <RouterLink to="/">
          <Box className="navbar-logo">
            <img src={logo} alt="Logo" />
          </Box>
        </RouterLink>
        <Flex alignItems="center" className="navbar-search">
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
        <Flex alignItems="center" className="navbar-buttons">
          {isLoggedIn ? (
            <Menu>
              <MenuButton as={Button} rightIcon={<Avatar size="sm" />}>
                {username}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button onClick={onOpen} colorScheme="blue" mr={4}>
              Login
            </Button>
          )}
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error && <Text color="red.500" mb={4}>{error}</Text>}
            <Tabs isFitted variant="enclosed" index={activeTab} onChange={handleTabChange}>
              <TabList mb="1em">
                <Tab>Login</Tab>
                <Tab>Register</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <FormControl id="login-username" mb={4}>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
                  </FormControl>
                  <FormControl id="login-password" mb={4}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                  </FormControl>
                </TabPanel>
                <TabPanel>
                  <FormControl id="register-username" mb={4}>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
                  </FormControl>
                  <FormControl id="register-password" mb={4}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                  </FormControl>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            {activeTab === 0 ? (
              <>
                <Button colorScheme="blue" mr={3} onClick={handleLogin}>
                  Login
                </Button>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
              </>
            ) : (
              <>
                <Button colorScheme="teal" mr={3} onClick={handleRegister}>
                  Register
                </Button>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Navbar;