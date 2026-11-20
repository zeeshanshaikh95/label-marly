import type { Category, GalleryItem, Product, PublicSettings, Review } from '@/types';

/**
 * Showcase content for the Label Marly storefront.
 *
 * The live site reads from the API/admin panel. When the API is unavailable
 * (e.g. the static GitHub Pages preview) these records keep the boutique
 * populated. The admin panel remains the source of truth once connected.
 */
const BASE = import.meta.env.BASE_URL;
const img = (file: string) => `${BASE}images/${file}`;

const now = '2026-11-21T00:00:00.000Z';

function category(
  id: string,
  name: string,
  slug: string,
  description: string,
  image: string,
  order: number
): Category {
  return {
    _id: id,
    name,
    slug,
    description,
    image,
    displayOrder: order,
    createdAt: now,
    updatedAt: now,
  };
}

export const demoCategories: Category[] = [
  category(
    'cat-abayas',
    'Abayas & Modest Wear',
    'abayas',
    'Everyday and occasion abayas in fluid fabrics, lace trims and prints — cut for comfort and made to be worn on repeat.',
    img('look-3.jpg'),
    1
  ),
  category(
    'cat-party',
    'Party & Occasion',
    'party-occasion',
    'Statement kaftans, embellished sets and party wear for the moments that deserve a little more.',
    img('look-8.jpg'),
    2
  ),
  category(
    'cat-casuals',
    'Casuals & Kaftans',
    'casuals',
    'Easy, breathable pieces for everyday — polished enough for plans, comfortable enough for everything else.',
    img('look-6.jpg'),
    3
  ),
  category(
    'cat-atelier',
    'The Atelier',
    'atelier',
    'Made-to-order and custom design, sketched and stitched around you by Mariam Hamidani.',
    img('look-1.jpg'),
    4
  ),
];

type DemoProductInput = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  category: Category;
  price: number | null;
  compareAtPrice?: number | null;
  size: string;
  fabric: string[];
  details: string[];
  madeToOrder: string;
  care: string;
  bestseller?: boolean;
  featured?: boolean;
  order: number;
};

function product(input: DemoProductInput): Product {
  return {
    _id: input.id,
    name: input.name,
    slug: input.slug,
    description: input.description,
    price: input.price,
    compareAtPrice: input.compareAtPrice ?? null,
    size: input.size,
    category: { _id: input.category._id, name: input.category.name, slug: input.category.slug },
    images: [input.image],
    ingredients: input.fabric,
    benefits: input.details,
    howToUse: input.madeToOrder,
    warnings: input.care,
    variants: [
      { name: 'XS', price: null, stockStatus: 'in_stock' },
      { name: 'S', price: null, stockStatus: 'in_stock' },
      { name: 'M', price: null, stockStatus: 'in_stock' },
      { name: 'L', price: null, stockStatus: 'in_stock' },
      { name: 'Custom', price: null, stockStatus: 'in_stock' },
    ],
    stockStatus: 'in_stock',
    bestseller: input.bestseller ?? false,
    featured: input.featured ?? false,
    seoTitle: `${input.name} · Label Marly`,
    seoDescription: input.description.slice(0, 155),
    displayOrder: input.order,
    archived: false,
    createdAt: now,
    updatedAt: now,
  };
}

