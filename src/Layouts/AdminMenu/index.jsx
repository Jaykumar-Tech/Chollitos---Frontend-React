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

const AdminMenu = () => {
  const { t } = useTranslation()

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
        <Link to="/admin/users">
          <MenuItem>{t(_t("Users"))}</MenuItem>
        </Link>
        <Link to="/admin/categories">
          <MenuItem>{t(_t("Categories"))}</MenuItem>
        </Link>
        <Link to="/admin/shops">
          <MenuItem>{t(_t("Shops"))}</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  )
}

export default AdminMenu;