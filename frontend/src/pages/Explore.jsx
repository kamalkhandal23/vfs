import ExploreSection from "../features/explore//ExploreSection";
import AboutPortSection from "../features/explore/AboutPortSection";
import TopAttractions from "../features/explore/TopAttractionsSection";
export default function Explore() {
  return (
    <div className="bg-white pb-16">
        <ExploreSection />
        <TopAttractions />
    </div>
  );
}
