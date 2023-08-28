import { Tab, TabList, Tabs, Box } from "@chakra-ui/react";

function TabBar() {
  const themeColor = "blue.500";
  const tabList = ['New', 'Popular', 'Highlights', 'Commented'];

  return (
    <Box
      bg="white"
      boxShadow={'0 3px 3px rgba(0,0,0,.15), 0 0 0 rgba(0,0,0,.15)'}
    >
      <Box maxW={'1200px'} m={'auto'}>
        <Tabs>
          <TabList height={'54px'} borderBottomColor={'transparent'}>
            {tabList.map((tap, index) => (
              <Tab
                key={index}
                ml={2}
                fontSize={{ base: '0.8em', md: '1em' }}
                fontWeight={600}
                _selected={{
                  color: themeColor,
                  borderBottom: `solid 3px`,
                  borderBlockColor: 'blue.500'
                }}
                _hover={{
                  color: themeColor,
                  borderBottom: `solid 3px`,
                  borderBlockColor: 'blue.500'
                }}
              >
                {tap}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </Box>
    </Box>
  )
}

export default TabBar;