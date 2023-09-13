import { useState, useEffect } from 'react';
import ChollitosTable from "../../../Components/DataTable";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Icon,
  Image,
  Progress,
  Badge,
  Text,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaEdit, FaCrown, FaUser } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { getDealByFilter } from '../../../Services/Deal';
import CreateOrUpdateDeal from '../../Create/deal';
import CreateOrUpdateDiscount from '../../Create/discount';
import { getDealByIdService } from '../../../Services/Deal';
import { useTranslation } from 'react-i18next';
import { _t } from "../../../Utils/_t";

const AdminDeal = () => {
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const [deals, setDeals] = useState([]);
  const [deal, setDeal] = useState({});
  const [deleteDealId, setDeleteDealId] = useState(0);
  const [tableIndex, setTableIndex] = useState(0);
  const [tableSize, setTableSize] = useState(5);
  const [isloading, setIsloading] = useState(false);
  const toast = useToast();
  const { t } = useTranslation();

  const columns = [
    {
      Header: t(_t('No')), accessor: 'id',
      Cell: ({ row }) => {
        return row.index + 1;
      }
    },
    {
      Header: t(_t('Image')), accessor: 'image_urls',
      Cell: ({ value, row }) => (
        <Image alt={row.original.name} src={JSON.parse(value)[0]} />
      ),
    },
    {
      Header: t(_t('Title')), accessor: 'title',
      Cell: ({ value, row }) => (
        <Link to={`/deal/${getUrlFromTitle(value)}-${row.original.id}`}>
          <Text title={value}>{value.length > 20 ? value.slice(0, 20) + '...' : value}</Text>
        </Link>
      ),
    },
    {
      Header: t(_t('URL')), accessor: 'deal_url',
      Cell: ({ value }) => (
        value ?
          <a href={value?.startsWith("http") ? value : `https://${value}`} target="_blank" rel="noreferrer">
            <Box color={'blue.500'}>
              {value}
            </Box>
          </a>
          :
          <></>
      ),
    },
    {
      Header: t(_t('Type')), accessor: 'type',
      Cell: ({ value }) => (
        <Text>
          {value === 'deal' ? t(_t('Deal')) :
            value === 'free' ? t(_t('Free')) :
              value === 'discount_fixed' ? t(_t('Fixed')) : t(_t('Percent'))}
        </Text>
      ),
    },
    { Header: t(_t('Username')), accessor: 'username' },
    {
      Header: t(_t('Start Date')), accessor: 'start_date',
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
      Header: t(_t('End Date')), accessor: 'expires',
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
      Header: t(_t('VIP')), accessor: 'vip',
      Cell: ({ value }) => (
        <Badge
          color={value ? "green" : "gray"}
          bg={value ? "green.100" : "gray.200"}
          size="sm"
          p={1}
        >
          {value ? t(_t('VIP')) : t(_t('No'))}
        </Badge>
      ),
    },
    {
      Header: t(_t('Status')),
      accessor: 'status',
      Cell: ({ value }) => (
        <Badge
          color={value ? "green" : "orange"}
          bg={value ? "green.100" : "orange.100"}
          size="sm"
          p={1}
        >
          {value ? t(_t('Active')) : t(_t('Pending'))}
        </Badge>
      ),
    },
    {
      Header: t(_t('Actions')),
      accessor: 'status',
      id: 'actions',
      Cell: ({ value, row }) => (
        <>
          {row.original.vip ?
            <Icon
              as={FaUser}
              color="gray.500"
              boxSize={5}
              cursor={'pointer'}
              title={t(_t('Unset VIP'))}
            />
            :
            <Icon
              as={FaCrown}
              color="yellow.500"
              boxSize={5}
              cursor={'pointer'}
              title={t(_t('Set VIP'))}
            />
          }
          <Icon
            as={FaEdit}
            color="blue.500"
            boxSize={5}
            ml={1}
            cursor={'pointer'}
            title={t(_t('edit'))}
            onClick={async () => {
              await getDealById(row.original.id);
              setTimeout(() => {
                onEditOpen();
              }, 0);
            }}
          />
          <Icon
            as={AiOutlineDelete}
            color="red.500"
            boxSize={5}
            cursor={'pointer'}
            title={t(_t('delete'))}
            onClick={() => {
              setDeleteDealId(row.original.id);
              onDeleteOpen();
            }}
          />
          {value === 0 &&
            <Icon
              as={FaCheckCircle}
              color="green.500"
              boxSize={5}
              cursor={'pointer'}
              title={t(_t('activate'))}
            // onClick={() => activateDeal(row.original.id)}
            />
          }
        </>
      ),
    },
  ];

  const getDealById = async (id) => {
    setIsloading(true);
    const data = await getDealByIdService(id);
    setDeal(data);
    setIsloading(false);
  };

  const getUrlFromTitle = (title) => {
    const _title = title.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase();
    if (_title.length > 30) {
      return _title.slice(0, 30) + "...";
    }
    return _title;
  }

  const getAllLightDeals = async () => {
    setIsloading(true);
    const data = await getDealByFilter({
      start_at: 0,
      length: 100000,
      type: "all"
    });
    setIsloading(false);
    setDeals(data);
  };

  const deleteDeal = async (deleteDealId) => {

  }

  useEffect(() => {
    const fetchData = async () => {
      await getAllLightDeals();
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t(_t("Chollitos"))} - {t(_t("deals"))} </title>
      </Helmet>
      <Box maxW={'1200px'} m={'auto'}>
        <Box>
          <Heading textAlign={'center'} p={5} size={'lg'}>{t(_t('Deal Management'))}</Heading>
        </Box>
        {isloading ?
          <Progress colorScheme={'blue'} size="xs" isIndeterminate />
          :
          <Box p={'2px'} />
        }
        {deals?.length > 0 ?
          <Box
            bg={'white'}
            borderRadius={5}
            p={'20px'}
            shadow={'0 3px 3px rgba(0,0,0,.15), 0 0 0 rgba(0,0,0,.15)'}
          >
            <ChollitosTable
              columns={columns}
              data={deals}
              index={tableIndex}
              setIndex={setTableIndex}
              size={tableSize}
              setSize={setTableSize}
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
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t(_t("Delete Deal"))}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {t(_t("Are you sure?"))}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onDeleteClose}>
              {t(_t("Cancel"))}
            </Button>
            <Button colorScheme="red" onClick={() => {
              deleteDeal(deleteDealId);
              onDeleteClose();
            }}>
              {t(_t("Delete"))}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditOpen} onClose={onEditClose} closeOnOverlayClick={false} size={'4xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t(_t("Edit Deal"))}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {deal.type === 'deal' ?
              <CreateOrUpdateDeal deal={deal} />
              :
              <CreateOrUpdateDiscount discount={deal} />
            }
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onEditClose}>
              {t(_t("Cancel"))}
            </Button>
            <Button colorScheme="blue" onClick={() => {
              onEditClose();
            }}>
              {t(_t("Update"))}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AdminDeal;