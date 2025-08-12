import { useNavigate } from "react-router";
import PLANS from "../../assets/PLANS";
const Subscription = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-10 max-w-6xl mt-10 sm:mt-15 mx-auto">
      <h2 className="text-3xl font-bold font-merriweather text-center mb-8">
        Choose Your Subscription Plan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 flex flex-col items-center justify-between transition-transform hover:-translate-y-1 hover:shadow-xl"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center font-merriweather text-heading">
              {plan.label}
            </h3>
            <p className="text-2xl font-bold text-primary mb-4">{plan.price}</p>
            <button
              onClick={() => navigate(`/make-payment/${plan.id}`)}
              className="mt-auto bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition"
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
