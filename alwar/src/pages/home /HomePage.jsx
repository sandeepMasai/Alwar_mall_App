import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Category from "../../components/category/Category";
import HomePageProductCard from "../../components/omePageProductCard/HomePageProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import Loader from "../../components/loader/Loader";  // Assuming you have a loader component

const HomePage = () => {
  // Define loading state
  const [loading, setLoading] = useState(true);

  // Simulate data fetching or loading process
  useEffect(() => {
    // Simulate an async operation like fetching data from an API or server
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after some time
    }, 1000); // Simulate a 2-second loading time

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <Layout>
      {loading ? (
        // Show the loader while loading
        <div className="flex justify-center items-center h-screen">
          <Loader /> {/* Or your own custom loader */}
        </div>
      ) : (
        // Once loading is done, render the actual content
        <>
          <HeroSection />
          <Category />
          <HomePageProductCard />
          <Track />
          <Testimonial />
        </>
      )}
    </Layout>
  );
};

export default HomePage;
