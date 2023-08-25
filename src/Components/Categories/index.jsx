import { Divider, Text, Box } from "@chakra-ui/react";

const Categories = ({ categories }) => {
  const themeColor = '#007ea6';
  const currentDate = new Date();
  const month = currentDate.toLocaleString('en-US', { month: 'long' });

  return (
    <Box p={2}>
      <Text fontWeight={600}>Categories</Text>
      <Divider m={'5px 0 10px'} borderColor={'gray.500'}/>
      <Box pt={2}>
        
      </Box>
    </Box>
  )
}

export default Categories;