export const demoProducts: Product[] = [
  product({
    id: 'marly-signature-abaya',
    name: 'The Marly Signature Abaya',
    slug: 'marly-signature-abaya',
    description:
      'Our house silhouette: a clean, floor-skimming abaya in a soft structured crepe with a hidden placket and adjustable belt. Understated from the front, beautiful in movement.',
    image: img('look-4.jpg'),
    category: demoCategories[0],
    price: 3499,
    compareAtPrice: 3999,
    size: 'Made to order · Custom sizing available',
    fabric: ['Structured crepe', 'Hidden placket', 'Adjustable belt', 'Fully lined'],
    details: ['Floor-length cut', 'Discreet side pockets', 'Available in six neutrals', 'Designed in Mumbai'],
    madeToOrder: 'Made to order in 7–10 working days. Share your measurements at checkout or DM us for a sizing call.',
    care: 'Dry clean recommended. Cool iron on reverse.',
    bestseller: true,
    featured: true,
    order: 1,
  }),
  product({
    id: 'noor-abaya',
    name: 'Noor Embellished Abaya',
    slug: 'noor-embellished-abaya',
    description:
      'A deep navy abaya with delicate lace detailing along the front panel and sleeves. Light enough for a long evening, special enough to remember.',
    image: img('look-2.jpg'),
    category: demoCategories[0],
    price: 4299,
    size: 'Made to order · Custom sizing available',
    fabric: ['Premium Nida', 'Lace trim', 'Hand-finished edging'],
    details: ['Relaxed A-line fall', 'Embellished front panel', 'Matching hijab included'],
    madeToOrder: 'Made to order in 7–12 working days. Custom length and sleeve options available.',
    care: 'Gentle hand wash or dry clean. Do not tumble dry.',
    bestseller: true,
    featured: true,
    order: 2,
  }),
  product({
    id: 'midnight-lace-abaya',
    name: 'Midnight Lace Abaya',
    slug: 'midnight-lace-abaya',
    description:
      'Ivory panels meet black lace in this statement abaya. A piece that photographs beautifully and feels effortless in person.',
    image: img('look-6.jpg'),
    category: demoCategories[0],
    price: 4599,
    size: 'Made to order · Custom sizing available',
    fabric: ['Crepe blend', 'Contrast lace panels', 'Satin binding'],
    details: ['Statement colour-block panels', 'Embroidered lace cuffs', 'Concealed zip'],
    madeToOrder: 'Made to order in 10–14 working days. Custom colour combinations available on request.',
    care: 'Dry clean only. Store on a padded hanger.',
    featured: true,
    order: 3,
  }),
  product({
    id: 'burgundy-bloom-set',
    name: 'Burgundy Bloom Occasion Set',
    slug: 'burgundy-bloom-occasion-set',
    description:
      'A tonal burgundy occasion set with a textured outer robe and matching inner. Understated drama for weddings, dinners and everything in between.',
    image: img('look-5.jpg'),
    category: demoCategories[1],
    price: 6499,
    size: 'Made to order · Custom sizing available',
    fabric: ['Textured jacquard', 'Soft inner crepe', 'Tonal embroidery'],
    details: ['Two-piece set', 'Floor-length robe', 'Matching inner included'],
    madeToOrder: 'Made to order in 10–14 working days. Styling consultation available on DM.',
    care: 'Dry clean only.',
    bestseller: true,
    featured: true,
    order: 4,
  }),
  product({
    id: 'mukhawar-collection',
    name: 'The Mukhawar Collection',
    slug: 'mukhawar-collection',
    description:
      'Our festive capsule: printed kaftans with hand-embellished necklines, coordinated dupattas and colours made for celebration. Select your piece and we will confirm availability on DM.',
    image: img('look-8.jpg'),
    category: demoCategories[1],
    price: null,
    size: 'Limited pieces · Customisation available',
    fabric: ['Printed georgette', 'Hand embellishment', 'Coordinated dupatta'],
    details: ['Six colourways', 'Embellished neckline', 'Stitching and customisation included'],
    madeToOrder: 'Collection pieces are made to order in 12–18 working days. DM us to reserve your colourway.',
    care: 'Dry clean only. Store flat.',
    featured: true,
    order: 5,
  }),
  product({
    id: 'ivory-lace-kaftan',
    name: 'Ivory Lace Kaftan',
    slug: 'ivory-lace-kaftan',
    description:
      'An easy ivory kaftan with lace insets at the sleeve and hem. The kind of piece that works for Eid mornings, beach evenings and everything after.',
    image: img('look-7.jpg'),
    category: demoCategories[2],
    price: 2899,
    size: 'Made to order · Custom sizing available',
    fabric: ['Cotton-blend crepe', 'Lace insets', 'Relaxed cut'],
    details: ['Breathable everyday fabric', 'Decorative lace cuffs', 'Matching scarf available'],
    madeToOrder: 'Made to order in 5–8 working days.',
    care: 'Gentle machine wash cold. Line dry.',
    order: 6,
  }),
  product({
    id: 'printed-abaya-edit',
    name: 'The Printed Abaya Edit',
    slug: 'printed-abaya-edit',
    description:
      'Our rotating edit of printed abayas — abstract monochrome, polka dots and soft florals. Choose a print from the current drop and we will tailor it to you.',
    image: img('look-3.jpg'),
    category: demoCategories[0],
    price: 3199,
    size: 'Made to order · Custom sizing available',
    fabric: ['Printed Nida', 'Soft drape', 'Coordinating scarf'],
    details: ['New prints every drop', 'Tailored to your length', 'Easy-care finish'],
    madeToOrder: 'Made to order in 7–10 working days. Prints rotate — DM for the current selection.',
    care: 'Gentle hand wash separately. Cool iron.',
    order: 7,
  }),
  product({
    id: 'custom-atelier',
    name: 'The Atelier Appointment',
    slug: 'custom-atelier-appointment',
    description:
      'A fully custom piece, designed with Mariam from first sketch to final fitting. Occasion wear, bridal-adjacent modest looks, or a silhouette that exists only in your head.',
    image: img('look-1.jpg'),
    category: demoCategories[3],
    price: null,
    size: 'By appointment · Made to measure',
    fabric: ['Fabric sourcing included', 'Toile and fittings', 'Hand finishing'],
    details: ['One-to-one design consultation', 'Two fittings included', 'Made in your timeline'],
    madeToOrder: 'DM us to book a consultation. Custom pieces typically take 3–6 weeks depending on detail.',
    care: 'Care instructions provided with your finished piece.',
    featured: true,
    order: 8,
  }),
];

