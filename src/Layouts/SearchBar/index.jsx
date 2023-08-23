import React from "react";
import { Input, Button, InputGroup, InputRightElement, useBreakpointValue } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function SearchBar() {
  const searchMode = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });
  const themeColor = "#007ea6"

  return (
    <>
      {searchMode === 'lg' ? (
        <InputGroup
          bg={'white'}
          maxW={'220px'}
          borderRadius={'5px'}
          ml={'10px'}
          display={{ base: 'none', md: 'block' }}
        >
          <Input placeholder="Search..." />
          <InputRightElement children={<SearchIcon />} />
        </InputGroup>
      ) : (
        <Button
          className="btnRes"
          border={`solid white 2px`}
          bg={themeColor}
          color={'white'}
          _hover={{
            color: themeColor,
            bg: 'white',
          }}
        >
          <SearchIcon />
        </Button>
      )}
    </>
  );
}