import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KHAMIS_PRODUCTS } from './data/products.data';
import { Product, CartItem, FittingRequest } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Brand details
  readonly brandName = 'KHAMIS';
  readonly brandTagline = 'Haute Couture & Architectural Tailoring';
  readonly freeShippingThreshold = 200;

  // Master product data
  readonly allProducts = signal<Product[]>(KHAMIS_PRODUCTS);

  // Filtering & Search
  readonly selectedCategory = signal<string>('all');
  readonly searchQuery = signal<string>('');
  readonly sortOption = signal<string>('featured');

  // Currency selection
  readonly selectedCurrency = signal<'USD' | 'EUR' | 'GBP'>('USD');
  readonly currencyRates = {
    USD: { symbol: '$', rate: 1.0 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 }
  };

  // Cart & Wishlist state
  readonly wishlist = signal<string[]>(['khamis-01']);
  readonly cart = signal<CartItem[]>([
    {
      product: KHAMIS_PRODUCTS[0],
      quantity: 1,
      selectedSize: '48 (M)',
      selectedColor: KHAMIS_PRODUCTS[0].colors[0]
    }
  ]);

  // Vouchers
  readonly promoInput = signal<string>('');
  readonly discountPercent = signal<number>(0);
  readonly promoFeedback = signal<string>('');

  // Modals & Drawers state
  readonly isCartOpen = signal<boolean>(false);
  readonly isMobileMenuOpen = signal<boolean>(false);
  readonly isSearchOpen = signal<boolean>(false);
  readonly isManifestoOpen = signal<boolean>(false);
  readonly isFittingModalOpen = signal<boolean>(false);
  readonly isCheckoutSuccessOpen = signal<boolean>(false);

  // Quick View State
  readonly quickViewProduct = signal<Product | null>(null);
  readonly activeQuickViewTab = signal<'details' | 'fitting'>('details');
  readonly quickViewSelectedSize = signal<string>('');
  readonly quickViewSelectedColor = signal<{ name: string; hex: string } | null>(null);
  readonly quickViewQuantity = signal<number>(1);
  readonly quickViewActiveImage = signal<string>('');

  // Interactive Form State (No real phone numbers or real street addresses required)
  fittingData: FittingRequest = {
    fullName: '',
    email: '',
    preferredCity: 'Paris',
    preferredDate: '',
    notes: ''
  };

  newsletterEmail = '';
  newsletterSubmitted = signal<boolean>(false);

  // Toast Notification
  readonly toastMessage = signal<string | null>(null);
  readonly isToastVisible = signal<boolean>(false);
  private toastTimeout: any = null;

  // Computed: Filtered and Sorted Products
  readonly filteredProducts = computed(() => {
    let list = this.allProducts();
    const cat = this.selectedCategory();
    const query = this.searchQuery().trim().toLowerCase();
    const sort = this.sortOption();

    // Category filter
    if (cat !== 'all') {
      list = list.filter(p => p.category === cat);
    }

    // Search query filter
    if (query) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.material.toLowerCase().includes(query) ||
        p.categoryLabel.toLowerCase().includes(query)
      );
    }

    // Sorting
    const sorted = [...list];
    if (sort === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      sorted.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return sorted;
  });

  // Computed: Live search results for overlay
  readonly overlaySearchResults = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return this.allProducts().slice(0, 4);
    return this.allProducts().filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q)
    );
  });

  // Computed: Cart metrics
  readonly cartCount = computed(() => {
    return this.cart().reduce((sum, item) => sum + item.quantity, 0);
  });

  readonly cartSubtotal = computed(() => {
    return this.cart().reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  });

  readonly cartDiscountAmount = computed(() => {
    return (this.cartSubtotal() * this.discountPercent()) / 100;
  });

  readonly cartGrandTotal = computed(() => {
    return Math.max(0, this.cartSubtotal() - this.cartDiscountAmount());
  });

  readonly shippingProgress = computed(() => {
    const subtotal = this.cartSubtotal();
    return Math.min(100, Math.round((subtotal / this.freeShippingThreshold) * 100));
  });

  readonly remainingForFreeShipping = computed(() => {
    const remaining = this.freeShippingThreshold - this.cartSubtotal();
    return remaining > 0 ? remaining : 0;
  });

  // --------------------------------------------------------------------------
  // Category & Navigation Methods
  // --------------------------------------------------------------------------
  setCategory(category: string, scroll = true): void {
    this.selectedCategory.set(category);
    this.closeMobileMenu();
    if (scroll) {
      const el = document.getElementById('collection-catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  setCurrency(curr: 'USD' | 'EUR' | 'GBP'): void {
    this.selectedCurrency.set(curr);
    this.showToast(`Currency updated to ${curr}`);
  }

  formatPrice(usdAmount: number): string {
    const curr = this.selectedCurrency();
    const config = this.currencyRates[curr];
    const converted = Math.round(usdAmount * config.rate);
    return `${config.symbol}${converted.toLocaleString('en-US')}`;
  }

  // --------------------------------------------------------------------------
  // Wishlist Methods
  // --------------------------------------------------------------------------
  isInWishlist(id: string): boolean {
    return this.wishlist().includes(id);
  }

  toggleWishlist(product: Product, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    const current = this.wishlist();
    if (current.includes(product.id)) {
      this.wishlist.set(current.filter(item => item !== product.id));
      this.showToast(`Removed "${product.name}" from Wishlist`);
    } else {
      this.wishlist.set([...current, product.id]);
      this.showToast(`Added "${product.name}" to Wishlist`);
    }
  }

  // --------------------------------------------------------------------------
  // Cart Methods
  // --------------------------------------------------------------------------
  openCart(): void {
    this.isCartOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeCart(): void {
    this.isCartOpen.set(false);
    if (!this.isMobileMenuOpen() && !this.quickViewProduct() && !this.isSearchOpen()) {
      document.body.style.overflow = '';
    }
  }

  addToCart(product: Product, size?: string, color?: { name: string; hex: string }, qty = 1, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }

    const chosenSize = size || product.sizes[0] || 'Standard';
    const chosenColor = color || product.colors[0];

    const currentCart = [...this.cart()];
    const existingIndex = currentCart.findIndex(item =>
      item.product.id === product.id &&
      item.selectedSize === chosenSize &&
      item.selectedColor.name === chosenColor.name
    );

    if (existingIndex > -1) {
      currentCart[existingIndex].quantity += qty;
    } else {
      currentCart.push({
        product,
        quantity: qty,
        selectedSize: chosenSize,
        selectedColor: chosenColor
      });
    }

    this.cart.set(currentCart);
    this.showToast(`Added ${product.name} to Shopping Bag`);
    this.openCart();
  }

  updateQuantity(index: number, delta: number): void {
    const current = [...this.cart()];
    if (current[index]) {
      const newQty = current[index].quantity + delta;
      if (newQty <= 0) {
        this.removeFromCart(index);
      } else {
        current[index].quantity = newQty;
        this.cart.set(current);
      }
    }
  }

  removeFromCart(index: number): void {
    const current = [...this.cart()];
    const removed = current.splice(index, 1)[0];
    this.cart.set(current);
    if (removed) {
      this.showToast(`Removed "${removed.product.name}" from Bag`);
    }
  }

  applyPromo(): void {
    const code = this.promoInput().trim().toUpperCase();
    if (code === 'KHAMIS10' || code === 'ARCHIVE10') {
      this.discountPercent.set(10);
      this.promoFeedback.set('Courtesy 10% Atelier Archival Privilege applied.');
      this.showToast('10% Archival Privilege applied to your order.');
    } else if (code === 'VIP20' || code === 'SALON20') {
      this.discountPercent.set(20);
      this.promoFeedback.set('Private Client Salon 20% Privilege applied.');
      this.showToast('Private Client 20% Privilege applied.');
    } else if (code) {
      this.promoFeedback.set('Invalid archival code. Please verify your invitation.');
    }
  }

  checkout(): void {
    this.closeCart();
    this.isCheckoutSuccessOpen.set(true);
    document.body.style.overflow = 'hidden';
    this.cart.set([]);
  }

  closeCheckoutSuccess(): void {
    this.isCheckoutSuccessOpen.set(false);
    document.body.style.overflow = '';
  }

  // --------------------------------------------------------------------------
  // Quick View & Private Fitting Modal
  // --------------------------------------------------------------------------
  openQuickView(product: Product, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.quickViewProduct.set(product);
    this.activeQuickViewTab.set('details');
    this.quickViewSelectedSize.set(product.sizes[0]);
    this.quickViewSelectedColor.set(product.colors[0]);
    this.quickViewQuantity.set(1);
    this.quickViewActiveImage.set(product.imageUrl);
    document.body.style.overflow = 'hidden';
  }

  closeQuickView(): void {
    this.quickViewProduct.set(null);
    if (!this.isCartOpen() && !this.isMobileMenuOpen() && !this.isSearchOpen()) {
      document.body.style.overflow = '';
    }
  }

  selectQuickViewImage(img: string): void {
    this.quickViewActiveImage.set(img);
  }

  addQuickViewToCart(): void {
    const prod = this.quickViewProduct();
    if (prod) {
      this.addToCart(
        prod,
        this.quickViewSelectedSize(),
        this.quickViewSelectedColor() || prod.colors[0],
        this.quickViewQuantity()
      );
      this.closeQuickView();
    }
  }

  // --------------------------------------------------------------------------
  // Search Overlay
  // --------------------------------------------------------------------------
  openSearch(): void {
    this.isSearchOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeSearch(): void {
    this.isSearchOpen.set(false);
    if (!this.isCartOpen() && !this.isMobileMenuOpen() && !this.quickViewProduct()) {
      document.body.style.overflow = '';
    }
  }

  selectSearchResult(product: Product): void {
    this.closeSearch();
    this.openQuickView(product);
  }

  // --------------------------------------------------------------------------
  // Mobile Menu
  // --------------------------------------------------------------------------
  openMobileMenu(): void {
    this.isMobileMenuOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    if (!this.isCartOpen() && !this.quickViewProduct() && !this.isSearchOpen()) {
      document.body.style.overflow = '';
    }
  }

  // --------------------------------------------------------------------------
  // Manifesto & Fitting Modals
  // --------------------------------------------------------------------------
  openManifesto(): void {
    this.isManifestoOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeManifesto(): void {
    this.isManifestoOpen.set(false);
    document.body.style.overflow = '';
  }

  openFittingModal(product?: Product): void {
    if (product) {
      this.fittingData.productId = product.name;
    }
    this.isFittingModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeFittingModal(): void {
    this.isFittingModalOpen.set(false);
    document.body.style.overflow = '';
  }

  submitFitting(): void {
    if (!this.fittingData.fullName || !this.fittingData.email) {
      this.showToast('Please provide your name and contact email.');
      return;
    }
    this.closeFittingModal();
    this.closeQuickView();
    this.showToast(`Private Salon fitting request received for ${this.fittingData.preferredCity}. Our atelier concierge will contact you by email.`);
    // Reset form
    this.fittingData = {
      fullName: '',
      email: '',
      preferredCity: 'Paris',
      preferredDate: '',
      notes: ''
    };
  }

  // --------------------------------------------------------------------------
  // Newsletter Form
  // --------------------------------------------------------------------------
  submitNewsletter(): void {
    if (!this.newsletterEmail || !this.newsletterEmail.includes('@')) {
      this.showToast('Please enter a valid email address.');
      return;
    }
    this.newsletterSubmitted.set(true);
    this.showToast('Thank you for subscribing to KHAMIS Private Correspondence.');
    this.newsletterEmail = '';
  }

  // --------------------------------------------------------------------------
  // Toast Helper
  // --------------------------------------------------------------------------
  showToast(msg: string): void {
    this.toastMessage.set(msg);
    this.isToastVisible.set(true);
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastTimeout = setTimeout(() => {
      this.isToastVisible.set(false);
    }, 4000);
  }
}
