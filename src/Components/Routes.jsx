import { Switch, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Home from "../Pages/Home";
import CreateDeal from "../Pages/Create/deal";
import CreateDiscount from "../Pages/Create/discount";
import Deal from "../Pages/Deal";
import Store from "../Pages/Store";
import Category from "../Pages/Category";
import Page404 from "../Pages/404";

function Routes() {
  return (
    <Box minH={'calc(100vh - 54px)'} bg={'gray.100'}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create/deal" component={CreateDeal} />
          <Route path="/create/discount" component={CreateDiscount} />
          <Route path="/categories/:categorySlug" component={Category} />
          <Route exact path="/shops/:store_name" component={Store} />
          <Route path="/shops/:store_name/:dealTitle" component={Deal} />
          <Route component={Page404} />
        </Switch>
    </Box>
  );
}

export default Routes;