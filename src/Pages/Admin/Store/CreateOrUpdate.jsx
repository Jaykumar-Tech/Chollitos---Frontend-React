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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getStoreByIdService } from "../../../Services/Store";
import ReactQuill from 'react-quill';
import { useTranslation } from 'react-i18next';
import { _t } from "../../../Utils/_t";

const CreateOrUpdateStore = ({ isModalOpen, onCloseModal, id = 0 }) => {
  const { t } = useTranslation();
  const [isloading, setIsloading] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [blog, setBlog] = useState('');

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

  return (
    !isloading &&
    <Modal isOpen={isModalOpen} onClose={onCloseModal} closeOnOverlayClick={false} size={'4xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{id > 0 ? t(_t('Edit Store')) : t(_t('Create Store'))}</ModalHeader>
        <ModalCloseButton />
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
              <Image src={image} alt={name} h={'100px'} w={'auto'} />
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
          <Button type="submit" colorScheme="blue" ml={3}>{t(_t('Update'))}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateOrUpdateStore;