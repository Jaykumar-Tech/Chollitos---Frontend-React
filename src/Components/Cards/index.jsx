import { Box, Card, CardHeader, CardBody, CardFooter, Image, Text, Flex, Spacer, Button, Divider, Badge, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaComment, FaFire } from "react-icons/fa";
import { TimeIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { getTimeDiff } from "../../Helpers";
import { addLikeDeal } from "../../Services/Like";
import { useEffect, useState } from "react";

const CustomCard = ({ deal }) => {
  const [cntLike, setCntLike] = useState(deal.cnt_like) ;
  const themeColor = 'blue.500';

  const getUrlFromTitle = (title) => {
    return title.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase();
  }

  const handleLike = async (isLike) => {
    const result = await addLikeDeal({
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
            Hot
          </Badge>
        }
        {new Date(deal.expires) < new Date &&
          <Badge
            colorScheme="gray"
            color={'gray'}
            mt={5}
            ml={-2}
            position={'absolute'}
          >
            Expired
          </Badge>
        }
      </CardHeader>
      <CardBody p={2}>
        <Link to={"/shops/" + deal.storename + "/" + getUrlFromTitle(deal.title) + "-" + deal.id}>
          <Image
            src={deal.image_url}
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
          <Link title={deal.storename} to={"/shops/" + deal.storename}>
            {deal.storename} discount code
          </Link>
        </Box>
        <Box maxW="full" h="3em" overflow="hidden" p={1}>
          <Link to={"/shops/" + deal.storename + "/" + getUrlFromTitle(deal.title) + "-" + deal.id}>
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
          >
            <ExternalLinkIcon mr={1} />
            <span>
              {deal.price_new}€
              {deal.price_low && <strike style={{ fontSize: '0.8em' }} >{deal.price_low}€</strike>}
            </span>
          </Button>
        </Box>
      </CardBody>
      <Divider color={"gray.200"} border={'1px'} />
      <CardFooter p={2}>
        <Flex alignItems="center" width={'100%'}>
          <Flex alignItems="center">
            <Box _hover={{ color: themeColor }}>
              <Link href="#" title="Like" to="#">
                <FaThumbsUp onClick={() => handleLike(true)} />
              </Link>
            </Box>
            <Spacer mx={'5px'} />
            <Box _hover={{ color: themeColor }}>
              <Link href="#" title="Dislike" to="#">
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
          {/* <Spacer />
          <Flex alignItems={'center'}>
            <Box _hover={{ color: themeColor }}>
              <Link href="#" title="Comments" to="#">
                <FaComment />
              </Link>
            </Box>
            <Spacer mx={'5px'} />
            <span>{deal.cnt_comment}</span>
          </Flex> */}
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;