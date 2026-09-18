const bcrypt = require("bcryptjs");

const initialProducts = [
  {
    _id: "664fa1e2b012345678900001",
    name: "Multani Zari Khussa - Royal Black",
    slug: "multani-zari-khussa-royal-black",
    description:
      "Handcrafted in the heart of Multan using premium buffed cowhide and pure gold zari wire. Finished with soft sheepskin lining that naturally moulds to the shape of your feet within two wears. Double-stitched leather sole reinforced for all-day celebrations and Friday prayers.",
    price: 3800,
    compareAtPrice: 4600,
    category: "Men",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ["Jet Black", "Espresso Brown"],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 28,
    featured: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "664fa1e2b012345678900002",
    name: "Bridal Gold Tilla Khussa - Crimson Red",
    slug: "bridal-gold-tilla-khussa-crimson-red",
    description:
      "A masterpiece crafted for brides. Features intricate tilla and dabka embroidery on pure velvet mounted over treated leather. Embellished with delicate metallic pearls and hand-beaded borders. Memory foam inner cushion ensures comfortable walking throughout Barat and Walima events.",
    price: 6999,
    compareAtPrice: 8500,
    category: "Wedding",
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ["Crimson Red", "Royal Maroon", "Antique Gold"],
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 14,
    featured: true,
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    _id: "664fa1e2b012345678900003",
    name: "Casual Raw Suede Khussa - Camel Tan",
    slug: "casual-raw-suede-khussa-camel-tan",
    description:
      "Everyday luxury redefined. Supple camel suede upper with minimal contrast saddle stitching. Breathable, lightweight, and perfect with both shalwar kameez and rolled denim jeans. Features flexible anti-slip grooved leather base.",
    price: 3200,
    compareAtPrice: 3900,
    category: "Casual",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ["Camel Tan", "Desert Grey", "Navy Suede"],
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 35,
    featured: true,
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
  {
    _id: "664fa1e2b012345678900004",
    name: "Kids Little Nawab Khussa - Festive Gold",
    slug: "kids-little-nawab-khussa-festive-gold",
    description:
      "Crafted specially for young ones with extra soft inner padding, zero-pinch curved back, and festive zari embroidery. Designed so kids can play and run comfortably during Eid celebrations and family weddings.",
    price: 2200,
    compareAtPrice: 2800,
    category: "Kids",
    sizes: [26, 27, 28, 29, 30, 31, 32, 33],
    colors: ["Festive Gold", "Royal Maroon", "Pure White"],
    images: [
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 22,
    featured: false,
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-04"),
  },
  {
    _id: "664fa1e2b012345678900005",
    name: "Embroidered Velvet Khussa - Royal Maroon",
    slug: "embroidered-velvet-khussa-royal-maroon",
    description:
      "Plush velvet mounted on soft leather, adorned with floral tilla needlework by our veteran Multani craftswomen. Deep jewel tones that pair effortlessly with formal kurtas, banarsi dupattas, and festive drapes.",
    price: 4500,
    compareAtPrice: 5300,
    category: "Women",
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ["Royal Maroon", "Midnight Emerald", "Plum Purple"],
    images: [
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 19,
    featured: true,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    _id: "664fa1e2b012345678900006",
    name: "Traditional Mustard Dabka Khussa",
    slug: "traditional-mustard-dabka-khussa",
    description:
      "A classic heritage piece in authentic mustard tan leather. Highlights floral dabka vines hand-woven with metallic copper and gold threads. Pure artisan aesthetic that honors centuries-old Multani shoemaking legacy.",
    price: 3900,
    compareAtPrice: 4700,
    category: "Men",
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ["Mustard Tan", "Deep Rust"],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 16,
    featured: false,
    createdAt: new Date("2024-01-06"),
    updatedAt: new Date("2024-01-06"),
  },
  {
    _id: "664fa1e2b012345678900007",
    name: "Shah Jahan Emperor Khussa - Ivory & Gold",
    slug: "shah-jahan-emperor-khussa-ivory-gold",
    description:
      "Designed for grooms and royalty. Pure off-white raw silk overlay on hand-moulded leather, decorated with dense gold wirework and hand-carved curled toe (Nokhdar). The definitive wedding footwear choice for Mehndi and Barat sherwanis.",
    price: 5400,
    compareAtPrice: 6500,
    category: "Wedding",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Ivory Gold", "Champagne Beige"],
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 15,
    featured: true,
    createdAt: new Date("2024-01-07"),
    updatedAt: new Date("2024-01-07"),
  },
  {
    _id: "664fa1e2b012345678900008",
    name: "Mirror Work (Aaina) Khussa - Indigo Blue",
    slug: "mirror-work-aaina-khussa-indigo-blue",
    description:
      "Tiny reflective mirrors set by hand into deep indigo dyed leather with resham embroidery borders. Catch the light with every step. Perfect pairing for festive dholkis, sangeet nights, and colorful summer lawn dresses.",
    price: 4300,
    compareAtPrice: 5100,
    category: "Women",
    sizes: [36, 37, 38, 39, 40],
    colors: ["Indigo Blue", "Blush Pink", "Turquoise"],
    images: [
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 20,
    featured: true,
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08"),
  },
  {
    _id: "664fa1e2b012345678900009",
    name: "Pure Cowhide Everyday Khussa - Rustic Brown",
    slug: "pure-cowhide-everyday-khussa-rustic-brown",
    description:
      "Crafted with vegetable-tanned thick full-grain cowhide that patinas beautifully over time. Built using authentic wooden shoe lasts for anatomical support. An indestructible pair built for regular daily wear.",
    price: 3400,
    compareAtPrice: 4100,
    category: "Men",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ["Rustic Brown", "Deep Walnut"],
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 32,
    featured: false,
    createdAt: new Date("2024-01-09"),
    updatedAt: new Date("2024-01-09"),
  },
  {
    _id: "664fa1e2b012345678900010",
    name: "Gotta Patti Festive Khussa - Sunlit Mustard",
    slug: "gotta-patti-festive-khussa-sunlit-mustard",
    description:
      "Radiant mustard base adorned with authentic Rajasthani-Multani gotta patti ribbons stitched with zari knots. Highly favored for Mayun, Mehndi, and festive cultural gatherings.",
    price: 4100,
    compareAtPrice: 4900,
    category: "Women",
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ["Sunlit Mustard", "Coral Peach"],
    images: [
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 24,
    featured: false,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    _id: "664fa1e2b012345678900011",
    name: "Bridal Silver Salma Sitara Khussa - Sterling White",
    slug: "bridal-silver-salma-sitara-khussa-sterling-white",
    description:
      "Shimmering silver salma sitara sequins hand-applied over silver-threaded brocade. Designed for Walima brides, evening receptions, and silver-toned formal lehengas. Unrivaled sparkle with full arch comfort.",
    price: 6600,
    compareAtPrice: 7900,
    category: "Wedding",
    sizes: [36, 37, 38, 39, 40],
    colors: ["Sterling White", "Ice Blue"],
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 11,
    featured: true,
    createdAt: new Date("2024-01-11"),
    updatedAt: new Date("2024-01-11"),
  },
  {
    _id: "664fa1e2b012345678900012",
    name: "Soft Nubuck Loafer Khussa - Olive Grey",
    slug: "soft-nubuck-loafer-khussa-olive-grey",
    description:
      "A modern fusion of heritage khussa silhouette with the casual ease of a luxury Italian driving shoe. Velvety nubuck finish, padded latex insole, and whisper-quiet leather outsole.",
    price: 3500,
    compareAtPrice: 4200,
    category: "Casual",
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ["Olive Grey", "Charcoal Smoke", "Beige Sand"],
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 26,
    featured: false,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    _id: "664fa1e2b012345678900013",
    name: "Hand-Painted Kashigari Khussa - Multani Blue",
    slug: "hand-painted-kashigari-khussa-multani-blue",
    description:
      "Inspired by Multan’s famous Kashigari (blue pottery). Master artists hand-paint floral motifs using waterproof organic mineral dyes directly onto treated white leather, finished with delicate tilla borders.",
    price: 4900,
    compareAtPrice: 5800,
    category: "Women",
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ["Multani Cobalt Blue", "Teal Turquoise"],
    images: [
      "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 17,
    featured: true,
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
  },
  {
    _id: "664fa1e2b012345678900014",
    name: "Nawabzada Curled Nokhdar Khussa - Pitch Black",
    slug: "nawabzada-curled-nokhdar-khussa-pitch-black",
    description:
      "Traditional pointed upturned toe (Nokh) with brass tacks on heel and hand-twisted corded embroidery. Historically worn by feudal elites and now a staple for grooms and traditionalists.",
    price: 4200,
    compareAtPrice: 5000,
    category: "Men",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Pitch Black", "Mahogany"],
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 21,
    featured: false,
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
  },
  {
    _id: "664fa1e2b012345678900015",
    name: "Bridal Rose Gold Zardozi Khussa - Champagne",
    slug: "bridal-rose-gold-zardozi-khussa-champagne",
    description:
      "Dense zardozi craftsmanship with cut-dana and french wire coils. A luminous champagne tone that matches modern pastel bridal couture by top Pakistani designers. Pure luxury for your special day.",
    price: 7400,
    compareAtPrice: 8900,
    category: "Wedding",
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ["Champagne Rose", "Muted Gold"],
    images: [
      "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 9,
    featured: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "664fa1e2b012345678900016",
    name: "Kids Little Princess Khussa - Pastel Pink",
    slug: "kids-little-princess-khussa-pastel-pink",
    description:
      "Delicate baby pink base with sweet floral resham stitches and glitter trim. Padded heel guard prevents blistering on delicate feet. High demand for flower girls and family parties.",
    price: 2200,
    compareAtPrice: 2700,
    category: "Kids",
    sizes: [26, 27, 28, 29, 30, 31, 32],
    colors: ["Pastel Pink", "Lilac Purple"],
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 18,
    featured: false,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    _id: "664fa1e2b012345678900017",
    name: "Comfort Cushion Daily Khussa - Honey Tan",
    slug: "comfort-cushion-daily-khussa-honey-tan",
    description:
      "Engineered specifically for daily wear with an anatomically contoured insole and soft leather upper that never cuts into the ankles. The ideal khussa for university, work, and everyday comfort.",
    price: 2950,
    compareAtPrice: 3600,
    category: "Casual",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ["Honey Tan", "Coffee Brown"],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 40,
    featured: false,
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
  },
  {
    _id: "664fa1e2b012345678900018",
    name: "Festive Eid Velvet Khussa - Ruby Crimson",
    slug: "festive-eid-velvet-khussa-ruby-crimson",
    description:
      "Dazzling ruby red velvet with traditional jaal (mesh) needlework in gold and silver bullion wire. Lightweight, photogenic, and instantly elevates any festive eastern attire.",
    price: 4600,
    compareAtPrice: 5400,
    category: "Women",
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ["Ruby Crimson", "Emerald Green"],
    images: [
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 25,
    featured: true,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    _id: "664fa1e2b012345678900019",
    name: "Jahangiri Nokhdar Khussa - Emerald Velvet",
    slug: "jahangiri-nokhdar-khussa-emerald-velvet",
    description:
      "A stately pointed-toe silhouette crafted from rich emerald green velvet, bordered with fine gold tilla cord. Double-padded insole built for Mehndi celebrations and heritage evening events.",
    price: 4600,
    compareAtPrice: 5400,
    category: "Men",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ["Emerald Green", "Midnight Blue"],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 20,
    featured: true,
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-19"),
  },
  {
    _id: "664fa1e2b012345678900020",
    name: "Peshawari Chappal Khussa Fusion - Dark Oxblood",
    slug: "peshawari-chappal-khussa-fusion-dark-oxblood",
    description:
      "A unique artisanal hybrid pairing thick hand-buffed leather upper with traditional closed khussa toe and tyre-sole resilience. Made for heavy daily wear.",
    price: 3800,
    compareAtPrice: 4500,
    category: "Casual",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Dark Oxblood", "Mustard Brown"],
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 28,
    featured: false,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    _id: "664fa1e2b012345678900021",
    name: "Kundan Pearl Embroidered Khussa - Ivory Pearl",
    slug: "kundan-pearl-embroidered-khussa-ivory-pearl",
    description:
      "Opulent bridal footwear encrusted with miniature faux kundan stones, seed pearls, and silver zardozi work over ivory raw silk. Designed to complement heavily worked bridal couture.",
    price: 7200,
    compareAtPrice: 8800,
    category: "Wedding",
    sizes: [36, 37, 38, 39, 40],
    colors: ["Ivory Pearl", "Champagne Gold"],
    images: [
      "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 12,
    featured: true,
    createdAt: new Date("2024-01-21"),
    updatedAt: new Date("2024-01-21"),
  },
  {
    _id: "664fa1e2b012345678900022",
    name: "Multani Resham Floral Khussa - Sunflower Yellow",
    slug: "multani-resham-floral-khussa-sunflower-yellow",
    description:
      "Vibrant pure silk resham threadwork forming delicate sunflower and marigold blossoms over treated natural leather. The definitive footwear for Mayun and Dholki nights.",
    price: 3900,
    compareAtPrice: 4600,
    category: "Women",
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ["Sunflower Yellow", "Tangerine Orange"],
    images: [
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 22,
    featured: false,
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    _id: "664fa1e2b012345678900023",
    name: "Antique Copper Tilla Mojari - Bronze Tan",
    slug: "antique-copper-tilla-mojari-bronze-tan",
    description:
      "Rich bronze leather enhanced with rare antique copper-hued wirework. Gives a subdued, aristocratic finish that coordinates gracefully with earthen and copper sherwanis.",
    price: 4800,
    compareAtPrice: 5700,
    category: "Wedding",
    sizes: [40, 41, 42, 43, 44],
    colors: ["Bronze Tan", "Copper Brown"],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 16,
    featured: true,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-23"),
  },
  {
    _id: "664fa1e2b012345678900024",
    name: "Shendi Chunri Pattern Khussa - Royal Indigo",
    slug: "shendi-chunri-pattern-khussa-royal-indigo",
    description:
      "Traditional tie-and-dye chunri print base embellished with fine dabka knots and golden mirror rings. An eye-catching celebration piece for young women.",
    price: 4400,
    compareAtPrice: 5200,
    category: "Women",
    sizes: [36, 37, 38, 39, 40],
    colors: ["Royal Indigo", "Crimson Multi"],
    images: [
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 24,
    featured: false,
    createdAt: new Date("2024-01-24"),
    updatedAt: new Date("2024-01-24"),
  },
  {
    _id: "664fa1e2b012345678900025",
    name: "Kids Eid Kurta Matching Khussa - Forest Green",
    slug: "kids-eid-kurta-matching-khussa-forest-green",
    description:
      "Deep green velvet with soft inner cushion, stitched to prevent heel blisters. Easy slip-on design for kids attending family dinners and Eid prayers.",
    price: 2100,
    compareAtPrice: 2600,
    category: "Kids",
    sizes: [26, 27, 28, 29, 30, 31, 32],
    colors: ["Forest Green", "Ruby Red"],
    images: [
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 25,
    featured: false,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    _id: "664fa1e2b012345678900026",
    name: "Sufi Dervish Minimalist Khussa - Raw Buff Leather",
    slug: "sufi-dervish-minimalist-khussa-raw-buff-leather",
    description:
      "A no-embroidery, pure organic tanned leather khussa favored by literary circles, poets, and traditionalists in Multan. Develops a gorgeous vintage patina over years.",
    price: 2900,
    compareAtPrice: 3500,
    category: "Casual",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ["Raw Buff Leather", "Dark Hickory"],
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 35,
    featured: false,
    createdAt: new Date("2024-01-26"),
    updatedAt: new Date("2024-01-26"),
  },
  {
    _id: "664fa1e2b012345678900027",
    name: "Dhanak Threadwork Khussa - Multicolour Festive",
    slug: "dhanak-threadwork-khussa-multicolour-festive",
    description:
      "Seven shades of silk threads woven into geometric chevron motifs. Pairs effortlessly with any plain lawn or cotton suit to add an instant splash of artisan color.",
    price: 4100,
    compareAtPrice: 4900,
    category: "Women",
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ["Rainbow Multi", "Pastel Multi"],
    images: [
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 20,
    featured: false,
    createdAt: new Date("2024-01-27"),
    updatedAt: new Date("2024-01-27"),
  },
  {
    _id: "664fa1e2b012345678900028",
    name: "Mughal Darbar Gold Bullion Mojari - Deep Burgundy",
    slug: "mughal-darbar-gold-bullion-mojari-deep-burgundy",
    description:
      "Heavily loaded with genuine metallic bullion coils and thick coiled gold wire. Hand-stitched curled upturned toe with double-cushioned insole. Made specifically for grooms.",
    price: 5800,
    compareAtPrice: 6900,
    category: "Wedding",
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Deep Burgundy", "Imperial Black"],
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 14,
    featured: true,
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-01-28"),
  },
  {
    _id: "664fa1e2b012345678900029",
    name: "Cushioned Walk Everyday Suede - Slate Navy",
    slug: "cushioned-walk-everyday-suede-slate-navy",
    description:
      "Ultra-soft navy blue calf suede with ergonomic arch support and anti-skid leather sole. The perfect balance between ethnic charm and modern footwear comfort.",
    price: 3300,
    compareAtPrice: 3950,
    category: "Casual",
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ["Slate Navy", "Stone Grey"],
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 30,
    featured: false,
    createdAt: new Date("2024-01-29"),
    updatedAt: new Date("2024-01-29"),
  },
  {
    _id: "664fa1e2b012345678900030",
    name: "Little Maharani Embroidered Khussa - Ruby Pink",
    slug: "little-maharani-embroidered-khussa-ruby-pink",
    description:
      "A festive pair for young girls with delicate golden gota flowers and baby-soft leather lining. Lightweight, flexible, and completely pinch-free.",
    price: 2300,
    compareAtPrice: 2800,
    category: "Kids",
    sizes: [26, 27, 28, 29, 30, 31, 32],
    colors: ["Ruby Pink", "Golden Yellow"],
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=900&q=80",
    ],
    stock: 20,
    featured: false,
    createdAt: new Date("2024-01-30"),
    updatedAt: new Date("2024-01-30"),
  },
];

class InMemoryStore {
  constructor() {
    this.products = [...initialProducts];
    this.orders = [];
    this.admin = {
      _id: "664fa1e2b012345678900999",
      email: (process.env.ADMIN_EMAIL || "admin@bhuttakhussamehal.com").toLowerCase(),
      passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || "admin123", 10),
      name: "Store Admin",
    };
  }

  // Admin methods
  findAdmin(email) {
    if (this.admin.email === email.toLowerCase()) {
      return {
        ...this.admin,
        matchPassword: async (enteredPassword) => {
          return bcrypt.compare(enteredPassword, this.admin.passwordHash);
        },
      };
    }
    return null;
  }

  findAdminById(id) {
    if (this.admin._id === id) {
      return {
        _id: this.admin._id,
        email: this.admin.email,
        name: this.admin.name,
      };
    }
    return null;
  }

  // Product methods
  getProducts({ category, search, minPrice, maxPrice, sort, page = 1, limit = 50 } = {}) {
    let result = [...this.products];

    if (category && category !== "All") {
      result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (minPrice) {
      result = result.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    if (sort === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    const total = result.length;
    const skip = (Number(page) - 1) * Number(limit);
    const paginated = result.slice(skip, skip + Number(limit));

    return {
      products: paginated,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)) || 1,
    };
  }

  getProductByIdOrSlug(idOrSlug) {
    return this.products.find((p) => p.slug === idOrSlug || p._id === idOrSlug) || null;
  }

  createProduct(payload) {
    const items = Array.isArray(payload) ? payload : [payload];
    const created = items.map((p) => {
      const slug = (p.slug || p.name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      const newProduct = {
        _id: "prod_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6),
        ...p,
        slug: slug + "-" + Date.now().toString().slice(-4),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.products.unshift(newProduct);
      return newProduct;
    });
    return created.length === 1 ? created[0] : created;
  }

  updateProduct(id, updates) {
    const idx = this.products.findIndex((p) => p._id === id);
    if (idx === -1) return null;
    this.products[idx] = {
      ...this.products[idx],
      ...updates,
      updatedAt: new Date(),
    };
    return this.products[idx];
  }

  deleteProduct(id) {
    const idx = this.products.findIndex((p) => p._id === id);
    if (idx === -1) return false;
    this.products.splice(idx, 1);
    return true;
  }

  // Order methods
  createOrder({ items, customer, paymentMethod = "COD" }) {
    let subtotal = 0;
    const verifiedItems = [];

    for (const item of items) {
      const product = this.getProductByIdOrSlug(item.product);
      if (!product) {
        throw new Error(`Product not found: ${item.name || item.product}`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }
      subtotal += product.price * item.quantity;
      verifiedItems.push({
        product: product._id,
        name: product.name,
        image: product.images?.[0] || "",
        price: product.price,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
      });

      product.stock -= item.quantity;
    }

    const shippingFee = subtotal >= 4999 ? 0 : 250;
    const total = subtotal + shippingFee;

    const order = {
      _id: "ord_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6),
      items: verifiedItems,
      customer,
      paymentMethod,
      subtotal,
      shippingFee,
      total,
      status: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.orders.unshift(order);
    return order;
  }

  getOrders() {
    return this.orders;
  }

  getOrderById(id) {
    return this.orders.find((o) => o._id === id) || null;
  }

  updateOrderStatus(id, status) {
    const order = this.getOrderById(id);
    if (!order) return null;
    order.status = status;
    order.updatedAt = new Date();
    return order;
  }
}

const mockStore = new InMemoryStore();
module.exports = { mockStore, initialProducts };
