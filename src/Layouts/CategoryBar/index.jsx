import { Flex, Divider } from "@chakra-ui/react";
import CategoryBar from "./categories";
import TabBar from "./tabs";

function DoubleTopBar({ categories, setFeature }) {
  return (
    <Flex direction="column">
      <CategoryBar _categories={categories} />
      <Divider />
      <TabBar setFeature={setFeature}/>
    </Flex>
  );
}

export default DoubleTopBar;