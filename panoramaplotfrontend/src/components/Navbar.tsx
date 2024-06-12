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
import {Movie} from '../types';
import { useAuth } from '../components/AuthContext';

  interface JwtPayload {
    unique_name: string;
    // Add other properties as needed based on your token structure
  }
  
  interface NavbarProps {
    onSearch: (searchText: string) => void;
  }
  
  const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue("gray.800", "gray.700");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState(0);
    const { isLoggedIn, login, logout } = useAuth();
    const [username, setUsername] = useState("");
    const [searchText, setSearchText] = useState("");
  
    useEffect(() => {
      const token = Cookies.get("token");
      if (token) {
        const decodedToken = jwtDecode<JwtPayload>(token);
        setUsername(decodedToken.unique_name);
      }
    }, [isLoggedIn]);
  
    const handleLogin = async () => {
      try {
        const response = await fetch("http://localhost:5074/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Username: loginUsername, Password: loginPassword }),
        });
  
        const data = await response.json();
        if (response.ok) {
          login(data.Token);
          setUsername(loginUsername);
          onClose();
        } else {
          throw new Error(data.message || "Invalid credentials");
        }
      } catch (error: any) {
        setError(error.message);
      }
    };
  
    const handleRegister = async () => {
      try {
        const response = await fetch("http://localhost:5074/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Username: registerUsername, Password: registerPassword }),
        });
  
        const data = await response.json();
        if (response.ok) {
          login(data.Token);
          setUsername(registerUsername);
          onClose();
        } else {
          throw new Error(data.message || "Registration failed");
        }
      } catch (error: any) {
        setError(error.message);
      }
    };
  
    const handleTabChange = (index: number) => {
      setActiveTab(index);
      setError(null); // Clear error on tab change
    };
  
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    };
  
    const handleSearchClick = () => {
      onSearch(searchText);
    };
  
    return (
      <Box bg={bg} px={4} py={2} boxShadow="md">
        <Flex alignItems="center" justifyContent="space-between">
          <RouterLink to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <Box className="navbar-logo">
              <img src={logo} alt="Logo" />
            </Box>
            <Text className="navbar-logo-name">PanoramaPlot</Text>
          </RouterLink>
          <Flex alignItems="center" className="navbar-buttons">
            <Input
              placeholder="Search movies..."
              value={searchText}
              onChange={handleSearchInputChange}
              width="300px"
              marginRight="10px"
            />
            <Button onClick={handleSearchClick} colorScheme="blue" mr={4}>
              Search
            </Button>
            {isLoggedIn ? (
              <Menu>
                <MenuButton as={Button} rightIcon={<Avatar size="sm" />}>
                  {username}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button onClick={onOpen} colorScheme="blue" mr={4}>
                Login
              </Button>
            )}
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
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
                      <Input
                        type="text"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                      />
                    </FormControl>
                    <FormControl id="login-password" mb={4}>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </FormControl>
                  </TabPanel>
                  <TabPanel>
                    <FormControl id="register-username" mb={4}>
                      <FormLabel>Username</FormLabel>
                      <Input
                        type="text"
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                      />
                    </FormControl>
                    <FormControl id="register-password" mb={4}>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
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