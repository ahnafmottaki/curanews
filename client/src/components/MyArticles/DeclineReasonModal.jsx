import { IoClose } from "react-icons/io5";
// Assuming you're using lucide icons

const DeclineReasonModal = ({ articleTitle, reason, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4 py-6">
      <div className="relative bg-white max-w-xl w-full rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 p-1 rounded-full transition-colors"
        >
          <IoClose className="w-5 h-5" />
        </button>

        {/* Heading */}
        <p className="text-sm text-gray-500 font-medium">
          Declining reason for
        </p>
        <h2 className="text-xl sm:text-2xl font-bold font-merriweather text-heading mb-4">
          {articleTitle}
        </h2>

        {/* Reason */}
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-base text-gray-800 whitespace-pre-wrap leading-relaxed">
            {reason}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeclineReasonModal;
