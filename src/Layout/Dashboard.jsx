import { NavLink, Outlet } from 'react-router-dom';
import './Dashboard.css';
import { FaCalculator, FaCartShopping, FaEnvelope, FaList, FaPaypal, FaUsers, FaUtensils } from 'react-icons/fa6';
import { FaAd, FaHome, FaSearchPlus } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import useAdmin from '../Hooks/useAdmin';



const Dashboard = () => {
    const [isAdmin] = useAdmin();
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Dashboard</title>
            </Helmet>
            <div className='dashboard_container'>
                <div className="dashboard-height">
                    <ul>
                        {
                            isAdmin ? <>
                                <li>
                                    <NavLink to={'/dashboard/adminHome'}><FaHome className='dashboard_icons' /><span>Admin Home</span></NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/addItems'}><FaUtensils className='dashboard_icons' /><span>Add Items</span></NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/manageItem'}><FaList className='dashboard_icons' /><span>Manage Items</span></NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/bokings'}><FaAd className='dashboard_icons' /><span>Manage Bokings</span></NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/users'}><FaUsers className='dashboard_icons' /><span>All User</span></NavLink>
                                </li>
                            </>
                                : <>
                                    <li>
                                        <NavLink to={'/dashboard/userHome'}><FaHome className='dashboard_icons' /><span>User Home</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/reservation'}><FaCalculator className='dashboard_icons' /><span>Reservation</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/paymentHistory'}><FaPaypal className='dashboard_icons' /><span>Payment History</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/cart'}><FaCartShopping className='dashboard_icons' /><span>My Cart</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/review'}><FaAd className='dashboard_icons' /><span>Add Review</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/bokings'}><FaList className='dashboard_icons' /><span>My Boking</span></NavLink>
                                    </li>
                                </>
                        }
                        <div className="divider"></div>
                        <li>
                            <NavLink to={'/'}><FaHome className='dashboard_icons' /><span> Home</span></NavLink>
                        </li>
                        <li>
                            <NavLink to={'/order/salad'}><FaSearchPlus className='dashboard_icons' /><span> Menu</span></NavLink>
                        </li>
                        <li>
                            <NavLink to={'/order/salad'}><FaEnvelope className='dashboard_icons' /><span> Contact</span></NavLink>
                        </li>
                    </ul>
                </div>
                <div className="dashboard-content">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default Dashboard;