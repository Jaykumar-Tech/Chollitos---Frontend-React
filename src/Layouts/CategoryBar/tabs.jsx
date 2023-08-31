import { Tab, TabList, Tabs, Box, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { _t } from "../../Utils/_t";

function TabBar({ setFeature }) {
  const {t} = useTranslation();
  const themeColor = "blue.500";
  const tabList = [t(_t('New')), t(_t('Popular')), t(_t('Highlights')), t(_t('VIP(v@v.com,vip)'))];
  const tabFeatureList = ['new', 'popular', 'highlight', 'vip'];
  const toast = useToast();

  const setFeatureInTab = (index) => {
    if (index < 3) setFeature(tabFeatureList[index]);
    else {
      const auth_token = JSON.parse(localStorage.getItem('authToken'));
      if (auth_token && auth_token.user.role != "vip") {
        toast({
          title: 'Error.',
          description: t(_t("You don't have a access to VIP")),
          position: 'top',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
      else if (auth_token) {
        setFeature(tabFeatureList[index]);
      }
    }
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