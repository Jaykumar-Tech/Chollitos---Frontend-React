import { Divider, Text, Button, Flex, Box } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const PopularCategories = ({ categories }) => {
  const themeColor = '#007ea6';
  const currentDate = new Date();
  const month = currentDate.toLocaleString('en-US', { month: 'long' });

  return (
    <Box p={2}>
      <Text fontWeight={600}>Popular categories</Text>
      <Divider m={'5px 0 10px'} borderColor={'gray.500'}/>
      <Text fontSize={'0.9em'}>
        Working discounts, coupons for {month} {currentDate.getFullYear()}
      </Text>
      <Box pt={2}>
        {categories.map((category, index) => (
          category.parent_id === -1 &&
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
        ))}
      </Box>
      <Box
        fontSize={'0.9em'}
        p={1}
        color={themeColor}
        _hover={{ color: 'gray.800' }}
      >
        <Link
          href="#"
          to="#"
        >
          All Categories <ArrowForwardIcon />
        </Link>
      </Box>
    </Box>
  )
}

export default PopularCategories;