import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Landing from "./Pages/LandingPage";
import Home from "./Pages/HomePage";
import VehicleDetails from "./Pages/VehicleDetails";
import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ReservaForm from "./Pages/ReservaForm";
import Pago from "./Pages/Pago";
import PagoExitoso from "./Pages/Pago/PagoExitoso";
import PagoCancelado from "./Pages/Pago/PagoCancelado";
import ScrollToTop from "./Components/ScrollToTop";
const AppRoutes = () =>{
    
    return(
            <BrowserRouter>
                <ScrollToTop/>
                <Routes>
                    <Route path="/" element={<Landing/>}></Route>
                    <Route path="/homePage" element={<Home/>}></Route>
                    <Route path="/vehicle/:placa" element={<VehicleDetails/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/register" element={<Register/>}></Route>
                    <Route path="/profile" element={<Profile/>}></Route>
                    <Route path="/dashboard" element={<Dashboard/>}></Route>
                    <Route path="/reserva-form" element={<ReservaForm/>}></Route>
                    <Route path="/pago/:idFactura" element={<Pago/>}></Route>
                    <Route path="/pago-exitoso" element={<PagoExitoso/>}></Route>
                    <Route path="/pago-cancelado" element={<PagoCancelado/>}></Route>
                </Routes>
            
            </BrowserRouter>
        )
}

export default AppRoutes;