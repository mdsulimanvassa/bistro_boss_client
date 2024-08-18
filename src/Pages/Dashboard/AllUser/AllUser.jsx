import { useQuery } from '@tanstack/react-query';
import './AllUser.css';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { FaUsers } from 'react-icons/fa6';
import useAxiosSecoure from '../../../Hooks/useAxiosSecoure';

const AllUser = () => {
    const axiosSecoure = useAxiosSecoure();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecoure.get('/users')
            return res.data;
        }
    });

    const handleMakeAdmin = user => {
        axiosSecoure.patch(`/users/admin/${user._id}`)
        .then(res => {
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an admin now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
  
    const handleDeletUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecoure.delete(`/deletUser/${id}`)
                .then(res => {
                    if(res.data.deletedCount > 0){
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                })
                
            }
        });
    }
    return (
        <div>
            <div className="">
                <h1>All Users: {users.length}</h1>
            </div>
            <div className="">
                <div className="cart_padding">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th> </th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => <tr key={user._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                        <td>
                                            {user.name}
                                        </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        {user.role === 'admin' ? 'Admin' :<button onClick={() => { handleMakeAdmin(user) }} className='btn bg-orange-400'>
                                            <FaUsers className='dashboard_icons text-white' />
                                        </button>}
                                    </td>
                                    <th>
                                        <button onClick={() => { handleDeletUser(user._id) }} className=" btn-lg"><FaTrashAlt className='text-red-600' /></button>
                                    </th>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUser;