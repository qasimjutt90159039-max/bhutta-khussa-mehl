import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-5 py-16 md:py-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-brass text-xs uppercase tracking-widest font-semibold block mb-2">
          Heritage of Multan &middot; Established 1984
        </span>
        <h1 className="text-4xl md:text-5xl text-ivory font-display leading-tight mb-6">
          Four Decades of Preserving Pakistan’s Sacred Shoemaking Art
        </h1>
        <p className="text-stone text-sm md:text-base leading-relaxed">
          From the historic bazaars of Saddar Multan Cantt to homes across Pakistan,
          Bhutta Khussa Mehal honors ancestral leather techniques passed down through
          four generations of master ustads.
        </p>
      </div>

      {/* Main Feature Image Banner */}
      <div className="aspect-[21/9] bg-charcoal border border-brass/25 overflow-hidden mb-16 shadow-2xl relative">
        <img
          src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1400&q=80"
          alt="Artisans crafting Multani khussa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent flex items-end p-8">
          <p className="text-ivory font-display text-lg md:text-xl">
            &ldquo;Every pair we stitch preserves an art form that factory machines can never replicate.&rdquo;
          </p>
        </div>
      </div>

      {/* Narrative Section 1 */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <span className="text-brass text-xs uppercase tracking-widest font-semibold block mb-2">
            The Origins
          </span>
          <h2 className="text-2xl md:text-3xl text-ivory font-display mb-4">
            Born in the Artisan Lanes of Saddar Cantt
          </h2>
          <div className="space-y-4 text-stone text-xs md:text-sm leading-relaxed">
            <p>
              In 1984, our workshop opened with just two wooden benches, three carving knives,
              and an unwavering commitment: never compromise on genuine leather, and never substitute
              hand-stitched tilla with machine embroidery.
            </p>
            <p>
              Multan has historically stood at the crossroads of Central Asian and subcontinental trade.
              The khussas born here absorbed Persian floral scrolls, Mughal pointed toe contours (nokh),
              and the rugged durability of indigenous buffalo hide.
            </p>
          </div>
        </div>

        <div className="bg-charcoal border border-brass/20 p-8 rounded-xs">
          <h3 className="text-brass font-display text-lg mb-4">Our Craft Code</h3>
          <ul className="space-y-3 text-xs text-stone">
            <li className="flex items-start gap-3">
              <span className="text-brass font-bold">01.</span>
              <span><strong>100% Genuine Hides:</strong> We strictly reject rexine, PU, or synthetic substitutes.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brass font-bold">02.</span>
              <span><strong>Beeswax Cord:</strong> Soles are anchored with heavy-gauge cotton twine drenched in beeswax.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brass font-bold">03.</span>
              <span><strong>Empowering Artisans:</strong> Fair wages directly paid to veteran ustads and women embroiderers.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brass font-bold">04.</span>
              <span><strong>No Left/Right Constraint:</strong> Handcrafted to memorize your unique foot anatomy naturally.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3 Pillars of Multani Heritage */}
      <div className="border-y border-brass/20 py-16 grid sm:grid-cols-3 gap-8 text-center sm:text-left mb-20">
        <div>
          <span className="font-display text-3xl text-brass mb-2 block">100+</span>
          <h4 className="text-ivory font-medium text-sm mb-1">Local Artisan Families</h4>
          <p className="text-stone text-xs leading-relaxed">
            Sustaining traditional livelihood for generational craftsmen and embroiderers across South Punjab.
          </p>
        </div>
        <div>
          <span className="font-display text-3xl text-brass mb-2 block">16 Hrs</span>
          <h4 className="text-ivory font-medium text-sm mb-1">Dedicated Handcrafting</h4>
          <p className="text-stone text-xs leading-relaxed">
            The precise time invested by our master shoemakers to assemble, embroider, and finish each pair.
          </p>
        </div>
        <div>
          <span className="font-display text-3xl text-brass mb-2 block">50,000+</span>
          <h4 className="text-ivory font-medium text-sm mb-1">Satisfied Patrons</h4>
          <p className="text-stone text-xs leading-relaxed">
            Proudly worn across Pakistan and shipped to expatriate Pakistanis in the UK, UAE, USA, and Canada.
          </p>
        </div>
      </div>

      {/* Visit and Call to Action */}
      <div className="bg-charcoal border border-brass/25 p-8 md:p-12 text-center rounded-xs">
        <h3 className="text-2xl md:text-3xl text-ivory font-display mb-3">
          Experience the Difference of Real Multani Khussa
        </h3>
        <p className="text-stone text-xs md:text-sm max-w-lg mx-auto mb-8">
          Browse our seasonal catalog or message our master craftsmen for bespoke wedding orders and custom sizing.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/shop"
            className="bg-brass text-ink font-semibold px-8 py-3 text-xs hover:bg-ivory transition-colors"
          >
            Explore Catalog (18+ Articles)
          </Link>
          <Link
            to="/contact"
            className="border border-brass/40 text-ivory font-medium px-8 py-3 text-xs hover:border-brass transition-colors"
          >
            Contact &amp; Custom Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
