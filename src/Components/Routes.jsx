import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Home from "../Pages/Home";
import CreateOrUpdateDeal from "../Pages/Create/deal";
import CreateOrUpdateDiscount from "../Pages/Create/discount";
import Deal from "../Pages/Deal";
import Store from "../Pages/Store";
import AllShops from "../Pages/Store/all";
import Category from "../Pages/Category";
import AllCategories from "../Pages/Category/all";
import Free from "../Pages/Free";
import Vip from "../Pages/Vip";
import Page404 from "../Pages/404";
import UploadDeal from "../Pages/UploadDeal";
import User from "../Pages/Admin/User";
import AdminCategory from "../Pages/Admin/Category";
import AdminStore from "../Pages/Admin/Store";
import ManageDeal from "../Pages/Admin/Deal";
import Banner from "../Pages/Admin/Banner";


function Routes() {
  const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem('authToken')));

  useEffect(() => {
    if (localStorage.getItem('authToken'))
      setAuthToken(JSON.parse(localStorage.getItem('authToken')));
  }, []);

  return (
    <Box minH={'calc(100vh - 54px)'} bg={'gray.100'}>
      <Switch>
        <Route exact path="/" component={Home} />
        {authToken && <Route exact path="/create/deal" component={CreateOrUpdateDeal} />}
        {authToken && <Route exact path="/create/discount" component={CreateOrUpdateDiscount} />}
        <Route exact path="/categories" component={AllCategories} />
        <Route path="/category/:categorySlug" component={Category} />
        <Route exact path="/shops" component={AllShops} />
        <Route path="/shop/:store_name" component={Store} />
        {authToken && <Route exact path="/deals" component={ManageDeal} />}
        <Route path="/deal/:dealTitle" component={Deal} />
        <Route exact path="/free" component={Free} />
        {(authToken?.user?.role === 'vip' || authToken?.user?.role === 'admin') && <Route exact path="/vip" component={Vip} />}
        {authToken?.user?.role === 'admin' && <Route exact path="/upload" component={UploadDeal} />}
        {authToken?.user?.role === 'admin' &&
          <Switch>
            <Route exact path="/admin/banner" component={Banner} />
            <Route exact path="/admin/users" component={User} />
            <Route exact path="/admin/categories" component={AdminCategory} />
            <Route exact path="/admin/shops" component={AdminStore} />
            <Route component={Page404} />
          </Switch>
        }
        <Route component={Page404} />
      </Switch>
    </Box>
  );
}

export default Routes;