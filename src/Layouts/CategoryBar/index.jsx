import { Flex, Divider } from "@chakra-ui/react";
import Category from "./categories";
import TabBar from "./tabs";

function DoubleTopBar({ categories, categorySlug }) {
  return (
    <Flex direction="column">
      <Category categories={categories} categorySlug={categorySlug} />
      <Divider />
      <TabBar />
    </Flex>
  );
}

export default DoubleTopBar;