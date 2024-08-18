import { useContext } from "react";
import useAdmin from "../Hooks/useAdmin";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import loaderimg from '../../src/images/loader3.gif';


const AdminPrivateRoute = ({children}) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const {user, loader} = useContext(AuthContext);
    const location = useLocation();
    if(loader || isAdminLoading){
        return <img style={{display: 'flex', justifyContent: 'center', alignContent: 'center',width: '100%', height: '100vh'}} src={loaderimg} alt={loaderimg} />
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to={'/'} state={{ from: location }} replace ></Navigate>;
};

export default AdminPrivateRoute;