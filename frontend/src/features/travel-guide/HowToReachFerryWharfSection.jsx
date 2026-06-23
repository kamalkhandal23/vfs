export default function HowToReachFerryWharfSection() {
    return (
        <section
            id="ferry-wharf-terminal"
            className="w-full bg-[#F4FBFF] py-8 md:py-20"
        >
            <div className="mx-auto max-w-[1200px] px-6">
                {/* heading */}
                <div className="mb-12 text-center">
                    <h2 className="text-[25px] md:text-[42px] font-semibold text-[#0A2342]">
                        How To Reach Ferry Wharf Terminal
                    </h2>

                    <p className="mt-1 text-[10px] leading-[16px] md:mt-2 md:text-[15px] text-[#4B5D73]">
                        Our Mumbai Terminal is located in Princess Docks (Bhaucha Dhakka)
                        next to the Domestic Cruise Terminal (DCT).
                    </p>
                </div>

                {/* top directions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 border-b border-[#D6E4EC] pb-6 md:pb-12">
                    {/* left */}
                    <div>
                        <h3 className="mb-5 text-[20px] md:text-[42px] font-semibold text-[#0A2342]">
                            From North Mumbai
                        </h3>

                        <p className="mb-3 text-[12px] md:text-[17px] leading-[15px] md:leading-[30px] font-semibold text-[#0A2342]">
                            If you are travelling via P D’Mello Road,
                        </p>

                        <ol className="space-y-2 text-[12px] md:text-[17px] leading-[15px] md:leading-[30px] text-[#24364B]">
                            <li>
                                1. Turn left at the traffic lights on P D’Mello Road towards
                                Princess Docks and continue going straight under the eastern
                                freeway.
                            </li>
                            <li>
                                2. At the end of the road, take a right turn and continue
                                straight towards Bhaucha Dhakka.
                            </li>
                            <li>
                                3. At the next traffic lights, proceed straight through the
                                white gates next to the Police Chowky.
                            </li>
                            <li>
                                4. At the end of the road, take a left towards the Ropax Ferry
                                Terminal.
                            </li>
                        </ol>
                    </div>

                    {/* right */}
                    <div className="border-t pt-4 md:border-t-0 md:border-l border-[#F2FCFE] md:pl-10 md:pt-0">
                        <p className="mb-3 text-[12px] md:text-[17px] leading-[15px] md:leading-[30px] font-semibold text-[#0A2342]">
                            If you are travelling via the Eastern Freeway,
                        </p>

                        <ol className="space-y-2 text-[12px] md:text-[17px] leading-[15px] md:leading-[30px] text-[#24364B]">
                            <li>1. Take the exit for Yellow Gate.</li>
                            <li>
                                2. At the end of the road, take a right turn and continue
                                straight towards Bhaucha Dhakka.
                            </li>
                            <li>
                                3. At the next traffic light, take a right turn through the
                                white gates next to the police Chowky.
                            </li>
                            <li>
                                4. At the end of the road, take a left towards the Ropax Ferry
                                Terminal.
                            </li>
                        </ol>
                    </div>
                </div>

                {/* bottom section */}
                <div className="mt-6 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
                    {/* left public transport */}
                    <div>
                        <h3 className="mb-5 text-[20px] md:text-[42px] font-semibold text-[#0A2342]">
                            By Public Transport
                        </h3>

                        <div className="space-y-6 text-[12px] md:text-[17px] leading-[15px] md:leading-[30px] text-[#24364B]">
                            <p>
                                <span className="font-semibold">Bus:</span> You can take BEST
                                Bus no. 44, 46, 48, 50, or 135 get off at the Mallet Bunder bus
                                stop. From here, the Ropax terminal is 5min walking distance.
                            </p>

                            <p>
                                <span className="font-semibold">Train:</span> We are located
                                15min walking distance from Dockyard station. See where
                                Dockyard train station is in relation to us on
                                <br />
                                <a
                                    href="https://maps.app.goo.gl/QR27JCn2D12nsUxRA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#0077B6] underline"
                                >
                                    https://maps.app.goo.gl/QRZJCn2D12nSuXRA
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* right map */}
                   <div className="order-2 md:order-none overflow-hidden rounded-[10px] md:rounded-[14px] shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.4061492251867!2d72.8476309!3d18.957662199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf49a25bc9e1%3A0xa27ce6f71acb31ad!2sM2M%20Ferries%20Private%20Limited!5e0!3m2!1sen!2sin!4v1774701068729!5m2!1sen!2sin"
                            width="100%"
                            height="320"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Ferry Wharf Terminal Map"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}