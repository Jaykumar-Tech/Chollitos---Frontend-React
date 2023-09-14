import { Divider, Text, Button, Box } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { _t } from "../../Utils/_t";
import { useTranslation } from "react-i18next";

const PopularShops = ({ _stores }) => {
  const { t } = useTranslation();
  const themeColor = 'blue.500';
  const currentDate = new Date();
  const month = currentDate.toLocaleString('en-US', { month: 'long' });

  return (
    <Box p={2}>
      <Text fontWeight={600}>{t(_t("Popular shops"))}</Text>
      <Divider m={'5px 0 10px'} borderColor={'gray.500'} />
      <Text fontSize={'0.9em'}>
        {t(_t("Working codes, discounts and vouchers for"))} {month} {currentDate.getFullYear()}
      </Text>
      <Box pt={2}>
        {_stores
          ?.filter(store => store.status)
          .slice(0, 10).map((store, index) => (
            <Button
              as={Link}
              to={`/shop/${store.name}`}
              key={index}
              mr={2}
              mb={2}
              height={'2em'}
              minW={'auto'}
              fontSize={'0.9em'}
              fontWeight={400}
              bg={'gray.200'}
              _hover={{
                bg: 'gray.300',
              }}
            >
              {store.name}
            </Button>
          ))}
      </Box>
      <Box
        fontSize={'0.9em'}
        p={1}
        color={themeColor}
        _hover={{ color: 'gray.800' }}
      >
        <Link to="/shops">
          {t(_t("All Shops"))} <ArrowForwardIcon />
        </Link>
      </Box>
    </Box>
  )
}

export default PopularShops;