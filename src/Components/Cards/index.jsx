import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Text,
  Flex,
  Spacer,
  Button,
  Divider,
  Badge,
  Avatar,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  useDisclosure
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaComment, FaFire, FaUser, FaCrown, FaEdit, FaCheckCircle } from "react-icons/fa";
import { TimeIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { getTimeDiff } from "../../Helpers";
import { addLikeDealService } from "../../Services/Like";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { _t } from "../../Utils/_t";
import { AiOutlineDelete } from "react-icons/ai";
import { activateDealService, deleteDealService, setVipService, unsetVipService } from "../../Services/Deal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CreateOrUpdateDeal from "../../Pages/Create/deal";
import CreateOrUpdateDiscount from "../../Pages/Create/discount";

const CustomCard = (props) => {
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { t } = useTranslation();
  const [cntLike, setCntLike] = useState(props.deal.cnt_like);
  const themeColor = 'blue.500';
  const [deal, setDeal] = useState({ ...props.deal })
  const [deleteDealId, setDeleteDealId] = useState(-1)
  const toast = useToast()
  const history = useHistory()

  const getUrlFromTitle = (title) => {
    const _title = title.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase();
    if (_title.length > 30) {
      return _title.slice(0, 30) + "...";
    }
    return _title;
  }

  const handleLike = async (isLike) => {
    const result = await addLikeDealService({
      type: "deal",
      dest_id: deal.id,
      is_like: isLike
    });
    if (result.status === 200) {
      setCntLike(cntLike + (isLike ? 1 : -1));
    }
  }

  const authToken = JSON.parse(localStorage.getItem("authToken"))

  const deleteDeal = async (deleteDealId) => {
    var response = await deleteDealService(deleteDealId)
    if (response.status === 200) {
      toast({
        title: t(_t('Success.')),
        description: t(_t('Deleting deal success')),
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      window.location.reload()
    } else {
      toast({
        title: t(_t('Error.')),
        description: response?.response?.data?.message,
        position: 'top',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleSetVip = async (id) => {
    var response = await setVipService(id)
    if (response.status === 200) {
      toast({
        title: t(_t('Success.')),
        description: t(_t('Setting VIP success')),
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setDeal({
        ...deal,
        vip: 1
      })
    } else {
      toast({
        title: t(_t('Error.')),
        description: response?.response?.data?.message,
        position: 'top',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleUnsetVip = async (id) => {
    var response = await unsetVipService(id)
    if (response.status === 200) {
      toast({
        title: t(_t('Success.')),
        description: t(_t('Unsetting VIP success')),
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setDeal({
        ...deal,
        vip: 0
      })
    } else {
      toast({
        title: t(_t('Error.')),
        description: response?.response?.data?.message,
        position: 'top',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleActivateDeal = async (dealId) => {
    var response = await activateDealService(dealId)
    if (response.status === 200) {
      toast({
        title: t(_t('Success.')),
        description: t(_t('Activating deal success')),
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setDeal({
        ...deal,
        status: 1
      })
    } else {
      toast({
        title: t(_t('Error.')),
        description: response?.response?.data?.message,
        position: 'top',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleUpdateDeal = async (_deal) => {
    if (authToken?.user?.role !== 'admin')
      _deal.status = 0
    setDeal({
      ...deal,
      ..._deal
    })
  }

  return (
    <Card
      maxWidth="sm"
      borderRadius="sm"
      overflow="hidden"
      boxShadow={'0 3px 2px rgba(0,0,0,.15),0 0 1px rgba(0,0,0,.15)'}
    >
      <CardHeader p={2}>
        <Flex color={"gray.400"} fontSize={'0.8em'}>
          <Flex alignItems="center">
            <Avatar
              src={deal.avatar}
              name={deal.username}
              mr={2}
              size={'xs'}
            />
            <Text>{deal.username}</Text>
          </Flex>
          <Spacer />
          <Flex alignItems={'center'}>
            <TimeIcon />
            <Text ml={1}>{getTimeDiff(deal.start_date)}</Text>
          </Flex>
        </Flex>
        {cntLike > 1 &&
          <Badge
            colorScheme="pink"
            color={'red'}
            mt={5}
            ml={-2}
            position={'absolute'}
          >
            {t(_t("HOT"))}
          </Badge>
        }
        {deal.vip > 0 &&
          <Badge
            colorScheme="green"
            color={'green'}
            mt={5}
            ml={-2}
            position={'absolute'}
          >
            {t(_t("VIP"))}
          </Badge>
        }
        {new Date(deal.expires) < new Date() &&
          <Badge
            colorScheme="gray"
            color={'gray'}
            mt={5}
            ml={-2}
            position={'absolute'}
          >
            {t(_t("Expired"))}
          </Badge>
        }
        {!deal.status &&
          <Badge
            colorScheme="pink"
            color={'orange'}
            mt={5}
            ml={-2}
            position={'absolute'}
          >
            {t(_t("Pending"))}
          </Badge>
        }
      </CardHeader>
      <CardBody p={2}>
        <Link to={`/deal/${getUrlFromTitle(deal.title)}-${deal.id}`}>
          <Image
            src={deal.image_urls && JSON.parse(deal.image_urls)[0]}
            alt="image"
            m={'auto'}
            height={"170px"}
            width={"auto"}
          />
        </Link>
        <Box
          color={themeColor}
          _hover={{ color: 'gray.800' }}
          fontSize={'0.8em'}
          p={1}
        >
          <Link to={"/shop/" + deal.storename}>
            {deal.storename} {t(_t("discount code"))}
          </Link>
        </Box>
        <Box maxW="full" h="3em" overflow="hidden" p={1}>
          <Link to={`/deal/${getUrlFromTitle(deal.title)}-${deal.id}`}>
            <Text
              lineHeight="1.2"
              css={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: 600,
              }}
            >
              {deal.title}
            </Text>
          </Link>
        </Box>
        <Box>
          <Button
            as={'a'}
            href={deal.deal_url}
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
          >
            <ExternalLinkIcon mr={1} />
            <span>
              {
                (deal.type === 'free' || (deal.price_low < 0.001 && deal.type === 'deal')) ?
                  t(_t("FREE")) :
                  deal.type === 'deal' ? <span>{deal.price_low + "€ "}
                    <strike style={{ fontSize: '0.8em' }} >{deal.price_new}€</strike></span> :
                    deal.type === 'discount_percent' ?
                      <span>-{deal.price_new}%</span> :
                      <span>-{deal.price_new}€</span>
              }
            </span>
          </Button>
        </Box>
      </CardBody>
      <Divider color={"gray.200"} border={'1px'} />
      <CardFooter p={2}>
        <Flex alignItems="center" width={'100%'}>
          <Flex alignItems="center">
            <Box _hover={{ color: themeColor }}>
              <Link title="Like" to="#">
                <FaThumbsUp onClick={() => handleLike(true)} />
              </Link>
            </Box>
            <Spacer mx={'5px'} />
            <Box _hover={{ color: themeColor }}>
              <Link title="Dislike" to="#">
                <FaThumbsDown onClick={() => handleLike(false)} />
              </Link>
            </Box>
            <Spacer mx={'5px'} />
            <span>{cntLike ?? 0}</span>
            {cntLike > 1 &&
              <Box color="red" ml={1}>
                <FaFire />
              </Box>
            }
          </Flex>
          <Spacer />
          <Flex alignItems="center">
            {authToken?.user?.role === 'admin' &&
              (deal.vip ?
                <Box>
                  <Icon
                    onClick={() => handleUnsetVip(deal.id)}
                    as={FaUser}
                    color="gray.500"
                    boxSize={5}
                    cursor={'pointer'}
                    title={t(_t('Unset VIP'))}
                  /></Box>
                :
                <Box>
                  <Icon
                    onClick={() => handleSetVip(deal.id)}
                    as={FaCrown}
                    color="yellow.500"
                    boxSize={5}
                    cursor={'pointer'}
                    title={t(_t('Set VIP'))}
                  /></Box>
              )
            }
            <Box>
              <Icon
                as={FaEdit}
                color="blue.500"
                boxSize={5}
                ml={1}
                cursor={'pointer'}
                title={t(_t('edit'))}
                onClick={async () => {
                  setTimeout(() => {
                    onEditOpen();
                  }, 0);
                }}
              />
            </Box>
            {authToken?.user?.role === 'admin' &&
              <Box>
                <Icon
                  as={AiOutlineDelete}
                  color="red.500"
                  boxSize={5}
                  cursor={'pointer'}
                  title={t(_t('delete'))}
                  onClick={() => {
                    setDeleteDealId(deal.id);
                    onDeleteOpen();
                  }}
                />
              </Box>
            }
            {authToken?.user?.role === 'admin' && deal.status === 0 &&
              <Box>
                <Icon
                  onClick={() => handleActivateDeal(deal.id)}
                  as={FaCheckCircle}
                  color="green.500"
                  boxSize={5}
                  cursor={'pointer'}
                  title={t(_t('activate'))}
                />
              </Box>
            }
          </Flex>
          <Spacer />
          <Flex alignItems={'center'}>
            <Box _hover={{ color: themeColor }}>
              <Link
                title="Comments"
                to={`/deal/${getUrlFromTitle(deal.title)}-${deal.id}`}
              >
                <FaComment />
              </Link>
            </Box>
            <Spacer mx={'5px'} />
            <span>{deal.cnt_comment}</span>
          </Flex>
        </Flex>
      </CardFooter>
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t(_t("Delete Deal"))}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {t(_t("Are you sure?"))}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onDeleteClose}>
              {t(_t("Cancel"))}
            </Button>
            <Button colorScheme="red" onClick={() => {
              deleteDeal(deleteDealId);
              onDeleteClose();
            }}>
              {t(_t("Delete"))}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditOpen} onClose={onEditClose} closeOnOverlayClick={false} size={'4xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t(_t("Edit Deal"))}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {deal.type === 'deal' ?
              <CreateOrUpdateDeal deal={deal} onClose={onEditClose} onUpdate={handleUpdateDeal} />
              :
              <CreateOrUpdateDiscount discount={deal} onClose={onEditClose} onUpdate={handleUpdateDeal} />
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default CustomCard;