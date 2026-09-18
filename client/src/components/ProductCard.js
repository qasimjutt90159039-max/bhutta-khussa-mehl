import React from "react";
import { Link } from "react-router-dom";

const placeholderImg =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500'><rect width='100%' height='100%' fill='#221D19'/><text x='50%' y='50%' font-family='sans-serif' font-size='16' fill='#8A8177' text-anchor='middle'>Handcrafted Khussa</text></svg>`
  );

const ProductCard = ({ product }) => {
  const image1 = product.images?.[0] || placeholderImg;
  const image2 = product.images?.[1] || image1;

  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  return (
    <Link to={`/product/${product.slug}`} className="group block flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-charcoal border border-brass/15 rounded-sm">
        {/* Main Image */}
        <img
          src={image1}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Subtle Hover overlay */}
        <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.featured && (
            <span className="bg-brass text-ink font-semibold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-sm">
              Heritage Pick
            </span>
          )}
          {discount && (
            <span className="bg-maroon text-ivory text-[10px] font-medium px-2 py-0.5 rounded-xs shadow-sm">
              Save {discount}%
            </span>
          )}
        </div>

        {/* Quick View Tag */}
        <div className="absolute bottom-0 inset-x-0 bg-ink/80 backdrop-blur-xs text-ivory text-[11px] py-2 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-medium tracking-wide border-t border-brass/20">
          View Details &amp; Sizes
        </div>
      </div>

      <div className="pt-3.5 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[11px] text-brass uppercase tracking-widest block mb-1">
            {product.category} Khussa
          </span>
          <h3 className="text-ivory text-sm font-medium leading-snug group-hover:text-brass transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>

        <div className="mt-2.5 pt-2 border-t border-brass/10 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-brass font-semibold text-sm">
              Rs. {product.price?.toLocaleString()}
            </span>
            {product.compareAtPrice && (
              <span className="text-stone text-xs line-through">
                Rs. {product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center text-xs text-brass gap-0.5">
            <span>★</span>
            <span className="text-stone text-[11px]">4.9</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
