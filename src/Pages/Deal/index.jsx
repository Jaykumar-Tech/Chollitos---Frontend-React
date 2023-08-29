import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import MyBreadcrumb from "../../Layouts/BreadCrumb";
import {
  Box,
  Flex,
  Link,
  Button,
  Image,
  Avatar,
  Text,
  useBreakpointValue,
  Spacer,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { ExternalLinkIcon, TimeIcon } from "@chakra-ui/icons";
import PopularCategories from "../../Components/PopularCategories";
import PopularShops from "../../Components/PopularShops";
import { getCategoriesService, } from "../../Services/Category";
import { getStoresService, } from "../../Services/Store";
import { getDealByIdService, } from "../../Services/Deal";
import { getTimeDiff } from "../../Helpers";
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addLikeDeal, isLikedDeal } from "../../Services/Like";
// import { getCommentsByDealIdService } from "../../Services/Comment";

const Deal = () => {
  const { dealTitle } = useParams();
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [deal, setDeal] = useState({});
  const [isLiked, setLiked] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  // const [newComment, setNewComment] = useState(null);
  // const [comments, setComments] = useState([]);

  const appMode = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });
  const themeColor = 'blue.500';

  const getCategories = async () => {
    const data = await getCategoriesService();
    setCategories(data);
  };

  const getStores = async () => {
    const data = await getStoresService();
    setStores(data);
  };

  const getDealIdFromParams = (dealTitle) => {
    const splitTitle = dealTitle.split('-');
    return splitTitle[splitTitle.length - 1];
  }

  const getDealById = async (dealId) => {
    const data = await getDealByIdService(dealId);
    setDeal(data);
  };

  // const getCommentsByDealId = async (dealId) => {
  //   const data = await getCommentsByDealIdService(dealId);
  //   console.log(JSON.stringify(data));
  //   setComments(data);
  // }

  useEffect(() => {
    const dealId = getDealIdFromParams(dealTitle);
    getDealById(dealId);
    getCategories();
    getStores();
    // getCommentsByDealId(dealId);
  }, []);

  useEffect(() => {
    if (Object.keys(deal).indexOf("id") >= 0)
      checkIsLikedDeal();
  }, [deal])

  const checkIsLikedDeal = async () => {
    const result = await isLikedDeal({
      type: "deal",
      dest_id: deal.id
    });
    if (result.status === 200) {
      setLiked(true)
    } else {
    }
  }

  const handleLike = async (isLike) => {
    if (isLiked) return;
    const result = await addLikeDeal({
      type: "deal",
      dest_id: deal.id,
      is_like: isLike
    });
    if (result.status === 200) {
      setDeal({ ...deal, cnt_like: deal.cnt_like + (isLike ? 1 : -1) })
      setLiked(true)
    }
  }

  const DealHeader = () => {
    return (
      <>
        <Helmet>
          <title>{deal.title}</title>
        </Helmet>
        <Box
          color={themeColor}
          _hover={{ color: 'gray.800' }}
          fontSize={'0.8em'}
          p={1}
        >
          <Link title={deal.storename} href={`/shops/${deal.storename}`}>
            {deal.storename} discount code
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
        <Flex mt={2}>
          <Text
            flex={0.2}
            colorScheme="blue"
            color={themeColor}
            bg={'blue.50'}
            h={'2.4em'}
            p={2}
            borderRadius={5}
            fontWeight={600}
          >
            {deal.price_new}€
            {deal.price_low && <strike style={{ fontSize: '0.8em' }} >{deal.price_low}€</strike>}
          </Text>
          <Spacer flex={0.2} />
          <Button
            as={'a'}
            href="#"
            target="_blank"
            rel="nofollow noopener"
            colorScheme="blue"
            display="flex"
            alignItems="center"
            w={"50%"}
            flex={1}
          >
            <ExternalLinkIcon mr={1} />
            Go to {deal.storename}
          </Button>
        </Flex>
        <Flex alignItems="center" width={'100%'} mt={2}>
          <Flex alignItems="center">
            <Text
              p={2}
              bg={deal.cnt_like > 1 ? 'red.500' : 'orange'}
              color={'white'}
              borderRadius={5}
              fontWeight={600}
            >
              Deal Score: {deal.cnt_like ?? 0}
            </Text>
            <Spacer mx={'5px'} />
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
          </Flex>
          {/* <Spacer /> */}
          {/* <Flex alignItems={'center'}>
            <Box _hover={{ color: themeColor }}>
              <Link href="#" title="Comments" to="#">
                <FaComment />
              </Link>
            </Box>
            <Spacer mx={'5px'} />
            <span>{deal.cnt_comment}</span>
          </Flex> */}
        </Flex>
      </>
    )
  }

  // const Comment = ({ props, comment }) => {
  //   return (
  //     <Box className="comments">
  //       <Flex>
  //         <Avatar
  //           src={deal.avatar}
  //           name={deal.username}
  //           size={'sm'}
  //           m={'10px'}
  //         />
  //         <Box className="child_comments" flex={1} m={'10px 0'}>
  //           <Box>
  //             <Flex color={"gray.400"} fontSize={'0.8em'}>
  //               <Spacer />
  //               <TimeIcon />
  //               <Text ml={1}>{getTimeDiff(deal.start_date)}</Text>
  //             </Flex>
  //             <Text
  //               bg={'gray.100'}
  //               p={'15px'}
  //               borderRadius={10}
  //               shadow={'0 2px 2px rgba(0,0,0,.18), 0 0 0 rgba(0,0,0,.18)'}
  //             >
  //               {deal.description}
  //             </Text>
  //             <Flex m={'10px 0 20px'} color={'gray.500'}>
  //               <Flex _hover={{ color: themeColor }}>
  //                 <Link title="Like" to="#">
  //                   <Flex mr={2}>
  //                     <Text mr={1}>Like</Text>
  //                     <FaThumbsUp />
  //                   </Flex>
  //                 </Link>
  //                 <Text>0</Text>
  //               </Flex>
  //               <Flex _hover={{ color: themeColor }} ml={5}>
  //                 <Link title="Reply" to="#" onClick={() => setIsOpen(!isOpen)}>
  //                   <Flex mr={2}>
  //                     <Text mr={1}>Reply</Text>
  //                     <FaReply />
  //                   </Flex>
  //                 </Link>
  //               </Flex>
  //             </Flex>
  //             {isOpen &&
  //               <CommentEditor />
  //             }

  //           </Box>
  //           {props.children}
  //         </Box>
  //       </Flex>
  //     </Box>
  //   )
  // }

  // const CommentEditor = () => {
  //   return (
  //     <Box className="comment_editor">
  //       <ReactQuill
  //         name="description"
  //         theme="snow"
  //         value={newComment}
  //         onChange={(content) => setNewComment(content)}
  //       />
  //       <ButtonGroup>
  //         <Button mt={2} colorScheme="blue" onClick={handleAddComment}>
  //           Comment
  //         </Button>
  //         <Button mt={2} ml={2} colorScheme="gray" onClick={() => { setNewComment(null); setIsOpen(false); }}>
  //           Cancel
  //         </Button>
  //       </ButtonGroup>
  //     </Box>
  //   )
  // }

  return (
    <Box maxW={'1200px'} m={'auto'}>
      <MyBreadcrumb categories={categories} categorySlug={deal?.category_slug} />
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
            <Spacer />
            <Menu>
              <MenuButton
                size="sm"
                ml={2}
                fontSize={'2em'}
                h={5}
              >
                <Flex>
                  <Box w="5px" h="5px" borderRadius="50%" bg="black" mr={'2px'} />
                  <Box w="5px" h="5px" borderRadius="50%" bg="black" mr={'2px'} />
                  <Box w="5px" h="5px" borderRadius="50%" bg="black" mr={'2px'} />
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={''} >Expired</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          {appMode === 'lg' ?
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
                <DealHeader />
              </Box>
            </Flex>
            :
            <>
              <Image
                src={deal.image_url}
                alt="image"
                m={'auto'}
                height={"170px"}
                width={"auto"}
              />
              <Spacer h={'10px'} />
              <DealHeader />
            </>
          }
          <Divider m={'20px 0'} />
          <Flex color={"gray.400"} fontSize={'0.8em'} mb={3}>
            <Flex alignItems="center">
              <Avatar
                src={deal.avatar}
                name={deal.username}
                size={'xs'}
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
          <Text dangerouslySetInnerHTML={{ __html: deal.description }} />
          {/* <Flex
            bg={themeColor}
            color={'white'}
            p={'8px'}
            m={'30px 0 10px'}
            borderRadius={5}
          >
            <Box m={'4px 5px 0'}>
              <FaComment />
            </Box>
            <Text>What do you think of this {deal.storename} discount code?</Text>
          </Flex> */}
          {/* <CommentEditor />
          <Box id="comments_container">
            <Comment />
            <Comment>
              <Comment>
                <Comment />
              </Comment>
              <Comment />
            </Comment>
          </Box> */}
        </Box>
        <Box>
          <PopularShops stores={stores} />
          <PopularCategories categories={categories} />
        </Box>
      </Box>
    </Box>
  );
};

export default Deal;
