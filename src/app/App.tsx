import { useState, useEffect } from "react";
import {
  ImageWithFallback,
  VideoWithFallback,
} from "./components/figma/ImageWithFallback";
import { motion, useScroll, useTransform } from "motion/react";
import { ShoppingBag, Menu, X, Heart, Sparkles } from "lucide-react";
import { Logo } from "./components/Logo";
import { ProductModal } from "./components/ProductModal";
import { CartDrawer } from "./components/CartDrawer";
import Footer from "./components/Footer";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  description?: string;
  materials?: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [cart, setCart] = useState<CartItem[]>([]);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const jewelry: Product[] = [
    {
      id: 1,
      name: "Teardrop Earrings",
      price: "$48",
      image:
        "https://images.unsplash.com/photo-1573227890085-12ab5d68a170?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      category: "Earrings",
      description:
        "Elegant white and black leather teardrop earrings with a minimalist design.",
      materials: "Genuine leather, sterling silver hooks",
    },
    {
      id: 2,
      name: "Artisan Bracelets",
      price: "$62",
      image:
        "https://images.unsplash.com/photo-1679590988898-50c20140aec0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      category: "Bracelets",
      description:
        "Handwoven bracelets featuring traditional patterns and vibrant colors.",
      materials: "Cotton thread, natural beads",
    },
    {
      id: 3,
      name: "Floral Necklace",
      price: "$85",
      image:
        "https://images.unsplash.com/photo-1722510825242-0d8f2064c2e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      category: "Necklaces",
      description:
        "A delicate necklace inspired by nature with floral accents.",
      materials: "Sterling silver, semi-precious stones",
    },
    {
      id: 4,
      name: "Beaded Collection",
      price: "$52",
      image:
        "https://images.unsplash.com/photo-1523252012848-c22188792c27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      category: "Necklaces",
      description:
        "Colorful beaded necklaces that celebrate traditional craftsmanship.",
      materials: "Glass beads, cotton cord",
    },
    {
      id: 5,
      name: "Pearl Necklace",
      price: "$95",
      image:
        "https://images.unsplash.com/photo-1659288735090-9fb9e3b68fd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      category: "Necklaces",
      description: "Timeless pearl necklace perfect for any occasion.",
      materials: "Freshwater pearls, silk thread",
    },
    {
      id: 6,
      name: "Curated Set",
      price: "$120",
      image:
        "https://images.unsplash.com/photo-1528797664208-e5a8c0b98881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      category: "Sets",
      description:
        "A thoughtfully curated jewelry set for the discerning collector.",
      materials: "Mixed metals, natural stones",
    },
  ];

  const categories = ["All", "Necklaces", "Earrings", "Bracelets", "Sets"];

  const filteredJewelry =
    activeFilter === "All"
      ? jewelry
      : jewelry.filter((item) => item.category === activeFilter);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleToggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsModalOpen(false);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
      );
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-50">
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={
          selectedProduct ? wishlist.has(selectedProduct.id) : false
        }
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <Logo />
              <a href="/">
                <span className="tracking-wider">KANTAMANI</span>
              </a>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-12">
              <a
                href="#collection"
                className="text-sm tracking-wide hover:text-[#D4AF37] transition-colors"
              >
                Collection
              </a>
              {/* <a
                href="#artisans"
                className="text-sm tracking-wide hover:text-[#D4AF37] transition-colors"
              >
                Artisans
              </a> */}
              <a
                href="#about"
                className="text-sm tracking-wide hover:text-[#D4AF37] transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-sm tracking-wide hover:text-[#D4AF37] transition-colors"
              >
                Contact
              </a>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                {/* <ShoppingBag size={20} /> */}
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-neutral-200 px-6 py-6"
          >
            <div className="flex flex-col gap-6">
              <a
                href="#collection"
                className="text-sm tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collection
              </a>
              {/* <a
                href="#artisans"
                className="text-sm tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                Artisans
              </a> */}
              <a
                href="#about"
                className="text-sm tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="text-sm tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section with Parallax */}
      <section className="relative h-screen overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <VideoWithFallback
            src="https://giftcard-assets-00.s3.us-east-1.amazonaws.com/hero-video.MP4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-neutral-50" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex items-center justify-center px-6 lg:px-12"
        >
          <div className="text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 tracking-tight text-white">
                Handcrafted
                <br />
                <span className="italic font-light">with care</span>
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
                Welcome to our exquisite collection of anti-tarnish jewelry,
                where enduring beauty meets lasting quality. Our pieces are
                crafted with innovative technology to resist tarnishing,
                ensuring your jewelry retains its brilliance for years to come.
              </p>
              <motion.a
                href="#collection"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-[#D4AF37] text-white px-8 py-4 rounded-lg hover:bg-[#C5A028] transition-colors"
              >
                Explore Collection
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Collection Grid */}
      <section id="collection" className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl mb-12 text-center tracking-tight"
          >
            Our Collection
          </motion.h2>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full text-sm tracking-wide transition-all ${
                  activeFilter === category
                    ? "bg-[#D4AF37] text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {filteredJewelry.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div
                  onClick={() => handleProductClick(item)}
                  className="relative aspect-[3/4] mb-6 overflow-hidden bg-neutral-100 rounded-lg"
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                  {/* Wishlist Button */}
                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleWishlist(item.id);
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                  >
                    <Heart
                      size={18}
                      fill={wishlist.has(item.id) ? "#D4AF37" : "none"}
                      className={
                        wishlist.has(item.id)
                          ? "text-[#D4AF37]"
                          : "text-neutral-700"
                      }
                    />
                  </button> */}

                  {/* Quick View Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                      Quick View
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="tracking-wide">{item.name}</h3>
                  <p className="text-[#D4AF37]">{item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Spotlight */}
      {/* <section id="artisans" className="py-32 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl mb-6 tracking-tight">
              Meet Our Artisans
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              The skilled hands and creative minds behind every piece
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                name: "Maria Santos",
                specialty: "Metalwork & Wire Wrapping",
                image:
                  "https://images.unsplash.com/photo-1602806271931-07e449a819bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
                story:
                  "15 years of experience transforming precious metals into wearable art.",
              },
              {
                name: "Aisha Rahman",
                specialty: "Beadwork & Traditional Patterns",
                image:
                  "https://images.unsplash.com/photo-1652446082939-f51ac617aadf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
                story:
                  "Preserving ancestral techniques passed down through four generations.",
              },
              {
                name: "Elena Kovač",
                specialty: "Stone Setting & Engraving",
                image:
                  "https://images.unsplash.com/photo-1669255265771-04bb9697dbd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
                story:
                  "Master craftswoman specializing in intricate gemstone arrangements.",
              },
            ].map((artisan, index) => (
              <motion.div
                key={artisan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative aspect-square mb-6 overflow-hidden rounded-lg bg-neutral-200">
                  <ImageWithFallback
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="text-xl mb-2 tracking-tight">{artisan.name}</h3>
                <p className="text-[#D4AF37] text-sm mb-4">
                  {artisan.specialty}
                </p>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {artisan.story}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Materials & Process Timeline */}
      <section className="py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Sparkles className="mx-auto mb-6 text-[#D4AF37]" size={40} />
            <h2 className="text-3xl md:text-5xl mb-6 tracking-tight">
              The Journey of Creation
            </h2>
            <p className="text-neutral-600 text-lg">
              From raw materials to finished masterpiece
            </p>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                step: "01",
                title: "Material Selection",
                description:
                  "Ethically sourced metals, gemstones, and natural materials carefully chosen for quality and sustainability.",
                image:
                  "https://images.unsplash.com/photo-1608112169461-48616144c894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
              },
              {
                step: "02",
                title: "Handcrafting",
                description:
                  "Traditional techniques meet contemporary design as our artisans shape each piece with precision and care.",
                image:
                  "https://images.unsplash.com/photo-1766560360164-6be5d9c4de99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
              },
              {
                step: "03",
                title: "Finishing & Quality",
                description:
                  "Meticulous polishing, setting, and inspection ensure every detail meets our exacting standards.",
                image:
                  "https://images.unsplash.com/photo-1766560359809-3a727c487fe6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col md:flex-row gap-12 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="text-6xl font-light text-[#D4AF37]/20 mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-2xl mb-4 tracking-tight">
                    {process.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {process.description}
                  </p>
                </div>
                <div className="flex-1 aspect-video rounded-lg overflow-hidden bg-neutral-100">
                  <ImageWithFallback
                    src={process.image}
                    alt={process.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 lg:px-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl mb-20 text-center tracking-tight"
          >
            What Our Customers Say
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                quote:
                  "The craftsmanship is extraordinary. Each piece feels personal and unique. I receive compliments every time I wear my necklace.",
                author: "Sarah Chen",
                image:
                  "https://images.unsplash.com/photo-1763677593928-468dc9767e7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
              },
              {
                quote:
                  "Beautiful, timeless pieces that tell a story. The attention to detail and quality is unmatched.",
                author: "Jessica Williams",
                image:
                  "https://images.unsplash.com/photo-1763677594421-f58e50cce64d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
              },
              {
                quote:
                  "I love knowing that my jewelry was made by skilled artisans using traditional techniques. It makes each piece even more special.",
                author: "Amanda Silva",
                image:
                  "https://images.unsplash.com/photo-1758922584983-82ffd5720c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-200">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="tracking-wide">{testimonial.author}</p>
                  </div>
                </div>
                <p className="text-neutral-600 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl mb-8 tracking-tight">
              Meet the Founder
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed mb-6">
              Kantamani was founded in 2025 by Soumya Pachalla, a 24-year-old
              with a deep-rooted passion for fine jewelry and timeless
              sophistication. With a vision to redefine affordable luxury, I set
              out to create designs that are not only visually stunning but also
              made to endure-beyond trends and time.
            </p>
            <p className="text-neutral-600 text-lg leading-relaxed mb-12">
              Every Kantamani piece reflects my commitment to exceptional
              craftsmanship, lasting beauty, and effortless elegance-bringing
              you jewelry that feels as special as it looks.
            </p>

            {/* <div className="grid md:grid-cols-3 gap-12 mt-16 text-center">
              <div>
                <div className="text-4xl text-[#D4AF37] mb-3">100%</div>
                <p className="text-neutral-600">Handcrafted</p>
              </div>
              <div>
                <div className="text-4xl text-[#D4AF37] mb-3">Ethical</div>
                <p className="text-neutral-600">Sourcing</p>
              </div>
              <div>
                <div className="text-4xl text-[#D4AF37] mb-3">Lifetime</div>
                <p className="text-neutral-600">Guarantee</p>
              </div>
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      {/* <section
        id="contact"
        className="py-32 px-6 lg:px-12 bg-neutral-900 text-white"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-6 tracking-tight">
              Stay Connected
            </h2>
            <p className="text-white/80 mb-8">
              Subscribe to receive updates on new collections and exclusive
              offers
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#D4AF37]"
              />
              <button className="bg-[#D4AF37] text-white px-8 py-4 rounded-lg hover:bg-[#C5A028] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
