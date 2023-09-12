import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../../Components/GlobalContext";
import ChollitosTable from "../../../Components/DataTable";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Icon,
  Progress,
  Badge,
  Avatar,
  Heading,
  Flex,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import { activateStoreService, getStoresService } from "../../../Services/Store";
import CreateOrUpdateStore from "./CreateOrUpdate";
import { FaCheckCircle, FaTimesCircle, FaEdit } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { _t } from "../../../Utils/_t";
import { deactivateCategoryService } from "../../../Services/Category";

const AdminStore = () => {
  const { globalProps } = useContext(GlobalContext);
  const { stores, _setStores } = globalProps;
  // const [stores, _setStores] = useState([]);
  const [tableIndex, setTableIndex] = useState(0);
  const [tableSize, setTableSize] = useState(5);
  const [isloading, setIsloading] = useState(false);
  const [storeId, setStoreId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const toast = useToast()

  const columns = [
    {
      Header: t(_t('No')), accessor: 'id',
      Cell: ({ row }) => {
        return row.index + 1;
      }
    },
    {
      Header: t(_t('Image')), accessor: 'image',
      Cell: ({ value, row }) => (
        <Avatar name={row.original.name} src={value} size="md" />
      ),
    },
    { Header: t(_t('Name')), accessor: 'name' },
    {
      Header: t(_t('URL')), accessor: 'url',
      Cell: ({ value }) => (
        <a href={value.startsWith("http") ? value : `https://${value}`} target="_blank">
          <Box color={'blue.500'}>
            {value}
          </Box>
        </a>
      ),
    },
    {
      Header: t(_t('Status')), accessor: 'status',
      Cell: ({ value }) => (
        <Badge
          color={value ? "green" : "red"}
          bg={value ? "green.100" : "red.100"}
          size="sm"
          p={1}
        >
          {value ? t(_t('Active')) : t(_t('Deactive'))}
        </Badge>
      ),
    },
    {
      Header: t(_t('Actions')), accessor: 'status', id: 'actions',
      Cell: ({ value, row }) => (
        <>
          {value ?
            <Icon
              as={FaTimesCircle}
              color="red.500"
              boxSize={5}
              cursor={'pointer'}
              title={t(_t('deactivate'))}
              onClick={() => deactivateStore(row.original.id)}
            />
            :
            <Icon
              as={FaCheckCircle}
              color="green.500"
              boxSize={5}
              cursor={'pointer'}
              title={t(_t('activate'))}
              onClick={() => activateStore(row.original.id)}
            />
          }
          <Icon
            as={FaEdit}
            color="blue.500"
            boxSize={5}
            ml={1}
            cursor={'pointer'}
            title={t(_t('edit'))}
            onClick={() => openCreateOrEditStoreModal(row.original.id)}
          />
        </>
      ),
    },
  ];

  // const getStores = async () => {
  //   // setIsloading(true);
  //   // const data = await getStoresService();
  //   // _setStores(data);
  //   // setIsloading(false);
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await getStores();
  //   };

  //   fetchData();
  // }, []);

  const activateStore = async (id) => {
    var response = await activateStoreService(id);
    if (response.status == 200) {
      toast({
        title: t(_t('Success.')),
        description: t(_t('Activating Store success')),
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      _setStores(stores.map(store => (store.id != id ? store : {
        ...store,
        status: 1
      })))
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

  const deactivateStore = async (id) => {
    var response = await deactivateCategoryService(id);
    if (response.status === 200) {
      toast({
        title: t(_t('Success.')),
        description: t(_t('Deactivating store success')),
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      _setStores(stores.map(store => (store.id !== id ? store : {
        ...store,
        status: 0
      })))
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

  const openCreateOrEditStoreModal = (id) => {
    setStoreId(id);
    setIsOpen(true);
  }

  const onCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>{t(_t("Chollitos"))} - {t(_t("shops"))} </title>
      </Helmet>
      <Box maxW={'1200px'} m={'auto'}>
        <Box>
          <Heading textAlign={'center'} p={5} size={'lg'}>{t(_t('Store Management'))}</Heading>
        </Box>
        {isloading ?
          <Progress colorScheme={'blue'} size="xs" isIndeterminate />
          :
          <Box p={'2px'} />
        }
        {stores?.length > 0 &&
          <Box
            bg={'white'}
            borderRadius={5}
            p={'20px'}
            shadow={'0 3px 3px rgba(0,0,0,.15), 0 0 0 rgba(0,0,0,.15)'}
          >
            <Flex mb={2}>
              <Spacer />
              <Button colorScheme="blue" onClick={() => openCreateOrEditStoreModal(0)}>{t(_t('Create Store'))}</Button>
            </Flex>
            <ChollitosTable
              columns={columns}
              data={stores}
              index={tableIndex}
              setIndex={setTableIndex}
              size={tableSize}
              setSize={setTableSize}
            />
          </Box>
        }
        <CreateOrUpdateStore isModalOpen={isOpen} onCloseModal={onCloseModal} id={storeId} />
      </Box>
    </>
  )
}

export default AdminStore;