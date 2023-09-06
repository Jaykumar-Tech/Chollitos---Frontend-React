import { Tab, TabList, Tabs, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { _t } from "../../Utils/_t";

function TabBar({ setFeature }) {
  const { t } = useTranslation();
  const themeColor = "blue.500";
  const tabList = [t(_t('New')), t(_t('Popular')), t(_t('Highlights')), t(_t('Commented'))];
  const tabFeatureList = ['new', 'popular', 'highlight', 'commented'];

  const setFeatureInTab = (index) => {
    setFeature(tabFeatureList[index]);
  }

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
                onClick={() => setFeatureInTab(index)}
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