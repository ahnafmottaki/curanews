import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

const DeclinedReasonForm = ({
  name,
  id,
  ref,
  axiosSecure,
  submitting,
  setSubmitting,
}) => {
  const [reasonError, setReasonError] = useState("");
  const queryClient = useQueryClient();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const declinedReason = e.target.reason.value;
    if (!declinedReason || declinedReason.length < 15) {
      setReasonError("Reason need to be at least 15 characters");
      return;
    }
    setSubmitting(true);
    try {
      await axiosSecure.put("/admin/status", null, {
        params: {
          status: "declined",
          id,
          declinedReason,
        },
      });
      toast.success("Article Declined!");
      ref.current.close();
      queryClient.invalidateQueries("all-articles");
    } catch (err) {
      toast.error("Failed to Decline");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="p-7 font-inter  ">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label
          htmlFor="reason"
          className="block text-body font-merriweather font-medium mb-2"
        >
          Reason for Decline {name}&apos;s Article
        </label>
        <textarea
          name="reason"
          id="reason"
          rows="5"
          onChange={() => setReasonError("")}
          placeholder="Enter reason here..."
          className="w-full rounded-md border border-border bg-muted p-3 focus:outline-primary resize-none"
          required
        />
        {reasonError && (
          <p className="text-red-500 font-medium mb-0">{reasonError}</p>
        )}
        <div className="flex items-center justify-end gap-2">
          <button
            type="submit"
            onClick={() => ref.current.close()}
            className={`primary-btn`}
          >
            Close
          </button>
          <button
            type="submit"
            disabled={submitting}
            className={` px-4 bg-red-600 text-white hover:bg-red-700 py-2 rounded-md font-medium ${
              submitting ? "opacity-30" : ""
            }`}
          >
            {submitting ? "Declining" : "Decline"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeclinedReasonForm;
