import { useState } from 'react'
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
  useToast
} from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios"

export default function Create() {

  const [url, setUrl] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);
  const [ship, setShip] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [storeId, setStoreId] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const toast = useToast();
  const auth_token = localStorage.getItem('authToken');

  const { getRootProps, getInputProps } = useDropzone({
    accept: ':image',
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      axios.post("http://5.75.224.135:4000/api/resource/upload", {
        body: formData
      }, {
        authorization: auth_token.token_type + " " + auth_token.access_token,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const handleCreate = () => {
    axios.post("http://5.75.224.135:4000/api/deal/add",
      {
        category_id: categoryId,
        store_id: storeId,
        title: title,
        description: description,
        price_new: price,
        price_low: lowPrice,
        price_ship: ship,
        deal_url: url,
        image_url: image,
        start_data: startDate,
        expires: endDate,
      }, {
      authorization: auth_token.token_type + " " + auth_token.access_token,
    })
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response));
          toast({
            title: 'Deal created.',
            description: "We've created your deal.",
            position: 'top',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        }
      })
      .catch(err => {
        toast({
          title: 'Error.',
          description: err.response?.data.message,
          position: 'top',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        console.log(err);
      })
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
          <Box>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button mb={2}>Upload Image</Button>
            </div>
            {image && (
              <div>
                <img src={URL.createObjectURL(image)} alt="Uploaded" />
              </div>
            )}
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
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
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
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
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