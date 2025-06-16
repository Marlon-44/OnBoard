import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Landing from "./Pages/LandingPage";
import Home from "./Pages/HomePage";
const AppRoutes = () =>{
    
    return(
            <BrowserRouter>
            
                <Routes>
                    <Route path="/" element={<Landing/>}></Route>
                    <Route path="/homePage" element={<Home/>}></Route>
                </Routes>
            <Footer/>
            </BrowserRouter>
        )
}

export default AppRoutes;