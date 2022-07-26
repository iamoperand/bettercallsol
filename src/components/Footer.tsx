import {
  Box,
  Center,
  Flex,
  Grid,
  Icon,
  Link,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";

export const Footer: React.FC = () => (
  <Grid
    p="3"
    templateColumns="repeat(3,1fr)"
    backgroundColor={useColorModeValue("gray.100", "gray.900")}
  >
    <Flex>
      <Text fontSize="xs">© {new Date().getFullYear()}</Text>
      <Link ml="2" mt="-1.5" href="https://labeleven.dev" isExternal>
        <LabElevenIcon />
      </Link>
    </Flex>
    <Box>
      <Center>
        {/* TODO update to repo url */}
        <Link mr="4" href="https://github.com/labeleven-dev" isExternal>
          <Icon as={FaGithub} />
        </Link>
        <Link href="https://twitter.com/labeleven_dev" isExternal>
          <Icon as={FaTwitter} />
        </Link>
      </Center>
    </Box>
    <Flex>
      <Spacer />
      <Text fontSize="xs">v{process.env.REACT_APP_VERSION || "???"}</Text>
    </Flex>
  </Grid>
);

const LabElevenIcon: React.FC = () => {
  const fillColour = useColorModeValue("black", "white");

  return (
    <Icon w="12" viewBox="0 0 288.25 100.63">
      <g id="b" transform="translate(-139.86,-233.14)">
        <g id="d">
          <g id="g30">
            <path
              fill={fillColour}
              d="m 273.5,271.25 h -23.09 c -0.55,0 -1,-0.45 -1,-1 v -36.09 c 0,-0.55 -0.45,-1 -1,-1 h -5.79 c -0.55,0 -1,0.45 -1,1 v 43.2 c 0,0.55 0.45,1 1,1 h 30.88 c 0.55,0 1,-0.45 1,-1 v -5.11 c 0,-0.55 -0.45,-1 -1,-1 z"
              id="path10"
            />
            <path
              fill={fillColour}
              d="m 301.26,274.48 h 0.45 c 0.79,2.69 3.03,3.88 6.4,3.88 h 2.91 c 0.55,0 1,-0.45 1,-1 v -5.12 h -1.36 c -1.33,0 -2.12,-0.74 -2.12,-2.15 v -14.07 c 0,-7.14 -4.56,-11.81 -14.44,-11.81 -9,0 -13.45,4.23 -14.45,9.6 -0.12,0.62 0.36,1.19 0.99,1.19 h 5.72 c 0.42,0 0.82,-0.27 0.94,-0.67 0.75,-2.5 3,-3.77 6.81,-3.77 4.53,0 6.94,1.93 6.94,5.66 v 0.73 c 0,0.55 -0.45,1 -1,1 h -9.2 c -8.04,0 -12.29,3.85 -12.29,10.22 0,6.88 4.98,10.99 12.35,10.99 4.96,0 8.21,-1.64 10.36,-4.67 z m -8.61,-1.56 c -3.77,0 -6.54,-1.61 -6.54,-4.84 0,-2.63 1.7,-4.53 5.72,-4.53 h 9.2 v 1.08 c 0,5.3 -3.17,8.3 -8.38,8.3 z"
              id="path12"
            />
            <path
              fill={fillColour}
              d="m 349.32,261.65 c 0,-10.17 -5.95,-17.44 -14.7,-17.44 -3.91,0 -7.22,1.5 -9.46,4.02 h -0.68 v -14.07 c 0,-0.55 -0.45,-1 -1,-1 h -5.54 c -0.55,0 -1,0.45 -1,1 v 43.2 c 0,0.55 0.45,1 1,1 H 323 c 0.49,0 0.91,-0.36 0.99,-0.85 l 0.44,-2.83 h 0.48 c 2.24,2.83 5.64,4.47 9.63,4.47 8.81,0 14.78,-7.33 14.78,-17.5 z m -25.6,0 c 0,-6.51 3.46,-10.73 9.09,-10.73 5.63,0 9.01,4.19 9.01,10.73 0,6.54 -3.48,10.76 -9.01,10.76 -5.53,0 -9.09,-4.25 -9.09,-10.76 z"
              id="path14"
            />
            <path
              fill={fillColour}
              d="m 273.5,287.79 h -30.88 c -0.55,0 -1,0.45 -1,1 v 43.2 c 0,0.55 0.45,1 1,1 h 30.88 c 0.55,0 1,-0.45 1,-1 v -4.86 c 0,-0.55 -0.45,-1 -1,-1 h -23.09 c -0.55,0 -1,-0.45 -1,-1 V 314.3 c 0,-0.55 0.45,-1 1,-1 h 20.04 c 0.55,0 1,-0.45 1,-1 v -4.88 c 0,-0.55 -0.45,-1 -1,-1 h -20.04 c -0.55,0 -1,-0.45 -1,-1 v -9.78 c 0,-0.55 0.45,-1 1,-1 h 23.09 c 0.55,0 1,-0.45 1,-1 v -4.86 c 0,-0.55 -0.45,-1 -1,-1 z"
              id="path16"
            />
            <rect
              fill={fillColour}
              x="279.42001"
              y="287.79001"
              width="7.5"
              height="45.200001"
              rx="1"
              ry="1"
              id="rect18"
            />
            <path
              fill={fillColour}
              d="m 307.88,298.83 c -9.6,0 -16.65,6.68 -16.65,17.44 0,10.76 7.05,17.5 16.65,17.5 7.44,0 12.9,-3.95 15.3,-9.79 0.27,-0.66 -0.21,-1.39 -0.92,-1.39 h -6.04 c -0.35,0 -0.67,0.2 -0.86,0.5 -1.68,2.76 -4.43,3.95 -7.48,3.95 -4.96,0 -8.41,-3.29 -9.03,-8.86 h 24.73 c 0.54,0 0.98,-0.43 1,-0.97 0,-0.28 0,-0.54 0,-0.79 0,-10.85 -7.02,-17.59 -16.71,-17.59 z m -8.72,13.73 c 1.1,-4.47 4.33,-7.02 8.72,-7.02 4.39,0 7.67,2.55 8.75,7.02 z"
              id="path20"
            />
            <path
              fill={fillColour}
              d="m 351.98,300.3 -8.69,26.02 h -0.71 l -8.64,-26.02 c -0.14,-0.41 -0.52,-0.68 -0.95,-0.68 h -6.76 v 1.47 c 0,0.11 0.02,0.23 0.06,0.33 l 10.92,30.89 c 0.14,0.4 0.52,0.67 0.94,0.67 h 9.55 c 0.42,0 0.8,-0.27 0.94,-0.67 l 10.92,-30.89 c 0.04,-0.11 0.06,-0.22 0.06,-0.33 v -1.47 h -6.7 c -0.43,0 -0.81,0.27 -0.95,0.68 z"
              id="path22"
            />
            <path
              fill={fillColour}
              d="m 377.76,298.83 c -9.6,0 -16.65,6.68 -16.65,17.44 0,10.76 7.05,17.5 16.65,17.5 7.44,0 12.9,-3.95 15.3,-9.79 0.27,-0.66 -0.21,-1.39 -0.93,-1.39 h -6.04 c -0.35,0 -0.67,0.2 -0.85,0.5 -1.68,2.76 -4.43,3.95 -7.48,3.95 -4.96,0 -8.41,-3.29 -9.03,-8.86 h 24.73 c 0.54,0 0.98,-0.43 1,-0.97 0,-0.28 0,-0.54 0,-0.79 0,-10.85 -7.02,-17.59 -16.71,-17.59 z m -8.72,13.73 c 1.1,-4.47 4.33,-7.02 8.72,-7.02 4.39,0 7.67,2.55 8.75,7.02 z"
              id="path24"
            />
            <path
              fill={fillColour}
              d="m 416.37,298.83 c -4.45,0 -7.87,1.53 -9.91,3.96 h -0.51 l -0.42,-2.35 c -0.09,-0.48 -0.5,-0.82 -0.98,-0.82 h -5.05 c -0.55,0 -1,0.45 -1,1 v 31.36 c 0,0.55 0.45,1 1,1 h 5.51 c 0.55,0 1,-0.45 1,-1 v -17.35 c 0,-5.83 2.63,-9.09 7.45,-9.09 4.82,0 7.14,3.14 7.14,9.03 v 17.41 c 0,0.55 0.45,1 1,1 h 5.51 c 0.55,0 1,-0.45 1,-1 v -19.67 c 0,-9.01 -4.11,-13.48 -11.72,-13.48 z"
              id="path26"
            />
            <path
              fill={fillColour}
              d="m 202.43,233.15 h -21.25 c -3.3,0 -5.98,2.68 -5.98,5.98 v 10.59 c 0,10.14 -8.45,16.6 -16.61,16.6 h -12.75 c -3.3,0 -5.98,2.68 -5.98,5.98 v 21.5 c 0,3.25 2.64,5.89 5.89,5.89 h 23.47 c 3.3,0 5.98,2.68 5.98,5.98 v 21.39 c 0,3.3 2.68,5.98 5.98,5.98 h 21.25 c 3.3,0 5.98,-2.68 5.98,-5.98 v -21.32 c 0,-3.3 -2.67,-5.97 -5.96,-5.98 l -23.37,-0.06 c -3.29,0 -5.96,-2.68 -5.97,-5.97 l -0.03,-21.43 c 0,-3.31 2.68,-5.99 5.98,-5.99 h 12.74 c 10.11,0 16.61,-8.44 16.61,-16.6 v -10.59 c 0,-3.3 -2.68,-5.98 -5.98,-5.98 z"
              id="path28"
            />
          </g>
        </g>
      </g>
    </Icon>
  );
};
