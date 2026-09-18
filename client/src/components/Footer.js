import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-charcoal border-t border-brass/20 mt-28">
      {/* Newsletter Strip */}
      <div className="border-b border-brass/15 bg-ink/50 py-12 px-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-brass text-xs uppercase tracking-widest block mb-1">
              Privilege Club &middot; Multan Heritage
            </span>
            <h3 className="text-2xl text-ivory font-display">
              Get Rs. 500 Off Your First Order
            </h3>
            <p className="text-stone text-xs mt-1">
              Join 15,000+ patrons receiving exclusive festive preview collections and bespoke offers.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-charcoal border border-brass/30 text-ivory text-xs px-4 py-3 min-w-[260px] focus:border-brass outline-none"
            />
            <button
              type="submit"
              className="bg-brass text-ink font-medium px-6 py-3 text-xs hover:bg-ivory transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
        {subscribed && (
          <p className="max-w-6xl mx-auto text-brass text-xs mt-3 text-right">
            ✓ Welcome to Bhutta Khussa Mehal! Use voucher code <strong className="text-ivory">KHUSSA500</strong> at checkout.
          </p>
        )}
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-5 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Col */}
        <div className="md:col-span-1">
          <h3 className="font-display text-2xl text-ivory mb-2">Bhutta Khussa Mehal</h3>
          <p className="text-brass text-xs tracking-widest2 mb-4">MULTAN &middot; EST. 1984</p>
          <p className="text-stone text-xs leading-relaxed mb-4">
            Preserving South Punjab’s legendary leatherwork and zari embroidery. Every stitch reflects generations of ancestral craftsmanship.
          </p>
          <div className="text-xs text-stone space-y-1">
            <p>
              <strong className="text-ivory font-medium">Boutique:</strong> 5CPQ+V97, Saddar Multan Cantt Commercial Area
            </p>
            <p>
              <strong className="text-ivory font-medium">Hours:</strong> Mon &ndash; Sun: 11:00 AM &ndash; 10:30 PM
            </p>
            <p>
              <strong className="text-ivory font-medium">Helpline:</strong>{" "}
              <a href="tel:03116633159" className="text-brass hover:underline">
                0311-6633159
              </a>
            </p>
          </div>
        </div>

        {/* Collections */}
        <div>
          <h4 className="text-brass text-xs uppercase tracking-widest font-semibold mb-4">
            Handcrafted Collections
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-stone">
            <li><Link to="/shop?cat=Men" className="hover:text-ivory transition-colors">Men's Traditional Khussa</Link></li>
            <li><Link to="/shop?cat=Wedding" className="hover:text-ivory transition-colors">Bridal &amp; Groom (Tilla &amp; Dabka)</Link></li>
            <li><Link to="/shop?cat=Women" className="hover:text-ivory transition-colors">Women's Velvet &amp; Embroidered</Link></li>
            <li><Link to="/shop?cat=Casual" className="hover:text-ivory transition-colors">Casual Nubuck &amp; Suede</Link></li>
            <li><Link to="/shop?cat=Kids" className="hover:text-ivory transition-colors">Little Nawab &amp; Princess (Kids)</Link></li>
            <li><Link to="/shop" className="text-brass hover:underline">View All 18+ Designs &rarr;</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-brass text-xs uppercase tracking-widest font-semibold mb-4">
            Client Assistance
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-stone">
            <li><Link to="/about" className="hover:text-ivory transition-colors">About Our Multani Workshop</Link></li>
            <li><Link to="/contact" className="hover:text-ivory transition-colors">Contact &amp; Custom Orders</Link></li>
            <li><Link to="/shop" className="hover:text-ivory transition-colors">Size Measurement Guide</Link></li>
            <li><span className="text-stone">7-Day Free Size Exchange</span></li>
            <li><span className="text-stone">Cash on Delivery Across Pakistan</span></li>
            <li><Link to="/admin/login" className="hover:text-brass transition-colors">Store Admin Portal</Link></li>
          </ul>
        </div>

        {/* Trust & Guarantee */}
        <div>
          <h4 className="text-brass text-xs uppercase tracking-widest font-semibold mb-4">
            Our Quality Pledge
          </h4>
          <p className="text-xs text-stone leading-relaxed mb-4">
            We only use 100% full-grain cowhide and treated sheepskin lining. If your khussa doesn't fit like a glove, we exchange it free of charge.
          </p>

          <div className="bg-ink/60 border border-brass/15 p-3 rounded-xs text-[11px] space-y-1 text-stone">
            <p className="text-ivory font-medium">✓ Nationwide Courier Delivery</p>
            <p>TCS &middot; Trax &middot; Leopards (2&ndash;4 Days)</p>
            <p className="text-brass font-medium pt-1">Cash on Delivery (COD) Accepted</p>
          </div>
        </div>
      </div>

      <div className="stitch-divider" />

      {/* Copyright Bar */}
      <div className="max-w-6xl mx-auto px-5 py-6 text-xs text-stone flex flex-col md:flex-row justify-between items-center gap-3">
        <span>&copy; {new Date().getFullYear()} Bhutta Khussa Mehal. All Rights Reserved &middot; Handcrafted in Multan, Pakistan.</span>
        <div className="flex items-center gap-4 text-xs text-brass">
          <span>100% Genuine Leather</span>
          <span>&bull;</span>
          <span>Master Multani Artisans</span>
          <span>&bull;</span>
          <span>Fast COD Delivery</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
