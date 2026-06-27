import fallbackLogo from "../../assets/logo/vfs-logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import AdmissionFormModal from "../ui/modal/AdmissionFormModal";
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export default function Footer() {
  const [openForm, setOpenForm] = useState(false);
  const socialLinks = [
    { label: "Facebook", icon: Facebook, url: "#" },
    { label: "Instagram", icon: Instagram, url: "#" },
    { label: "LinkedIn", icon: Linkedin, url: "#" },
    { label: "YouTube", icon: Youtube, url: "#" },
  ];

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <footer className="hidden md:block w-full bg-[#0A2342] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-4 gap-10">

          {/* LOGO + ABOUT */}
          <div>
            <img src={fallbackLogo} className="h-[90px]" />

            <p className="mt-4 text-sm text-white/80 leading-[1.6]">
              Vrinda Foundation School is committed to providing quality education,
              discipline, and holistic development to shape future leaders.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

            <div className="space-y-2 text-sm text-white/80">
              <Link to="/" className="block hover:text-[#00CFC8]">Home</Link>
              <Link to="/about" className="block hover:text-[#00CFC8]">About Us</Link>
              <Link to="/admissions" className="block hover:text-[#00CFC8]">Admissions</Link>
              <Link to="/faculty" className="block hover:text-[#00CFC8]">Faculty</Link>
              <Link to="/contact" className="block hover:text-[#00CFC8]">Contact</Link>
            </div>
          </div>

          {/* ACADEMICS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Academics</h3>

            <div className="space-y-2 text-sm text-white/80">
              <Link to="/karate" className="block hover:text-[#00CFC8]">
                Taekwondo & Karate Classes
              </Link>

              <Link to="/gallery" className="block hover:text-[#00CFC8]">
                Gallery
              </Link>
              <Link to="/neev" className="block hover:text-[#00CFC8]">NEEV Batch</Link>
              <Link to="/results" className="block hover:text-[#00CFC8]">Results</Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>

            <div className="space-y-3 text-sm text-white/80">

              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+919001700414" className="hover:text-[#00CFC8]">
                  +91 9001700414
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@vrindafoundation.com" className="hover:text-[#00CFC8]">
                  info@vrindafoundation.com
                </a>
              </div>

              <p className="text-white/70 text-xs mt-2">
                Sujangarh Road, Jaswantgarh, Rajasthan - 341304
              </p>

            </div>

            {/* CTA */}
            <button
              onClick={() => setOpenForm(true)}
              className="mt-4 bg-[#00CFC8] text-[#0A2342] px-4 py-2 rounded-md font-semibold hover:bg-[#00b5af] transition">
              Apply Now
            </button>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-10 border-t border-white/10 pt-4 text-center text-sm text-white/60">
          © {new Date().getFullYear()} Vrinda Foundation School. All rights reserved.
        </div>
      </footer>


      {/* ================= MOBILE ================= */}
      <footer className="md:hidden bg-[#062448] text-white px-4 py-6">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img src={fallbackLogo} className="h-10" />
          <div>
            <h2 className="text-lg font-semibold">Vrinda Foundation</h2>
            <p className="text-xs text-white/70">No Child Left Behind</p>
          </div>
        </div>

        {/* DESC */}
        <p className="mt-4 text-xs text-white/80 leading-[1.6]">
          Providing quality education with modern facilities and experienced faculty.
        </p>

        {/* LINKS */}
        <div className="grid grid-cols-2 gap-6 mt-6 text-xs">

          <div>
            <h3 className="mb-2 font-semibold">Quick Links</h3>
            <Link to="/" className="block">Home</Link>
            <Link to="/about" className="block">About</Link>
            <Link to="/admissions" className="block">Admissions</Link>
            <Link to="/neev" className="block">NEEV</Link>
            <Link to="/gallery" className="block">Gallery</Link>
            <Link to="/results" className="block">Results</Link>
            <Link to="/karate" className="block">Karate Classes</Link>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Contact</h3>
            <a href="tel:+919001700414" className="block">+91 9001700414</a>
            <a href="mailto:info@vrindafoundation.com" className="block">
              info@vrindafoundation.com
            </a>
            <div className="mt-4">
              <h4 className="mb-2 font-semibold">Follow Us</h4>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    aria-label={social.label}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                  >
                    <social.icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <button

          className="mt-6 w-full bg-[#00CFC8] text-[#0A2342] py-2 rounded-md font-semibold">
          Apply Now
        </button>

        {/* BOTTOM */}
        <p className="text-center text-[10px] text-white/60 mt-4">
          © {new Date().getFullYear()} Vrinda Foundation School
        </p>
      </footer>
      <AdmissionFormModal
        isOpen={openForm}
        onClose={() => setOpenForm(false)}
      />
    </>
  );
}
