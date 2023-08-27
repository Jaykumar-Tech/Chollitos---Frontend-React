import React, { useEffect, useState } from "react";
import MyBreadcrumb from "../../Layouts/BreadCrumb";
import {
  Box,
  Flex,
  Link,
  Button,
  Image,
  Text,
  Badge,
  useBreakpointValue,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa";
import { ExternalLinkIcon, TimeIcon } from "@chakra-ui/icons";
import PopularCategories from "../../Components/PopularCategories";
import PopularShops from "../../Components/PopularShops";
import { getCategoriesService, } from "../../Services/Category";
import { getStoresService, } from "../../Services/Store";
import { getDealByIdService, } from "../../Services/Deal";
import { getTimeDiff } from "../../Helpers";

const Deal = () => {
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [deal, setDeal] = useState([]);

  const appMode = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });
  const themeColor = '#007ea6';

  const getCategories = async () => {
    const data = await getCategoriesService();
    setCategories(data);
  };

  const getStores = async () => {
    const data = await getStoresService();
    setStores(data);
  };

  const getDealById = async (dealId) => {
    const data = await getDealByIdService(dealId);
    console.log(JSON.stringify(data));
    setDeal(data);
  };

  useEffect(() => {
    getCategories();
    getStores();
    getDealById(16);
  }, []);

  return (
    <Box maxW={'1200px'} m={'auto'}>
      <MyBreadcrumb />
      <Box
        id="Home"
        maxW={'960px'}
        m={'auto'}
      >
        <Box
          bg={'white'}
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          p={6}
          mb={'10px'}
        >
          <Flex>
            <Box flex='0.4'>
              <Image
                src={deal.image_url}
                alt="image"
                m={'auto'}
                height={"170px"}
                width={"auto"}
              />
            </Box>
            <Box flex='0.6' >
              <Box
                color={themeColor}
                _hover={{ color: 'gray.800' }}
                fontSize={'0.8em'}
                p={1}
              >
                <Link href="#" title="Projectors" to="#">
                  Projectors Voucher code
                </Link>
              </Box>
              <Box maxW="full" h="4em" overflow="hidden" p={1}>
                <Text
                  lineHeight="1.2"
                  css={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: 600,
                    fontSize: "1.5em",
                  }}
                >
                  {deal.title}
                </Text>
              </Box>
              <Flex>
                <Badge
                  flex={0.2}
                  colorScheme="blue"
                  color={themeColor}
                >
                  <span>
                    {deal.price_new}€
                    {deal.price_low && <strike style={{ fontSize: '0.8em' }} >{deal.price_low}€</strike>}
                  </span>
                </Badge>
                <Spacer />
                <Button
                  as={'a'}
                  href="#"
                  target="_blank"
                  rel="nofollow noopener"
                  color={themeColor}
                  bg={'blue.50'}
                  _hover={{
                    color: 'white',
                    bg: themeColor
                  }}
                  display="flex"
                  alignItems="center"
                  m={'5px 0'}
                  w={"50%"}
                  flex={0.6}
                >
                  <ExternalLinkIcon mr={1} />
                  <span>
                    {deal.price_new}€
                    {deal.price_low && <strike style={{ fontSize: '0.8em' }} >{deal.price_low}€</strike>}
                  </span>
                </Button>
              </Flex>
              <Flex alignItems="center" width={'100%'}>
                <Flex alignItems="center">
                  <Box _hover={{ color: themeColor }}>
                    <Link href="#" title="Like" to="#">
                      <FaThumbsUp />
                    </Link>
                  </Box>
                  <Spacer mx={'5px'} />
                  <Box _hover={{ color: themeColor }}>
                    <Link href="#" title="Dislike" to="#">
                      <FaThumbsDown />
                    </Link>
                  </Box>
                  <Spacer mx={'5px'} />
                  <span>{deal.cnt_like}</span>
                </Flex>
                <Spacer />
                <Flex alignItems={'center'}>
                  <Box _hover={{ color: themeColor }}>
                    <Link href="#" title="Comments" to="#">
                      <FaComment />
                    </Link>
                  </Box>
                  <Spacer mx={'5px'} />
                  <span>{deal.cnt_comment}</span>
                </Flex>
              </Flex>
            </Box>
          </Flex>
          <Divider m={'20px 0'} />
          <Flex color={"gray.400"} fontSize={'0.8em'}>
            <Flex alignItems="center">
              <Image
                src={deal.avatar}
                alt="Avatar"
                width="16px"
                height="16px"
                borderRadius="full"
                mr={2}
              />
              <Text>{deal.username}</Text>
            </Flex>
            <Spacer />
            <Flex alignItems={'center'}>
              <TimeIcon />
              <Text ml={1}>{getTimeDiff(deal.start_date)}</Text>
            </Flex>
          </Flex>
        </Box>
        <PopularShops stores={stores} />
        <PopularCategories categories={categories} />
      </Box>
    </Box>
  );
};

export default Deal;
