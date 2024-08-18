
import FoodCart from '../../../components/FoodCart/FoodCart';

const OrderTab = ({item}) => {
    return (
        <div>
            <div className="order-containt">
                {
                    item.map(item => <FoodCart key={item._id} item={item}></FoodCart>)
                }
            </div>
        </div>
    );
};

export default OrderTab;