import React from 'react';
import { useColorMode, Box, IconButton } from '@chakra-ui/react';
import {FaSun, FaMoon} from "react-icons/fa";
export default function ThemeToggler() {
  
  const fixColor = () => {
    toggleColorMode();
   
  }
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box textAlign="right" py={4}>
      <IconButton
        size="lg"
        icon={colorMode === 'light' ? <FaMoon/> : <FaSun/>}
        onClick={fixColor}
        variant="ghost"
      />
    </Box>
  );
}