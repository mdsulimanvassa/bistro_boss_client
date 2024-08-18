import { useContext } from 'react';
import './UserHome.css';
import { AuthContext } from '../../../Provider/AuthProvider';

const UserHome = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <h2>
                <span>Hi, Welcome </span> 
                {
                    user?.displayName ? user.displayName :  'Back!'
                }
            </h2>
        </div>
    );
};

export default UserHome;