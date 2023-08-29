import React, { useEffect, useState } from "react";
import DoubleTopBar from "../../Layouts/CategoryBar";
import MyBreadcrumb from "../../Layouts/BreadCrumb";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import CustomCard from "../../Components/Cards";
import { Spinner, useBreakpointValue } from "@chakra-ui/react";
import PopularCategories from "../../Components/PopularCategories";
import PopularShops from "../../Components/PopularShops";
import { getCategoriesService, } from "../../Services/Category";
import { getStoresService, } from "../../Services/Store";
import { getDealByFilter, getDealsService, } from "../../Services/Deal";
import { Helmet } from "react-helmet";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [deals, setDeals] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [dealFeature, setDealFeature] = useState("new");

  const appMode = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });

  const getCategories = async () => {
    const data = await getCategoriesService();
    setCategories(data);
  };

  const getStores = async () => {
    const data = await getStoresService();
    setStores(data);
  };

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
    getCategories();
    getStores();
    getDeals();
  }, []);

  useEffect(() => {
    getDeals();
  }, [dealFeature]);

  return (
    <>
      <Helmet>
        <title>Chollitos {dealFeature} deals</title>
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
              {deals.map((deal, index) => (
                <Box key={index} opacity={isloading ? 0.3 : 1}>
                  <CustomCard key={index} deal={deal} />
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
