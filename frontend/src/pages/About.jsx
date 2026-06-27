import AboutHeroSection from "../features/about/AboutHeroSection";
import AchievementSection from "../features/about/AchievementSection";
import TeachingApproachSection from "../features/about/AboutM2MFerriesSection";

export default function About() {
  return (
    <div className="bg-white">

      <AboutHeroSection />
      <TeachingApproachSection />
      <AchievementSection />
    </div>
  );
}
