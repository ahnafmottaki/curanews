import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../utils/axiosPublic";
import ARTICLE_TAGS from "../../assets/ARTICLE_TAGS";
import Loader from "../../components/Loader";
import CustomSelect from "../../components/CustomSelect";
import CustomInput from "../../components/CustomInput";
import { useAuth } from "../../contexts/Auth/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ArticleMini from "../../components/ArticleMini";
import { toast } from "react-toastify";
import useTitle from "../../hooks/useTitle";

const AllArticles = () => {
  useTitle("CuraNews | All Articles");
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  const {
    data: articles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["filtered-articles", searchText, selectedPublisher, selectedTag],
    queryFn: async () => {
      const res = await axiosPublic.get("/articles", {
        params: {
          search: searchText,
          publisher: selectedPublisher,
          tag: selectedTag,
        },
      });
      return res.data;
    },
  });

  const { data: publishers = [] } = useQuery({
    queryKey: ["my-publishers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publishers");
      return res.data;
    },
  });

  const { data: isPremiumTaken = false } = useQuery({
    queryKey: ["isPremiumTaken", user?.uid],
    enabled: !!user && !!user.uid && !!user.accessToken,
    queryFn: async () => {
      const res = await axiosSecure.get("/user/premiumTaken");
      return res.data.isPremiumTaken;
    },
  });

  useEffect(() => {
    if (location.state?.message) {
      toast.warning("Need to take subscription to see premium articles");
    }
  }, []);

  return (
    <section className="container mx-auto px-4 py-6">
      {/* Heading */}
      <h2 className="text-2xl font-merriweather font-bold text-heading mb-4">
        Latest Articles
      </h2>

      {/* Search and Filters */}
      <div className="flex  gap-3 flex-wrap justify-start items-center  mb-6">
        <CustomInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          classes={"w-full min-w-xs max-w-sm"}
          type="text"
          placeholder="Search articles..."
        />
        <CustomSelect
          classes="min-w-xs max-w-sm w-full"
          value={selectedPublisher}
          onChange={(e) => setSelectedPublisher(e.target.value)}
          options={
            <>
              <option value="">All Publishers</option>
              {publishers.map(({ _id, name }) => (
                <option key={_id} value={name}>
                  {name}
                </option>
              ))}
            </>
          }
        />

        <CustomSelect
          classes="max-w-sm min-w-xs w-full"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          options={
            <>
              <option value="">All Tags</option>
              {ARTICLE_TAGS.map(({ value, label }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
            </>
          }
        />
      </div>

      {isLoading && <Loader />}

      {/* Articles Grid */}
      {!isLoading &&
        !isError &&
        (articles.length === 0 ? (
          <p>Found no Articles</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleMini
                key={article._id}
                article={article}
                isPremiumTaken={isPremiumTaken}
              />
            ))}
          </div>
        ))}
    </section>
  );
};

export default AllArticles;
