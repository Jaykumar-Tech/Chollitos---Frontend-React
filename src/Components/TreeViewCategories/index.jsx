import {
  Divider,
  Text,
  Box,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const TreeViewCategories = ({ categories, categorySlug }) => {

  const [treeData, setTreeData] = useState([]);
  const themeColor = '#007ea6';

  useEffect(() => {
    setTreeData(buildTree(-1));
  }, [categories]);

  const buildTree = (parentId) => {
    return categories
      .filter((category) => category.parent_id == parentId)
      .map((category) => ({
        ...category,
        children: buildTree(category.id),
      }));
  };

  const renderTree = (categories) => {
    return (
      <UnorderedList
        listStyleType={'none'}
        color={themeColor}
      >
        {categories.map((category) => (
          <Link to={"/category/" + category.slug}>
            <ListItem
              key={category.id}
            >
              <Text
                _hover={{ textDecoration: "underline" }}
                fontWeight={categorySlug == category.slug ? 600 : 400}
                fontSize={'0.95em'}
              >
                {category.name}
              </Text>
              {category.children && renderTree(category.children)}
            </ListItem>
          </Link>
        ))}
      </UnorderedList>
    );
  };

  return (
    <Box p={2}>
      <Text fontWeight={600}>Categories</Text>
      <Divider m={'5px 0 10px'} borderColor={'gray.500'} />
      <Box ml={'-16px'}>{renderTree(treeData)}</Box>
    </Box>
  )
}

export default TreeViewCategories;