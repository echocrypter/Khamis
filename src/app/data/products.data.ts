import { Product } from '../models/product.model';

export const KHAMIS_PRODUCTS: Product[] = [
  {
    id: 'khamis-01',
    name: 'Sculptural Wool-Cashmere Greatcoat',
    category: 'men',
    categoryLabel: 'Men',
    price: 3850,
    originalPrice: 4200,
    badge: 'Runway Look 01',
    edition: 'Numbered Edition 08/25',
    description: 'An architectural monumental overcoat tailored from heavy Japanese wool faille bonded to double-faced cashmere. Features an exaggerated storm collar, concealed horn button placket, and deep structured vents designed for fluid kinetic movement.',
    material: '70% Japanese Raw Wool, 30% Double-Faced Cashmere. Lining: 100% Cupro.',
    imageUrl: 'assets/images/hero_khamis_runway.jpg',
    additionalImages: [
      'assets/images/men_trench.jpg',
      'assets/images/jewelry_earcuff.jpg'
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)', 'Made-to-Measure'],
    colors: [
      { name: 'Obsidian Black', hex: '#111113' },
      { name: 'Charcoal Basalt', hex: '#2A2A2D' }
    ],
    isNewArrival: true
  },
  {
    id: 'khamis-02',
    name: 'Architectural Asymmetric Faille Gown',
    category: 'women',
    categoryLabel: 'Women',
    price: 4600,
    badge: 'Couture Monograph',
    edition: 'Numbered Edition 03/15',
    description: 'Sculpted evening gown combining structured brutalist bustier engineering with fluid, hand-draped ivory and onyx silk faille. Cut on the bias to generate sublime volume in stride, inspired by modernist pavilion cantilevers.',
    material: '100% Heavy Italian Silk Faille with Internal Boned Bustier Architecture.',
    imageUrl: 'assets/images/women_gown.jpg',
    additionalImages: [
      'assets/images/hero_khamis_runway.jpg',
      'assets/images/brand_hero_full.png'
    ],
    sizes: ['36 (XS)', '38 (S)', '40 (M)', '42 (L)', 'Bespoke Fitting'],
    colors: [
      { name: 'Onyx & Alabaster', hex: '#1C1C1E' },
      { name: 'Pure Obsidian', hex: '#0B0B0C' }
    ],
    isNewArrival: true
  },
  {
    id: 'khamis-03',
    name: 'The Plisse Leather Trench & Plinth Bag',
    category: 'leather-goods',
    categoryLabel: 'Leather Goods',
    price: 2950,
    badge: 'Artisan Object',
    edition: 'Atelier Series 12/30',
    description: 'Sculptural leather trench coat handcrafted from hand-pleated French full-grain calfskin with raw-edge finishing. Accompanied by the Monolith Minaudière with a solid carved marble plinth lock and palladium hardware.',
    material: '100% French Vegetable-Tanned Calfskin, Natural Raw Waxed Finish, Carved Carrara Plinth Clasp.',
    imageUrl: 'assets/images/leather_plisse.jpg',
    additionalImages: [
      'assets/images/men_trench.jpg'
    ],
    sizes: ['One Size (Curated Object)', 'Custom Dimension'],
    colors: [
      { name: 'Raw Espresso Leather', hex: '#2B211E' },
      { name: 'Basalt Charcoal', hex: '#1D1D20' }
    ],
    isNewArrival: false
  },
  {
    id: 'khamis-04',
    name: 'Hand-Forged Gold Wire Ear Sculpture',
    category: 'high-jewelry',
    categoryLabel: 'High Jewelry',
    price: 2200,
    badge: 'Geneva Studio',
    edition: 'Numbered Edition 05/10',
    description: 'Kinetic ear architecture hand-formed from 18-karat recycled yellow gold wire. Balances effortlessly along the contour of the ear without piercing, designed in dialogue with high-collar tailored lapels.',
    material: '18K Recycled Solid Yellow Gold (12.4g) with Hand-Brushed Satin Polish.',
    imageUrl: 'assets/images/jewelry_earcuff.jpg',
    additionalImages: [
      'assets/images/women_gown.jpg'
    ],
    sizes: ['Left Ear Architecture', 'Right Ear Architecture', 'Paired Set'],
    colors: [
      { name: '18K Yellow Gold', hex: '#D4AF37' },
      { name: 'Platinum Obsidian', hex: '#8E9196' }
    ],
    isNewArrival: true
  },
  {
    id: 'khamis-05',
    name: 'Brutalist Pavilion Draped Evening Cape',
    category: 'women',
    categoryLabel: 'Women',
    price: 5100,
    originalPrice: 5600,
    badge: 'Runway Look 04',
    edition: 'Numbered Edition 02/10',
    description: 'Double-weight Italian obsidian wool cape sculpted with a monolithic funnel neckline and dramatic asymmetric cascade. Hand-finished with interior silk grosgrain harness straps for variable drape and silhouette adjustments.',
    material: '100% Italian Virgin Melange Wool, Hand-Stitched Silk Habotai Interior.',
    imageUrl: 'assets/images/brand_hero_full.png',
    additionalImages: [
      'assets/images/women_gown.jpg'
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', 'Bespoke Atelier Order'],
    colors: [
      { name: 'Obsidian Black', hex: '#111113' },
      { name: 'Piedmont Fog Grey', hex: '#48494B' }
    ],
    isNewArrival: false
  },
  {
    id: 'khamis-06',
    name: 'Kinetic Minimalist Charcoal Trench',
    category: 'men',
    categoryLabel: 'Men',
    price: 3400,
    badge: 'Atelier Archive',
    edition: 'Numbered Edition 11/20',
    description: 'Engineered with clean architectural shoulder construction, storm shield back yoke, and wide fluid trouser drape. Cut from weatherproof English gabardine bonded to brushed cotton for quiet, structured elegance.',
    material: '100% Water-Resistant Compact Cotton Gabardine, Bound Seams.',
    imageUrl: 'assets/images/men_trench.jpg',
    additionalImages: [
      'assets/images/hero_khamis_runway.jpg'
    ],
    sizes: ['46 (S)', '48 (M)', '50 (L)', '52 (XL)'],
    colors: [
      { name: 'Basalt Charcoal', hex: '#222225' },
      { name: 'Mineral Stone', hex: '#706E6B' }
    ],
    isNewArrival: true
  }
];
