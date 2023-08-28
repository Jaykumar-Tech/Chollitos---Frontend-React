import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from "./Components/Routes";
import Navbar from './Layouts';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
