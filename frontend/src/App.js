import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/Login.js";
import Navbar from "./components/Navbar.js";
import Signup from "./components/Signup.js";
import Workoutdetail from "./components/Workoutdetail.js";
import Home from "./pages/Home.js";
import Routing from "./utils/Routing.js";

function App() {
  return (
     
      <div className="App">
    
        <Navbar />
        <Routing/>
    </div>
   

  );
}
export default App;
