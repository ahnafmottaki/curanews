import { useState } from "react";
import { toast } from "react-toastify";
import CustomFileInput from "../../components/CustomFileInput";
import CustomInput from "../../components/CustomInput";
import showUpdateToast from "../../utils/reactToastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import uploadImageToImgBB from "../../utils/uploadImageToImgBB";
import { useQueryClient } from "@tanstack/react-query";
import Breadcrumb from "../../components/Breadcrumb";
import useTitle from "../../hooks/useTitle";

const DashboardPublisher = () => {
  useTitle("Dashboard | Publisher");
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formDetails = Object.fromEntries(formData.entries());

    const name = formDetails.name.trim();

    if (!name) {
      toast.error("Publisher name is required.");
      return;
    }

    if (!imageFile) {
      toast.error("Publisher logo is required.");
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading("Adding Publisher");
    try {
      const img = await uploadImageToImgBB(imageFile);
      await axiosSecure.post("/admin/addPublisher", {
        name,
        img,
      });
      showUpdateToast(toastId, "success", "Publisher added");
      queryClient.invalidateQueries("publishers");
      form.reset();
      setImageFile(null);
    } catch (err) {
      showUpdateToast(toastId, "error", "Failed to Add Publisher");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className=" w-full flex flex-col h-full  px-4 sm:px-6 lg:px-8 py-6 ">
      <Breadcrumb />

      <div className="grow flex flex-col justify-center items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-heading font-merriweather mb-4">
          Add New Publisher
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-5 shadow   p-4 sm:p-6  max-w-md rounded-md "
        >
          {/* Publisher Name */}
          <CustomInput
            label={"Publisher Name"}
            type="text"
            name="name"
            placeholder="e.g. The Daily Insight"
          />

          {/* Publisher Logo */}
          <CustomFileInput
            onChange={(e) => setImageFile(e.target.files[0])}
            label={"Publisher Logo"}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className={`primary-btn w-full py-2 rounded-md font-medium ${
              submitting ? " opacity-30 " : ""
            }`}
          >
            Add Publisher
          </button>
        </form>
      </div>
    </section>
  );
};

export default DashboardPublisher;
