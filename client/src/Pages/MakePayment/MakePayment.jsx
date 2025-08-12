import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Navigate, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import showUpdateToast from "../../utils/reactToastify.js";
import DURATIONS from "../../assets/PLANS.js";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import { useAuth } from "../../contexts/Auth/AuthContext.jsx";
import useTitle from "../../hooks/useTitle.jsx";

const CARD_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1f2937",
      "::placeholder": {
        color: "#9ca3af",
      },
    },
    invalid: {
      color: "#dc2626",
    },
  },
};

const MakePayment = () => {
  useTitle("CuraNews | Make Payment");
  const { subscriptionId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const selectedSubscription = DURATIONS.find((d) => d.id === subscriptionId);

  if (!subscriptionId || !selectedSubscription) {
    return <Navigate to={"/subscription"} />;
  }

  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;
    setProcessing(true);
    const toastId = toast.loading("Making Payment...");
    try {
      const createPaymentIntentResponse = await axiosSecure.post(
        "/payment-intent",
        {
          amount: parseFloat(selectedSubscription.price.slice(1)) * 100,
          currency: "usd",
        },
        {
          params: {
            uid: user.uid,
          },
        }
      );

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        createPaymentIntentResponse.data.clientSecret,
        {
          payment_method: {
            card,
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        await axiosSecure.post(
          "/addHistory",
          {
            transactionId: paymentIntent.id,
            subscriptionId: selectedSubscription.id,
            cost: parseFloat(selectedSubscription.price.slice(1)),
            userUid: user?.uid,
            userName: user.displayName,
            userEmail: user?.email,
            subscriptionDuration: selectedSubscription.durationInMs,
          },
          {
            params: {
              uid: user.uid,
            },
          }
        );
        showUpdateToast(toastId, "success", "Payment Successful");
        navigate("/premium-articles");
      }
    } catch (err) {
      showUpdateToast(toastId, "error", "Transaction Error");
    } finally {
      setProcessing(false);
    }

    // Call your backend to create a PaymentIntent and confirm payment (logic goes here)
  };

  return (
    <div className="min-h-screen px-4 py-10 font-inter flex items-center justify-center bg-surface">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 sm:p-10 border border-gray-200 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-heading font-merriweather">
            Premium Subscription
          </h2>
          <p className="text-body text-sm sm:text-base">
            Unlock exclusive access to premium articles, expert insights, and an
            ad-free reading experience. Subscribe securely using your card
            below.
          </p>
        </div>

        {/* Subscription Details */}
        <div className="bg-gray-50 grid grid-cols-2 border border-gray-200 rounded-lg p-4 space-y-2 text-sm sm:text-base">
          <div className="flex flex-col justify-between min-h-17 font-medium">
            <span>Subscription Duration:</span>
            <span className="">Amount to Pay:</span>
          </div>
          <div className="flex flex-col justify-between items-end font-medium">
            <span className="text-right">{selectedSubscription.label}</span>
            <span>{selectedSubscription.price}</span>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block text-sm font-medium text-heading mb-1">
            Card Details
          </label>
          <div className="px-3 py-4 rounded-md border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
            <CardElement options={CARD_OPTIONS} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || processing}
            className={`w-full bg-primary text-white py-3 rounded-lg font-semibold transition-all ${
              processing
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary/90"
            }`}
          >
            {processing ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakePayment;
