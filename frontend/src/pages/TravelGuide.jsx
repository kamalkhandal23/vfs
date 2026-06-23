import TravelGuideHeroSection from "../features/travel-guide/TravelGuideHeroSection";
import HowToReachSection from "../features/travel-guide/HowToReachSection";
import HowToReachFerryWharfSection from "../features/travel-guide/HowToReachFerryWharfSection";
import HowToReachVijaydurgSection from "../features/travel-guide/HowToReachVijaydurgSection";
export default function TravelGuide() {
    return (
        <>
            <TravelGuideHeroSection />
            <HowToReachSection />
            <HowToReachFerryWharfSection />
            <HowToReachVijaydurgSection />
        </>
    );
}