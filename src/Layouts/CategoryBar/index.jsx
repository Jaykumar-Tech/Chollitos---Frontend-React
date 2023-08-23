import { Flex, Divider } from "@chakra-ui/react";
import Category from "./categories";
import TabBar from "./tabs";

function DoubleTopBar({categories}) {
  return (
    <Flex direction="column">
      <Category categories={categories} />
      <Divider />
      <TabBar />
    </Flex>
  );
}

export default DoubleTopBar;