import React from "react";
import { Input, Button, InputGroup, InputRightElement, useBreakpointValue } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { _t } from "../../Utils/_t";

export default function SearchBar() {
  const {t} = useTranslation()
  const searchMode = useBreakpointValue({ base: "sm", sm: "md", md: "lg" });
  const themeColor = "blue.500"

  return (
    <>
      {searchMode === 'lg' ? (
        <InputGroup
          bg={'white'}
          maxW={'300px'}
          borderRadius={'5px'}
          ml={'10px'}
          display={{ base: 'none', md: 'block' }}
        >
          <Input placeholder={t(_t("Search"))+"..."} />
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