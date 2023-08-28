import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import MyBreadcrumb from "../../Layouts/BreadCrumb";
import { getStoreByIdService } from "../../Services/Store";

const Store = () => {
  const [store, setStore] = useState(null);
  const currentDate = new Date();
  const month = currentDate.toLocaleString('en-US', { month: 'long' });

  const getStoreById = async (id) => {
    const store = await getStoreByIdService(id);
    setStore(store);
  }

  useEffect(() => {
    getStoreById(3);
  }, []);

  return (
    <Box maxW={'960px'} m={'auto'} p={2}>
      <MyBreadcrumb />
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
            src={store.image}
            alt="image"
            m={'auto'}
            width={"auto"}
          />
        </Flex>
        <Box>
          <Heading>{store.name} discount code</Heading>
          <Text>View the newest Costco discount codes in {month} {currentDate.getFullYear()}</Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default Store;
