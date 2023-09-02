import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { _t } from "../Utils/_t";

const Page404 = () => {
  const {t} = useTranslation()
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <>
      <Helmet>
        <title>{t(_t("Chollitos"))} - {t(_t("Page not found"))}</title>
      </Helmet>
      <Flex
        align="center"
        justify="center"
        minHeight="calc(100vh - 54px)"
        direction="column"
        textAlign="center"
      >
        <Heading as="h1" size="4xl" mb={4}>
          404
        </Heading>
        <Text fontSize="xl">{t(_t("Page not found"))}</Text>
        <Button onClick={handleGoBack} colorScheme="blue" mt={5}>
          {t(_t("Back"))}
        </Button>
      </Flex>
    </>
  );
}

export default Page404;