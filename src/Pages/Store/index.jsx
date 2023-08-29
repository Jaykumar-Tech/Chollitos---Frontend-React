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
import { getStoreByNameService } from "../../Services/Store";
import { getTimeDiff } from "../../Helpers";
import { getDealByFilter } from "../../Services/Deal";
import { useParams } from 'react-router-dom';

const Store = () => {
  const { store_name } = useParams();
  const [store, setStore] = useState(null);
  const [deals, setDeals] = useState(null)
  const currentDate = new Date();
  const month = currentDate.toLocaleString('en-US', { month: 'long' });
  const appMode = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });

  const getStoreByName = async () => {
    const store = await getStoreByNameService(store_name);
    setStore(store);
    console.log(store)
    await getDeals(store.id);
  }

  const getDeals = async (id) => {
    const tDeals = await getDealByFilter({
      type: "all",
      store_id: id,
      start_at: 0,
      length: 100
    })
    // console.log(tDeals)
    setDeals(tDeals)
  }

  useEffect(() => {
    getStoreByName();
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
          discount codes: {store?.cnt_discount ?? 0}
        </Button>
        <Button
          as={'a'}
          to="#deals"
          bg='white'
          _hover={{ bg: 'blue.500' }}
          size='sm'
          m={'20px 10px 10px'}
        >
          deals: {store?.cnt_deal ?? 0}
        </Button>
      </Box>
      <Box id="discount_codes" m={'50px 0 10px'}>
        <Text fontSize={'1.2em'} fontWeight={600} m={'20px 0'}>
          {store?.name + ' discount codes (' + (store?.cnt_discount ?? 0) + ')'}
        </Text>
        <Box>
          {
            deals ?
              deals.filter(v => (v.type !== "deal")).map(discount => {
                return (
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
                        color={(discount.expires && new Date(discount.expires) < new Date()) ? "gray.400": "green.500"}
                      >
                        {Math.floor(discount.price_new)}%
                      </Text>
                      <Text fontWeight={600} color={'gray.400'} letterSpacing={'-1px'}>DISCOUNT</Text>
                    </VStack>
                    <VStack p={'10px'} flex={1}>
                      {
                        (discount.expires && new Date(discount.expires) < new Date()) ?
                          <Text fontSize={'0.8em'} color={'gray.400'}>DISCOUNT EXPIRED</Text> : null
                      }
                      <Text fontWeight={600}>Get {Math.floor(discount.price_new)}% off orders at {store?.name}</Text>
                      <Text fontSize={'0.8em'} color={'gray.400'}>{discount.count_of_used} USED</Text>
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
                  </Flex>)
              }) : null
          }
        </Box>
      </Box>
      <Box id="deals" m={'50px 0 10px'}>
        <Text fontSize={'1.2em'} fontWeight={600} m={'20px 0'}>
          {store?.name + ' deals (' + (store?.cnt_deal ?? 0) + ')'}
        </Text>
        <Box>
          {
            deals ?
              deals.filter(v => (v.type === "deal")).map(deal => {
                return (<Flex
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
                      {Math.floor(deal.price_new)}%
                    </Text>
                    <Text fontWeight={600} color={'gray.400'} letterSpacing={'-1px'}>SALE</Text>
                  </VStack>
                  <VStack p={'10px'} flex={1} justifyContent={'center'}>
                    <Text fontWeight={600}>Extra {Math.floor(deal.price_new)}% off on all products at {store?.name}</Text>
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
                </Flex>)
              }) : null
          }

        </Box>
      </Box>
    </Box>
  )
}

export default Store;
