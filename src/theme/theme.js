import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196F3',
    accent: '#FF4081',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#000000',
    disabled: '#a0a0a0',
  },
  fonts: {
    ...DefaultTheme.fonts,
    light: {
      fontFamily: 'Roboto-Light',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
    },
    regular: {
      fontFamily: 'Roboto-Regular',
    },
  },
};

export default theme;