import { loadStripe } from '@stripe/stripe-js';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import './Payment.css';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getyway_key);
const Payment = () => {
    return (
        <div>
            <SectionTitle hading={'PAYMENT'} subHading={'Pleace pay to eat'}></SectionTitle>
            <div className="">
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;