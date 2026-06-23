export default function HowToReachVijaydurgSection() {
  return (
    <section
  id="vijaydurg-port-terminal"
  className="w-full py-8 md:py-20"
>
      <div className="mx-auto max-w-[1200px] px-6">
        {/* heading */}
        <div className="mb-12 text-center">
          <h2 className="text-[25px] md:text-[42px] font-semibold text-[#0A2342]">
            How To Reach Vijaydurg Port
          </h2>

         <p className="mt-1 text-[10px] md:mt-2 md:text-[15px] text-[#4B5D73]">
            Our Vijaydurg Terminal is located next to the current Vijaydurg
            Jetty
          </p>
        </div>

        {/* content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
          {/* left map */}
         <div className="order-2 md:order-1 overflow-hidden rounded-[10px] md:rounded-[14px] shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3824.403075201679!2d73.3380311!3d16.5562066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bea87ce25b64b67%3A0x11f93e31012ca12a!2sVijaydurg%20Jetty!5e0!3m2!1sen!2sin!4v1774701442023!5m2!1sen!2sin"
              width="100%"
              height="460"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Vijaydurg Terminal Map"
              className="w-full"
            />
          </div>

          {/* right text */}
          <div className="order-1 md:order-2 pt-1 md:pt-2">
            {/* place name */}
            <h3 className="mb-6 text-[25px] md:text-[42px] font-semibold text-[#0A2342]">
              From Place Name
            </h3>

            <ol className="space-y-3 text-[12px] md:text-[17px] leading-[15px] md:leading-[30px] text-[#24364B]">
              <li>
                1. Head north on Alibaug Rewas Road toward Savta Mali Road.
              </li>
              <li>
                2. At Dr.Vhorkate Shatayu Aashram Hospital, continue onto
                Alibag - Rewas Road.
              </li>
              <li>3. Continue straight onto Mandwa Jetty Road.</li>
              <li>4. Slight left to stay on Mandwa Jetty Road.</li>
              <li>
                5. At the end of Mandwa Jetty Road, Take a left to enter the
                Mandwa Ropax Terminal.
              </li>
            </ol>

            {/* public transport */}
            <div className="mt-12">
              <h3 className="mb-6 text-[20px] md:text-[42px] font-semibold text-[#0A2342]">
                By Public Transport
              </h3>

              <div className="space-y-6 text-[12px] md:text-[17px] leading-[15px] md:leading-[30px] text-[#24364B]">
                <p>
                  <span className="font-semibold">Bus:</span> Take the hourly
                  MSRTC Bus (Alibaug-Rewas via Chondhi route) from Alibaug to
                  Mandwa Phata bus stop and take private auto rickshaw to
                  Mandwa Jetty (Limited Availability).
                </p>

                <p>
                  <span className="font-semibold">Private Hire:</span> Direct
                  hire Auto rickshaw from Alibaug city to Mandwa Jetty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}