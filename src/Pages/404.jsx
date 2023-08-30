import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

const Page404 = () => {

  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <>
      <Helmet>
        <title>Page not found</title>
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
        <Text fontSize="xl">Page Not Found</Text>
        <Button onClick={handleGoBack} colorScheme="blue" mt={5}>
          Back
        </Button>
      </Flex>
    </>
  );
}

export default Page404;