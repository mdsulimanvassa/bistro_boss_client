import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecoure from "./useAxiosSecoure";
import { useQuery } from "@tanstack/react-query";


const useAdmin = () => {
    const {user, loader} = useContext(AuthContext);
    const axiosSecoure = useAxiosSecoure();
    
    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loader,
        queryFn: async () => {
            const res = await axiosSecoure.get(`/users/admin/${user.email}`);
            // console.log(res.data)
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;