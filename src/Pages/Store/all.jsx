import React, { useState, useContext } from "react";
import { GlobalContext } from "../../Components/GlobalContext";
import { Link } from "react-router-dom";
import {
  Box,
  SimpleGrid,
  Input,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  Avatar,
  Text,
  Flex,
} from "@chakra-ui/react"
import { MdHome } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { _t } from "../../Utils/_t";
import { Helmet } from "react-helmet";

const AllShops = () => {
  const { t } = useTranslation()
  const { globalProps } = useContext(GlobalContext);
  const { stores } = globalProps;
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = stores.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box maxWidth="1200px" m={'auto'} p={'10px'}>
      <Helmet>
        <title>{t(_t("Chollitos"))} - {t(_t("all shops"))}</title>
      </Helmet>
      <Breadcrumb
        separator=">"
        p={5}
        fontSize={'0.9em'}
      >
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link} to="/"
            color={'blue.500'}
          >
            <Icon as={MdHome} boxSize={6} mt={1} />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>
            {t(_t("All Shops"))}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Input placeholder="Search" value={searchTerm} onChange={handleSearch} bg={'white'} />
      <SimpleGrid
        columns={[1, 2, 3, 4]}
        spacing={4}
        p={'10px'}
        m={'20px 0 10px'}
        bg={'white'}
      >
        {filteredItems.map((item, index) => (
          <Link to={"/shop/" + item.name} key={index}>
            <Flex
              key={item.id}
              p={4}
              borderRadius={5}
              cursor={'pointer'}
              _hover={{ bg: 'gray.100' }}
            >
              <Avatar name={item.name} src={item.image} size="md" />
              <Text ml={2} mt={3}>{item.name}</Text>
            </Flex>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AllShops;