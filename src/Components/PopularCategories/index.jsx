import { Divider, Text, Button, Box } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { _t } from "../../Utils/_t";
import { useState } from "react";

const PopularCategories = ({ _categories }) => {
  const { t } = useTranslation()
  const themeColor = 'blue.500';
  const currentDate = new Date();
  const month = currentDate.toLocaleString('en-US', { month: 'long' });
  const [categories, setCategories] = useState(_categories.filter(category=>(category.status)))

  return (
    <Box p={2}>
      <Text fontWeight={600}>{t(_t("Popular categories"))}</Text>
      <Divider m={'5px 0 10px'} borderColor={'gray.500'} />
      <Text fontSize={'0.9em'}>
        {t(_t("Working discounts, coupons for"))} {month} {currentDate.getFullYear()}
      </Text>
      <Box pt={2}>
        {categories.map((category, index) => (
          category.parent_id === -1 &&
          <Link to={"/category/" + category.slug} key={category.id}>
            <Button
              key={category.id}
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
              {category.name}
            </Button>
          </Link>
        ))}
      </Box>
      <Box
        fontSize={'0.9em'}
        p={1}
        color={themeColor}
        _hover={{ color: 'gray.800' }}
      >
        <Link to="/categories">
          {t(_t("All Categories"))} <ArrowForwardIcon />
        </Link>
      </Box>
    </Box>
  )
}

export default PopularCategories;