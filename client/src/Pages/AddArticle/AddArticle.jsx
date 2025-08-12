import { useForm } from "react-hook-form";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../utils/axiosPublic";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import showUpdateToast from "../../utils/reactToastify";
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import CustomTextarea from "../../components/CustomTextarea";
import CustomFileInput from "../../components/CustomFileInput";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import uploadImageToImgBB from "../../utils/uploadImageToImgBB";
import { useAuth } from "../../contexts/Auth/AuthContext";
import Select from "react-select";
import ARTICLE_TAGS from "../../assets/ARTICLE_TAGS";
import { useSearchParams } from "react-router";
import useTitle from "../../hooks/useTitle";

const AddArticle = () => {
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("articleId");
  useTitle(`CuraNews | ${articleId ? "Edit" : "Add"} Article`);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [selectedTags, setSelectedTags] = useState(null);

  const {
    data: defaultArticle = null,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["article", articleId],
    enabled: !!articleId && !!user?.uid,
    queryFn: async () => {
      const res = await axiosSecure.get("/articleDetail/" + articleId, {
        params: {
          uid: user.uid,
        },
      });
      return res.data;
    },
  });

  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    retry: 3,
    queryFn: async () => {
      const response = await axiosPublic.get("/publishers");
      return response.data;
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImageError("");
    }
  };

  const onSubmit = async (data) => {
    if (!articleId && !imageFile) {
      setImageError("Article image is required.");
      return;
    }

    if (!selectedTags || selectedTags.length === 0) {
      return toast.warning("At least select one tag");
    }

    const tags = selectedTags.map((tag) => tag.value);

    setSubmitting(true);
    const toastId = toast.loading(
      articleId ? "Updating Article..." : "Adding Article..."
    );
    try {
      let imageURL = defaultArticle?.imageURL || "";
      if (imageFile) {
        imageURL = await uploadImageToImgBB(imageFile);
      }

      const response = await axiosSecure.post(
        "/article",
        { ...data, imageURL, tags, articleId },
        {
          params: {
            uid: user.uid,
          },
        }
      );

      if (response.data.success) {
        if (response.data.isArticleLimitReached) {
          return showUpdateToast(
            toastId,
            "warning",
            "Article Add Limit Reached , Buy Subscription"
          );
        }
        showUpdateToast(toastId, "success", response.data.data?.message);
        setSelectedTags(null);
        setImageFile(null);

        reset();
      }
    } catch (err) {
      showUpdateToast(
        toastId,
        "error",
        err.response?.data?.message || "Article submission failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <p>{error.message}</p>;

  if (defaultArticle && !selectedTags) {
    const tags = ARTICLE_TAGS.filter((tag) =>
      defaultArticle.tags.includes(tag.value)
    );
    setSelectedTags(tags);
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-2 min-[475px]:px-4 relative">
      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-4 relative w-full max-w-md max-h-[90vh] overflow-auto">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-red-500"
            >
              &times;
            </button>
            <h3 className="text-lg font-semibold text-heading text-center mb-3">
              Current Article Image
            </h3>
            <img
              src={defaultArticle?.imageURL}
              alt="Current Article"
              className="rounded w-full object-contain"
            />
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 sm:p-8 md:p-10 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-heading text-center font-merriweather">
          {articleId ? "Update Article" : "Submit a News Article"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 font-inter"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <CustomInput
              type="text"
              defaultValue={defaultArticle?.title}
              label={"Title"}
              placeholder="Enter article title"
              {...register("title", { required: "Title is required" })}
            >
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </CustomInput>

            <CustomSelect
              defaultValue={defaultArticle?.publisher || ""}
              {...register("publisher", { required: "Publisher is required" })}
              label={"Publisher"}
              options={
                <>
                  <option value="" disabled>
                    Select a Publisher
                  </option>
                  {publishers.map((publisher) => (
                    <option key={publisher._id}>{publisher.name}</option>
                  ))}
                </>
              }
            >
              {errors.publisher && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.publisher.message}
                </p>
              )}
            </CustomSelect>

            {/* Tags */}
            <div>
              <label className="block mb-1 text-body font-semibold">Tags</label>
              <Select
                className="react-select-container"
                placeholder="Select article tags..."
                classNamePrefix="react-select"
                value={selectedTags}
                onChange={setSelectedTags}
                isMulti
                isSearchable
                options={ARTICLE_TAGS}
              />
            </div>

            {/* Image */}
            <div>
              <CustomFileInput label="Image" onChange={handleFileChange}>
                {imageError && (
                  <p className="text-red-600 text-sm mt-1">{imageError}</p>
                )}
              </CustomFileInput>
              {articleId && (
                <button
                  type="button"
                  onClick={() => setIsImageModalOpen(true)}
                  className="text-primary underline mt-2 text-sm"
                >
                  Show Current Image
                </button>
              )}
            </div>
          </div>

          <CustomTextarea
            defaultValue={defaultArticle?.description}
            label={"Description"}
            rows="5"
            placeholder="Write a brief summary of the article..."
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 30,
                message: "Description must be at least 30 characters",
              },
            })}
          >
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </CustomTextarea>

          <button
            type="submit"
            disabled={submitting}
            className={`primary-btn w-full md:w-auto mx-auto block ${
              submitting ? " opacity-30 " : ""
            }`}
          >
            {articleId ? "Update Article" : "Add Article"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
