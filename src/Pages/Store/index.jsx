import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react"
import { ChevronRightIcon } from "@chakra-ui/icons";
import { MdHome } from "react-icons/md";
import { useState, useEffect } from "react";
import { getStoreByIdService } from "../../Services/Store";
import { getTimeDiff } from "../../Helpers";

const Store = () => {
  const [store, setStore] = useState(null);
  const currentDate = new Date();
  const month = currentDate.toLocaleString('en-US', { month: 'long' });
  const appMode = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });

  const getStoreById = async (id) => {
    const store = await getStoreByIdService(id);
    setStore(store);
  }

  useEffect(() => {
    getStoreById(3);
  }, []);

  return (
    <Box maxW={'960px'} m={'auto'} p={2}>
      <Breadcrumb
        separator=">"
        p={5}
        fontSize={'0.9em'}>
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link} to="/"
            color={'blue.500'}
          >
            <Icon as={MdHome} boxSize={6} mt={1} />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            to={"/shops/"}
          >
            shop
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>
            {store?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex>
        <Flex
          bg={'white'}
          w={'100px'}
          h={'100px'}
          p={2}
          justifyContent={'center'}
          borderRadius={3}
          shadow={"1px 1px 3px rgba(0,0,0,0.3)"}
        >
          <Image
            src={store?.image}
            alt="image"
            m={'auto'}
            width={"auto"}
          />
        </Flex>
        <Box ml={5} flex={1}>
          <Heading fontSize={'1.5em'}>{store?.name} discount code</Heading>
          <Text>View the newest {store?.name} discount codes in {month} {currentDate.getFullYear()}</Text>
          <Box fontSize={'sm'}>
            <Text fontSize={'sm'} color={'gray.500'}> Last updated: {getTimeDiff(store?.updated_at)} ago</Text>
            <Link href={`https://${store?.url}`} color={'blue.500'} isExternal>{store?.url}</Link>
          </Box>
        </Box>
      </Flex>
      <Box>
        <Button
          as={'a'}
          to="#discount_codes"
          bg='white'
          _hover={{ bg: 'blue.500' }}
          size='sm'
          m={'20px 0 10px'}
        >
          discount codes: {store?.codes_count ?? 0}
        </Button>
        <Button
          as={'a'}
          to="#deals"
          bg='white'
          _hover={{ bg: 'blue.500' }}
          size='sm'
          m={'20px 10px 10px'}
        >
          deals: {store?.deals_count ?? 0}
        </Button>
      </Box>
      <Box id="discount_codes" m={'50px 0 10px'}>
        <Text fontSize={'1.2em'} fontWeight={600} m={'20px 0'}>
          {store?.name + ' discount codes (' + (store?.codes_count ?? 0) + ')'}
        </Text>
        <Box>
          <Flex
            bg={'white'}
            p={2}
            mb={'10px'}
            borderRadius={3}
            shadow={"1px 1px 3px rgba(0,0,0,0.3)"}
          >
            <VStack p={'10px 20px'} justifyContent={'center'}>
              <Text
                fontSize={'1.5em'}
                fontWeight={600}
                color={'green.500'}
              >
                40%
              </Text>
              <Text fontWeight={600} color={'gray.400'} letterSpacing={'-1px'}>DISCOUNT</Text>
            </VStack>
            <VStack p={'10px'} flex={1}>
              <Text fontSize={'0.8em'} color={'gray.400'}>DISCOUNT</Text>
              <Text fontWeight={600}>Get 40% off orders at {store?.name}</Text>
              <Text fontSize={'0.8em'} color={'gray.400'}>82 USED</Text>
            </VStack>
            {/* <Spacer /> */}
            <VStack p={'10px'} justifyContent={'center'}>
              {appMode === 'lg' ?
                <Button colorScheme="blue" p={'0 100px'}>
                  Show code
                </Button>
                :
                <Button colorScheme="blue" borderRadius={'50%'} w={'40px'} h={'40px'}>
                  <ChevronRightIcon boxSize={6} />
                </Button>}
            </VStack>
          </Flex>
          <Flex
            bg={'white'}
            p={2}
            mb={'10px'}
            borderRadius={3}
            shadow={"1px 1px 3px rgba(0,0,0,0.3)"}
          >
            <VStack p={'10px 20px'} justifyContent={'center'}>
              <Text
                fontSize={'1.5em'}
                fontWeight={600}
              >
                40%
              </Text>
              <Text fontWeight={600} color={'gray.400'} letterSpacing={'-1px'}>DISCOUNT</Text>
            </VStack>
            <VStack p={'10px'} flex={1}>
              <Text fontSize={'0.8em'} color={'gray.400'}>DISCOUNT EXPIRED</Text>
              <Text fontWeight={600}>Get 40% off orders at {store?.name}</Text>
              <Text fontSize={'0.8em'} color={'gray.400'}>82 USED</Text>
            </VStack>
            {/* <Spacer /> */}
            <VStack p={'10px'} justifyContent={'center'}>
              {appMode === 'lg' ?
                <Button colorScheme="blue" p={'0 100px'}>
                  Show code
                </Button>
                :
                <Button colorScheme="blue" borderRadius={'50%'} w={'40px'} h={'40px'}>
                  <ChevronRightIcon boxSize={6} />
                </Button>}
            </VStack>
          </Flex>
        </Box>
      </Box>
      <Box id="deals" m={'50px 0 10px'}>
        <Text fontSize={'1.2em'} fontWeight={600} m={'20px 0'}>
          {store?.name + ' deals (' + (store?.deals_count ?? 0) + ')'}
        </Text>
        <Box>
          <Flex
            bg={'white'}
            p={2}
            mb={'10px'}
            borderRadius={3}
            shadow={"1px 1px 3px rgba(0,0,0,0.3)"}
          >
            <VStack p={'10px 20px'} justifyContent={'center'}>
              <Text
                fontSize={'1.5em'}
                fontWeight={600}
                color={'blue.500'}
              >
                20%
              </Text>
              <Text fontWeight={600} color={'gray.400'} letterSpacing={'-1px'}>SALE</Text>
            </VStack>
            <VStack p={'10px'} flex={1} justifyContent={'center'}>
              <Text fontWeight={600}>Extra 20% off on all products at {store?.name}</Text>
            </VStack>
            <VStack p={'10px'} justifyContent={'center'}>
              {appMode === 'lg' ?
                <Button colorScheme="blue" p={'0 100px'}>
                  Go to Sale
                </Button>
                :
                <Button colorScheme="blue" borderRadius={'50%'} w={'40px'} h={'40px'}>
                  <ChevronRightIcon boxSize={6} />
                </Button>}
            </VStack>
          </Flex>
          <Flex
            bg={'white'}
            p={2}
            mb={'10px'}
            borderRadius={3}
            shadow={"1px 1px 3px rgba(0,0,0,0.3)"}
          >
            <VStack p={'10px 20px'} justifyContent={'center'}>
              <Text
                fontSize={'1.5em'}
                fontWeight={600}
                color={'blue.500'}
              >
                20%
              </Text>
              <Text fontWeight={600} color={'gray.400'} letterSpacing={'-1px'}>SALE</Text>
            </VStack>
            <VStack p={'10px'} flex={1} justifyContent={'center'}>
              <Text fontWeight={600}>Extra 20% off on all products at {store?.name}</Text>
            </VStack>
            {/* <Spacer /> */}
            <VStack p={'10px'} justifyContent={'center'}>
              {appMode === 'lg' ?
                <Button colorScheme="blue" p={'0 100px'}>
                  Go to Sale
                </Button>
                :
                <Button colorScheme="blue" borderRadius={'50%'} w={'40px'} h={'40px'}>
                  <ChevronRightIcon boxSize={6} />
                </Button>}
            </VStack>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default Store;
