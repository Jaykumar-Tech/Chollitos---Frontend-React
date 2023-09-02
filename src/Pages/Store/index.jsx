import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  VStack,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { ChevronRightIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { MdHome } from "react-icons/md";
import { useState, useEffect } from "react";
import { getStoreByNameService } from "../../Services/Store";
import { getTimeDiff } from "../../Helpers";
import { getDealByFilter } from "../../Services/Deal";
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { _t } from "../../Utils/_t";

const Store = () => {
  const { t, i18n } = useTranslation()
  const { store_name } = useParams();
  const [store, setStore] = useState(null);
  const [deals, setDeals] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const currentDate = new Date();
  const month = currentDate.toLocaleString('en-US', { month: 'long' });
  const appMode = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });

  const getStoreByName = async () => {
    const store = await getStoreByNameService(store_name);
    setStore(store);
    await getDeals(store.id);
  }

  const getDeals = async (id) => {
    const tDeals = await getDealByFilter({
      type: "all",
      store_id: id,
      start_at: 0,
      length: 100
    })
    setDeals(tDeals)
  }

  const handleClick = (discount) => {
    setSelectedDiscount(discount);
    setIsOpen(true);
  }

  useEffect(() => {
    i18n.changeLanguage("es")
    const fetchData = async () => {
      await getStoreByName();
    };

    fetchData();
  }, [store_name]);

  return (
    <Box maxW={'960px'} m={'auto'} p={2}>
      <Helmet>
        <title>{t(_t("Chollitos"))} - {store_name} {t(_t("discount codes"))}</title>
      </Helmet>
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
            {t(_t("shop"))}
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
          <Heading fontSize={'1.5em'}>{store?.name} {t(_t("discount code"))}</Heading>
          <Text>{t(_t("View the newest"))} {store?.name} {t(_t("discount codes in"))} {month} {currentDate.getFullYear()}</Text>
          <Box fontSize={'sm'}>
            <Text fontSize={'sm'} color={'gray.500'}> Last updated: {getTimeDiff(store?.updated_at)} {t(_t("ago"))}</Text>
            <a href={`https://${store?.url}`} target={"_blank"} rel={"noopener noreferrer"} style={{ color: 'blue' }}>
              {store?.url}
            </a>
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
          {t(_t("discount codes"))}: {store?.cnt_discount ?? 0}
        </Button>
        <Button
          as={'a'}
          to="#deals"
          bg='white'
          _hover={{ bg: 'blue.500' }}
          size='sm'
          m={'20px 10px 10px'}
        >
          {t(_t("deals"))}: {store?.cnt_deal ?? 0}
        </Button>
      </Box>
      <Box id="discount_codes" m={'50px 0 10px'}>
        <Text fontSize={'1.2em'} fontWeight={600} m={'20px 0'}>
          {store?.name + ' ' + t(_t("discount codes")) + ' (' + (store?.cnt_discount ?? 0) + ')'}
        </Text>
        <Box>
          {deals &&
            deals.filter(v => (v.type !== "deal")).map((discount) => {
              return (
                <Flex
                  key={discount.id}
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
                      color={(discount.expires && new Date(discount.expires) < currentDate) ? "gray.400" : "green.500"}
                    >
                      {Math.floor(discount.price_new)}%
                    </Text>
                    <Text fontWeight={600} color={'gray.400'} letterSpacing={'-1px'}>
                      {t(_t("DISCOUNT"))}
                    </Text>
                  </VStack>
                  <VStack p={'10px'} flex={1}>
                    {
                      (discount.expires && new Date(discount.expires) < new Date()) ?
                        <Text fontSize={'0.8em'} color={'gray.400'}>{t(_t("DISCOUNT EXPIRED"))}</Text> : null
                    }
                    <Text fontWeight={600}>{t(_t("Get"))} {Math.floor(discount.price_new)}% {t(_t("off orders at"))} {store?.name}</Text>
                    <Text fontSize={'0.8em'} color={'gray.400'}>{discount.count_of_used} {t(_t("USED"))}</Text>
                  </VStack>
                  {/* <Spacer /> */}
                  <VStack p={'10px'} justifyContent={'center'}>
                    {appMode === 'lg' ? (
                      <Button
                        colorScheme="blue"
                        p={'0 100px'}
                        onClick={() => handleClick(discount)}
                      >
                        {t(_t("Show code"))}
                      </Button>
                    ) : (
                      <Button
                        colorScheme="blue"
                        borderRadius={'50%'}
                        w={'40px'}
                        h={'40px'}
                        onClick={() => handleClick(discount)}
                      >
                        <ChevronRightIcon boxSize={6} />
                      </Button>
                    )}
                  </VStack>
                </Flex>
              )
            })
          }
        </Box>
        <Modal isOpen={isOpen} onClose={() => { setIsOpen(false) }}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedDiscount?.storename} {t(_t("discount code"))}</ModalHeader>
            <ModalCloseButton />
            <ModalBody textAlign={'center'}>
              {(selectedDiscount?.type === 'free') ? (
                <Text fontWeight={600} p={5}>
                  Free {selectedDiscount?.storename} {t(_t("discount code"))}
                </Text>
              ) : (
                <Text fontWeight={600} p={5}>
                  {t(_t("Save"))} {selectedDiscount?.price_new}% {t(_t("on your next order"))}
                </Text>
              )}
              <Text p={2}>{t(_t("Don't forget to apply the code at checkout"))}</Text>
              <Box alignItems={'center'} justifyContent={'center'}>
                <Text
                  p={'6px 20px'}
                  color={'blue.500'}
                  border={'dashed 2px'}
                  borderColor={'blue.500'}
                  borderBottom={0}
                >
                  {selectedDiscount?.code}
                </Text>
                <Button
                  as={'a'}
                  href={selectedDiscount?.deal_url}
                  target="_blank"
                  rel="nofollow noopener"
                  w={'100%'}
                  colorScheme="blue"
                  alignItems="center"
                  borderRadius={1}
                >
                  <ExternalLinkIcon mr={1} />
                  {t(_t("Get code"))}
                </Button>
              </Box>
            </ModalBody>
            <ModalFooter />
          </ModalContent>
        </Modal>
      </Box>
      <Box id="deals" m={'50px 0 10px'}>
        <Text fontSize={'1.2em'} fontWeight={600} m={'20px 0'}>
          {store?.name + ' ' + t(_t("deals")) + ' (' + (store?.cnt_deal ?? 0) + ')'}
        </Text>
        <Box>
          {
            deals ?
              deals.filter(v => (v.type === "deal")).map((deal, index) => {
                return (<Flex
                  key={index}
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
                    <Text fontWeight={600} color={'gray.400'} letterSpacing={'-1px'}>{t(_t("SALE"))}</Text>
                  </VStack>
                  <VStack p={'10px'} flex={1} justifyContent={'center'}>
                    <Text fontWeight={600}>{t(_t("Extra"))} {Math.floor(deal.price_new)}% {t(_t("off on all products at"))} {store?.name}</Text>
                  </VStack>
                  <VStack p={'10px'} justifyContent={'center'}>
                    {appMode === 'lg' ? (
                      <Button
                        as={'a'}
                        href={deal.deal_url}
                        target="_blank"
                        rel="nofollow noopener"
                        colorScheme="blue"
                        p={'0 100px'}
                      >
                        {t(_t("Go to Sale"))}
                      </Button>
                    ) : (
                      <Button colorScheme="blue" borderRadius={'50%'} w={'40px'} h={'40px'}>
                        <ChevronRightIcon boxSize={6} />
                      </Button>
                    )}
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
