import React from 'react';
import { Box, Input, Button } from '@chakra-ui/react';
import '../styles/Navbar.css';

interface NavbarProps {
  onSearch: (searchText: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = React.useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <Box>
      <Input
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </Box>
  );
};

export default Navbar;
