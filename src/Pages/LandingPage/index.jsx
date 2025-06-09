import Banner from "../../Components/Banner";
import Header from "../../Components/Header";
import HighlightSection from "../../Components/HighlIghtSection";
import SearchBox from "../../Components/SearchBox";
import TerrenoSection from "../../Components/TerrenoSection";
import styles from "./index.module.css"
const Home =()=>{
    return(
        <div>
            <Header/>
            <Banner/>
            <TerrenoSection/>
            <HighlightSection/>
        </div>
    )
}

export default Home;