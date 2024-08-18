import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../Hooks/useMenu';
import './ManageItem.css';
import Swal from 'sweetalert2';
import useAxiosSecoure from '../../../Hooks/useAxiosSecoure';
import { Link } from 'react-router-dom';

const ManageItem = () => {
    const [menu, ,refetch] = useMenu();
    const axiosSecoure = useAxiosSecoure();
    const handleDeletMenu = (item) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async (result) => {
            if (result.isConfirmed) {
                const result = await axiosSecoure.delete(`/menu/${item._id}`);
                if(result.data.deletedCount > 0){
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            }
          });
    }
    return (
        <div>
            <SectionTitle hading={'MANAGE ALL ITEMS'} subHading={'Hurry up'}></SectionTitle>
            <div className="">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th> # </th>
                                <th>ITEM IMAGE</th>
                                <th>ITEM NAME</th>
                                <th>PRICE</th>
                                <th>UPDATE</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) =>  <tr key={item._id}>
                                    <td>
                                       {index + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.image}
                                                        alt={item.image} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>${item.price}</td>
                                    <td>
                                        <Link to={`/dashboard/updateItem/${item._id}`}><button className="btn btn-accent text-white"><FaEdit/></button></Link>
                                    </td>
                                    <td>
                                    <button onClick={() => { handleDeletMenu(item) }} className=" btn-lg"><FaTrashAlt className='text-red-600' /></button>
                                    </td>
                                </tr>)
                            }
                           
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItem;