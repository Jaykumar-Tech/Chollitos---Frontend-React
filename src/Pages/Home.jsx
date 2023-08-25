import React, { useEffect, useState } from "react";
import DoubleTopBar from "../Layouts/CategoryBar";
import MyBreadcrumb from "../Layouts/BreadCrumb";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import CustomCard from "../Components/Cards";
import { Text, useBreakpointValue } from "@chakra-ui/react";
import PopularCategories from "../Components/PopularCategories";
import PopularShops from "../Components/PopularShops";
import { getCategoriesService, } from "../Services/Category";
import { getStoresService, } from "../Services/Store";
import { getDealsService, } from "../Services/Deal";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [deals, setDeals] = useState([]);

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
    const data = await getDealsService();
    setDeals(data);
  };

  useEffect(() => {
    getCategories();
    getStores();
    getDeals();
  }, []);

  return (
    <>
      <DoubleTopBar categories={categories} />
      <Box maxW={'1200px'} m={'auto'}>
        <MyBreadcrumb/>
        <Box id="Home">
          <Flex>
            <SimpleGrid
              flex={1}
              columns={[1, 2, 3, 4]}
              spacingX={2}
              spacingY={5}
              m={'0 10px'}
            >
              {deals.map((deal, index) => (
                <CustomCard deal={deal}/>
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
