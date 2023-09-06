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


function Routes() {
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
        <Route component={Page404} />
      </Switch>
    </Box>
  );
}

export default Routes;