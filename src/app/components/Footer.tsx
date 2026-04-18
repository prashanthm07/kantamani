import { Logo } from "./Logo";

const Footer = () => {
    return (
        <footer className="py-16 px-6 lg:px-12 bg-neutral-900 text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Logo />
                <h3 className="tracking-wider">KANTAMANI</h3>
              </div>
              <p className="text-white/60 text-sm">
                Handcrafted jewelry for the modern soul.
              </p>
            </div>
            <div>
              <h4 className="text-sm tracking-wide mb-4">Shop</h4>
              <div className="flex flex-col gap-3 text-sm text-white/60">
                <a
                  href="#collection"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  All Jewelry
                </a>
                <a
                  href="#collection"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Necklaces
                </a>
                <a
                  href="#collection"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Earrings
                </a>
                <a
                  href="#collection"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Bracelets
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm tracking-wide mb-4">About</h4>
              <div className="flex flex-col gap-3 text-sm text-white/60">
                <a
                  href="#artisans"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Our Artisans
                </a>
                <a
                  href="#about"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Our Story
                </a>
                <a href="#" className="hover:text-[#D4AF37] transition-colors">
                  Sustainability
                </a>
                <a
                  href="#contact"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm tracking-wide mb-4">Connect</h4>
              <div className="flex flex-col gap-3 text-sm text-white/60">
                <a
                  href="https://www.instagram.com/kantamani_5?igsh=MXhqaDI4dmhidHRzcw=="
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="mailto:ppsowmya1815@gmail.com"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-white/40 pt-8 border-t border-white/10">
            © 2026 Kantamani Jewelry. All rights reserved.
          </div>
        </div>
      </footer>
    );
};
export default Footer;