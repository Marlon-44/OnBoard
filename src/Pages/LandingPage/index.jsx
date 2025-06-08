import Banner from "../../Components/Banner";
import Header from "../../Components/Header";
import SearchBox from "../../Components/SearchBox";
import TerrenoSection from "../../Components/TerrenoSection";
import styles from "./index.module.css"
const Home =()=>{
    return(
        <div>
            <Header/>
            <Banner/>
            <TerrenoSection/>
        </div>
    )
}

export default Home;