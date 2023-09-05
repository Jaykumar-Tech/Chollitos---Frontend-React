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
  Avatar
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaComment, FaFire } from "react-icons/fa";
import { TimeIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { getTimeDiff } from "../../Helpers";
import { addLikeDealService } from "../../Services/Like";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { _t } from "../../Utils/_t";

const CustomCard = ({ deal }) => {
  const { t } = useTranslation();
  const [cntLike, setCntLike] = useState(deal.cnt_like);
  const themeColor = 'blue.500';

  const getUrlFromTitle = (title) => {
    return title.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase();
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
                  deal.type === 'deal' ? <span>{deal.price_low}€
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
          <Flex alignItems={'center'}>
            <Box _hover={{ color: themeColor }}>
              <Link title="Comments" to="#">
                <FaComment />
              </Link>
            </Box>
            <Spacer mx={'5px'} />
            <span>{deal.cnt_comment}</span>
          </Flex>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;