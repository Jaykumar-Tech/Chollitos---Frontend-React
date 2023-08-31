import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../Components/GlobalContext";
import { useParams } from 'react-router-dom';
import MyBreadcrumb from "../../Layouts/BreadCrumb";
import CategoryBar from "../../Layouts/CategoryBar/categories";
import { Box, Flex, SimpleGrid, useBreakpointValue, Spinner } from "@chakra-ui/react";
import CustomCard from "../../Components/Cards";
import TreeViewCategories from "../../Components/TreeViewCategories";
import { getDealsService, getFilterDealsService } from "../../Services/Deal";
import { Helmet } from "react-helmet";

const Category = () => {
  const { globalProps } = useContext(GlobalContext);
  const { categories } = globalProps;
  const { categorySlug } = useParams();
  const [deals, setDeals] = useState([]);
  const [isloading, setIsloading] = useState(false);

  const appMode = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });

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
    const fetchData = async () => {
      await getDeals();
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Chollitos - {categorySlug} deals</title>
      </Helmet>
      <Box
        shadow={'0 3px 3px rgba(0,0,0,.15), 0 0 0 rgba(0,0,0,.15)'}
      >
        <CategoryBar categories={categories} categorySlug={categorySlug} />
      </Box>
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
              m={'0 10px 20px'}
              position={'relative'}
              minW={'calc(80% - 20px)'}
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
              {deals.map((deal) => (
                <Box key={deal.id} opacity={isloading ? 0.3 : 1}>
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
