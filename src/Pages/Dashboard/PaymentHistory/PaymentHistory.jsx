import { useContext } from 'react';
import './PaymentHistory.css';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecoure from '../../../Hooks/useAxiosSecoure';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecoure = useAxiosSecoure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payment', user.email],
        queryFn: async () => {
            const res = await axiosSecoure.get(`/payments/${user.email}`);
            return res.data;
        }
    })
    return (
        <div>
            <h1>Total payments: {payments.length}</h1>
            <div className="">
                <div className="">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>EMAIL</th>
                                <th>PRICE</th>
                                <th>TRANSATIONID</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((item, index) => <tr key={item._id} className="bg-base-200">
                                <th>{index + 1}</th>
                                <td>{item.email}</td>
                                <td>${item.price}</td>
                                <td>{item.transationId}</td>
                                <td><button className='btn btn-secondary'>{item.status}</button></td>
                            </tr>)}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;