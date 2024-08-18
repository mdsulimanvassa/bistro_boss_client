import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import loginImg from '../../images/authentication2.png';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const SignUp = () => {
    const axiosPublic = useAxiosPublic()

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {createUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
        .then(() => {
            const userInfo = {
                name: data.name,
                email: data.email,
            }
            axiosPublic.post('/users', userInfo)
            .then(result => {
                if(result.data.insertedId){
                    reset();
                    Swal.fire({
                        position: "top-right",
                        icon: "success",
                        title: "User Create Successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/');
                }
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
    }
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sing Up</title>
            </Helmet>
            <div className="">
                <div className="hero-content flex-col lg:flex-row-reverse order-2">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h1>Sign Up</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                                {errors.name && <span className='text-error'>Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} placeholder="email" className="input input-bordered" />
                                {errors.email?.type === 'required' && <span className='text-error'>Email is required</span>}
                                {errors.email?.type === 'pattern' && <span className='text-error'>Pleace valid email</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password'  {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className='text-error'>Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className='text-error'>Password Must be 6 Characters</span>}
                                {errors.password?.type === 'pattern' && <span className='text-error'>Password Must one uppercase, one lowercase, one number, one special case,</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                            <p><small>Already have an acount? <Link to={'/login'}>Pleace login</Link></small></p>
                        </form>

                    </div>
                    <div className="text-center lg:flex-row-reverse order-1">
                        <img src={loginImg} alt={loginImg} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;