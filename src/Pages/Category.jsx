import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import DoubleTopBar from "../Layouts/CategoryBar";
import MyBreadcrumb from "../Layouts/BreadCrumb";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import CustomCard from "../Components/Cards";
import { Text, useBreakpointValue } from "@chakra-ui/react";
import TreeViewCategories from "../Components/TreeViewCategories";
import { getCategoriesService, } from "../Services/Category";
import { getStoresService, } from "../Services/Store";
import { getDealsService, } from "../Services/Deal";

const Category = () => {
  const { categoryId } = useParams();
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
        <MyBreadcrumb />
        <Box id="Home">
          <Flex>
            {appMode === 'lg' &&
              <Box
                width={'20%'}
              >
                <TreeViewCategories
                  categories={categories}
                  categoryId={categoryId}
                />
              </Box>
            }
            <SimpleGrid
              flex={1}
              columns={[1, 2, 3, 4]}
              spacingX={2}
              spacingY={5}
              m={'0 10px'}
            >
              {deals.map((deal, index) => (
                <CustomCard deal={deal} />
              ))}
            </SimpleGrid>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Category;
