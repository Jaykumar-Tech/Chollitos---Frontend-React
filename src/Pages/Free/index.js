import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import TabBar from "../../Layouts/CategoryBar/tabs";
import CustomCard from "../../Components/Cards";
import { Spinner } from "@chakra-ui/react";
import { getDealByFilter } from "../../Services/Deal";
import { Helmet } from "react-helmet";
import { useTranslation } from 'react-i18next';
import { _t } from "../../Utils/_t";

const Free = () => {
  const { t, i18n } = useTranslation();
  const [deals, setDeals] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [dealFeature, setDealFeature] = useState("new");

  const getDeals = async () => {
    setIsloading(true);
    const data = await getDealByFilter({
      start_at: 0,
      length: 100,
      type: "free",
      feature: dealFeature
    });
    setDeals(data);
    setIsloading(false);
  };

  useEffect(() => {
    i18n.changeLanguage('en');
    console.log(t('enTranslate'));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getDeals();
    };

    fetchData();
  }, [dealFeature]);

  return (
    <>
      <Helmet>
        <title>{t(_t("Chollitos"))} - {t(_t("free"))} {t(_t("deals"))} </title>
      </Helmet>
      <TabBar setFeature={setDealFeature} />
      <Box maxW={'1200px'} m={'auto'}>
        <Breadcrumb
          separator=">"
          p={5}
          fontSize={'0.9em'}>
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
              {t(_t("Free"))}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box>
          <SimpleGrid
            flex={1}
            columns={[1, 2, 3, 4]}
            spacingX={2}
            spacingY={5}
            m={'0 10px 20px'}
            position={'relative'}
          >
            {isloading &&
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                position="absolute"
                top="200px"
                left="calc(50% - 20px)"
                transform="translate(-50%, -50%)"
                opacity={1}
                zIndex={1}
              />
            }
            {deals && deals.map((deal, index) => (
              <Box key={deal.id} opacity={isloading ? 0.3 : 1}>
                <CustomCard deal={deal} />
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};

export default Free;
