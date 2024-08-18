import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import loaderimg from '../../src/images/loader3.gif';

const PrivateRoute = ({children}) => {
    const {user, loader} = useContext(AuthContext);
    const location = useLocation();
    if(loader){
        return <img style={{display: 'flex', justifyContent: 'center', alignContent: 'center',width: '100%', height: '100vh'}} src={loaderimg} alt={loaderimg} />
    }
    if(user){
        return children;
    }
    return <Navigate to={'/login'} state={{ from: location }} replace ></Navigate>;
};

export default PrivateRoute;