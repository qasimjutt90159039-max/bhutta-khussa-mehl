import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api/api";

const majorPakistaniCities = [
  "Multan",
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Peshawar",
  "Quetta",
  "Gujranwala",
  "Sialkot",
  "Bahawalpur",
  "Hyderabad",
  "Abbottabad",
  "Sargodha",
  "Rahim Yar Khan",
  "Sheikhupura",
  "Gujrat",
  "Jhelum",
  "Sukkur",
  "Mirpur (AJK)",
  "Other City / Tehsil",
];

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "Multan",
    customCity: "",
    email: "",
    notes: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const shippingFee = subtotal >= 4999 ? 0 : 250;
  const total = subtotal + shippingFee;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const finalCity = form.city === "Other City / Tehsil" && form.customCity ? form.customCity : form.city;

      const orderPayload = {
        items: items.map((i) => ({
          product: i.productId,
          name: i.name,
          size: i.size,
          color: i.color,
          quantity: i.quantity,
        })),
        customer: {
          ...form,
          city: finalCity,
        },
        paymentMethod,
      };

      const { data } = await api.post("/orders", orderPayload);
      clearCart();
      navigate(`/order-confirmation/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order. Please check all required fields.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-5 py-16">
      {/* Breadcrumb */}
      <div className="text-xs text-stone mb-6 flex items-center gap-2">
        <Link to="/cart" className="hover:text-ivory">&larr; Back to Shopping Bag</Link>
        <span>/</span>
        <span className="text-brass">Checkout &amp; Delivery</span>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Form Column */}
        <form onSubmit={handleSubmit} className="md:col-span-2 flex flex-col gap-6">
          <div>
            <span className="text-brass text-xs uppercase tracking-widest font-semibold block mb-1">
              Final Step
            </span>
            <h1 className="text-3xl md:text-4xl text-ivory font-display">Shipping &amp; Order Details</h1>
            <p className="text-stone text-xs mt-1">
              Please enter your full delivery address for safe dispatch via TCS / Leopards Courier.
            </p>
          </div>

          {error && (
            <div className="bg-maroon/20 border border-maroon text-ivory p-3 text-xs rounded-xs">
              {error}
            </div>
          )}

          <div className="bg-charcoal border border-brass/20 p-6 rounded-xs space-y-4">
            <h2 className="text-ivory font-display text-base border-b border-brass/15 pb-2">
              1. Customer Information
            </h2>

            <div>
              <label className="text-xs text-ivory block mb-1 font-medium">Full Name *</label>
              <input
                required
                name="fullName"
                placeholder="e.g. Muhammad Zeeshan"
                value={form.fullName}
                onChange={handleChange}
                className="w-full bg-ink border border-brass/25 text-ivory px-4 py-3 text-xs focus:border-brass outline-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-ivory block mb-1 font-medium">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  required
                  name="phone"
                  placeholder="e.g. 0300 1234567"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-ink border border-brass/25 text-ivory px-4 py-3 text-xs focus:border-brass outline-none"
                />
                <p className="text-[10px] text-stone mt-1">
                  The courier will call this number prior to doorstep delivery.
                </p>
              </div>

              <div>
                <label className="text-xs text-ivory block mb-1 font-medium">
                  Email Address (optional)
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-ink border border-brass/25 text-ivory px-4 py-3 text-xs focus:border-brass outline-none"
                />
                <p className="text-[10px] text-stone mt-1">For digital receipt and tracking alerts.</p>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-charcoal border border-brass/20 p-6 rounded-xs space-y-4">
            <h2 className="text-ivory font-display text-base border-b border-brass/15 pb-2">
              2. Delivery Address
            </h2>

            <div>
              <label className="text-xs text-ivory block mb-1 font-medium">City / Destination *</label>
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full bg-ink border border-brass/25 text-ivory px-4 py-3 text-xs focus:border-brass outline-none cursor-pointer"
              >
                {majorPakistaniCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {form.city === "Other City / Tehsil" && (
              <div>
                <label className="text-xs text-ivory block mb-1 font-medium">Specify Your City / Town *</label>
                <input
                  required
                  name="customCity"
                  placeholder="Enter your specific town or tehsil name"
                  value={form.customCity}
                  onChange={handleChange}
                  className="w-full bg-ink border border-brass/25 text-ivory px-4 py-3 text-xs focus:border-brass outline-none"
                />
              </div>
            )}

            <div>
              <label className="text-xs text-ivory block mb-1 font-medium">
                Complete Street Address &amp; House # *
              </label>
              <input
                required
                name="address"
                placeholder="House #, Street / Mohalla, Area, Landmark"
                value={form.address}
                onChange={handleChange}
                className="w-full bg-ink border border-brass/25 text-ivory px-4 py-3 text-xs focus:border-brass outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-ivory block mb-1 font-medium">
                Special Delivery Instructions (optional)
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="e.g. Please deliver between 2 PM and 6 PM, or near Al-Madina Masjid"
                rows={2}
                className="w-full bg-ink border border-brass/25 text-ivory px-4 py-3 text-xs focus:border-brass outline-none"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-charcoal border border-brass/20 p-6 rounded-xs space-y-4">
            <h2 className="text-ivory font-display text-base border-b border-brass/15 pb-2">
              3. Payment Selection
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("COD")}
                className={`p-4 border text-left rounded-xs transition-all flex flex-col justify-between ${
                  paymentMethod === "COD"
                    ? "border-brass bg-brass/10 ring-1 ring-brass"
                    : "border-brass/20 hover:border-brass"
                }`}
              >
                <div>
                  <span className="text-ivory font-semibold text-xs block mb-1">
                    🇵🇰 Cash on Delivery (COD)
                  </span>
                  <span className="text-stone text-[11px] leading-relaxed">
                    Pay the full amount in cash directly to the courier when you inspect your package.
                  </span>
                </div>
                <span className="text-brass text-[10px] uppercase font-bold mt-3">
                  Recommended &middot; 0% Extra Charge
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("Online")}
                className={`p-4 border text-left rounded-xs transition-all flex flex-col justify-between ${
                  paymentMethod === "Online"
                    ? "border-brass bg-brass/10 ring-1 ring-brass"
                    : "border-brass/20 hover:border-brass"
                }`}
              >
                <div>
                  <span className="text-ivory font-semibold text-xs block mb-1">
                    Bank Transfer / JazzCash / EasyPaisa
                  </span>
                  <span className="text-stone text-[11px] leading-relaxed">
                    Direct account transfer details will be provided on confirmation.
                  </span>
                </div>
                <span className="text-stone text-[10px] uppercase font-medium mt-3">
                  Pre-paid Option
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-brass text-ink py-4 text-xs font-bold hover:bg-ivory transition-all uppercase tracking-widest disabled:opacity-50 shadow-lg cursor-pointer"
          >
            {submitting ? "Confirming Order..." : "Confirm & Place Order"}
          </button>
        </form>

        {/* Sidebar Order Review */}
        <div className="bg-charcoal border border-brass/25 p-6 h-fit rounded-xs">
          <h2 className="text-ivory font-display text-base mb-4 pb-2 border-b border-brass/15">
            Order Review ({items.length} Articles)
          </h2>

          <div className="flex flex-col divide-y divide-brass/10 max-h-[300px] overflow-y-auto pr-1 mb-4">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="py-3 flex justify-between gap-3 text-xs">
                <div>
                  <p className="text-ivory font-medium leading-snug">{item.name}</p>
                  <p className="text-stone text-[11px]">
                    Qty: {item.quantity} {item.size ? `· Size: ${item.size}` : ""} {item.color ? `· ${item.color}` : ""}
                  </p>
                </div>
                <span className="text-brass font-semibold whitespace-nowrap">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-brass/15 pt-4 space-y-2 text-xs text-stone">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-ivory">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Nationwide Shipping</span>
              <span className={shippingFee === 0 ? "text-brass font-medium" : "text-ivory"}>
                {shippingFee === 0 ? "FREE" : `Rs. ${shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-base text-ivory font-semibold pt-2 border-t border-brass/15">
              <span>Total Payable</span>
              <span className="text-brass">Rs. {total.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6 bg-ink border border-brass/15 p-3 rounded-xs text-[11px] text-stone space-y-1.5">
            <p className="text-ivory font-medium">✓ Dispatched from Saddar Multan Cantt</p>
            <p>Expected Delivery: 2 to 4 business days</p>
            <p className="text-brass">Free 7-Day Size Exchange Guaranteed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
