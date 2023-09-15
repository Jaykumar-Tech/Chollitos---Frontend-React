import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { _t } from "../../Utils/_t";
import { changeLangService } from "../../Services/Lang";

const AdminMenu = () => {
  const { t, i18n } = useTranslation()

  return (
    <Menu>
      <MenuButton
        as={Button}
        border={`solid white 2px`}
        bg={'blue.500'}
        fontWeight={'normal'}
        color={'white'}
        _hover={{
          color: 'blue.500',
          bg: 'white',
        }}
        ml={'10px'}
      >
        {t(_t('Admin'))}
      </MenuButton>
      <MenuList>
        <Link to="/admin/banner">
          <MenuItem>{t(_t("Banner"))}</MenuItem>
        </Link>
        <Link to="/admin/settings">
          <MenuItem>{t(_t("Settings"))}</MenuItem>
        </Link>
        <Link to="/admin/users">
          <MenuItem>{t(_t("Users"))}</MenuItem>
        </Link>
        {/* <Link to="/deals">
          <MenuItem>{t(_t("Deals"))}</MenuItem>
        </Link> */}
        <Link to="/admin/categories">
          <MenuItem>{t(_t("Categories"))}</MenuItem>
        </Link>
        <Link to="/admin/shops">
          <MenuItem>{t(_t("Shops"))}</MenuItem>
        </Link>
        {/* <Menu>
          <MenuButton
            px={3}
            py={2}
            w={'100%'}
            _hover={{ bg: 'gray.100' }}
          >
            <Flex alignItems={'center'}>
              {t(_t("Languages"))}
              <Spacer />
              <ChevronDownIcon />
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleChangeLanguage("en")}>
              English
            </MenuItem>
            <MenuItem onClick={() => handleChangeLanguage("es")}>
              Español
            </MenuItem>
          </MenuList>
        </Menu> */}
      </MenuList>
    </Menu>
  )
}

export default AdminMenu;