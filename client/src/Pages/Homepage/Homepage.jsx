import Plans from "../../components/Homepage/Plans";

import OurPublishers from "../../components/Homepage/OurPublishers";
import Statistics from "../../components/Homepage/Statistics";
import TrendingArticles from "../../components/Homepage/TrendingArticles";
import HeroSection from "../../components/Homepage/Hero";
import NewsletterSection from "../../components/Homepage/NewsLetter";
import useTitle from "../../hooks/useTitle";

const Homepage = () => {
  useTitle("CuraNews | Homepage");

  return (
    <section>
      <HeroSection />
      <TrendingArticles />
      <Plans />
      <OurPublishers />
      <Statistics />
      <NewsletterSection />
    </section>
  );
};

export default Homepage;
