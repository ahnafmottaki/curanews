import { useState } from "react";
import { useNavigate } from "react-router";
import { FaCrown } from "react-icons/fa6";
import DURATIONS from "../../assets/PLANS.js";
import useTitle from "../../hooks/useTitle.jsx";

const Subscription = () => {
  useTitle("CuraNews | Subscription");
  const [selectedId, setSelectedId] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-4 py-10 font-inter flex items-center justify-center bg-surface">
      <div className="w-full max-w-3xl space-y-10">
        {/* Banner */}
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 p-6 sm:p-10 rounded-xl shadow-md text-center text-heading relative overflow-hidden">
          <FaCrown className="text-4xl sm:text-5xl mx-auto text-white mb-2 animate-bounce" />
          <h2 className="text-2xl sm:text-3xl font-merriweather font-bold text-white">
            Unlock Premium Access
          </h2>
          <p className="text-white/90 mt-2">
            Get full access to premium articles, advanced insights, and an
            ad-free experience.
          </p>
        </div>

        {/* Subscription Options */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-200">
          <h3 className="text-xl sm:text-2xl font-bold text-heading text-center">
            Choose Your Subscription Plan
          </h3>

          {/* Dropdown */}
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-md text-base text-heading focus:outline-primary"
          >
            <option value="" disabled>
              Select Subscription Duration
            </option>
            {DURATIONS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label} – {d.price}
              </option>
            ))}
          </select>

          {/* Summary */}
          <div className="text-center text-sm sm:text-base text-body">
            {selectedId ? (
              <p>
                You selected:{" "}
                <span className="font-semibold text-primary">
                  {DURATIONS.find((d) => d.id === selectedId)?.label}
                </span>
                — Total Price:{" "}
                <span className="font-semibold text-primary">
                  {DURATIONS.find((d) => d.id === selectedId)?.price}
                </span>
              </p>
            ) : (
              <p className="text-gray-500">Please select a subscription plan</p>
            )}
          </div>

          {/* Button */}
          <div className="text-center">
            <button
              onClick={() => navigate("/make-payment/" + selectedId)}
              disabled={!selectedId}
              className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-all ${
                selectedId
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              Take Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
