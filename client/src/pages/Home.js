import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import ProductCard from "../components/ProductCard";

const collections = [
  {
    name: "Men's Heritage",
    count: "Classic & Traditional",
    category: "Men",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Bridal & Wedding",
    count: "Gold Tilla & Dabka",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Women's Velvet",
    count: "Zari & Kashigari Work",
    category: "Women",
    image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Casual & Loafers",
    count: "Soft Suede & Nubuck",
    category: "Casual",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Little Nawab (Kids)",
    count: "Festive & Soft Padded",
    category: "Kids",
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=800&q=80",
  },
];

const craftSteps = [
  {
    number: "01",
    title: "Vegetable-Tanned Cowhide",
    description: "Locally cured leather seasoned with natural barks in Multan for exceptional breathability and longevity.",
  },
  {
    number: "02",
    title: "Anatomical Wooden Lasts",
    description: "Every upper is sculpted over traditional hand-carved wooden moulds that contour to human feet over time.",
  },
  {
    number: "03",
    title: "Pure Zari & Tilla Needlework",
    description: "Artisan women in Multan hand-embroider each floral motif stitch-by-stitch using metallic bullion wires.",
  },
  {
    number: "04",
    title: "Waxed Thread Hand-Stitching",
    description: "Heavy-duty cotton twine soaked in beeswax connects the upper to the sole, ensuring seams never tear.",
  },
];

