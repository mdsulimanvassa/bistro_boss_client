import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Categary from "../Categary/Categary";
import Feauters from "../Feauters/Feauters";
import PopulerMenu from "../PopulerMenu/PopulerMenu";
import Testimonials from "../Testimonials/Testimonials";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <Categary></Categary>
            <PopulerMenu></PopulerMenu>
            <Feauters></Feauters>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;