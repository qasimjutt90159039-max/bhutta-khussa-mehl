import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { fallbackProducts } from "../data/fallbackProducts";

const placeholderImg =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><rect width='100%' height='100%' fill='#221D19'/><text x='50%' y='50%' font-family='sans-serif' font-size='18' fill='#8A8177' text-anchor='middle'>Khussa Photo</text></svg>`
  );

const sizeChart = [
  { pk: 36, eu: 36, us: "5 (W)", footInches: '8.8"' },
  { pk: 37, eu: 37, us: "6 (W)", footInches: '9.1"' },
  { pk: 38, eu: 38, us: "7 (W)", footInches: '9.4"' },
  { pk: 39, eu: 39, us: "7 (M) / 8 (W)", footInches: '9.7"' },
  { pk: 40, eu: 40, us: "7.5 (M) / 8.5 (W)", footInches: '10.0"' },
  { pk: 41, eu: 41, us: "8 (M) / 9.5 (W)", footInches: '10.3"' },
  { pk: 42, eu: 42, us: "9 (M)", footInches: '10.6"' },
  { pk: 43, eu: 43, us: "10 (M)", footInches: '10.9"' },
  { pk: 44, eu: 44, us: "11 (M)", footInches: '11.2"' },
  { pk: 45, eu: 45, us: "12 (M)", footInches: '11.5"' },
];

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [activeTab, setActiveTab] = useState("materials");

  useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    api
      .get(`/products/${slug}`)
      .then(({ data }) => {
        setProduct(data);
        setSize(data.sizes?.[0] ?? null);
        setColor(data.colors?.[0] ?? null);

        // Fetch related products from same category
        api
          .get("/products", { params: { category: data.category, limit: 5 } })
          .then((res) => {
            setRelatedProducts(res.data.products.filter((p) => p._id !== data._id).slice(0, 4));
          })
          .catch(() => {});
      })
      .catch(() => {
        const local = fallbackProducts.find((p) => p.slug === slug || p._id === slug);
        if (local) {
          setProduct(local);
          setSize(local.sizes?.[0] ?? null);
          setColor(local.colors?.[0] ?? null);
          setRelatedProducts(
            fallbackProducts
              .filter((p) => p.category === local.category && p._id !== local._id)
              .slice(0, 4)
          );
        } else {
          setError("Product not found.");
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="text-center py-32">
        <div className="w-8 h-8 border-2 border-brass border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone">Loading artisan khussa details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-32 max-w-md mx-auto px-5">
        <h2 className="text-2xl text-ivory font-display mb-3">Article Not Found</h2>
        <p className="text-stone text-sm mb-6">
          The requested handcrafted pair may be discontinued or the link is expired.
        </p>
        <Link to="/shop" className="bg-brass text-ink font-semibold px-6 py-2.5 text-xs">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [placeholderImg];

  const savings =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? product.compareAtPrice - product.price
      : 0;

  const handleAddToCart = () => {
    addToCart(product, { size, color, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, { size, color, quantity });
    navigate("/checkout");
  };

  const whatsAppText = encodeURIComponent(
    `Hello Bhutta Khussa Mehal! I want to order "${product.name}" (Size: ${size}, Color: ${color}, Qty: ${quantity}). Please confirm availability.`
  );

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      {/* Breadcrumb navigation */}
      <nav className="text-xs text-stone mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-ivory">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-ivory">Catalog</Link>
        <span>/</span>
        <Link to={`/shop?cat=${product.category}`} className="text-brass hover:underline">
          {product.category} Khussa
        </Link>
        <span>/</span>
        <span className="text-ivory truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Grid: Gallery & Product Info */}
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        {/* Left: Multi-image Gallery */}
        <div>
          <div className="aspect-square bg-charcoal border border-brass/25 overflow-hidden relative rounded-xs shadow-xl">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {product.featured && (
              <span className="absolute top-4 left-4 bg-brass text-ink text-[11px] font-bold uppercase tracking-wider px-3 py-1">
                Heritage Masterpiece
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 border overflow-hidden transition-all ${
                    activeImage === idx
                      ? "border-brass ring-1 ring-brass scale-102"
                      : "border-brass/20 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Genuine Leather & Multan Guarantee Box */}
          <div className="mt-8 bg-charcoal/60 border border-brass/15 p-5 rounded-xs space-y-3">
            <div className="flex items-center gap-3 text-xs text-stone">
              <span className="text-brass text-base">🛡️</span>
              <div>
                <strong className="text-ivory block">100% Genuine Multani Leather</strong>
                <span>Never synthetic. Cured with natural barks for softness.</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-stone">
              <span className="text-brass text-base">🔄</span>
              <div>
                <strong className="text-ivory block">Free 7-Day Size Exchange</strong>
                <span>Tight or loose? Send it back for a free size adjustment.</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-stone">
              <span className="text-brass text-base">🇵🇰</span>
              <div>
                <strong className="text-ivory block">Nationwide Cash on Delivery</strong>
                <span>Pay the courier cash when the package arrives at your home.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Specifications & Purchasing */}
        <div>
          <span className="text-brass text-xs uppercase tracking-widest font-semibold block mb-1">
            {product.category} Khussa Collection &middot; Article ID: #{product._id.slice(-6).toUpperCase()}
          </span>

          <h1 className="text-3xl lg:text-4xl text-ivory font-display mb-3">
            {product.name}
          </h1>

          {/* Star Rating snippet */}
          <div className="flex items-center gap-2 mb-4 text-xs">
            <div className="text-brass">★★★★★</div>
            <span className="text-stone">4.9 / 5.0 (42 Verified Reviews)</span>
          </div>

          {/* Pricing Block */}
          <div className="bg-charcoal/80 border border-brass/20 p-4 mb-6 flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl md:text-3xl text-brass font-semibold">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span className="text-stone line-through text-sm">
                  Rs. {product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>

            {savings > 0 && (
              <span className="bg-maroon text-ivory text-xs px-2.5 py-1 font-medium">
                Save Rs. {savings.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-stone text-xs md:text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors?.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-ivory font-medium">
                  Select Color: <span className="text-brass">{color}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-4 py-2 border text-xs transition-all ${
                      color === c
                        ? "border-brass bg-brass text-ink font-semibold shadow"
                        : "border-brass/25 text-stone hover:border-brass hover:text-ivory"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector with Modal Trigger */}
          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-ivory font-medium">
                  Select Footwear Size (Pakistan / EU): <span className="text-brass">{size}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setShowSizeModal(true)}
                  className="text-brass text-xs underline hover:text-ivory"
                >
                  Size Chart &amp; Fit Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-12 h-12 border text-xs font-medium transition-all ${
                      size === s
                        ? "border-brass bg-brass text-ink font-bold shadow"
                        : "border-brass/25 text-stone hover:border-brass hover:text-ivory"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          <div className="mb-8 flex items-center gap-4">
            <div>
              <p className="text-xs text-ivory font-medium mb-2">Quantity</p>
              <div className="flex items-center border border-brass/25 bg-charcoal w-fit">
                <button
                  className="w-10 h-10 text-ivory hover:text-brass transition-colors text-sm"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  &minus;
                </button>
                <span className="w-10 text-center text-ivory text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  className="w-10 h-10 text-ivory hover:text-brass transition-colors text-sm"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="pt-6">
              <span className="text-[11px] text-brass bg-brass/10 border border-brass/20 px-3 py-1.5 rounded-xs">
                ✓ Ready for immediate dispatch
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 border border-brass text-brass py-3.5 text-xs font-semibold hover:bg-brass hover:text-ink transition-all uppercase tracking-wider shadow"
              >
                {added ? "✓ Added To Shopping Cart!" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-brass text-ink py-3.5 text-xs font-semibold hover:bg-ivory transition-all uppercase tracking-wider shadow"
              >
                Buy Now (Cash on Delivery)
              </button>
            </div>

            {/* Direct WhatsApp Ordering */}
            <a
              href={`https://wa.me/923116633159?text=${whatsAppText}`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 border border-stone/30 bg-charcoal/40 text-stone hover:text-ivory py-3 text-xs transition-colors"
            >
              <span>💬 Order via WhatsApp (0311-6633159)</span>
            </a>
          </div>

          {/* Accordion / Tabbed Details */}
          <div className="mt-10 border-t border-brass/20 pt-6">
            <div className="flex gap-4 border-b border-brass/15 pb-2 text-xs">
              <button
                onClick={() => setActiveTab("materials")}
                className={`pb-1 ${activeTab === "materials" ? "text-brass border-b border-brass font-medium" : "text-stone"}`}
              >
                Craft &amp; Materials
              </button>
              <button
                onClick={() => setActiveTab("care")}
                className={`pb-1 ${activeTab === "care" ? "text-brass border-b border-brass font-medium" : "text-stone"}`}
              >
                Leather Care
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`pb-1 ${activeTab === "shipping" ? "text-brass border-b border-brass font-medium" : "text-stone"}`}
              >
                Shipping &amp; Exchange
              </button>
            </div>

            <div className="py-4 text-xs text-stone leading-relaxed">
              {activeTab === "materials" && (
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Upper:</strong> 100% Genuine vegetable-tanned cowhide with zari/tilla needlework.</li>
                  <li><strong>Lining:</strong> Breathable soft sheepskin interior to prevent skin friction.</li>
                  <li><strong>Sole:</strong> Thick buffalo leather sole reinforced with double waxed cords.</li>
                  <li><strong>Origin:</strong> Hand-stitched by master artisans in Saddar Multan Cantt.</li>
                </ul>
              )}
              {activeTab === "care" && (
                <ul className="list-disc list-inside space-y-1">
                  <li>Khussas naturally stretch slightly to conform to foot shape within 2-3 wears.</li>
                  <li>If slightly snug initially, apply a small dab of mustard oil or petroleum jelly to the inner heel.</li>
                  <li>Avoid soaking in heavy water. Clean dust with a dry soft cloth or brass brush for suede.</li>
                </ul>
              )}
              {activeTab === "shipping" && (
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Delivery Time:</strong> 2 to 4 business days across Pakistan via TCS &amp; Trax.</li>
                  <li><strong>Payment:</strong> Cash on Delivery (COD) accepted at your doorstep.</li>
                  <li><strong>Exchange:</strong> 7-day hassle-free size replacement guarantee.</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-charcoal border border-brass/30 p-6 md:p-8 max-w-lg w-full relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-ivory font-display text-lg">Khussa Sizing Guide</h3>
              <button
                onClick={() => setShowSizeModal(false)}
                className="text-stone hover:text-ivory text-sm"
              >
                ✕ Close
              </button>
            </div>
            <p className="text-stone text-xs mb-4">
              Khussas follow standard Pakistani and European footwear shoe sizes. If you wear 42 in dress shoes or sneakers, select size 42.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-stone border border-brass/20">
                <thead className="bg-ink text-brass border-b border-brass/20">
                  <tr>
                    <th className="p-2.5">PK / EU Size</th>
                    <th className="p-2.5">US Approx</th>
                    <th className="p-2.5">Foot Length (Inches)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brass/10">
                  {sizeChart.map((row) => (
                    <tr key={row.pk} className={size === row.pk ? "bg-brass/10 text-ivory font-semibold" : ""}>
                      <td className="p-2.5">{row.pk}</td>
                      <td className="p-2.5">{row.us}</td>
                      <td className="p-2.5">{row.footInches}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setShowSizeModal(false)}
              className="mt-6 w-full bg-brass text-ink py-2.5 text-xs font-semibold hover:bg-ivory transition-colors"
            >
              Done &amp; Select Size
            </button>
          </div>
        </div>
      )}

      {/* Related Products Recommendation Carousel/Grid */}
      {relatedProducts.length > 0 && (
        <section className="mt-28 pt-16 border-t border-brass/20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-brass text-xs uppercase tracking-widest font-semibold block mb-1">
                Complementary Styles
              </span>
              <h3 className="text-2xl text-ivory font-display">You May Also Admire</h3>
            </div>
            <Link to="/shop" className="text-brass text-xs hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
