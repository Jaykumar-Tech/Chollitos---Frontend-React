import { useEffect, useState } from 'react'
import {
  Box,
  ButtonGroup,
  Button,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
  Image,
  Spinner,
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone';
import { FaFileImage } from "react-icons/fa";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getUrlUploadedService } from '../Services/Resource';
import { getStoresService } from '../Services/Store';
import { getCategoriesService } from '../Services/Category';
import { createDealService } from '../Services/Deal';

export default function Create() {

  const [url, setUrl] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);
  const [ship, setShip] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState({ name: "", id: -1 });
  const [storeId, setStoreId] = useState({ name: "", id: -1 });
  const [startDate, setStartDate] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()-1).padStart(2, '0')}`);
  const [endDate, setEndDate] = useState('');
  const [cats, setCats] = useState([]);
  const [stores, setStores] = useState([]);
  const [isloading, setIsloading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    getStoresService().then(response => {
      setStores(response);
    });
    getCategoriesService().then(response => {
      setCats(response);
    });
  }, [])

  useEffect(()=>{
    console.log(startDate)
  },[startDate])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: async (acceptedFiles) => {
      setIsloading(true);
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      const result = await getUrlUploadedService(formData);
      setIsloading(false);
      if (result.status === 200) {
        setImage(result.data.url);
        toast({
          title: 'Upload Success.',
          description: "We've uploaded your image.",
          position: 'top',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Error.',
          description: result.response?.data.message,
          position: 'top',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
  });

  const handleCreate = async () => {
    const auth_token = JSON.parse(localStorage.getItem('authToken'));
    var sendData = {
      title: title,
      description: description,
      type: "deal",
      price_new: price,
      price_low: lowPrice,
      price_ship: ship,
      deal_url: url,
      image_url: image,
    };
    if (categoryId.id !== -1) sendData.category_id = categoryId.id;
    if (storeId !== -1) sendData.store_id = storeId.id;
    if (startDate !== "") sendData.start_date = startDate;
    if (endDate !== "") sendData.expires = endDate;

    console.log(sendData)

    const response = await createDealService(sendData);
    if (response.status === 200) {
      console.log(response);
      toast({
        title: 'Deal created.',
        description: "We've created your deal.",
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Error.',
        description: response.response?.data.message,
        position: 'top',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box id="Create" maxW={'800px'} m={'auto'}>
      <Text
        fontSize={'2em'}
        textAlign={'center'}
        fontWeight={600}
        p={5}
      >
        Deal Information
      </Text>
      <Box
        bg={'white'}
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        p={6}
        m="10px auto"
        as="form"
      >

        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            fontWeight={600}
            htmlFor="url"
            mt="2%">
            URL
          </FormLabel>
          <Input
            type="text"
            name="url"
            id="url"
            size="sm"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </FormControl>

        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            fontWeight={600}
            htmlFor="image"
            mt="2%">
            Image
          </FormLabel>
          <Box
            {...getRootProps()}
            p={4}
            minHeight={'120px'}
            borderWidth={2}
            borderStyle="dashed"
            borderRadius="md"
            position={'relative'}
            textAlign="center"
            cursor="pointer"
            borderColor={isDragActive ? "blue.500" : "gray.200"}
          >
            <input {...getInputProps()} />
            {image ?
              <Image src={image} alt="Uploaded" m={'auto'} />
              :
              <>
                <Box>
                  <FaFileImage size={24} />
                </Box>
                {!isloading &&
                  <>
                    <Box mt={2} fontWeight="semibold" >
                      {isDragActive ? "Drop the image here" : "Drag and drop an image here"}
                    </Box>
                    <Box mt={2} fontSize="sm" color="gray.500">
                      Supported formats: JPEG, PNG
                    </Box>
                  </>
                }
              </>
            }
            {isloading &&
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="lg"
                position={'absolute'}
                top="calc(50%)"
                left="calc(50% - 20px)"
                transform="translate(-50%, -50%)"
                zIndex={1}
              />
            }
          </Box>
        </FormControl>

        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            fontWeight={600}
            htmlFor="price_new"
            mt="2%">
            Price (new)
          </FormLabel>
          <Input
            type="text"
            name="price_new"
            id="price_new"
            size="sm"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>

        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            fontWeight={600}
            htmlFor="lowest_price"
            mt="2%">
            Lowest price
          </FormLabel>
          <Input
            type="text"
            name="lowest_price"
            id="lowest_price"
            size="sm"
            value={lowPrice}
            onChange={(e) => setLowPrice(e.target.value)}
          />
        </FormControl>

        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            fontWeight={600}
            htmlFor="price_shipment"
            mt="2%">
            Price of shipment
          </FormLabel>
          <Input
            type="text"
            name="price_shipment"
            id="price_shipment"
            size="sm"
          />
        </FormControl>

        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            fontWeight={600}
            htmlFor="title"
            mt="2%">
            Title
          </FormLabel>
          <Input
            type="text"
            name="title"
            id="title"
            size="sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>

        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            fontWeight={600}
            htmlFor="description"
            mt="2%">
            Description
          </FormLabel>
          <ReactQuill
            name="description"
            id="description"
            theme="snow"
            value={description}
            onChange={(content) => setDescription(content)}
          />
        </FormControl>

        <FormControl as={GridItem} colSpan={[6, 3]}>
          <FormLabel
            fontWeight={600}
            htmlFor="category"
            mt="2%"
          >
            Categories
          </FormLabel>
          <Select
            id="category"
            name="category"
            autoComplete="category"
            placeholder="Select Category"
            shadow="sm"
            size="sm"
            w="full"
            value={categoryId.name}
            onChange={(e) => setCategoryId({
              name: e.target.value,
              id: parseInt(e.target.options[e.target.selectedIndex].id)
            })}
          >
            {cats ?
              cats.map(v => {
                return <option id={v.id}>{v.name}</option>
              }) : null
            }
          </Select>
        </FormControl>

        <FormControl as={GridItem} colSpan={[6, 3]}>
          <FormLabel
            htmlFor="store"
            fontWeight={600}
            mt="2%"
          >
            Stores
          </FormLabel>
          <Select
            id="store"
            name="store"
            autoComplete="store"
            placeholder="Select Store"
            shadow="sm"
            size="sm"
            w="full"
            value={storeId.name}
            onChange={(e) => setStoreId({
              name: e.target.value,
              id: parseInt(e.target.options[e.target.selectedIndex].id)
            })}
          >
            {
              stores ?
                stores.map(v => {
                  return <option id={v.id}>{v.name}</option>
                }) : null
            }
          </Select>
        </FormControl>

        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            fontWeight={600}
            htmlFor="start_date"
            mt="2%">
            Start Date
          </FormLabel>
          <Input
            type="date"
            name="start_date"
            id="start_date"
            size="sm"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FormControl>

        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            fontWeight={600}
            htmlFor="end_date"
            mt="2%">
            End Date
          </FormLabel>
          <Input
            type="date"
            name="end_date"
            id="end_date"
            size="sm"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FormControl>

        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Button
              colorScheme="teal"
              variant="outline"
              w="6rem"
              mr="5%"
              onClick={() => window.history.back()}
            >
              Back
            </Button>
            <Button
              w="6rem"
              colorScheme="blue"
              variant="solid"
              onClick={handleCreate}
            >
              Create
            </Button>
          </Flex>
        </ButtonGroup>
      </Box>
    </Box>
  )
}