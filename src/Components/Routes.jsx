import { Switch, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Home from "../Pages/Home";
import Create from "../Pages/Create";
import Deal from "../Pages/Deal";
import Category from "../Pages/Category";

function Routes() {
  return (
    <Box minH={'calc(100vh - 54px)'} bg={'gray.100'}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/deal" component={Deal} />
          <Route path="/category/:categorySlug" component={Category} />
        </Switch>
    </Box>
  );
}

export default Routes;