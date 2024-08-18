import './MenuItem.css';

const MenuItem = ({item}) => {
    const {name, recipe, price, image} = item;
    return (
        <div className='dispay_menu_wrap'>
            <img src={image} alt={image} />
            <div className="dispay_menu_text">
                <h1>{name}---------</h1>
                <p>{recipe}</p>
            </div>
            <p>${price}</p>
        </div>
    );
};

export default MenuItem;