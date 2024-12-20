import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentSuccessPage.css'; // Optional: Add your custom CSS for styling

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const paymentId = location.state?.paymentId; // Get the payment ID from the state

    return (
        <div className="payment-success">
            <h1>Thank You for Your Booking!</h1>
            <p>We have successfully received your payment.</p>

            <div className="success-details">
                <p><strong>Payment ID:</strong> {paymentId}</p>
                <p>We look forward to serving you soon!</p>
            </div>

            <button
                className="btn-home"
                onClick={() => navigate('/')}
            >
                Back to Home
            </button>

            <p className="visit-again">We hope to see you again soon!</p>
        </div>
    );
};

export default PaymentSuccessPage;
