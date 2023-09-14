import {
  Flex,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createStoreService, getStoreByIdService, updateStoreService } from "../../../Services/Store";
import ReactQuill from 'react-quill';
import { useTranslation } from 'react-i18next';
import { _t } from "../../../Utils/_t";
import { useContext } from "react";
import { GlobalContext } from "../../../Components/GlobalContext";

const CreateOrUpdateStore = ({ isModalOpen, onCloseModal, id = 0 }) => {
  const { t } = useTranslation();
  const [isloading, setIsloading] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [blog, setBlog] = useState('');
  const { globalProps } = useContext(GlobalContext);
  const { stores, _setStores } = globalProps;
  const toast = useToast()

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['link'],
        [{ image: 'image' }],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ color: [] }, { background: [] }],
        ['clean']
      ],
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
    'image',
    'align',
    'list',
    'ordered',
    'bullet',
    'color',
    'background',
    'clean',
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const data = await getStoreByIdService(id);
      setName(data?.name ?? '');
      setUrl(data?.url ?? '');
      setImage(data?.image ?? '');
      setBlog(data?.blog ?? '');
      setIsloading(false);
    }

    const setData = () => {
      setName('');
      setUrl('');
      setImage('');
      setBlog('');
    }

    id > 0 ? fetchData() : setData();
  }, [id]);

  const handleCreateStore = async (e) => {
    e.preventDefault()
    const data = {
      name: name,
      url: url,
      image: image,
      blog: blog
    }
    if (id === 0) {
      setIsloading(true)
      var response = await createStoreService(data)
      setIsloading(false)
      if (response.status === 200) {
        toast({
          title: t(_t('Success.')),
          description: t(_t('Creating store success')),
          position: 'top',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        _setStores([...stores, {
          id: response?.data?.data,
          status: 1,
          ...data
        }].sort((a, b) => (a.name.localeCompare(b.name))))
        onCloseModal(false)
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
    } else {
      setIsloading(true)

      let response = await updateStoreService({
        id: id,
        ...data,
        status: stores.find(store => (store.id === id)).status
      })
      setIsloading(false)
      if (response.status === 200) {
        toast({
          title: t(_t('Success.')),
          description: t(_t('Updating store success')),
          position: 'top',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        _setStores(stores.map(store => (store.id !== id ? store : {
          id: id,
          status: store.status,
          ...data
        })).sort((a, b) => (a.name.localeCompare(b.name))))
        onCloseModal(false)
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
    console.log(name, url, image, blog)
  }

  return (
    !isloading &&
    <Modal isOpen={isModalOpen} onClose={onCloseModal} closeOnOverlayClick={false} size={'4xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{id > 0 ? t(_t('Edit Store')) : t(_t('Create Store'))}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleCreateStore}>
          <ModalBody>
            <FormControl mt={5} isRequired>
              <FormLabel>{t(_t('Name'))}</FormLabel>
              <Input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
            </FormControl>
            <FormControl mt={5} isRequired>
              <FormLabel>{t(_t('URL'))}</FormLabel>
              <Input type="text" value={url} onChange={(e) => { setUrl(e.target.value) }} />
            </FormControl>
            <FormControl mt={5}>
              <FormLabel>{t(_t('Image URL'))}</FormLabel>
              <Input type="text" value={image} onChange={(e) => { setImage(e.target.value) }} />
              <Flex justifyContent="center" alignItems="center" h="120px">
                <Image src={image} alt={t(_t("Image Not Found"))} h={'100px'} w={'auto'} />
              </Flex>
            </FormControl>
            <FormControl mt={5}>
              <FormLabel>{t(_t('Info HTML'))}</FormLabel>
              <ReactQuill
                name="info_html"
                theme="snow"
                modules={modules}
                formats={formats}
                value={blog}
                onChange={(content) => setBlog(content)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseModal}>{t(_t('Cancel'))}</Button>
            <Button isLoading={isloading} type="submit" colorScheme="blue" ml={3}>{id > 0 ? t(_t('Update')) : t(_t('Create'))}</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default CreateOrUpdateStore;