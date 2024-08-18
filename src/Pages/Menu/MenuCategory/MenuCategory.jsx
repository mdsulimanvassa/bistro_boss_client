
import { Link } from 'react-router-dom';
import Cover from '../../Share/Cover/Cover';
import MenuItem from '../../Share/MenuItem/MenuItem';
import './MenuCategory.css';

const MenuCategory = ({item, img, title}) => {
    return (
        <div>
            {title && <Cover img={img} title={title}></Cover>}
              <div className="display_menu">
                {
                    item.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`}><button style={{
                textAlign: 'center',
                borderBottom: "2px solid gray",
                borderRadius: '5px',
                margin: '20px auto'
            }}>Show Card</button></Link>
        </div>
    );
};

export default MenuCategory;