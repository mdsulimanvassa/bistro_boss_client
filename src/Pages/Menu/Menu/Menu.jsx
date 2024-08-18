import { Helmet } from 'react-helmet-async';
import './Menu.css';
import Cover from '../../Share/Cover/Cover';
import banerImg from '../../../images/banner3.jpg';
import MenuCategory from '../MenuCategory/MenuCategory';
import useMenu from '../../../Hooks/useMenu';
import soupimg from '../../../images/soup-bg.jpg';
import dessertImg from '../../../images/dessert-bg.jpeg';
import pizzaimg from '../../../images/category-pizza.jpg';
import slaadimg from '../../../images/salad-bg.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';


const Menu = () => {
   
    const [menu] = useMenu();
    const offered = menu.filter(items => items.category === "offered");
    const dessert = menu.filter(items => items.category === "dessert");
    const salad = menu.filter(items => items.category === "salad");
    const soup = menu.filter(items => items.category === "soup");
    const pizza = menu.filter(items => items.category === "pizza");
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={banerImg} title={'OUR MENU'}></Cover>
            <SectionTitle subHading={"Don't Miss"} hading={"Today's Offer"}></SectionTitle>
            <MenuCategory item={offered}></MenuCategory>
            <MenuCategory item={dessert} img={dessertImg} title={'dessert'}></MenuCategory>
            <MenuCategory item={salad} img={slaadimg} title={'salad'}></MenuCategory>
            <MenuCategory item={soup} img={soupimg} title={'soup'}></MenuCategory>
            <MenuCategory item={pizza} img={pizzaimg} title={'pizza'}></MenuCategory>
        </div>
    );
};

export default Menu;