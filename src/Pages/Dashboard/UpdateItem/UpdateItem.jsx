import { useLoaderData } from 'react-router-dom';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import './UpdateItem.css';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecoure from '../../../Hooks/useAxiosSecoure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateItem = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecoure = useAxiosSecoure();
    const item = useLoaderData();
    const {category, name, price, recipe, _id} = item;
    const { register, handleSubmit, reset, formState: { errors },} = useForm();

    const onSubmit = async (data) => {
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-type' : 'multipart/form-data'
            }
        });
        if(res.data.success){
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const result = await axiosSecoure.patch(`/menu/${_id}`, menuItem);
            console.log(result)
            if(result.data.modifiedCount > 0){
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
    
    };
    return (
        <div>
            <SectionTitle hading={'UPDATE AN ITEM'} subHading={'Refresh info'}></SectionTitle>
            <div className="admin_form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="">
                        <label className="label">
                            <span className="label-text">Recipe name*</span>
                        </label>
                        <input defaultValue={name} type="text" name='name' {...register("name", { required: true })} placeholder="Recipe name" className="input input-bordered" />
                        {errors.name && <span>This field is required</span>}
                    </div>
                    <div className="admin_flex">
                        <div className="select_select">
                            <label htmlFor="">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue={category} {...register("category", { required: true })} className="select select-bordered">
                                <option disabled value={'default'}>Category</option>
                                <option value="salad">salad</option>
                                <option value="pizza">pizza</option>
                                <option value="soup">soup</option>
                                <option value="dessert">dessert</option>
                                <option value="drinks">drinks</option>
                            </select>
                            {errors.category && <span>This field is required</span>}
                        </div>
                        <div className="admin_input_price">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input defaultValue={price} type="number" name='price' {...register("price", { required: true })} placeholder="Price" className="input input-bordered" />
                            {errors.Price && <span>This field is required</span>}
                        </div>
                    </div>
                    <div className="">
                        <label className="form-control">
                            <label className="label">
                            <span className="label-text">Recipe Details*</span>
                            </label>
                            <textarea defaultValue={recipe} name='recipe' className="textarea textarea-bordered h-24 w-50" {...register("recipe", { required: true })}placeholder="Recipe Details" ></textarea>
                            {errors.recipe && <span>This field is required</span>}
                        </label>
                    </div>
                    <div className="">
                        <input type="file"
                            placeholder="You can't touch this"
                            className="file-input file-input-bordered w-full" {...register("image", { required: true })} />
                        {errors.image && <span>This field is required</span>}
                    </div>
                    <button className="btn_successfully"> Update Item</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;