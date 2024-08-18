import { useContext } from 'react';
import './FoodCart.css';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecoure from '../../Hooks/useAxiosSecoure';
import useCart from '../../Hooks/useCart';

const FoodCart = ({ item }) => {

    const axiosSecoure = useAxiosSecoure();
    const { name, recipe, price, image, _id } = item;
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = useCart();

    const handleFood = () => {
        if(user && user.email){
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price,

            }
            axiosSecoure.post('/carts', cartItem)
            .then(result => {
                if(result.data.insertedId){
                    Swal.fire({
                        position: "top-right",
                        icon: "success",
                        title: `Your ${name} Create Successfully`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                      refetch();
                }
            })
        }
        else{
            Swal.fire({
                title: "You Are Not Logged In",
                text: "Place login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state: { from: location }})
                }
              });
        }
    }
    return (
        <div className='food-wrap'>
            <div className="food-popsition">
                <figure className="px-10 pt-10">
                    <img src={image} alt="Shoes"/>  </figure>
                    <p className='food-price'>${price}</p>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions">
                        <button onClick={() => handleFood(item)} className="btn-content">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCart;