import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    api
      .get(`/orders/${id}`)
      .then(({ data }) => setOrder(data))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-32">
        <div className="w-8 h-8 border-2 border-brass border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone text-xs">Retrieving order confirmation...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-28 max-w-md mx-auto px-5">
        <p className="text-stone mb-4">We could not locate this order record.</p>
        <Link to="/shop" className="bg-brass text-ink px-6 py-2.5 text-xs font-semibold">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const whatsAppTrackingText = encodeURIComponent(
    `Hello Bhutta Khussa Mehal! I just placed Order #${order._id.slice(-6).toUpperCase()} for Rs. ${order.total.toLocaleString()} under name "${order.customer.fullName}". Please confirm my order.`
  );

  return (
    <div className="max-w-2xl mx-auto px-5 py-20 text-center">
      <div className="w-20 h-20 rounded-full border-2 border-brass bg-brass/10 flex items-center justify-center mx-auto mb-6 shadow-lg">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#B08D57" strokeWidth="2.5">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <span className="text-brass text-xs uppercase tracking-widest font-semibold block mb-1">
        Order Received Successfully
      </span>
      <h1 className="text-3xl md:text-4xl text-ivory font-display mb-3">
        Shukriya, {order.customer.fullName}!
      </h1>
      <p className="text-stone text-xs md:text-sm mb-8 leading-relaxed max-w-lg mx-auto">
        Your handcrafted khussa order has been logged into our Multan workshop. Our concierge will call or message your phone (<span className="text-brass font-medium">{order.customer.phone}</span>) for dispatch verification.
      </p>

      {/* WhatsApp Verification Prompt */}
      <div className="mb-8">
        <a
          href={`https://wa.me/923116633159?text=${whatsAppTrackingText}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-ink font-semibold px-6 py-3 text-xs rounded-xs hover:opacity-90 transition-opacity shadow"
        >
          <span>💬 Verify / Track on WhatsApp (0311-6633159)</span>
        </a>
      </div>

      <div className="bg-charcoal border border-brass/25 p-6 md:p-8 text-left mb-8 rounded-xs">
        <div className="flex justify-between items-start pb-4 border-b border-brass/15 text-xs">
          <div>
            <span className="text-stone">Order Reference:</span>
            <p className="text-ivory font-bold text-sm tracking-wider mt-0.5">
              #{order._id.slice(-8).toUpperCase()}
            </p>
          </div>
          <span className="bg-brass/20 text-brass text-[11px] px-2.5 py-1 font-semibold rounded-xs">
            {order.status || "Pending Verification"}
          </span>
        </div>

        {/* Ordered items */}
        <div className="py-4 space-y-3 border-b border-brass/15">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-xs">
              <div>
                <p className="text-ivory font-medium">{item.name}</p>
                <p className="text-stone text-[11px]">
                  Qty: {item.quantity} {item.size ? `· Size: ${item.size}` : ""} {item.color ? `· ${item.color}` : ""}
                </p>
              </div>
              <span className="text-brass font-semibold">
                Rs. {(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Delivery Details */}
        <div className="py-4 border-b border-brass/15 text-xs text-stone space-y-1">
          <p><strong className="text-ivory">Delivery Address:</strong> {order.customer.address}, {order.customer.city}</p>
          <p><strong className="text-ivory">Payment Mode:</strong> {order.paymentMethod === "COD" ? "Cash on Delivery (Pay to courier)" : order.paymentMethod}</p>
          <p><strong className="text-ivory">Dispatch Timeline:</strong> 2 to 4 business days via TCS / Trax</p>
        </div>

        {/* Total */}
        <div className="pt-4 flex justify-between items-baseline">
          <span className="text-ivory font-medium text-sm">Total Payable at Doorstep</span>
          <span className="text-brass font-bold text-xl">
            Rs. {order.total.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Link
          to="/shop"
          className="bg-brass text-ink px-8 py-3 text-xs font-semibold hover:bg-ivory transition-colors uppercase tracking-wider"
        >
          Continue Exploring Catalog
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
