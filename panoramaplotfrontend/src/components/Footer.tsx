import React from 'react';
import { Box, Text, Link, useColorModeValue, Image } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import '../styles/Footer.css'; // Ensure to include this CSS file

const Footer: React.FC = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const color = useColorModeValue('gray.700', 'gray.200');

  return (
    <Box as="footer" bg={bgColor} color={color} py={4} className="footer-container">
      <Box className="footer-content">
        <Text mb={2}>
          &copy; {new Date().getFullYear()} PanoramaPlot. All rights reserved.
        </Text>
        <Text mb={2}>
          Made with ❤️ by
          <Link href="https://github.com/Mo-Mans0ur" ml={1} color="teal.500" isExternal>
            <FaGithub style={{ display: 'inline', marginRight: '4px' }} /> Mo 
          </Link>
          {' and '}
          <Link href="https://github.com/Nicolas-Mousten" ml={1} color="teal.500" isExternal>
            <FaGithub style={{ display: 'inline', marginRight: '4px' }} /> Nicolas
          </Link>
        </Text>
      </Box>
      <Box className="footer-image-container">
      <Link href="https://www.instagram.com/little.actual/" isExternal>
          <Image src={require('../assets/brands/no-bg-Actual_waving.jpg')} alt="Character" className="footer-image" />
        </Link>     
      </Box>
    </Box>
  );
};

export default Footer;



