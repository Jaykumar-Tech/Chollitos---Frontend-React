import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function Navigation() {
  return (
    <>
      <Link to="/">
        <Button variant="link">Home</Button>
      </Link>
      <Link to="/about">
        <Button variant="link">About</Button>
      </Link>
    </>
  );
}

export default Navigation;