import AboutHeroSection from "../features/about/AboutHeroSection";
import MilestonesSection from "../features/home/MilestonesSection";
import AchievementSection from "../features/about/AchievementSection";
import AboutM2MFerriesSection from "../features/about/AboutM2MFerriesSection";
import EasyTravelSection from "../features/about/EasyTravelSection";
import InTheSpotlightSection from "../features/about/InTheSpotlightSection";
import PartnersSection from "../features/about/PartnersSection";
export default function About() {
  return (
    <div className="bg-white pb-16">

      <AboutHeroSection />
      <MilestonesSection />
      <AboutM2MFerriesSection />
      <InTheSpotlightSection />
    </div>
  );
}
