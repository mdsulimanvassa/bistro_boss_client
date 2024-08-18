import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import PrivateRoute from './PrivateRoute';
import AllUser from "../Pages/Dashboard/AllUser/AllUser";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminPrivateRoute from './AdminPrivateRoute';
import ManageItem from "../Pages/Dashboard/ManageItem/ManageItem";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/home',
        element: <Home></Home>
      },
      {
        path: '/menu',
        element:<Menu></Menu>
      },
      {
        path: '/order/:category',
        element: <Order></Order>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      //user route post
      {
        path: 'userHome',
        element: <UserHome></UserHome>
      },
      {
        path: 'cart',
        element: <Cart></Cart>
      },
      {
        path: 'payment',
        element: <Payment></Payment>
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      },
      //admin route post
      {
        path: 'adminHome',
        element: <AdminPrivateRoute><AdminHome></AdminHome></AdminPrivateRoute>
      },
      {
        path: 'addItems',
        element: <AdminPrivateRoute><AddItems></AddItems></AdminPrivateRoute>
      },
      {
        path:'users',
        element: <AdminPrivateRoute><AllUser></AllUser></AdminPrivateRoute>
      },
      {
        path: 'manageItem',
        element: <AdminPrivateRoute><ManageItem></ManageItem></AdminPrivateRoute>
      },
      {
        path: 'updateItem/:id',
        element: <AdminPrivateRoute><UpdateItem></UpdateItem></AdminPrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:4000/menu/${params.id}`)
      },
    ]
  },
]);