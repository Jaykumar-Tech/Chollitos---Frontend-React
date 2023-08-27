import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import DoubleTopBar from "../../Layouts/CategoryBar";
import MyBreadcrumb from "../../Layouts/BreadCrumb";
import { Box, Flex, SimpleGrid, useBreakpointValue, Spinner } from "@chakra-ui/react";
import CustomCard from "../../Components/Cards";
import TreeViewCategories from "../../Components/TreeViewCategories";
import { getCategoriesService, } from "../../Services/Category";
import { getStoresService, } from "../../Services/Store";
import { getDealsService, getFilterDealsService } from "../../Services/Deal";

const Category = () => {
  const { categorySlug } = useParams();
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [deals, setDeals] = useState([]);
  const [isloading, setIsloading] = useState(false);

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
    const data = await getDealsService();
    setDeals(data);
    setIsloading(false);
  };

  const filterDeals = async (catIds) => {
    setIsloading(true);
    const data = await getFilterDealsService(catIds);
    setDeals(data);
    setIsloading(false);
  }

  useEffect(() => {
    getCategories();
    getStores();
    getDeals();
  }, []);

  return (
    <>
      <DoubleTopBar categories={categories} categorySlug={categorySlug} />
      <Box maxW={'1200px'} m={'auto'}>
        <MyBreadcrumb categories={categories} categorySlug={categorySlug} />
        <Box id="Home">
          <Flex>
            {appMode === 'lg' &&
              <Box
                width={'20%'}
              >
                <TreeViewCategories
                  categories={categories}
                  categorySlug={categorySlug}
                  filterDeals={filterDeals}
                />
              </Box>
            }
            <SimpleGrid
              flex={1}
              columns={[1, 2, 3, 4]}
              spacingX={2}
              spacingY={5}
              m={'0 10px'}
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
                  zIndex={1}
                />
              }
              {deals.map((deal, index) => (
                <Box opacity={isloading ? 0.3 : 1}>
                  <CustomCard deal={deal} />
                </Box>
              ))}
            </SimpleGrid>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Category;
