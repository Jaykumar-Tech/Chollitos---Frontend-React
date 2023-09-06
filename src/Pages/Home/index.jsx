import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../Components/GlobalContext";
import DoubleTopBar from "../../Layouts/CategoryBar";
import MyBreadcrumb from "../../Layouts/BreadCrumb";
import { Box, Button, Flex, SimpleGrid, Center } from "@chakra-ui/react";
import CustomCard from "../../Components/Cards";
import { Spinner, useBreakpointValue } from "@chakra-ui/react";
import PopularCategories from "../../Components/PopularCategories";
import PopularShops from "../../Components/PopularShops";
import { getDealByFilter, } from "../../Services/Deal";
import { Helmet } from "react-helmet";
import { useTranslation } from 'react-i18next';
import { _t } from "../../Utils/_t";

const Home = () => {
  const { t } = useTranslation();
  const { globalProps } = useContext(GlobalContext);
  const { categories, stores } = globalProps;
  const [deals, setDeals] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [dealFeature, setDealFeature] = useState("new");
  const appMode = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });
  const [offset, setOffset] = useState(0);
  const [isend, setIsend] = useState(false);
  const limit = 12;

  const getDeals = async (loadmore = true) => {

    setIsloading(true);

    if (!loadmore) {
      setDeals([]);
      setOffset(0);
    }

    const data = await getDealByFilter({
      start_at: loadmore ? offset : 0,
      length: limit + 1,
      feature: dealFeature
    });

    if (data) {

      if (data.length > limit) {
        setIsend(false);
        data.pop();
      } else {
        setIsend(true);
      }
      
      loadmore ? setDeals((prevDeals) => [...prevDeals, ...data]) : setDeals(data);
      setOffset(loadmore ? offset + limit : limit);
    }

    setIsloading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getDeals(false);
    };

    fetchData();
  }, [dealFeature]);

  return (
    <>
      <Helmet>
        <title>{t(_t("Chollitos"))} - {dealFeature} {t(_t("deals"))} </title>
      </Helmet>
      <DoubleTopBar categories={categories} setFeature={setDealFeature} />
      <Box maxW={'1200px'} m={'auto'}>
        <MyBreadcrumb />
        <Box id="Home">
          <Flex>
            <Box flex={1}>
              <SimpleGrid
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
                    position="fixed"
                    top="50%"
                    left="calc(40%)"
                    transform="translate(-50%, -50%)"
                    opacity={1}
                    zIndex={1}
                  />
                }
                {deals && deals.map((deal) => (
                  <Box key={"home_deal" + deal.id} opacity={isloading ? 0.3 : 1}>
                    <CustomCard deal={deal} />
                  </Box>
                ))}
              </SimpleGrid>
              {deals.length > 0 && !isend &&
                <Center w={'100%'} p={5} colSpan={[1, 2, 3, 4]}>
                  <Button
                    colorScheme="blue"
                    onClick={getDeals}
                  >
                    {t(_t("Load more"))}
                  </Button>
                </Center>
              }
            </Box>
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
