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

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios"


export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rEmail, setrEmail] = useState("");
  const [rPassword, setrPassword] = useState("");
  const [rUsername, setrUsername] = useState("");

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

  const handleSignIn = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/api/user/login",
      {
        email: email,
        password: password
      })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/api/user/register",
      {
        email: rEmail,
        password: rPassword,
        username: rUsername
      })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleSignInGoogle = (isLogin) => {
    const firebaseConfig = {
      apiKey: "AIzaSyC2fD6TDBdbhZYg5097RAkMYs-7fJIPf_g",
      authDomain: "chollo-es-396117.firebaseapp.com",
      projectId: "chollo-es-396117",
      storageBucket: "chollo-es-396117.appspot.com",
      messagingSenderId: "416034001184",
      appId: "1:416034001184:web:73027a3783bf8fd7e60745",
      measurementId: "G-B9XRQE5YX9"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.setCustomParameters({
      'login_hint': 'gemma@gmail.com'
    });

    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(result);
        // The signed-in user info.
        const user = result.user;
        if (isLogin) {

          result.user.getIdToken(true).then(function (idToken) {
            axios.post("http://localhost:4000/api/user/google", {
              idToken: idToken,
              email: user.email
            })
              .then(response => {
                console.log(response);
                  console.log("login success")
              })
              .catch(err => {
                console.log(err)
              })
          }).catch(function (err) {
            console.log(err);
          })
        } else {
          setrEmail(user.email);
          setrUsername(user.displayName);
        }
    

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

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
                onClick={() => handleSignInGoogle(true)}
                bg="red.500"
                color="white"
                _hover={{ bg: 'red.600' }}
                _active={{ bg: 'red.700' }}
              >
                <FaGoogle />
                <Text ml={3}>Continue with Google</Text>
              </Button>
              <Spacer height={4} />
              <form onSubmit={handleSignIn}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
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
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
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
                onClick={() => handleSignInGoogle(false)}
                bg="red.500"
                color="white"
                _hover={{ bg: 'red.600' }}
                _active={{ bg: 'red.700' }}
              >
                <FaGoogle />
                <Text ml={3}>Continue with Google</Text>
              </Button>
              <Spacer height={4} />
              <form onSubmit={handleSignUp}>
                <Box>
                  <FormControl id="name" isRequired>
                    <FormLabel>User Name</FormLabel>
                    <Input type="text"
                      value={rUsername}
                      onChange={e => setrUsername(e.target.value)} />
                  </FormControl>
                </Box>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email"
                    value={rEmail}
                    onChange={e => setrEmail(e.target.value)} />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'}
                      value={rPassword}
                      onChange={e => setrPassword(e.target.value)} />
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
                    type="submit"
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
              </form>
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