const customerReviews = [
  {
    name: "Malik Shahzad",
    city: "Lahore",
    rating: 5,
    title: "Pure Multani Legacy!",
    text: "Ordered the Multani Zari Khussa in Black for my brother's wedding. The leather was supple from day one with zero pinching. Everyone complimented the intricate gold work.",
  },
  {
    name: "Dr. Aiman Farooq",
    city: "Islamabad",
    rating: 5,
    title: "Bridal masterpiece",
    text: "My bridal khussa in Crimson Red was breathtaking! The memory foam padding allowed me to stand and greet guests for 5 hours without foot ache. Highly recommended!",
  },
  {
    name: "Usman Raza",
    city: "Karachi",
    rating: 5,
    title: "Fast COD delivery & true sizing",
    text: "TCS delivered in 3 days to Clifton. Exactly matches the online photos. The fit was spot on according to their size guide. Will be ordering casual pairs too.",
  },
  {
    name: "Fatima Tariq",
    city: "Multan",
    rating: 5,
    title: "Pride of our city",
    text: "I frequently visit their shop in Saddar Cantt, but ordering online for family in UK was just as seamless. Bhutta Khussa Mehal is the gold standard of real khussa.",
  },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    api
      .get("/products", { params: { limit: 12 } })
      .then(({ data }) => setFeatured(data.products))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts =
    activeTab === "All"
      ? featured
      : featured.filter((p) => p.category === activeTab);

  return (
    <div className="overflow-hidden">
      {/* 1. Grand Hero Section */}
      <section className="relative border-b border-brass/20 bg-radial from-charcoal/80 to-ink pt-8">
        <div className="max-w-6xl mx-auto px-5 py-16 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-charcoal border border-brass/30 px-3 py-1 mb-6 rounded-xs">
              <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
              <span className="text-brass text-xs font-medium tracking-wide">
                Heritage Footwear of Multan &middot; Est. 1984
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl text-ivory leading-[1.15] font-display">
              Where Every Stitch Carries Royal Heritage.
            </h1>

            <p className="text-stone mt-6 text-base md:text-lg max-w-lg leading-relaxed">
              Hand-carved leather, genuine zari wire, and ancestral craftsmanship.
              Bhutta Khussa Mehal brings the legendary artisans of Saddar Multan
              Cantt directly to your doorstep with nationwide Cash on Delivery.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="bg-brass text-ink font-semibold px-8 py-3.5 text-sm hover:bg-ivory transition-all shadow-lg hover:shadow-brass/20"
              >
                Explore Full Collection
              </Link>
              <Link
                to="/shop?cat=Wedding"
                className="border border-brass/40 text-ivory font-medium px-8 py-3.5 text-sm hover:border-brass hover:text-brass transition-colors"
              >
                Bridal &amp; Groom Specials
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="mt-12 pt-8 border-t border-brass/15 grid grid-cols-3 gap-6 text-left">
              <div>
                <span className="block font-display text-2xl md:text-3xl text-brass">40+</span>
                <span className="text-stone text-xs">Years of Mastery</span>
              </div>
              <div>
                <span className="block font-display text-2xl md:text-3xl text-brass">100%</span>
                <span className="text-stone text-xs">Genuine Cowhide</span>
              </div>
              <div>
                <span className="block font-display text-2xl md:text-3xl text-brass">50K+</span>
                <span className="text-stone text-xs">Pairs Delivered</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="relative">
            <div className="aspect-[4/5] bg-charcoal border border-brass/25 overflow-hidden shadow-2xl relative group">
              <img
                src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80"
                alt="Multani Handcrafted Khussa"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-brass text-xs uppercase tracking-widest2 mb-1">
                  Signature Article &middot; Article #01
                </span>
                <h3 className="text-ivory font-display text-2xl mb-2">
                  Multani Royal Zari Khussa
                </h3>
                <p className="text-stone text-xs max-w-sm mb-4">
                  Hand-stitched with tilla wire over buffed cowhide. Features reinforced heel and double-corded sole.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-brass font-semibold text-lg">Rs. 3,800</span>
                  <Link
                    to="/product/multani-zari-khussa-royal-black"
                    className="bg-brass/90 text-ink text-xs font-semibold px-4 py-2 hover:bg-ivory transition-colors"
                  >
                    View Article &rarr;
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Key Pillars Strip */}
      <section className="bg-charcoal border-b border-brass/20 py-8 px-5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 rounded-full bg-ink flex items-center justify-center text-brass border border-brass/30 font-bold">
              ✓
            </div>
            <div>
              <h4 className="text-ivory text-xs font-semibold uppercase tracking-wider">100% Pure Leather</h4>
              <p className="text-stone text-xs">Cowhide &amp; sheepskin lining</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 rounded-full bg-ink flex items-center justify-center text-brass border border-brass/30 font-bold">
              🇵🇰
            </div>
            <div>
              <h4 className="text-ivory text-xs font-semibold uppercase tracking-wider">Cash on Delivery</h4>
              <p className="text-stone text-xs">All cities &amp; towns of Pakistan</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 rounded-full bg-ink flex items-center justify-center text-brass border border-brass/30 font-bold">
              🔄
            </div>
            <div>
              <h4 className="text-ivory text-xs font-semibold uppercase tracking-wider">7-Day Free Exchange</h4>
              <p className="text-stone text-xs">Easy size adjustments</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 rounded-full bg-ink flex items-center justify-center text-brass border border-brass/30 font-bold">
              ⚡
            </div>
            <div>
              <h4 className="text-ivory text-xs font-semibold uppercase tracking-wider">Express Dispatch</h4>
              <p className="text-stone text-xs">TCS &amp; Trax (2&ndash;4 Business Days)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Collection (Visual Cards) */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-brass text-xs uppercase tracking-widest font-semibold block mb-2">
              Curated Multani Craft
            </span>
            <h2 className="text-3xl md:text-4xl text-ivory font-display">Shop by Heritage Collection</h2>
          </div>
          <Link to="/shop" className="text-brass text-sm hover:text-ivory transition-colors mt-3 md:mt-0 font-medium">
            Browse All 18+ Designs &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {collections.map((col) => (
            <Link
              key={col.name}
              to={`/shop?cat=${col.category}`}
              className="group block relative aspect-[3/4] overflow-hidden bg-charcoal border border-brass/20 rounded-xs"
            >
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent flex flex-col justify-end p-4">
                <span className="text-brass text-[10px] uppercase tracking-wider font-semibold">
                  {col.count}
                </span>
                <h3 className="text-ivory text-sm font-display leading-tight group-hover:text-brass transition-colors mt-1">
                  {col.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Trending & Featured Showcase with Category Filter Tabs */}
      <section className="bg-charcoal/40 border-y border-brass/15 py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-brass text-xs uppercase tracking-widest font-semibold block mb-2">
                This Season's Most Wanted
              </span>
              <h2 className="text-3xl md:text-4xl text-ivory font-display">Handcrafted Bestsellers</h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {["All", "Men", "Wedding", "Women", "Casual"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs px-4 py-2 border transition-all ${
                    activeTab === tab
                      ? "border-brass bg-brass text-ink font-semibold"
                      : "border-brass/20 text-stone hover:border-brass hover:text-ivory"
                  }`}
                >
                  {tab === "All" ? "All Designs" : tab}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="text-stone text-center py-16">Loading handcrafted pairs...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-stone text-center py-16">No products found in this category.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.slice(0, 8).map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-block border border-brass text-brass px-10 py-3 text-sm font-medium hover:bg-brass hover:text-ink transition-colors"
            >
              View All Khussa In Catalog ({featured.length} Articles)
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Grand Wedding & Groom Split Banner */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="bg-charcoal border border-brass/25 grid md:grid-cols-2 overflow-hidden">
          <div className="p-8 md:p-14 flex flex-col justify-center">
            <span className="text-brass text-xs uppercase tracking-widest font-semibold mb-3">
              The Royal Wedding Atelier
            </span>
            <h2 className="text-3xl md:text-4xl text-ivory font-display leading-tight mb-4">
              Sherwani Mojaris &amp; Bridal Tilla Khussa
            </h2>
            <p className="text-stone text-sm leading-relaxed mb-8">
              Make your Barat and Walima unforgettable. Our master tilla artisans
              craft bespoke footwear that complements royal sherwanis, lehengas,
              and designer couture with pure gold bullion wire and cushioned soles.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop?cat=Wedding"
                className="bg-brass text-ink font-semibold px-7 py-3 text-sm hover:bg-ivory transition-colors"
              >
                Shop Wedding Pairs
              </Link>
              <a
                href="https://wa.me/923116633159?text=Hello%20Bhutta%20Khussa%20Mehal,%20I%20want%20to%20order%20wedding%20khussa"
                target="_blank"
                rel="noreferrer"
                className="border border-brass/30 text-ivory px-7 py-3 text-sm hover:border-brass transition-colors"
              >
                Custom Bride/Groom Inquiries
              </a>
            </div>
          </div>

          <div className="aspect-square md:aspect-auto min-h-[350px] relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80"
              alt="Bridal and Groom Khussa Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-charcoal via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* 6. The 4 Stages of Multani Craftsmanship */}
      <section className="bg-charcoal border-y border-brass/20 py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brass text-xs uppercase tracking-widest font-semibold block mb-2">
              Ancestral Technique
            </span>
            <h2 className="text-3xl md:text-4xl text-ivory font-display">
              16 Hours of Handcrafting in Every Single Pair
            </h2>
            <p className="text-stone text-sm mt-3">
              Unlike machine-made factory shoes, an authentic Multani khussa is an
              intricate piece of wearable cultural art.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {craftSteps.map((step) => (
              <div key={step.number} className="bg-ink/60 border border-brass/15 p-6 rounded-xs relative">
                <span className="font-display text-3xl text-brass/40 block mb-3">{step.number}</span>
                <h3 className="text-ivory font-medium text-base mb-2">{step.title}</h3>
                <p className="text-stone text-xs leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Master Craftsman Quote */}
          <div className="mt-14 max-w-3xl mx-auto text-center border-t border-brass/15 pt-10">
            <blockquote className="text-ivory font-display text-lg md:text-xl italic leading-relaxed">
              &ldquo;A true khussa has no fixed left or right foot initially; the genuine leather
              and heat of your stride gently teaches the shoe to mold uniquely to you.&rdquo;
            </blockquote>
            <p className="text-brass text-xs uppercase tracking-widest font-medium mt-3">
              &mdash; Ustad Muhammad Ramzan &middot; Master Craftsman at Saddar Multan Cantt
            </p>
          </div>
        </div>
      </section>

      {/* 7. Verified Customer Reviews */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-brass text-xs uppercase tracking-widest font-semibold block mb-2">
            Patron Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl text-ivory font-display">
            Loved Across Pakistan &amp; Overseas
          </h2>
          <p className="text-stone text-sm mt-2">
            Read what our patrons from Lahore, Karachi, Islamabad, and Multan say.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerReviews.map((rev) => (
            <div key={rev.name} className="bg-charcoal border border-brass/15 p-6 flex flex-col justify-between">
              <div>
                <div className="text-brass text-sm mb-2">{"★".repeat(rev.rating)}</div>
                <h4 className="text-ivory text-sm font-semibold mb-2">{rev.title}</h4>
                <p className="text-stone text-xs leading-relaxed italic">&ldquo;{rev.text}&rdquo;</p>
              </div>
              <div className="mt-6 pt-4 border-t border-brass/10 flex items-center justify-between text-xs">
                <span className="text-ivory font-medium">{rev.name}</span>
                <span className="text-brass text-[11px] font-medium">{rev.city}, PK</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Visit Flagship Workshop & Boutique Banner */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="bg-ink border border-brass/30 p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <span className="text-brass text-xs uppercase tracking-widest font-semibold block mb-2">
              Physical Boutique &middot; Saddar Multan Cantt
            </span>
            <h3 className="text-2xl md:text-3xl text-ivory font-display mb-3">
              Visiting the City of Saints? Step into Our Workshop.
            </h3>
            <p className="text-stone text-xs md:text-sm leading-relaxed max-w-xl">
              Witness our master artisans hand-stitching live. Try on bespoke samples, select
              custom velvet colors, and get measured for tailor-fit wedding pairs.
            </p>
            <div className="mt-4 text-xs text-stone space-y-1">
              <p><strong className="text-ivory">Address:</strong> 5CPQ+V97, Saddar Multan Cantt Commercial Area, Multan</p>
              <p><strong className="text-ivory">Store Hours:</strong> Monday &ndash; Sunday: 11:00 AM &ndash; 10:30 PM</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3">
            <a
              href="https://maps.google.com/?q=5CPQ+V97+Saddar+Multan+Cantt"
              target="_blank"
              rel="noreferrer"
              className="bg-brass text-ink font-semibold py-3 px-6 text-xs text-center hover:bg-ivory transition-colors"
            >
              Open in Google Maps
            </a>
            <a
              href="tel:03116633159"
              className="border border-brass/40 text-ivory py-3 px-6 text-xs text-center hover:border-brass transition-colors"
            >
              Call Store: 0311-6633159
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
