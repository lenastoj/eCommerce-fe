import React from 'react';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useGetCheckoutQuery } from '../queries/checkout.query';

const stripePromise = loadStripe(
    'pk_test_51NJa3kBzlQgHHyRzrAlDxp3CNPr8KhiLixQMiORYrQAB0GlkgCESDoLZFA0WQiUdztvCiAGm4qV587TWMe0wcJHA00brH1DsuW'
);

const CheckoutPage = () => {
    const { data } = useGetCheckoutQuery();

    console.log(data)
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
