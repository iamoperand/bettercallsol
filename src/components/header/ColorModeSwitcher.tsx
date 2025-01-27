import {
  IconButton,
  IconButtonProps,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const label = `Switch to ${useColorModeValue("dark", "light")} mode`;
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Tooltip label={label}>
      <IconButton
        size="md"
        fontSize="lg"
        variant="ghost"
        ml="2"
        onClick={toggleColorMode}
        // maintain the colorMode for the element itself since the title bar is always in dark mode
        color="white"
        _hover={{ bg: "whiteAlpha.200" }}
        icon={<SwitchIcon />}
        aria-label={label}
        {...props}
      />
    </Tooltip>
  );
};
