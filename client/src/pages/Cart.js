import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const placeholderImg =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><rect width='100%' height='100%' fill='#221D19'/></svg>`
  );

const Cart = () => {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-28 text-center">
        <div className="w-16 h-16 rounded-full bg-charcoal border border-brass/20 flex items-center justify-center text-brass text-2xl mx-auto mb-4">
          🛍️
        </div>
        <h1 className="text-3xl text-ivory font-display mb-3">Your Cart is Currently Empty</h1>
        <p className="text-stone text-xs md:text-sm mb-8 max-w-sm mx-auto leading-relaxed">
          Discover our 18+ master-crafted Multani khussa articles in men’s, women’s, wedding, and casual collections.
        </p>
        <Link
          to="/shop"
          className="bg-brass text-ink font-semibold px-8 py-3 text-xs hover:bg-ivory transition-colors uppercase tracking-wider shadow"
        >
          Explore Handcrafted Catalog
        </Link>
      </div>
    );
  }

  const freeShippingThreshold = 4999;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "KHUSSA500") {
      setDiscount(500);
      setCouponMessage("✓ Voucher applied: Rs. 500 Discount!");
    } else {
      setCouponMessage("Invalid voucher code. Try 'KHUSSA500'.");
    }
  };

  const shippingFee = subtotal >= freeShippingThreshold ? 0 : 250;
  const grandTotal = Math.max(0, subtotal - discount) + shippingFee;

  return (
    <div className="max-w-5xl mx-auto px-5 py-16">
      {/* Breadcrumb */}
      <div className="text-xs text-stone mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-ivory">Home</Link>
        <span>/</span>
        <span className="text-brass">Your Cart ({items.length} Articles)</span>
      </div>

      <h1 className="text-3xl md:text-4xl text-ivory font-display mb-8">
        Your Shopping Bag
      </h1>

      {/* Free Shipping Progress Meter */}
      <div className="bg-charcoal border border-brass/20 p-4 mb-8 rounded-xs">
        <div className="flex justify-between items-center text-xs mb-2">
          {amountNeededForFreeShipping > 0 ? (
            <span className="text-stone">
              Add <strong className="text-brass font-medium">Rs. {amountNeededForFreeShipping.toLocaleString()}</strong> more for <span className="text-ivory font-semibold">FREE Delivery</span> across Pakistan!
            </span>
          ) : (
            <span className="text-brass font-semibold">
              🎉 Congratulations! You have unlocked FREE Nationwide Delivery.
            </span>
          )}
          <span className="text-brass text-xs font-semibold">{progressPercent}%</span>
        </div>
        <div className="w-full bg-ink h-2 rounded-full overflow-hidden border border-brass/20">
          <div
            className="bg-brass h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Cart Item List */}
        <div className="md:col-span-2 flex flex-col divide-y divide-brass/15 border-y border-brass/15">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size}-${item.color}`}
              className="flex gap-4 py-6"
            >
              <img
                src={item.image || placeholderImg}
                alt={item.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover bg-charcoal border border-brass/15 rounded-xs shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-ivory text-sm font-medium leading-snug">
                      {item.name}
                    </h3>
                    <span className="text-brass font-semibold text-sm whitespace-nowrap">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-stone mt-1.5">
                    {item.size && (
                      <span className="bg-ink border border-brass/20 px-2 py-0.5 rounded-xs">
                        Size: {item.size}
                      </span>
                    )}
                    {item.color && (
                      <span className="bg-ink border border-brass/20 px-2 py-0.5 rounded-xs">
                        Color: {item.color}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  {/* Quantity adjustment */}
                  <div className="flex items-center border border-brass/25 bg-charcoal">
                    <button
                      className="w-8 h-8 text-ivory hover:text-brass transition-colors text-sm"
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                      }
                    >
                      &minus;
                    </button>
                    <span className="w-8 text-center text-ivory text-xs font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      className="w-8 h-8 text-ivory hover:text-brass transition-colors text-sm"
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.productId, item.size, item.color)}
                    className="text-xs text-stone hover:text-maroon transition-colors underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Voucher Block */}
        <div className="space-y-6">
          <div className="bg-charcoal border border-brass/25 p-6 rounded-xs">
            <h2 className="text-ivory font-display text-lg mb-4">Order Summary</h2>

            <div className="space-y-2.5 text-xs text-stone pb-4 border-b border-brass/15">
              <div className="flex justify-between">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="text-ivory font-medium">Rs. {subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-brass">
                  <span>Privilege Voucher Discount</span>
                  <span>- Rs. {discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Nationwide Shipping</span>
                <span className={shippingFee === 0 ? "text-brass font-medium" : "text-ivory"}>
                  {shippingFee === 0 ? "FREE" : `Rs. ${shippingFee}`}
                </span>
              </div>
            </div>

            <div className="py-4 border-b border-brass/15 flex justify-between items-baseline">
              <span className="text-ivory font-medium text-sm">Estimated Total</span>
              <span className="text-brass font-bold text-xl">
                Rs. {grandTotal.toLocaleString()}
              </span>
            </div>

            {/* Voucher Code Form */}
            <form onSubmit={handleApplyCoupon} className="pt-4 mb-4">
              <label className="text-[11px] text-stone block mb-1">Have a discount voucher?</label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="e.g. KHUSSA500"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="bg-ink border border-brass/25 text-ivory text-xs px-3 py-2 flex-1 focus:border-brass outline-none uppercase"
                />
                <button
                  type="submit"
                  className="border border-brass text-brass px-3 py-2 text-xs font-semibold hover:bg-brass hover:text-ink transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <p className={`text-[11px] mt-1.5 ${discount > 0 ? "text-brass" : "text-maroon"}`}>
                  {couponMessage}
                </p>
              )}
            </form>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-brass text-ink py-3.5 text-xs font-bold hover:bg-ivory transition-all uppercase tracking-wider shadow"
            >
              Proceed to Secure Checkout
            </button>

            <p className="text-[10px] text-stone text-center mt-3">
              ✓ Cash on Delivery available at your doorstep
            </p>
          </div>

          {/* Quick Assurance Pill */}
          <div className="bg-ink border border-brass/15 p-4 rounded-xs text-xs text-stone space-y-2">
            <p className="flex items-center gap-2 text-ivory font-medium">
              <span className="text-brass">🛡️</span> 7-Day Hassle-Free Size Exchange
            </p>
            <p className="text-[11px]">
              If the khussa doesn't fit comfortably, contact us on WhatsApp (0311-6633159) for an immediate replacement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
