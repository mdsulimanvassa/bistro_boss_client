
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import './PopulerMenu.css';
import MenuItem from '../../Share/MenuItem/MenuItem';
import useMenu from './../../../Hooks/useMenu';

const PopulerMenu = () => {

    const [menu] = useMenu();
    const populerMenu = menu.filter(items => items.category === "popular");

    return (
        <section>
            <SectionTitle 
            subHading={'Populers items'}
            hading={'FROM OUR MENU'}
            ></SectionTitle>
            <div className="display_menu">
                {
                    populerMenu.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
        </section>
    );
};

export default PopulerMenu;