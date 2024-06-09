// src/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, FormControl, FormLabel, Input, Button, Text, Center, Heading } from '@chakra-ui/react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:5074/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      // Assuming the backend returns a token
      const token = data.token;

      // Save the token to localStorage
      localStorage.setItem('token', token);

      // Redirect to the homepage or any other page
      navigate('/');
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Center height="100vh">
      <Box maxWidth="400px" width="100%" p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <Heading as="h2" size="lg" textAlign="center" mb={6}>Login</Heading>
        {error && <Text color="red.500" mb={4}>{error}</Text>}
        <form onSubmit={handleLogin}>
          <FormControl id="username" mb={4}>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </FormControl>
          <FormControl id="password" mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">Login</Button>
        </form>
      </Box>
    </Center>
  );
};

export default Login;
