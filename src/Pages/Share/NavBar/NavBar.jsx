import { Link } from 'react-router-dom';
import './NavBar.css';
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { FaCartShopping } from 'react-icons/fa6';
import useCart from '../../../Hooks/useCart';
import useAdmin from './../../../Hooks/useAdmin';

const NavBar = () => {
    const [cart] = useCart();
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();

    const handleLogOut = () => {
        logOut();
    }
    return (
        <>
            <div className="navbar_container">
                <div className="logo">
                    <Link to={'/'} >Bistro Boss</Link>
                </div>
                <div className="navbar-li">
                    <ul className="">
                        <li><Link to={'/home'}>Home</Link></li>
                        <li><Link to={'/menu'}>Our Menu</Link></li>
                        <li><Link to={'/order/salad'}>Order Food</Link></li>
                        {
                            user && isAdmin && <li><Link to={'/dashboard/adminHome'}>Bashboard</Link></li>
                        }
                        {
                            user && !isAdmin && <li><Link to={'/dashboard/userHome'}>Bashboard</Link></li>
                        }
                        <li>
                            <Link to={'/dashboard/cart'}>
                                    <FaCartShopping className='icons'/>
                                    <span className='badge badge-secondary'>+{cart.length}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="sign-in">
                    <ul>
                        {
                            user ? <><button onClick={handleLogOut} className="login-control">LogOut</button></> : <><li><Link className='login-control' to={'/login'}>Sign In</Link></li></>
                        }
                    </ul>
                </div>
            </div>
        </>
    );
};

export default NavBar;