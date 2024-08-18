import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from "../Firebase/Firebase.config";
import useAxiosPublic from './../Hooks/useAxiosPublic';

 export const AuthContext = createContext(null);
 const auth = getAuth(app);


const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic()
  
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    const createUser = (email, password) =>{
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) =>{
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoader(true);
        return signOut(auth);
    }

    useEffect( () => {
        const unsicrive = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser){
                const userInfo = {
                    email: currentUser.email
                }
                axiosPublic.post('/jwt',userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        setLoader(false);
                    }
                })
            }
            else{
                localStorage.removeItem('access-token');
                setLoader(false);
            }
           
        });
        return () => {
            return unsicrive()
        }
    },[axiosPublic])

    const authInfo = {
        user,
        loader,
        createUser,
        signIn,
        logOut,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;