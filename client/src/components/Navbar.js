import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop All" },
  { to: "/shop?cat=Men", label: "Men" },
  { to: "/shop?cat=Women", label: "Women" },
  { to: "/shop?cat=Wedding", label: "Bridal" },
  { to: "/about", label: "Our Story" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ink/95 backdrop-blur border-b border-brass/20">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-20 gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex flex-col leading-tight shrink-0 mr-4 md:mr-6"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-xl sm:text-2xl text-ivory tracking-wide whitespace-nowrap">
            Bhutta Khussa Mehal
          </span>
          <span className="text-[9px] sm:text-[10px] text-brass tracking-widest2 font-medium whitespace-nowrap">
            SADDAR MULTAN CANTT &middot; EST. 1984
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-[13px] tracking-wide whitespace-nowrap py-1.5 transition-colors ${
                  isActive
                    ? "text-brass font-semibold border-b border-brass"
                    : "text-stone hover:text-ivory"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions (Buttons & Cart) */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0 ml-auto lg:ml-0">
          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center text-xs border border-brass/40 text-brass hover:bg-brass hover:text-ink transition-colors px-4 py-2 font-medium tracking-wide whitespace-nowrap"
          >
            Explore Catalog
          </Link>

          <Link
            to="/cart"
            className="relative text-ivory hover:text-brass transition-colors p-2 flex items-center justify-center"
            aria-label="View shopping cart"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path
                d="M4 6h2l1.6 9.6a2 2 0 002 1.4h7.6a2 2 0 002-1.6L20 9H7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="20" r="1" />
              <circle cx="17" cy="20" r="1" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-maroon text-ivory text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="lg:hidden text-ivory p-2 hover:text-brass transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <nav className="lg:hidden flex flex-col gap-2 px-6 py-5 border-t border-brass/15 bg-charcoal shadow-2xl">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm py-2.5 border-b border-brass/10 transition-colors ${
                  isActive ? "text-brass font-semibold" : "text-stone hover:text-ivory"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <Link
              to="/shop"
              onClick={() => setOpen(false)}
              className="text-center bg-brass text-ink py-2.5 text-xs font-semibold hover:bg-ivory transition-colors"
            >
              Explore Full Catalog
            </Link>
            <div className="flex justify-between items-center text-xs text-stone pt-2">
              <span>Customer Help:</span>
              <a href="tel:03116633159" className="text-brass font-medium">
                0311-6633159
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
