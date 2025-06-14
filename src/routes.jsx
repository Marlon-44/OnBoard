import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/LandingPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const AppRoutes = () =>{
    
    return(
            <BrowserRouter>
            <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                </Routes>
            <Footer/>
            </BrowserRouter>
        )
}

export default AppRoutes;