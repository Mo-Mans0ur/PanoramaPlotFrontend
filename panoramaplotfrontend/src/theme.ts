import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { GlobalStyleProps } from '@chakra-ui/theme-tools';

const styles = {
  global: (props: GlobalStyleProps) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
      color: props.colorMode === 'dark' ? 'white' : 'black',
    },
  }),
};

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles,
  fonts: {
    heading: 'Arial, sans-serif',
    body: 'Arial, sans-serif',
  },
  colors: {
    brand: {
      50: '#f5f5f5',
      100: '#e0e0e0',
      200: '#b3b3b3',
      300: '#999999',
      400: '#666666',
      500: '#4d4d4d',
      600: '#333333',
      700: '#262626',
      800: '#1a1a1a',
      900: '#0d0d0d',
    },
  },
  components: {
    Text: {
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        movieTitle: (props: GlobalStyleProps) => ({
          fontSize: 'lg',
          color: props.colorMode === 'dark' ? 'white' : 'black',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
        }),
      },
    },
  },
});

export default theme;
