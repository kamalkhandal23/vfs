export default function SliderDots({
  total = 3,
  activeIndex = 0,
  onSelect,
  className = "",
}) {
  return (
    <div className={`mt-4 flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          type="button"
          key={index}
          onClick={() => onSelect?.(index)}
          aria-label={`Go to slide ${index + 1}`}
          aria-pressed={index === activeIndex}
          className={`rounded-full transition-colors 
  w-3 h-3 
  md:max-lg:w-2 md:max-lg:h-2
  ${index === activeIndex ? "bg-primary-dark" : "bg-gray-300"}
  ${onSelect ? "cursor-pointer" : ""}`}
        />
      ))}
    </div>
  );
}
