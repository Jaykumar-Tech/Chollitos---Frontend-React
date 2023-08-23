import {
  Box,
  Flex,
  Button,
  Spacer,
  HStack,
  VStack,
  useDisclosure,
  Icon,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  HamburgerIcon,
  CloseIcon,
  EmailIcon,
  BellIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { FaUser, FaPlus } from "react-icons/fa";
import "./index.css";
import Logo from "../Components/Logo";
import SearchBar from './SearchBar';

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const appMode = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });
  const themeColor = "#007ea6"

  const handleSignInOpenModal = () => {
    setIsSignInOpen(true);
  };

  const handleSignInCloseModal = () => {
    setIsSignInOpen(false);
  };

  // const handleSignUpOpenModal = () => {
  //   setIsSignUpOpen(true);
  // };

  const handleSignUpCloseModal = () => {
    setIsSignUpOpen(false);
  };

  const toSignUp = () => {
    setIsSignInOpen(false);
    setIsSignUpOpen(true);
  }

  const toSignIn = () => {
    setIsSignUpOpen(false);
    setIsSignInOpen(true);
  }

  return (
    <div id="navFix">
      <Box
        bg={themeColor}
        px={2.5}
        width={["100%"]}
      >
        <Flex
          h={'54px'}
          maxW={'1200px'}
          m={'auto'}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Logo />

          {appMode === 'lg' ? (
            <Button
              className="btnRes"
              border={`solid white 2px`}
              bg={themeColor}
              fontWeight={'normal'}
              color={'white'}
              _hover={{
                color: themeColor,
                bg: 'white',
              }}
            >
              {'Menu'}
            </Button>
          ) : (
            <Button
              className="btnRes"
              // border={`solid white 2px`}
              bg={themeColor}
              color={'white'}
              _hover={{
                color: themeColor,
                bg: 'white',
              }}
              ml={'10px'}
              onClick={isOpen ? onClose : onOpen}
            >
              {isOpen ? <CloseIcon /> : <HamburgerIcon />}
            </Button>
          )}

          < Spacer />

          <SearchBar />

          <Button
            className="btnRes"
            border={`solid white 2px`}
            bg={themeColor}
            fontWeight={'normal'}
            color={'white'}
            _hover={{
              color: themeColor,
              bg: 'white',
            }}
            ml={'10px'}
          >
            {appMode === 'lg' ? (
              'Share Deal'
            ) : (
              <Icon as={FaPlus} boxSize={3} />
            )}
          </Button>

          <HStack m={'0 10px'}>
            <EmailIcon
              boxSize={6}
              color={'white'}
              ml={'10px'}
            />
            <BellIcon
              boxSize={6}
              color={'white'}
              ml={'10px'}
            />
          </HStack>

          <VStack
            color={'white'}
            fontSize={'0.8em'}
            lineHeight={0.8}
          >
            <span>200</span>
            <span>Points</span>
          </VStack>

          <Button
            className="btnRes"
            border={`solid white 2px`}
            bg={'#f7aa00'}
            color={'white'}
            fontWeight={'normal'}
            _hover={{
              color: themeColor,
              bg: 'white',
            }}
            ml={'10px'}
            onClick={handleSignInOpenModal}
          >
            {appMode === 'lg' ? (
              'Sign In'
            ) : (
              <Icon as={FaUser} boxSize={3} />
            )}
          </Button>

        </Flex>
      </Box>
      <Modal isOpen={isSignInOpen} onClose={handleSignInCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign in</ModalHeader>
          <ModalCloseButton />
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <Button
                // onClick={onClick}
                bg="blue.500"
                color="white"
                _hover={{ bg: 'blue.600' }}
                _active={{ bg: 'blue.700' }}
              >
                <FaFacebookF />
                <Text ml={3}>Continue with Facebook</Text>
              </Button>
              <Button
                // onClick={onClick}
                bg="red.500"
                color="white"
                _hover={{ bg: 'red.600' }}
                _active={{ bg: 'red.700' }}
              >
                <FaGoogle />
                <Text ml={3}>Continue with Google</Text>
              </Button>
              <Spacer height={4} />
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"blue.400"}>Forgot password?</Text>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Don't have an account? <Text color={'blue.400'} onClick={toSignUp}>Signup</Text>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </ModalContent>
      </Modal>
      <Modal isOpen={isSignUpOpen} onClose={handleSignUpCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign up</ModalHeader>
          <ModalCloseButton />
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <Button
                // onClick={onClick}
                bg="blue.500"
                color="white"
                _hover={{ bg: 'blue.600' }}
                _active={{ bg: 'blue.700' }}
              >
                <FaFacebookF />
                <Text ml={3}>Continue with Facebook</Text>
              </Button>
              <Button
                // onClick={onClick}
                bg="red.500"
                color="white"
                _hover={{ bg: 'red.600' }}
                _active={{ bg: 'red.700' }}
              >
                <FaGoogle />
                <Text ml={3}>Continue with Google</Text>
              </Button>
              <Spacer height={4} />
              <Box>
                <FormControl id="name" isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already have an account? <Text color={'blue.400'} onClick={toSignIn}>Signin</Text>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </ModalContent>
      </Modal>
    </div>
  );
}
