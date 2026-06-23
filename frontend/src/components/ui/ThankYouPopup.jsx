export default function ThankYouPopup({ onClose }) {
  return (
<div className="fixed inset-0 z-50 flex items-center justify-center">

  {/* BLUR BACKGROUND */}
  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

  {/* POPUP */}
  <div className="relative bg-white rounded-[16px] px-8 py-7 w-[320px] text-center shadow-2xl animate-scaleIn">
    
    <h2 className="text-[20px] font-semibold text-[#0A2342]">
      Thank You 🙌
    </h2>

    <p className="mt-2 text-[13px] text-gray-500 leading-[1.5]">
      Your message has been sent successfully!
    </p>

    <button
      onClick={onClose}
      className="
        mt-5
        bg-[#0A2342]
        text-white
        px-6 py-2
        rounded-[8px]
        text-[13px]
        font-medium
        transition
        hover:scale-[1.05]
        active:scale-[0.95]
      "
    >
      OK
    </button>

  </div>
</div>
  );
}