import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from "./Components/Routes";
import Navigation from "./Layouts/Navigation";
import Navbar from './Layouts';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* <Navigation /> */}
      <Routes />
    </BrowserRouter>
  );
}

export default App;
