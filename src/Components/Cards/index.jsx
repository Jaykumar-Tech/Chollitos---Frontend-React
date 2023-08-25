import { Box, Card, CardHeader, CardBody, CardFooter, Image, Text, Flex, Spacer, Button, Divider, Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa";
import { TimeIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { getTimeDiff } from "../../Helpers";

const CustomCard = ({ deal }) => {
  const themeColor = '#007ea6';

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
        {/* <Badge
          colorScheme="pink"
          color={'red'}
          mt={4}
          ml={-2}
          position={'absolute'}
        >
          Popular
        </Badge> */}
      </CardHeader>
      <CardBody p={2}>
        <Image
          src={deal.image_url}
          alt="image"
          m={'auto'}
          height={"170px"}
          width={"auto"}
        />
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
        <Box maxW="full" h="3em" overflow="hidden" p={1}>
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
      </CardFooter>
    </Card>
  );
};

export default CustomCard;