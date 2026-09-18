import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";
import ProductCard from "../components/ProductCard";

const categories = [
  { id: "All", label: "All Catalog" },
  { id: "Men", label: "Men's Heritage" },
  { id: "Wedding", label: "Bridal & Wedding" },
  { id: "Women", label: "Women's Velvet & Zari" },
  { id: "Casual", label: "Casual & Loafers" },
  { id: "Kids", label: "Little Nawab (Kids)" },
];

const priceRanges = [
  { id: "all", label: "All Prices" },
  { id: "under3500", label: "Under Rs. 3,500" },
  { id: "3500to5000", label: "Rs. 3,500 – Rs. 5,000" },
  { id: "above5000", label: "Above Rs. 5,000" },
];

const shopFaqs = [
  {
    q: "How should a genuine handcrafted khussa fit when brand new?",
    a: "An authentic leather khussa should feel comfortably snug on first wear. Because we use 100% natural cowhide and soft sheepskin lining, the shoe naturally stretches and moulds to your exact foot contour after 2 to 3 wears.",
  },
  {
    q: "Is there a specific left or right shoe initially?",
    a: "Traditional Punjabi and Multani khussa are crafted over symmetric wooden lasts and do not have a marked left or right foot initially. The pair shapes itself permanently to your left and right feet as you walk.",
  },
  {
    q: "How does nationwide Cash on Delivery (COD) work?",
    a: "We ship via TCS, Trax, and Leopards Couriers across all cities and tehsils in Pakistan. You only hand over the cash to the courier representative when the parcel arrives at your doorstep.",
  },
  {
    q: "What if the size I ordered doesn't fit?",
    a: "We offer an easy 7-day size exchange guarantee. If your pair is slightly tight or loose, send us a WhatsApp message at 0311-6633159 and we will swiftly arrange an exchange pair.",
  },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get("cat") || "All";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(catParam);
  const [priceFilter, setPriceFilter] = useState("all");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  // Sync category if URL param changes
  useEffect(() => {
    if (catParam) {
      setCategory(catParam);
    }
  }, [catParam]);

  useEffect(() => {
    setLoading(true);
    const params = { limit: 50 };
    if (category !== "All") params.category = category;
    if (sort) params.sort = sort;
    if (search) params.search = search;

    if (priceFilter === "under3500") {
      params.maxPrice = 3499;
    } else if (priceFilter === "3500to5000") {
      params.minPrice = 3500;
      params.maxPrice = 5000;
    } else if (priceFilter === "above5000") {
      params.minPrice = 5001;
    }

    api
      .get("/products", { params })
      .then(({ data }) => setProducts(data.products))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category, sort, search, priceFilter]);

  const handleCategoryChange = (catId) => {
    setCategory(catId);
    if (catId === "All") {
      searchParams.delete("cat");
    } else {
      searchParams.set("cat", catId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      {/* Shop Header Banner */}
      <div className="border-b border-brass/20 pb-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-brass text-xs uppercase tracking-widest font-semibold block mb-1">
              Multan Master Craftsmanship
            </span>
            <h1 className="text-3xl md:text-5xl text-ivory font-display">
              Handcrafted Khussa Collection
            </h1>
            <p className="text-stone text-xs md:text-sm mt-2 max-w-xl leading-relaxed">
              Explore 100% genuine cowhide pairs embellished with traditional zari, dabka, and tilla.
              Each article is carefully checked and padded before dispatch.
            </p>
          </div>

          <div className="text-right text-xs text-stone">
            <span className="text-brass font-semibold text-sm">{products.length}</span> Articles Displayed
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-col gap-5 mb-10">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCategoryChange(c.id)}
              className={`text-xs px-4 py-2 border transition-all ${
                category.toLowerCase() === c.id.toLowerCase()
                  ? "border-brass bg-brass text-ink font-semibold shadow-sm"
                  : "border-brass/20 text-stone hover:border-brass hover:text-ivory"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-2">
          <div className="flex flex-1 w-full sm:w-auto gap-2">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by article name, color, or style..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-charcoal border border-brass/25 text-ivory text-xs px-4 py-2.5 focus:border-brass outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-2.5 text-stone hover:text-ivory text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Price Filter Selector */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="bg-charcoal border border-brass/25 text-ivory text-xs px-3 py-2.5 focus:border-brass outline-none cursor-pointer"
            >
              {priceRanges.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full sm:w-auto bg-charcoal border border-brass/25 text-ivory text-xs px-4 py-2.5 focus:border-brass outline-none cursor-pointer"
          >
            <option value="">Sort: Featured First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-28">
          <div className="w-8 h-8 border-2 border-brass border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone text-sm">Loading handcrafted articles...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 bg-charcoal border border-brass/15 p-8 my-8">
          <p className="text-ivory font-display text-lg mb-2">No matching khussa found</p>
          <p className="text-stone text-xs mb-6 max-w-md mx-auto">
            Try resetting your price or category filters, or explore our full catalog.
          </p>
          <button
            onClick={() => {
              setCategory("All");
              setPriceFilter("all");
              setSearch("");
            }}
            className="bg-brass text-ink text-xs font-semibold px-6 py-2.5 hover:bg-ivory transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}

      {/* Customer Trust Strip on Shop Page */}
      <section className="mt-24 pt-12 border-t border-brass/20 grid sm:grid-cols-3 gap-8 text-center sm:text-left">
        <div className="border border-brass/15 p-6 bg-charcoal/40">
          <h4 className="text-brass font-display text-base mb-1">Authentic Multani Leather</h4>
          <p className="text-stone text-xs leading-relaxed">
            Every pair is sculpted from genuine vegetable-tanned leather, never synthetic rexine or PVC.
          </p>
        </div>
        <div className="border border-brass/15 p-6 bg-charcoal/40">
          <h4 className="text-brass font-display text-base mb-1">Doorstep Inspection &amp; COD</h4>
          <p className="text-stone text-xs leading-relaxed">
            Pay safely only when your order arrives. Standard nationwide delivery within 2 to 4 days.
          </p>
        </div>
        <div className="border border-brass/15 p-6 bg-charcoal/40">
          <h4 className="text-brass font-display text-base mb-1">7-Day Free Size Exchange</h4>
          <p className="text-stone text-xs leading-relaxed">
            Not the right fit? Message our Multan boutique on WhatsApp (0311-6633159) for an immediate replacement.
          </p>
        </div>
      </section>

      {/* Frequently Asked Questions on Sizing & Ordering */}
      <section className="mt-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-brass text-xs uppercase tracking-widest font-semibold block mb-1">
            Buyer Assistance
          </span>
          <h3 className="text-2xl md:text-3xl text-ivory font-display">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {shopFaqs.map((faq, i) => (
            <div key={i} className="bg-charcoal border border-brass/15 p-5">
              <h5 className="text-ivory text-xs font-semibold mb-2">{faq.q}</h5>
              <p className="text-stone text-xs leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Shop;
