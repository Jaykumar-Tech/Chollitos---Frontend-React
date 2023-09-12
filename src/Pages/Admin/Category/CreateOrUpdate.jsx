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
import Select from "react-select";
import { useEffect, useState } from "react";
import { getCategoryByIdService } from "../../../Services/Category";
import { useTranslation } from 'react-i18next';
import { _t } from "../../../Utils/_t";

const CreateOrUpdateCategory = ({ isModalOpen, onCloseModal, id = 0, categories }) => {
  const { t } = useTranslation();
  const [isloading, setIsloading] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [parentId, setParentId] = useState(-1);
  const [imageUrl, setImageUrl] = useState('');

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    id: category.id,
  }));

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const data = await getCategoryByIdService(id);
      setName(data?.name ?? '');
      setSlug(data?.slug ?? '');
      setParentId(data?.parent_id ?? -1);
      setImageUrl(data?.image_url ?? '');
      setIsloading(false);
    }

    const setData = () => {
      setName('');
      setSlug('');
      setParentId(-1);
      setImageUrl('');
    }

    id > 0 ? fetchData() : setData();
  }, [id]);

  return (
    !isloading &&
    <Modal isOpen={isModalOpen} onClose={onCloseModal} closeOnOverlayClick={false} size={'4xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{id > 0 ? t(_t('Edit Category')) : t(_t('Create Category'))}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mt={5} isRequired>
            <FormLabel>{t(_t('Name'))}</FormLabel>
            <Input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
          </FormControl>
          <FormControl mt={5} isRequired>
            <FormLabel>{t(_t('Slug'))}</FormLabel>
            <Input type="text" value={slug} onChange={(e) => { setSlug(e.target.value) }} />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel>{t(_t('Image URL'))}</FormLabel>
            <Input type="text" value={imageUrl} onChange={(e) => { setImageUrl(e.target.value) }} />
            <Flex justifyContent="center" alignItems="center" h="120px">
              <Image src={imageUrl} alt={name} h={'100px'} w={'auto'} />
            </Flex>
          </FormControl>
          <FormControl mt={5}>
            <FormLabel>{t(_t('Parent Category'))}</FormLabel>
            <Select
              size={'sm'}
              isSearchable={true}
              options={categoryOptions}
              value={categoryOptions.find(option => option.id === parentId)}
              onChange={(e) => {
                setParentId(e.value)
              }}
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

export default CreateOrUpdateCategory;