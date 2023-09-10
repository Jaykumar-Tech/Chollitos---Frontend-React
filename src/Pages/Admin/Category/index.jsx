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
} from '@chakra-ui/react';
import { getCategoriesService } from "../../../Services/Category";
import { FaCheckCircle, FaTimesCircle, FaEdit } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { _t } from "../../../Utils/_t";

const AdminCategory = () => {
  const { globalProps } = useContext(GlobalContext);
  const { _setCategories } = globalProps;
  const [categories, setCategories] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const { t } = useTranslation();

  const columns = [
    {
      Header: t(_t('No')), accessor: 'id',
      Cell: ({ row }) => {
        return row.index + 1;
      }
    },
    {
      Header: t(_t('Image')), accessor: 'image_url',
      Cell: ({ value, row }) => (
        <Avatar name={row.original.name} src={value} size="md" />
      ),
    },
    { Header: t(_t('Name')), accessor: 'name' },
    { Header: t(_t('Slug')), accessor: 'slug' },
    {
      Header: t(_t('Parent')), accessor: 'parent_id',
      Cell: ({ value }) => (
        categories.find(category => (category.id === value))?.name
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
              onClick={() => deactivateCategory(row.original.id)}
            />
            :
            <Icon
              as={FaCheckCircle}
              color="green.500"
              boxSize={5}
              cursor={'pointer'}
              title={t(_t('activate'))}
              onClick={() => activateCategory(row.original.id)}
            />
          }
          <Icon
            as={FaEdit}
            color="blue.500"
            boxSize={5}
            ml={1}
            cursor={'pointer'}
            title={t(_t('edit'))}
            onClick={() => createOrEditCategory(row.original.id)}
          />
        </>
      ),
    },
  ];

  const getCategories = async () => {
    setIsloading(true);
    const data = await getCategoriesService();
    setCategories(data);
    setIsloading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCategories();
    };

    fetchData();
  }, []);

  const activateCategory = (id) => {
    alert(id);
  }

  const deactivateCategory = (id) => {
    alert(id);
  }

  const createOrEditCategory = (id) => {
    alert(id);
  }

  return (
    <>
      <Helmet>
        <title>{t(_t("Chollitos"))} - {t(_t("shops"))} </title>
      </Helmet>
      <Box maxW={'1200px'} m={'auto'}>
        <Box>
          <Heading textAlign={'center'} p={5} size={'lg'}>{t(_t('Category Management'))}</Heading>
        </Box>
        {isloading ?
          <Progress colorScheme={'blue'} size="xs" isIndeterminate />
          :
          <Box p={'2px'} />
        }
        {categories?.length > 0 ?
          <Box
            bg={'white'}
            borderRadius={5}
            p={'20px'}
            shadow={'0 3px 3px rgba(0,0,0,.15), 0 0 0 rgba(0,0,0,.15)'}
          >
            <ChollitosTable
              columns={columns}
              data={categories}
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
    </>
  )
}

export default AdminCategory;