import img1 from "../../assets/images/explore-card-1.png";
import img2 from "../../assets/images/explore-card-2.png";
import img3 from "../../assets/images/explore-card-3.png";
import img4 from "../../assets/images/explore-card-1.png";

import shopping1 from "../../assets/images/shopping1.jpg";
import shopping2 from "../../assets/images/shopping2.jpeg";

import { useState } from "react";

export default function TopAttractionsSection() {
  const [activeTab, setActiveTab] = useState("Restaurants");

  // Restaurants Data
  const restaurantsData = [
    {
      title: "Boardwalk by Flamboyante",
      desc: "A multi cuisine restaurant located at Mandwa Port with breathtaking waterfront views. India’s first island Starbucks offering coffee, snacks and relaxing vibes. A multi cuisine restaurant located at Mandwa Port with breathtaking waterfront views.",
      price: "₹2500",
      img: img1,
    },
    {
      title: "Starbucks",
      desc: "India’s first island Starbucks offering coffee, snacks and relaxing vibes. India’s first island Starbucks offering coffee, snacks and relaxing vibes. India’s first island Starbucks offering coffee, snacks and relaxing vibes.",
      price: "₹1000",
      img: img2,
    },
    {
      title: "NIC Ice Cream",
      desc: "Enjoy handcrafted creamy ice creams made with high-quality ingredients. Enjoy handcrafted creamy ice creams made with high-quality ingredients. Enjoy handcrafted creamy ice creams made with high-quality ingredients.",
      price: "₹2000",
      img: img3,
    },
    {
      title: "Fountain Sizzler’s",
      desc: "Famous sizzling dishes with rich taste and great ambience. Enjoy handcrafted creamy ice creams made with high-quality ingredients. Enjoy handcrafted creamy ice creams made with high-quality ingredients.",
      price: "₹1500",
      img: img4,
    },
  ];

  // Shopping Data (NEW)
  const shoppingData = [
    {
      title: "Shell Things",
      desc: "Explore a variety of beautiful shell-based souvenirs and handcrafted coastal decor items perfect to take home memories from Mandwa.",
      img: shopping1,
    },
    {
      title: "Wonder",
      desc: "A vibrant store offering unique accessories, gifts, and lifestyle items that capture the essence of beachside shopping.",
      img: shopping2,
    },
  ];

  // Dynamic Data Switch
  const data =
    activeTab === "Restaurants" ? restaurantsData : shoppingData;

  return (
    <section className="py-16 px-6">
      <div className="max-w-[1100px] mx-auto">

        {/* HEADING */}
        <h2 className="text-center text-[26px] md:text-[30px] font-semibold text-primary">
          Top Attractions
        </h2>

        {/* TABS */}
        <div className="flex justify-center mt-4">
          <div className="flex border border-[#D6DEE6] rounded-full bg-white">

            <button
              onClick={() => setActiveTab("Restaurants")}
              className={`px-4 py-1 text-[13px] rounded-full transition ${activeTab === "Restaurants"
                ? "bg-primary-dark text-white"
                : "text-primary"
                }`}
            >
              Restaurants
            </button>

            <button
              onClick={() => setActiveTab("Shopping")}
              className={`px-4 py-1 text-[13px] rounded-full transition ${activeTab === "Shopping"
                ? "bg-primary-dark text-white"
                : "text-primary"
                }`}
            >
              Shopping
            </button>

          </div>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-[#E9F1F7] rounded-[16px] shadow-sm border border-[#E3EDF5] overflow-hidden md:flex md:flex-col"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden md:h-[200px]">
                <img
                  src={item.img}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105 md:rounded-b-[20px]"
                />

                {/* STARS */}
                <div className="absolute top-3 left-3 text-yellow-400 text-sm">
                  ★★★★★
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 md:min-h-[220px] flex flex-col justify-between">
                <h3 className="text-[15px] font-bold text-primary">
                  {item.title}
                </h3>

                <p className="mt-2 text-[13px] text-secondary leading-relaxed">
                  {item.desc}
                </p>

                {/* PRICE (ONLY FOR RESTAURANTS) */}
                {activeTab === "Restaurants" && (
                  <div className="mt-4">
                    <p className="text-[11px] font-semibold text-secondary">
                      Average Cost for two person
                    </p>
                    <p className="text-[16px] font-bold text-primary">
                      {item.price}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}