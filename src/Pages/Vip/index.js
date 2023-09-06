import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, Center, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import TabBar from "../../Layouts/CategoryBar/tabs";
import CustomCard from "../../Components/Cards";
import { Spinner } from "@chakra-ui/react";
import { getDealByFilter } from "../../Services/Deal";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from 'react-i18next';
import { _t } from "../../Utils/_t";

const Vip = () => {
  const { t } = useTranslation();
  const [deals, setDeals] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [dealFeature, setDealFeature] = useState("new");
  const history = useHistory();
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
      vip: 1,
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
    const auth_token = JSON.parse(localStorage.getItem('authToken'));
    if (!auth_token || auth_token.user.role !== "vip") history.push('/404');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getDeals(false);
    };

    fetchData();
  }, [dealFeature]);

  return (
    <>
      <Helmet>
        <title>{t(_t("Chollitos"))} - {t(_t("VIP"))} {t(_t("deals"))} </title>
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
              {t(_t("VIP"))}
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
                position="fixed"
                top="50%"
                left="calc(50% - 25px)"
                transform="translate(-50%, -50%)"
                opacity={1}
                zIndex={1}
              />
            }
            {deals && deals.map((deal) => (
              <Box key={deal.id} opacity={isloading ? 0.3 : 1}>
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
                Load more
              </Button>
            </Center>
          }
        </Box>
      </Box>
    </>
  );
};

export default Vip;
