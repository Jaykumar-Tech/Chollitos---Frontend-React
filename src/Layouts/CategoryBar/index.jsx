import { Flex, Divider } from "@chakra-ui/react";
import CategoryBar from "./categories";
import TabBar from "./tabs";

function DoubleTopBar({ categories, categorySlug }) {
  return (
    <Flex direction="column">
      <CategoryBar categories={categories} categorySlug={categorySlug} />
      <Divider />
      <TabBar />
    </Flex>
  );
}

export default DoubleTopBar;