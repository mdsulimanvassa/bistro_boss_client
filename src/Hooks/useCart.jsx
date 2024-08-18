import { useQuery } from "@tanstack/react-query";
import useAxiosSecoure from "./useAxiosSecoure";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";


const useCart = () => {
    const axiosSecoure = useAxiosSecoure();
    const {user} = useContext(AuthContext)
   const {refetch, data: cart = [] } = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async () => {
        const res = await axiosSecoure.get(`/carts?email=${user.email}`)
        return res.data;
    }
   })
   return [cart, refetch]
};

export default useCart;