export default function FooterSkeleton() {
    return (
      <div className="relative bg-[#0A2342] px-5 py-8 lg:px-10 lg:py-16 animate-pulse">
  
        {/* MOBILE + DESKTOP COMMON STRUCTURE */}
  
        {/* TOP SECTION */}
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
  
          {/* LOGO + SOCIAL */}
          <div className="flex flex-col gap-4">
            <div className="h-10 w-[120px] bg-white/20 rounded"></div>
  
            <div className="flex gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-9 w-9 bg-white/20 rounded-md"></div>
              ))}
            </div>
          </div>
  
          {/* COLUMNS */}
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 flex-1">
  
            {[...Array(4)].map((_, col) => (
              <div key={col} className="space-y-3">
                <div className="h-4 w-28 bg-white/20 rounded"></div>
  
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-3 w-full bg-white/10 rounded"></div>
                ))}
              </div>
            ))}
  
          </div>
        </div>
  
        {/* BOTTOM */}
        <div className="mt-8 flex justify-center gap-4">
          <div className="h-3 w-24 bg-white/20 rounded"></div>
          <div className="h-3 w-28 bg-white/20 rounded"></div>
        </div>
      </div>
    );
  }