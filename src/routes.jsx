import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Landing from "./Pages/LandingPage";
import Home from "./Pages/HomePage";
import VehicleDetails from "./Pages/VehicleDetails";
import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
const AppRoutes = () =>{
    
    return(
            <BrowserRouter>
            
                <Routes>
                    <Route path="/" element={<Landing/>}></Route>
                    <Route path="/homePage" element={<Home/>}></Route>
                    <Route path="/vehicle/:placa" element={<VehicleDetails/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/register" element={<Register/>}></Route>
                </Routes>
            <Footer/>
            </BrowserRouter>
        )
}

export default AppRoutes;