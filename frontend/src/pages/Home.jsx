import { useEffect, useState } from "react";
import HeroSection from "../features/home/HeroSection";
import TravelPricingSection from "../features/home/TravelPricingSection";
import WhyChooseSection from "../features/home/WhyChooseSection";
import ExploreSection from "../features/home/ExploreSection";
import MilestonesSection from "../features/home/MilestonesSection";
import VoyageSection from "../features/home/VoyageSection";
import AboutSection from "../features/home/AboutSection";
import ReadyToDiveSection from "../features/home/ReadyToDiveSection";
import TestimonialSection from "../features/home/TestimonialSection";
import DirectorMessageSection from "../features/home/DirectorMessageSection";
export default function Home() {
  const [heroSlides, setHeroSlides] = useState([]);
  const [loadingHero, setLoadingHero] = useState(true);
  const [pricingData, setPricingData] = useState([]);
  const [whyChooseData, setWhyChooseData] = useState([]);
  const [exploreSlides, setExploreSlides] = useState([]);
  const [voyageCards, setVoyageCards] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [appDownloadData, setAppDownloadData] = useState(null);
  // useEffect(() => {
  //   async function fetchHeroSlides() {
  //     try {
  //       const res = await fetch("https://mocki.io/v1/hero-demo");
  //       const data = await res.json();
  //       setHeroSlides(data);
  //     } catch (error) {
  //       console.error("Hero API failed", error);
  //     } finally {
  //       setLoadingHero(false);
  //     }
  //   }

  //   fetchHeroSlides();
  // }, []);

  //   useEffect(() => {

  //   async function fetchPricingData() {
  //     try {

  //       const res = await fetch("/api/pricing");
  //       const data = await res.json();

  //       setPricingData(data);

  //     } catch (error) {
  //       console.error("Pricing API failed", error);
  //     }
  //   }

  //   fetchPricingData();

  // }, []);

  // useEffect(() => {

  //   async function fetchHomeData() {
  //     try {

  //       const heroRes = await fetch("/api/hero-slides");
  //       const heroData = await heroRes.json();

  //       const pricingRes = await fetch("/api/pricing");
  //       const pricing = await pricingRes.json();

  //       const whyRes = await fetch("/api/why-choose");
  //       const why = await whyRes.json();

  //       setHeroSlides(heroData);
  //       setPricingData(pricing);
  //       setWhyChooseData(why);

  //     } catch (error) {
  //       console.error("Home API failed", error);
  //     }
  //   }

  //   fetchHomeData();

  // }, []);

  // useEffect(() => {

  //   async function fetchExploreSlides() {
  //     try {

  //       const res = await fetch("/api/explore-slides");
  //       const data = await res.json();

  //       setExploreSlides(data);

  //     } catch (error) {
  //       console.error("Explore API failed", error);
  //     }
  //   }

  //   fetchExploreSlides();

  // }, []);

  // useEffect(() => {

  //   async function fetchVoyageCards() {

  //     try {

  //       const res = await fetch("/api/voyage-cards");
  //       const data = await res.json();

  //       setVoyageCards(data);

  //     } catch (error) {
  //       console.error("Voyage API failed", error);
  //     }

  //   }

  //   fetchVoyageCards();

  // }, []);

  // useEffect(() => {
  //   async function fetchTestimonials() {
  //     try {
  //       const res = await fetch("https://api.website.com/testimonials");
  //       const data = await res.json();
  //       setTestimonials(data);
  //     } catch (error) {
  //       console.error("Testimonial API failed", error);
  //     }
  //   }

  //   fetchTestimonials();
  // }, []);

  // useEffect(() => {
  //   async function fetchAppDownload() {
  //     try {
  //       const res = await fetch("https://api.website.com/app-download");
  //       const data = await res.json();
  //       setAppDownloadData(data);
  //     } catch (error) {
  //       console.error("App download API failed", error);
  //     }
  //   }

  //   fetchAppDownload();
  // }, []);


  return (
    <>
      <HeroSection  />  {/*slides={heroSlides}*/}  
      <TravelPricingSection /> {/* data={pricingData} */}
      <DirectorMessageSection />
      <WhyChooseSection /> {/* data={whyChooseData} */}
      <ExploreSection />  {/* slides={exploreSlides} */}
      <ReadyToDiveSection /> {/* data={appDownloadData} */ }
      {/* <MilestonesSection /> */}
      <VoyageSection /> {/* cards={voyageCards} */}
      {/* <AboutSection /> */}
      
      <TestimonialSection /> {/* data={testimonials} */}
    </>
  );
}