import {
  Divider,
  Text,
  Box,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const TreeViewCategories = ({ categories, categorySlug, filterDeals }) => {

  const [treeData, setTreeData] = useState([]);
  const [filterData, setFilter] = useState([]);
  const themeColor = '#007ea6';

  useEffect(() => {
    setTreeData(buildTree(-1));
    buildFilter();
  }, [categories]);

  useEffect(() => {
    var curId = buildFilter();
    if (curId >= 0) {
      filterDeals(getAllChildren(curId))
    }

  }, [categorySlug]);

  const buildTree = (parentId) => {
    return categories
      .filter((category) => category.parent_id == parentId)
      .map((category) => ({
        ...category,
        children: buildTree(category.id),
      }));
  };

  const getCategoryById = (id) => {
    return categories.find(v => (v.id == id))
  }

  const buildFilter = () => {
    var curId = categories.find(v => (v.slug == categorySlug));
    if (curId) {
      curId = curId.id;
      var tId = curId;
      var families = [];
      while (tId != -1) {
        families.push(tId);
        tId = getCategoryById(tId).parent_id;
      }
      families.push(-1);
      setFilter(families)
      return curId;
    } else
      return -1;
  }

  function getAllChildren(id) {
    var res = [];
    var que = [id];
    while (que.length > 0) {
      var cur = que.shift();
      var isParent = false;
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].parent_id == cur) {
          que.push(categories[i].id);
          isParent = true;
        }
      }
      if (!isParent)
        res.push(cur);
    }
    return res;
  }

  const renderTree = (categories) => {
    return (
      <UnorderedList
        listStyleType={'none'}
        color={themeColor}
      >
        {categories.map((category) => (filterData.findIndex(v => (v == category.parent_id)) >= 0 ?
          <Link to={"/category/" + category.slug}>
            <ListItem
              key={category.id}
            >
              <Text
                _hover={{ textDecoration: "underline" }}
                fontWeight={filterData.find(v=>v==category.id) ? 600 : 400}
                fontSize={'0.95em'}
              >
                {category.name}
              </Text>
              {category.children && renderTree(category.children)}
            </ListItem>
          </Link> : null
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