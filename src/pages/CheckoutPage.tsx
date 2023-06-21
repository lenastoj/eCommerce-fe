import React from 'react';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useGetCheckoutQuery } from '../queries/checkout.query';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "");
const CheckoutPage = () => {
    const { data } = useGetCheckoutQuery();

    return (
        data ? (
        <Elements stripe={stripePromise} options={data}>
            <form>
                <PaymentElement />
                <button>Submit</button>
            </form>
        </Elements>
        ) : <></>
    );
};

export default CheckoutPage;
