import { useState, useEffect } from 'react';
import { getAllUserService } from "../../Services/User"
import ChollitosTable from "../../Components/DataTable";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Icon,
  Progress,
  Badge,
  Heading,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useTranslation } from 'react-i18next';
import { _t } from "../../Utils/_t";

const User = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const { t } = useTranslation();

  const columns = [
    { Header: t(_t('Id')), accessor: 'id' },
    { Header: t(_t('Username')), accessor: 'username' },
    { Header: t(_t('Email')), accessor: 'email' },
    {
      Header: t(_t('Birthday')), accessor: 'birthday',
      Cell: ({ value }) => {
        const date = new Date(value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      Header: t(_t('Role')), accessor: 'role',
      Cell: ({ value, row }) => (
        <Select
          size={'sm'}
          value={value}
          onChange={(e) => {
            setUserRole(row.original.id, e.target.value)
          }}
        >
          <option value='admin'>{t(_t('admin'))}</option>
          <option value='vip'>{t(_t('vip'))}</option>
          <option value='customer'>{t(_t('customer'))}</option>
        </Select>
      ),
    },
    {
      Header: t(_t('Status')),
      accessor: 'status',
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
      Header: t(_t('Actions')),
      accessor: 'status',
      id: 'actions',
      Cell: ({ value, row }) => (
        <>
          {value ?
            <Icon
              as={FaTimesCircle}
              color="red.500"
              boxSize={5}
              cursor={'pointer'}
              title={t(_t('deactivate'))}
              onClick={() => deactivateUser(row.original.id)}
            />
            :
            <Icon
              as={FaCheckCircle}
              color="green.500"
              boxSize={5}
              cursor={'pointer'}
              title={t(_t('activate'))}
              onClick={() => activateUser(row.original.id)}
            />
          }
          <Icon
            as={AiOutlineDelete}
            color="red.500"
            boxSize={5}
            cursor={'pointer'}
            title={t(_t('delete'))}
            onClick={() => {
              setDeleteUserId(row.original.id);
              onOpen();
            }}
          />
        </>
      ),
    },
  ];

  const getAllUser = async () => {
    setIsloading(true);
    const data = await getAllUserService();
    setIsloading(false);
    setUsers(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllUser();
    };

    fetchData();
  }, []);

  const activateUser = (id) => {
    alert(id);
  }

  const deactivateUser = (id) => {
    alert(id);
  }

  const deleteUser = (id) => {
    alert(id);
  }

  const setUserRole = (id, role) => {
    alert(id + ", " + role);
  }

  return (
    <>
      <Helmet>
        <title>{t(_t("Chollitos"))} - {t(_t("users"))} </title>
      </Helmet>
      <Box maxW={'1200px'} m={'auto'}>
        <Box>
          <Heading textAlign={'center'} p={5} size={'lg'}>{t(_t('User Management'))}</Heading>
        </Box>
        {isloading ?
          <Progress colorScheme={'blue'} size="xs" isIndeterminate />
          :
          <Box p={'2px'} />
        }
        {users.length > 0 ?
          <Box
            bg={'white'}
            borderRadius={5}
            p={'20px'}
            shadow={'0 3px 3px rgba(0,0,0,.15), 0 0 0 rgba(0,0,0,.15)'}
          >
            <ChollitosTable
              columns={columns}
              data={users}
            />
          </Box>
          : !isloading &&
          <Box
            bg={'white'}
            borderRadius={5}
            p={'20px'}
            shadow={'0 3px 3px rgba(0,0,0,.15), 0 0 0 rgba(0,0,0,.15)'}
            textAlign={'center'}
            fontWeight={600}
          >
            {t(_t('No Data'))}
          </Box>
        }
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t(_t("Delete User"))}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {t(_t("Are you sure?"))}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              {t(_t("Cancel"))}
            </Button>
            <Button colorScheme="red" onClick={() => {
              deleteUser(deleteUserId);
              onClose();
            }}>
              {t(_t("Delete"))}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default User;