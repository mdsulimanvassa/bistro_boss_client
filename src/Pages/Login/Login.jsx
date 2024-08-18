import './Login.css';
import loginImg from '../../images/authentication1.png';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from  = location.state?.from?.pathname ||  "/" ;

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(() => {
                navigate(from, {replace: true});
                reset();
            })
    }
        
    return (
       <>
       <Helmet>
        <title>Bistro Boss | Login</title>
       </Helmet>
        <div className="">
            <div className="hero-content flex-col lg:flex-row-reverse order-2">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h1>Sign In</h1>
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
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                        <p><small>New Here? <Link to={'/signup'}>Create a New Acount</Link></small></p>
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

export default Login;