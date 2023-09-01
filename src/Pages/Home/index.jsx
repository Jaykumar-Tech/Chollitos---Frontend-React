import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../Components/GlobalContext";
import DoubleTopBar from "../../Layouts/CategoryBar";
import MyBreadcrumb from "../../Layouts/BreadCrumb";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import CustomCard from "../../Components/Cards";
import { Spinner, useBreakpointValue } from "@chakra-ui/react";
import PopularCategories from "../../Components/PopularCategories";
import PopularShops from "../../Components/PopularShops";
import { getDealByFilter, } from "../../Services/Deal";
import { Helmet } from "react-helmet";
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t, i18n } = useTranslation();
  const { globalProps } = useContext(GlobalContext);
  const { categories, stores } = globalProps;
  const [deals, setDeals] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [dealFeature, setDealFeature] = useState("new");
  const appMode = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });

  const getDeals = async () => {
    setIsloading(true);
    const data = await getDealByFilter({
      start_at: 0,
      length: 100,
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
        <title>Chollitos - {dealFeature} deals </title>
      </Helmet>
      <DoubleTopBar categories={categories} setFeature={setDealFeature} />
      <Box maxW={'1200px'} m={'auto'}>
        <MyBreadcrumb />
        <Box id="Home">
          <Flex>
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
                <Box key={"home_deal"+deal.id} opacity={isloading ? 0.3 : 1}>
                  <CustomCard deal={deal} />
                </Box>
              ))}
            </SimpleGrid>
            {appMode === 'lg' &&
              <Box
                width={'20%'}
              >
                <PopularShops stores={stores} />
                <PopularCategories categories={categories} />
              </Box>
            }
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Home;
