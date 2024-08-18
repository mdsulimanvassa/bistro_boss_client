import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecoure = axios.create({
    baseURL: 'http://localhost:4000',
})

const useAxiosSecoure = () => {
    const navigate = useNavigate();
    const {logOut} = useContext(AuthContext)
    //interceptors request
    axiosSecoure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        // console.log('request token intersection', token)
        return config;
    }, function(err) {
        return Promise.reject(err)
    });
    //interceptors response
    axiosSecoure.interceptors.response.use(function(response){
        return response;
    }, async (err) =>{
        const status = err.response.status;
        // console.log('interceptors response error', status);
        if(status === 401 || status === 403){
           await logOut();
            navigate('/login')
        }
        return Promise.reject(err)
    })

    return axiosSecoure;
};

export default useAxiosSecoure;