import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Landing from "./Pages/LandingPage";
import Home from "./Pages/HomePage";
import ProductDetails from "./Pages/ProductDetails";
const AppRoutes = () =>{
    
    return(
            <BrowserRouter>
            
                <Routes>
                    <Route path="/" element={<Landing/>}></Route>
                    <Route path="/homePage" element={<Home/>}></Route>
                    <Route path="/vehicle/:placa" element={<ProductDetails/>}></Route>
                </Routes>
            <Footer/>
            </BrowserRouter>
        )
}

export default AppRoutes;