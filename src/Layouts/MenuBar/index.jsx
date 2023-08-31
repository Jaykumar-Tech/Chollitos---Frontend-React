import { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { _t } from "../../Utils/_t";

function MenuBar({ appMode }) {
  const {t} = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box>
      {appMode !== 'lg' ?
        <IconButton
          icon={<HamburgerIcon />}
          variant="outline"
          onClick={handleToggle}
          aria-label="Toggle Menu"
          size="md"
          border={0}
          color={'white'}
          _hover={{
            color: 'blue.500',
            bg: 'white',
          }}
        />
        :
        <Button
          variant="outline"
          onClick={handleToggle}
          aria-label="Toggle Menu"
          size="md"
          border={'2px'}
          color={'white'}
          _hover={{
            color: 'blue.500',
            bg: 'white',
          }}
        >
          Menu
        </Button>
      }
      <Drawer
        isOpen={isOpen}
        placement={appMode === 'lg' ? "top" : "left"}
        onClose={handleToggle}
      >
        <DrawerOverlay>
          <DrawerContent
            color={appMode === 'lg' ? 'white' : 'blue.500'}
            bg={appMode === 'lg' ? 'blue.500' : 'white'}
            minWidth={'100vw'}
          >
            <DrawerCloseButton />
            <DrawerHeader></DrawerHeader>
            <DrawerBody>
              
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
}

export default MenuBar;