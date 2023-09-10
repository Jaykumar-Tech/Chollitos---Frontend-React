import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Home from "../Pages/Home";
import CreateDeal from "../Pages/Create/deal";
import CreateDiscount from "../Pages/Create/discount";
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
import Banner from "../Pages/Admin/Banner";


function Routes() {
  const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem('authToken')));

  useEffect(() => {
    if (localStorage.getItem(authToken))
      setAuthToken(JSON.parse(localStorage.getItem('authToken')));
  }, []);

  return (
    <Box minH={'calc(100vh - 54px)'} bg={'gray.100'}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create/deal" component={CreateDeal} />
        <Route exact path="/create/discount" component={CreateDiscount} />
        <Route exact path="/categories" component={AllCategories} />
        <Route path="/category/:categorySlug" component={Category} />
        <Route exact path="/shops" component={AllShops} />
        <Route path="/shop/:store_name" component={Store} />
        <Route path="/deal/:dealTitle" component={Deal} />
        <Route exact path="/free" component={Free} />
        <Route exact path="/vip" component={Vip} />
        <Route exact path="/upload" component={UploadDeal} />
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