export const demoReviews: Review[] = [
  {
    _id: 'rev-1',
    customerName: 'Zoya S.',
    rating: 5,
    text: 'The fit was perfect and the fabric feels so premium. I wore my abaya to a wedding and got compliments all evening.',
    image: '',
    status: 'approved',
    displayOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'rev-2',
    customerName: 'Fatima R.',
    rating: 5,
    text: 'Mariam understood exactly what I wanted for my sister’s nikah. The custom piece was better than the reference I sent.',
    image: '',
    status: 'approved',
    displayOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'rev-3',
    customerName: 'Areeba M.',
    rating: 5,
    text: 'Ordered the ivory kaftan for Eid — beautiful finish, comfortable all day and it arrived right on time.',
    image: '',
    status: 'approved',
    displayOrder: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'rev-4',
    customerName: 'Sana K.',
    rating: 5,
    text: 'The detailing is so delicate and the colours are exactly as shown. Already planning my next order.',
    image: '',
    status: 'approved',
    displayOrder: 4,
    createdAt: now,
    updatedAt: now,
  },
];

export const demoGallery: GalleryItem[] = [
  {
    _id: 'gal-1',
    image: img('look-8.jpg'),
    caption: 'The Mukhawar Collection',
    externalUrl: 'https://www.instagram.com/label.marly/',
    displayOrder: 1,
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'gal-2',
    image: img('look-5.jpg'),
    caption: 'Burgundy Bloom occasion set',
    externalUrl: 'https://www.instagram.com/label.marly/',
    displayOrder: 2,
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'gal-3',
    image: img('look-6.jpg'),
    caption: 'Midnight lace, made to order',
    externalUrl: 'https://www.instagram.com/label.marly/',
    displayOrder: 3,
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'gal-4',
    image: img('look-2.jpg'),
    caption: 'The Noor abaya',
    externalUrl: 'https://www.instagram.com/label.marly/',
    displayOrder: 4,
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'gal-5',
    image: img('look-3.jpg'),
    caption: 'The printed abaya edit',
    externalUrl: 'https://www.instagram.com/label.marly/',
    displayOrder: 5,
    active: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'gal-6',
    image: img('look-1.jpg'),
    caption: 'Coming to Bhavnagar',
    externalUrl: 'https://www.instagram.com/label.marly/',
    displayOrder: 6,
    active: true,
    createdAt: now,
    updatedAt: now,
  },
];

export const demoSettings: PublicSettings = {
  businessName: 'Label Marly',
  whatsappNumber: 'https://ig.me/m/label.marly',
  instagramUrl: 'https://www.instagram.com/label.marly/',
  email: '',
  mapsUrl: '',
  whatsappTemplate:
    'Hi Label Marly! I would like to enquire about:\n\n{{ITEMS}}\n\nPlease share availability, sizing and delivery details.',
  whatsappSingleProductTemplate:
    'Hi Label Marly! I would like to enquire about {{PRODUCT}}.\n\nPlease share sizing, fabric and delivery details.',
  hero: {
    headline: 'From casual chic to stunning party wear.',
    subheadline:
      'Modest luxury and made-to-order couture by Mariam Hamidani — abayas, occasion wear and custom pieces designed around you.',
    imageUrl: img('look-5.jpg'),
  },
  about: {
    intro:
      'Label Marly is the studio of Mariam Hamidani, a certified fashion graduate designing modest, modern pieces from casual everyday wear to occasion couture.',
    story:
      'Every Label Marly piece begins with a conversation. Mariam works closely with each client — refining the silhouette, choosing the fabric, perfecting the finish — so the final piece feels like it was always meant for you.\n\nFrom fluid everyday abayas to hand-embellished occasion sets and fully bespoke commissions, everything is made to order in small batches. No mass production, no compromise on detail: just considered clothing, made properly.',
    founderImageUrl: img('look-6.jpg'),
  },
  announcements: {
    enabled: true,
    text: 'New collection coming to Bhavnagar · Custom orders open · DM to book a consultation',
  },
};

// ── Filters used by the static preview ─────────────────────────

export function demoListProducts(params: {
  search?: string;
  category?: string;
  sort?: string;
} = {}): Product[] {
  let items = demoProducts.slice();
  const search = params.search?.trim().toLowerCase();
  if (search) {
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.category?.name.toLowerCase().includes(search)
    );
  }
  if (params.category) {
    items = items.filter((p) => p.category?.slug === params.category);
  }
  switch (params.sort) {
    case 'price_asc':
      items.sort((a, b) => (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER));
      break;
    case 'price_desc':
      items.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
      break;
    case 'newest':
      items.sort((a, b) => a.displayOrder - b.displayOrder);
      break;
    case 'bestseller':
      items.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
      break;
    default:
      items.sort((a, b) => Number(b.featured) - Number(a.featured) || a.displayOrder - b.displayOrder);
  }
  return items;
}

export function demoGetProduct(slug: string): Product {
  const found = demoProducts.find((p) => p.slug === slug);
  if (!found) throw new Error('Piece not found');
  return found;
}

export function demoGetCategory(slug: string): { category: Category; products: Product[] } {
  const category = demoCategories.find((c) => c.slug === slug);
  if (!category) throw new Error('Category not found');
  return {
    category,
    products: demoProducts.filter((p) => p.category?.slug === slug),
  };
}
