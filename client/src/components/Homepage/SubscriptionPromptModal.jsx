import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const SubscriptionPromptModal = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  if (!showModal) return null;

  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen  z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)]  px-4"
      onClick={() => setShowModal(false)}
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 md:p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Unlock Premium Features 🚀
        </h2>
        <p className="text-gray-600 mb-6">
          Subscribe now to get access to powerful tools and premium articles!
        </p>

        <ul className="text-left text-sm md:text-base text-gray-700 mb-6 space-y-2">
          <li>✅ Access to exclusive premium articles</li>
          <li>✅ Add unlimited articles to your profile</li>
          <li>✅ Stay ahead with curated content</li>
        </ul>

        <button
          onClick={() => navigate("/subscription")}
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition"
        >
          View Subscription Plans
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPromptModal;
