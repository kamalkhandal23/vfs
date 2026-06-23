import achievement1 from "../../assets/icons/achievement1.png";
import achievement2 from "../../assets/icons/achievement2.png";

const ACHIEVEMENT_IMAGES = [achievement1, achievement2];

export default function AchievementSection() {
  return (
    <section className="bg-[#0A2342] h-[200px] px-4 py-7 md:px-6 md:py-5">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-center justify-center gap-6 md:gap-12">
          {ACHIEVEMENT_IMAGES.map((imgSrc, index) => (
            <img
              key={`achievement-${index}`}
              src={imgSrc}
              alt={`Achievement ${index + 1}`}
              className="h-auto w-[185px] md:w-[200px] object-contain"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
