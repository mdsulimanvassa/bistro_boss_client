import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutForm.css';
import { useContext, useEffect, useState } from 'react';
import useAxiosSecoure from './../../../Hooks/useAxiosSecoure';
import useCart from '../../../Hooks/useCart';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [transationId, setTransationId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [clientSecret, setClientSecret] = useState("");
    const [cart, refetch] = useCart();
    const { user } = useContext(AuthContext);
    const totalPrice = cart.reduce((total, currentTotal) => total + currentTotal.price, 0);
    const axiosSecoure = useAxiosSecoure();

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecoure.post("/create-payment-intent", { price: totalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                });
        }
    }, [axiosSecoure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            setError(error.message)
        }
        else {
            // console.log('PaymentMethod', paymentMethod);
            setError('');
        }
        //confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.name || 'anonymouse',
                        email: user?.email || 'anonymouse'
                    },
                },
            });
        if (confirmError) {
            console.log('confirm error', confirmError)
        }
        else {
            // console.log('payment intent', paymentIntent)
            if (paymentIntent.status === "succeeded") {
                setTransationId(paymentIntent.id)

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transationId: paymentIntent.id,
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending',
                    date: new Date()
                }
                const res = await axiosSecoure.post('/payment', payment);
                refetch();
                if (res.data?.result?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/paymentHistory')
                }
            }
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn my-10' type="submit" disabled={!stripe || !clientSecret}>Pay</button>
            <p className='text-red-600'>{error}</p>
            {
                transationId && <p className='text-green-600'>Your Transation Id: {transationId}</p>
            }
        </form>
    );
};

export default CheckoutForm;