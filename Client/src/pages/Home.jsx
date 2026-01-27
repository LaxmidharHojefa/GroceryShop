import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import CategorySlider from "../components/CategorySlider";
import OfferBanners from "../components/OfferBanners";
import PopularItems from "../components/PopularItems";
import DealOfTheWeek from "../components/DealOfTheWeek";
import TestimonialsSection from "../components/TestimonialsSection";
import BlogSection from "../components/BlogSection";
import ServiceHighlights from "../components/ServiceHighlights";

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Slider />
      <CategorySlider />
      <OfferBanners />
      <PopularItems />
      <DealOfTheWeek />
      <TestimonialsSection />
      <BlogSection limit={3} />
      <ServiceHighlights />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
