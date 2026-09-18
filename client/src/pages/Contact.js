import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", topic: "Size Inquiry", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-16 md:py-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-brass text-xs uppercase tracking-widest font-semibold block mb-2">
          Concierge &amp; Bespoke Inquiries
        </span>
        <h1 className="text-3xl md:text-5xl text-ivory font-display">
          Speak With Our Multan Artisans
        </h1>
        <p className="text-stone text-xs md:text-sm mt-3 leading-relaxed">
          Need sizing assistance, want to order custom matching khussas for your wedding party,
          or tracking an active courier dispatch? We are here to assist.
        </p>
      </div>

      {/* 3 Contact Options Strip */}
      <div className="grid sm:grid-cols-3 gap-6 mb-16">
        <a
          href="https://wa.me/923116633159?text=Hello%20Bhutta%20Khussa%20Mehal!%20I%20have%20an%20inquiry."
          target="_blank"
          rel="noreferrer"
          className="bg-charcoal border border-brass/25 p-6 rounded-xs hover:border-brass transition-all group block"
        >
          <div className="text-brass text-2xl mb-2">💬</div>
          <h3 className="text-ivory font-medium text-sm mb-1 group-hover:text-brass transition-colors">
            Instant WhatsApp Support
          </h3>
          <p className="text-stone text-xs mb-3">
            Quick responses for size queries, custom bridal inquiries &amp; live photos.
          </p>
          <span className="text-brass text-xs font-semibold">Chat 0311-6633159 &rarr;</span>
        </a>

        <div className="bg-charcoal border border-brass/20 p-6 rounded-xs">
          <div className="text-brass text-2xl mb-2">📞</div>
          <h3 className="text-ivory font-medium text-sm mb-1">Direct Call Helpline</h3>
          <p className="text-stone text-xs mb-3">
            Available 11:00 AM &ndash; 10:30 PM (Monday to Sunday, Pakistan Time).
          </p>
          <a href="tel:03116633159" className="text-brass text-xs font-semibold hover:underline">
            Call: 0311-6633159 &rarr;
          </a>
        </div>

        <div className="bg-charcoal border border-brass/20 p-6 rounded-xs">
          <div className="text-brass text-2xl mb-2">📍</div>
          <h3 className="text-ivory font-medium text-sm mb-1">Flagship Workshop</h3>
          <p className="text-stone text-xs mb-3">
            5CPQ+V97, Saddar Multan Cantt Commercial Area, Multan, Pakistan.
          </p>
          <span className="text-stone text-xs">Walk-ins warmly welcomed.</span>
        </div>
      </div>

      {/* Main Grid: Form & Location Map */}
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="bg-charcoal border border-brass/25 p-8 rounded-xs">
          <h2 className="text-2xl text-ivory font-display mb-2">Send an Inquiry</h2>
          <p className="text-stone text-xs mb-6">
            Leave your contact details and our team will get back to you within a few hours.
          </p>

          {sent ? (
            <div className="bg-ink border border-brass/30 p-8 text-center rounded-xs">
              <div className="w-12 h-12 rounded-full bg-brass/10 text-brass text-xl flex items-center justify-center mx-auto mb-3">
                ✓
              </div>
              <h3 className="text-ivory font-display text-lg mb-2">Inquiry Received!</h3>
              <p className="text-stone text-xs leading-relaxed mb-6">
                Thank you, <strong>{form.name}</strong>. Our Multan concierge team will reach out to you at{" "}
                <span className="text-brass font-medium">{form.phone}</span> shortly.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-brass text-xs underline hover:text-ivory"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-ivory block mb-1 font-medium">Your Full Name</label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Muhammad Usman"
                  className="w-full bg-ink border border-brass/20 text-ivory px-4 py-3 text-xs focus:border-brass outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-ivory block mb-1 font-medium">
                  Mobile / WhatsApp Number
                </label>
                <input
                  required
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. 0300 1234567"
                  className="w-full bg-ink border border-brass/20 text-ivory px-4 py-3 text-xs focus:border-brass outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-ivory block mb-1 font-medium">Inquiry Topic</label>
                <select
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  className="w-full bg-ink border border-brass/20 text-ivory px-4 py-3 text-xs focus:border-brass outline-none"
                >
                  <option>Size &amp; Fit Advice</option>
                  <option>Bespoke Bridal / Wedding Order</option>
                  <option>Groom &amp; Sherwani Matching Khussa</option>
                  <option>Track Existing Courier Order</option>
                  <option>Wholesale &amp; International Shipping</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-ivory block mb-1 font-medium">
                  Details / Message
                </label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your requirement, size questions, or specific color matching requests..."
                  className="w-full bg-ink border border-brass/20 text-ivory px-4 py-3 text-xs focus:border-brass outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-brass text-ink font-semibold py-3.5 text-xs hover:bg-ivory transition-colors uppercase tracking-wider mt-2 shadow"
              >
                Submit Inquiry
              </button>
            </form>
          )}
        </div>

        {/* Map and Workshop Visit Details */}
        <div>
          <div className="border border-brass/25 bg-charcoal p-6 rounded-xs mb-6">
            <h3 className="text-brass font-display text-lg mb-2">Boutique &amp; Workshop Location</h3>
            <p className="text-stone text-xs leading-relaxed mb-4">
              Located in the prime heritage commercial zone of Saddar Cantt, Multan.
              Visitors can observe hand-embroidery in progress and try on sample lasts.
            </p>
            <div className="space-y-1.5 text-xs text-stone border-t border-brass/10 pt-3">
              <p><strong className="text-ivory font-medium">Plus Code:</strong> 5CPQ+V97 Multan</p>
              <p><strong className="text-ivory font-medium">Nearby Landmark:</strong> Saddar Cantt Commercial Area</p>
              <p><strong className="text-ivory font-medium">Weekly Schedule:</strong> Open 7 Days a Week (11:00 AM &ndash; 10:30 PM)</p>
            </div>
          </div>

          <div className="aspect-video border border-brass/20 overflow-hidden rounded-xs shadow-lg">
            <iframe
              title="Store Location"
              className="w-full h-full grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              loading="lazy"
              src="https://www.google.com/maps?q=5CPQ%2BV97+Saddar+Multan+Cantt+Commercial+Area+Multan+Pakistan&output=embed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
