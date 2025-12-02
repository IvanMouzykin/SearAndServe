import './style.css'
import { tns } from 'tiny-slider'
import lightGallery from 'lightgallery'
import 'lightgallery/css/lightgallery.css'

const productGallery = document.querySelector('.product-gallery');

if (productGallery) { console.log('found!'); }

lightGallery(productGallery);

const productSlider = document.querySelector('.products-slider');
if (productSlider) {
  var slider = tns({
    container: '.products-slider',
    autoplay: false,
    autoHeight: false,
    autoplayButtonOutput: false,
    loop: true,
    controlsContainer: '.products-nav-buttons',
    nav: true,
    responsive: {
      0: {
        items: 1,
        gutter: 0
      },
      768: {
        gutter: 20,
        items: 2
      },
      1280: {
        gutter: 30,
        items: 3
      },
      1536: {
        items: 4
      }
    }
  });
}

const testimonialsSlider = document.querySelector('.testimonials-slider');
if (testimonialsSlider) {
  var slider = tns({
    container: '.testimonials-slider',
    autoHeight: true,
    items: 3,
    autoplay: true,
    autoplayButtonOutput: false,
    loop: true,
    controlsContainer: '.testimonials-nav-buttons',
    nav: true,
    responsive: {
      0: {
        items: 1,
        gutter: 10
      },
      768: {
        gutter: 20,
        items: 3
      },
      1280: {
        gutter: 30,
        items: 4
      }
    }
  });
}


var lastScrollTop = 0;
window.addEventListener('scroll', function (event) {
  var st = window.pageYOffset || document.documentElement.scrollTop;

  if (st > 50) {
    document.getElementById('topNav').classList.add('scrolled');
  } else {
    document.getElementById('topNav').classList.remove('scrolled');
  }

  if (st > lastScrollTop) {
    // downscroll code
    document.getElementById('topNav').classList.add('hide');
  } else {
    // upscroll code
    document.getElementById('topNav').classList.remove('hide');
  }
  lastScrollTop = st;
});


// Off-canvas menu toggler

// Off-canvas menu toggler

const offcanvasTogglers = document.querySelectorAll("._offcanvasToggler");
const offcanvasTogglerIcon = document.getElementById("menu_checkbox");
const offcanvas = document.getElementById('offcanvas');
const cartOffcanvas = document.getElementById('cart-offcanvas');
const cartTrigger = document.getElementById('cart-trigger');
const cartCloseBtns = document.querySelectorAll('.cart-close-btn');
const pageWrapper = document.querySelector('.page-wrapper');
const backdrop = document.querySelector('.offcanvas-backdrop');
const body = document.body;
let scrollPosition = 0;

function openOffcanvas(targetOffcanvas) {
  scrollPosition = window.scrollY || document.documentElement.scrollTop;
  body.style.top = `-${scrollPosition}px`;
  body.style.position = 'fixed';
  body.style.width = '100%';
  body.style.overflow = 'hidden';
  targetOffcanvas.classList.add('active');

  // Only toggle hamburger and shift page if opening the main menu
  if (targetOffcanvas === offcanvas) {
    offcanvasTogglerIcon.classList.add('open');
    pageWrapper.classList.add('active');
  }

  backdrop.classList.add('active');
  body.classList.add('offcanvas-open');
}

function closeOffcanvas() {
  body.style.top = '';
  body.style.position = '';
  body.style.width = '';
  body.style.overflow = '';
  window.scrollTo(0, scrollPosition);

  offcanvas.classList.remove('active');
  if (cartOffcanvas) cartOffcanvas.classList.remove('active');

  offcanvasTogglerIcon.classList.remove('open');
  backdrop.classList.remove('active');
  pageWrapper.classList.remove('active');
  body.classList.remove('offcanvas-open');
}

// Main Menu Toggler
offcanvasTogglers.forEach(function (toggler) {
  toggler.addEventListener("click", function (e) {
    e.stopPropagation();
    if (offcanvas.classList.contains('active')) {
      closeOffcanvas();
    } else {
      openOffcanvas(offcanvas);
    }
  });
});

// Cart Drawer Toggler
if (cartTrigger && cartOffcanvas) {
  cartTrigger.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    openOffcanvas(cartOffcanvas);
  });
}

// Cart Close Buttons
cartCloseBtns.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    closeOffcanvas();
  });
});

// Backdrop click event
if (backdrop) {
  backdrop.addEventListener('click', closeOffcanvas);
}

// Close on escape key
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    if (offcanvas.classList.contains('active') || (cartOffcanvas && cartOffcanvas.classList.contains('active'))) {
      closeOffcanvas();
    }
  }
});

// Close when clicking on nav links (optional)
const navLinks = offcanvas.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', closeOffcanvas);
});

// Hero parallax effect
window.addEventListener('scroll', function () {
  const hero = document.querySelector('section.hero');
  const scrolled = window.pageYOffset;

  // Calculate opacity (fade out as you scroll)
  const opacity = 1 - (scrolled / 1000); // Adjust 500 to control fade speed

  // Calculate translateY (move down at half speed of scroll)
  const translateY = scrolled * 0.5;

  // Apply transforms
  hero.style.opacity = Math.max(0, opacity); // Don't go below 0
  hero.style.transform = `translateY(${translateY}px)`;
});

// Steak parallax effect - moves UP on scroll
const steakImg = document.getElementById('steak-img');

if (steakImg) {
  const section = steakImg.closest('section');
  let ticking = false;

  function updateSteakParallax() {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    const windowHeight = window.innerHeight;

    // Only animate when section is in viewport
    if (sectionTop < windowHeight && sectionTop + rect.height > 0) {
      // Calculate scroll progress through the section
      const scrollProgress = (windowHeight - sectionTop) / (windowHeight + rect.height);

      // Move UP as you scroll (negative translateY)
      // Adjust the multiplier (150) to control movement distance
      const translateY = -200 + scrollProgress * 300;

      steakImg.style.transform = `translateY(${translateY}px)`;
      steakImg.style.transition = 'transform 0.1s ease-out';
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateSteakParallax);
      ticking = true;
    }
  });

  // Initial position
  updateSteakParallax();
}




// cookie banner


const cookieAccept = document.getElementById('cookie-accept');
if (cookieAccept) {
  cookieAccept.addEventListener('click', () => {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'none';
  });
}





// CART MANAGMENT

// Initialize Cart Manager
let cartManager;

document.addEventListener('DOMContentLoaded', function () {

  // Initialize Cart Manager
  cartManager = new CartManager();
  cartManager.initializeExistingCartItems();
});

// Cart Manager Class
class CartManager {
  constructor() {
    this.cart = this.loadCart();
    this.updateNavCounter();
    this.initEventListeners();
  }

  // Load cart from localStorage
  loadCart() {
    const savedCart = localStorage.getItem('searAndServeCart');
    return savedCart ? JSON.parse(savedCart) : { items: [], totalItems: 0 };
  }

  // Save cart to localStorage
  saveCart() {
    localStorage.setItem('searAndServeCart', JSON.stringify(this.cart));
  }

  // Find item in cart
  findItem(productId) {
    return this.cart.items.find(item => item.id === productId);
  }

  // Add item to cart
  addItem(productId, productInfo) {
    const existingItem = this.findItem(productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.items.push({
        id: productId,
        name: productInfo.name,
        price: productInfo.price,
        image: productInfo.image,
        quantity: 1
      });
    }

    this.cart.totalItems += 1;
    this.saveCart();
    this.updateNavCounter();
    return this.findItem(productId).quantity;
  }

  // Remove item from cart
  removeItem(productId) {
    const itemIndex = this.cart.items.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      const item = this.cart.items[itemIndex];
      this.cart.totalItems -= item.quantity;
      this.cart.items.splice(itemIndex, 1);
      this.saveCart();
      this.updateNavCounter();
      return 0;
    }
    return 0;
  }

  // Update item quantity
  updateQuantity(productId, change) {
    const item = this.findItem(productId);
    if (!item) return 0;

    const newQuantity = item.quantity + change;

    if (newQuantity <= 0) {
      return this.removeItem(productId);
    } else {
      this.cart.totalItems += change;
      item.quantity = newQuantity;
      this.saveCart();
      this.updateNavCounter();
      return newQuantity;
    }
  }

  // Update navigation counter
  updateNavCounter() {
    const counter = document.getElementById('cart-counter');
    if (counter) {
      counter.textContent = this.cart.totalItems;
      counter.style.display = this.cart.totalItems > 0 ? 'flex' : 'none';
    }
  }

  // Initialize event listeners
  initEventListeners() {
    // Event delegation for add to cart buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart-btn') ||
        e.target.closest('.add-to-cart-btn')) {
        e.preventDefault();
        const btn = e.target.classList.contains('add-to-cart-btn') ?
          e.target : e.target.closest('.add-to-cart-btn');
        this.handleAddToCart(btn);
      }

      // Handle plus button clicks
      if (e.target.classList.contains('plus-btn') ||
        e.target.closest('.plus-btn')) {
        const btn = e.target.classList.contains('plus-btn') ?
          e.target : e.target.closest('.plus-btn');
        this.handlePlusClick(btn);
      }

      // Handle minus button clicks
      if (e.target.classList.contains('minus-btn') ||
        e.target.closest('.minus-btn')) {
        const btn = e.target.classList.contains('minus-btn') ?
          e.target : e.target.closest('.minus-btn');
        this.handleMinusClick(btn);
      }
    });
  }

  // Handle add to cart button click
  handleAddToCart(button) {
    const productId = button.getAttribute('data-product-id');
    const productInfo = {
      name: button.getAttribute('data-product-name'),
      price: parseFloat(button.getAttribute('data-product-price')),
      image: button.getAttribute('data-product-image')
    };

    const newQuantity = this.addItem(productId, productInfo);
    this.transformToButtonGroup(button, productId, newQuantity);
  }

  // Handle plus button click
  handlePlusClick(button) {
    const productId = button.getAttribute('data-product-id');
    const newQuantity = this.updateQuantity(productId, 1);
    this.updateButtonGroup(button.closest('.cart-btn-group'), newQuantity);
  }

  // Handle minus button click
  handleMinusClick(button) {
    const productId = button.getAttribute('data-product-id');
    const buttonGroup = button.closest('.cart-btn-group');
    const currentQuantity = parseInt(buttonGroup.querySelector('.quantity').textContent);

    if (currentQuantity === 1) {
      // Remove item completely
      this.removeItem(productId);
      this.revertToAddButton(buttonGroup, productId);
    } else {
      // Decrement quantity
      const newQuantity = this.updateQuantity(productId, -1);
      this.updateButtonGroup(buttonGroup, newQuantity);
    }
  }

  // Transform "Buy Now" button to button group
  transformToButtonGroup(button, productId, quantity) {
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'cart-btn-group';
    buttonGroup.innerHTML = `
      <button class="minus-btn" data-product-id="${productId}">
        ${quantity === 1 ?
        '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>' :
        '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>'
      }
      </button>
      <span class="quantity">${quantity}</span>
      <button class="plus-btn" data-product-id="${productId}">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
      </button>
    `;

    button.parentNode.replaceChild(buttonGroup, button);
  }

  // Update button group with new quantity
  updateButtonGroup(buttonGroup, newQuantity) {
    const quantitySpan = buttonGroup.querySelector('.quantity');
    const minusBtn = buttonGroup.querySelector('.minus-btn');

    quantitySpan.textContent = newQuantity;

    // Update minus button icon based on quantity
    if (newQuantity === 1) {
      minusBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>';
    } else {
      minusBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>';
    }
  }

  // Revert button group back to "Add to Cart"
  revertToAddButton(buttonGroup, productId) {
    const originalButton = document.createElement('a');
    originalButton.className = 'btn btn-primary add-to-cart-btn';
    originalButton.setAttribute('data-product-id', productId);
    originalButton.setAttribute('data-product-name', buttonGroup.getAttribute('data-product-name'));
    originalButton.setAttribute('data-product-price', buttonGroup.getAttribute('data-product-price'));
    originalButton.setAttribute('data-product-image', buttonGroup.getAttribute('data-product-image'));
    originalButton.textContent = 'Add to cart';

    buttonGroup.parentNode.replaceChild(originalButton, buttonGroup);
  }

  // Initialize existing cart items on page load
  initializeExistingCartItems() {
    this.cart.items.forEach(item => {
      const addButton = document.querySelector(`.add-to-cart-btn[data-product-id="${item.id}"]`);
      if (addButton) {
        this.transformToButtonGroup(addButton, item.id, item.quantity);
      }
    });
  }
}



// PRODUCT PAGE

// ------------------------------------------------
// Responsive Gallery Controller (single DOM source)
// ------------------------------------------------

(() => {
  const mq = window.matchMedia('(min-width: 1024px)'); // Tailwind 'lg'
  const galleryEl = document.querySelector('.product-gallery');

  // If the gallery isn't on this page, do nothing
  if (!galleryEl) return;

  let tinyInstance = null;
  let lgInstance = null;

  // Initialize Tiny Slider on the same container
  function initMobileSlider() {
    if (tinyInstance || !galleryEl) return;

    // Tiny Slider expects a container whose direct children are slides.
    // Your markup is <a><img></a>, which is fine—each <a> becomes a slide.
    tinyInstance = tns({
      container: galleryEl,
      items: 1,
      gutter: 10,
      nav: true,
      controls: false,
      loop: false,
      autoplay: false,
      swipeAngle: 15,
      // Prevent resize jitter when switching breakpoints
      preventActionWhenRunning: true,
    });
  }

  function destroyMobileSlider() {
    if (!tinyInstance) return;
    tinyInstance.destroy();
    tinyInstance = null;
  }

  // Initialize lightGallery on the same container
  function initDesktopLightbox() {
    if (lgInstance || !galleryEl) return;

    lgInstance = lightGallery(galleryEl, {
      speed: 500,
      // plugins: [lgZoom, lgThumbnail], // add if imported above
      // licenseKey: '0000-0000-000-0000', // add if you use a license
      // mobileSettings: { showCloseIcon: true, download: false },
    });
  }

  function destroyDesktopLightbox() {
    if (!lgInstance) return;
    lgInstance.destroy(true);
    lgInstance = null;
  }

  // Apply the correct mode based on current breakpoint
  function applyMode() {
    const isDesktop = mq.matches;
    if (isDesktop) {
      // Desktop: stack + lightbox
      destroyMobileSlider();
      initDesktopLightbox();
    } else {
      // Mobile: slider (no lightbox to avoid tap conflict)
      destroyDesktopLightbox();
      initMobileSlider();
    }
  }

  // Initialize after DOM is ready (ensures the node exists and is visible)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyMode, { once: true });
  } else {
    applyMode();
  }

  // Re‑apply when crossing the breakpoint (no need to listen to raw resize)
  mq.addEventListener('change', applyMode);

  // --- Optional: clean up on SPA route changes ---
  // Expose a cleanup function if your app swaps pages without reload
  window.__disposeProductGallery = () => {
    destroyDesktopLightbox();
    destroyMobileSlider();
    mq.removeEventListener('change', applyMode);
  };
})();


// ACCORDION

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('.accordion-trigger');
  if (!trigger) return;

  const item = trigger.closest('.accordion-item');
  const content = item.querySelector('.accordion-content');
  const icon = trigger.querySelector('.icon');

  const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

  // Close all other accordions
  const allItems = document.querySelectorAll('.accordion-item');
  allItems.forEach(otherItem => {
    if (otherItem !== item) {
      const otherContent = otherItem.querySelector('.accordion-content');
      const otherIcon = otherItem.querySelector('.icon');
      otherContent.style.maxHeight = '0';
      otherIcon.classList.remove('icon--active');
      otherIcon.classList.add('collapsed');
    }
  });

  if (isOpen) {
    // Close current
    content.style.maxHeight = '0';
    icon.classList.remove('icon--active');
    icon.classList.add('collapsed');
  } else {
    // Open current
    content.style.maxHeight = content.scrollHeight + 'px';
    icon.classList.add('icon--active');
    icon.classList.remove('collapsed');
  }
});



// KNOW YOUR CUTS

// --- DATASETS ---
const PRIMAL_CUTS = {
  'chuck': { name: 'Chuck', desc: 'The beef chuck is a primal cut located at the shoulder and neck area of the cow, known for its rich, beefy flavor and versatile nature. While chuck cuts are generally less tender due to the muscle\'s regular use, they offer excellent flavor and are ideal for slow-cooking methods. Braising, roasting, or making stews allow the connective tissue to break down, resulting in tender, flavorful dishes. Cuts like the chuck roast or shoulder steak provide an economical choice for hearty, comforting meals that highlight the robust taste of this section.' },
  'rib': { name: 'Rib', desc: 'The beef rib is a primal cut of beef located in the midsection of the cow, encompassing some of the most flavorful and tender cuts available. Famous for its rich marbling and succulent taste, the rib section includes popular cuts such as ribeye and prime rib. These cuts are prized for their juiciness and excellent texture, making them a favorite for grilling, roasting, and slow-cooking methods. While generally more expensive, the unrivaled flavor and tenderness of rib cuts make them a top choice for special occasions and gourmet meals.' },
  'loin': { name: 'Short Loin', desc: 'The beef short loin is a primal cut located towards the middle of the cow\'s back, known for producing some of the most premium and tender cuts of beef. This section includes favorites such as T-bone and porterhouse steaks, celebrated for their perfect balance of tenderness and flavor. The short loin\'s generous marbling and delicate texture make it ideal for grilling or broiling, where quick cooking at high temperatures brings out its full flavor potential. While cuts from the short loin are among the more expensive options, their exceptional quality makes them a highly sought-after choice for steak lovers.' },
  'sirloin': { name: 'Sirloin', desc: 'The beef sirloin is a primal cut of beef located towards the back of the cow, just in front of the round and behind the loin. Known for its balance between tenderness and flavor, the sirloin includes a range of cuts that vary in fat content and texture. While more tender than the round, the sirloin is slightly less tender than the rib or loin sections but offers excellent flavor. It is a versatile choice that can be prepared using various cooking methods, making it a popular and moderately priced option for many beef enthusiasts.' },
  'round': { name: 'Round', desc: 'The beef round is a primal cut of beef taken from the rear leg and rump of the cow. As these muscles are heavily used for movement, cuts from the round are generally very lean and less tender than cuts from other parts of the animal. This makes them a more economical option, but they require specific cooking methods to achieve tenderness and flavor.' },
  'brisket': { name: 'Brisket', desc: 'Lower chest. Tough, needs slow cooking.' },
  'plate': { name: 'Short Plate', desc: 'The beef short plate is a primal cut of beef located on the underside of the cow, just below the rib section. This area is known for its rich, beefy flavor and contains cuts with varying degrees of fat and marbling. While the short plate is not as tender as some other sections, its robust taste makes it ideal for slow-cooking methods such as braising or smoking. This cut includes favorites like short ribs and skirt steak, which are particularly well-suited for grilling or barbecuing, delivering a satisfying and flavorful dining experience.' },
  'flank': { name: 'Flank', desc: 'The beef flank is a primal cut of beef taken from the abdominal muscles of the cow, located just below the loin. Known for its long, flat shape, the flank is lean and offers robust flavor, though it is somewhat less tender compared to other cuts. To make the most of its flavor and texture, the flank is best prepared using methods like marinating and grilling or broiling, followed by slicing against the grain for maximum tenderness. This economical cut is a favorite for dishes like fajitas and stir-fries, where its rich taste can truly shine.' },
  'shank': { name: 'Shank', desc: 'The beef shank is a primal cut taken from the front leg of the cow, known for its rich connective tissue and robust flavor. Due to the extensive muscle use in this area, fore shank meat is typically very lean and requires slow, moist cooking methods to achieve tenderness. Ideal for braising or making soups, the fore shank releases its rich, beefy flavor over extended cooking periods, resulting in deliciously hearty dishes. While not as commonly chosen for quick cooking, it offers an economical choice for flavorful slow-cooked meals.' },
  'oxtail': { name: 'Oxtail', desc: 'The Oxtail is a gelatin-rich cut from the tail of the cow. Known for its immense flavor and high collagen content, it is perfect for slow-cooking methods like braising, soups, and stews, creating rich, thick textures.' }
};

const RETAIL_CUTS = [
  // SOLD ITEMS (Added 'link' property, removed 'price')
  { id: 'ribeye', name: 'Ribeye Steak', primal: 'rib', isSold: true, link: '/pages/shop.html', tags: ['Marbled', 'Rich'], desc: 'The steak lover’s steak. Rich, juicy, and full-flavored with generous marbling throughout. We offer a 100% Grass-Fed Beef Ribeye.' },
  { id: 'strip', name: 'NY Strip', primal: 'loin', isSold: true, link: '/pages/shop.html', tags: ['Balanced', 'Classic'], desc: 'A steakhouse classic. Tighter texture than Ribeye but with intense beefy flavor.' },
  { id: 'tri_tip', name: 'Tri-Tip', primal: 'sirloin', isSold: true, link: '/pages/shop.html', tags: ['Roast', 'Popular'], desc: 'A triangular cut from the bottom sirloin. Famous in California BBQ. We offer a 100% Grass-Fed Beef Tri-Tip.' },
  { id: 'brisket_flat', name: 'Brisket', primal: 'brisket', isSold: true, link: '/pages/shop.html', tags: ['BBQ', 'Fatty'], desc: 'The king of BBQ. Requires low and slow cooking. Try our Traditional Brisket Bites.' },
  { id: 'short_ribs', name: 'Short Ribs', primal: 'plate', isSold: true, link: '/pages/shop.html', tags: ['Rich', 'Fall-off-bone'], desc: 'Deeply flavorful and incredibly tender. We offer both Bone-In Beef Short Rib and 72-Hour Beef Short Rib.' },

  // INFO ONLY ITEMS (Not Sold)
  { id: 'filet', name: 'Filet Mignon', primal: 'loin', price: '-', isSold: false, tags: ['Tender', 'Lean'], desc: 'The most tender cut of beef. Lean yet succulent, with a mild, buttery texture.' },
  { id: 'tbone', name: 'T-Bone', primal: 'loin', price: '-', isSold: false, tags: ['Bone-In', 'Iconic'], desc: 'The best of both worlds: NY Strip on one side, Tenderloin on the other.' },
  { id: 'porterhouse', name: 'Porterhouse', primal: 'loin', price: '-', isSold: false, tags: ['Huge', 'Bone-In'], desc: 'A larger version of the T-Bone with a bigger portion of the tenderloin filet.' },
  { id: 'flatiron', name: 'Flat Iron', primal: 'chuck', price: '-', isSold: false, tags: ['Value', 'Tender'], desc: 'Surprisingly tender and well-marbled. A modern favorite for its value and flavor.' },
  { id: 'skirt', name: 'Skirt Steak', primal: 'plate', price: '-', isSold: false, tags: ['Flavorful', 'Thin'], desc: 'Long, flat cut with deep flavor. Perfect for fajitas or carne asada.' },
  { id: 'flank_steak', name: 'Flank Steak', primal: 'flank', price: '-', isSold: false, tags: ['Lean', 'Intense'], desc: 'Very lean and full of flavor. Best marinated and sliced thin against the grain.' },
  { id: 'top_sirloin', name: 'Top Sirloin', primal: 'sirloin', price: '-', isSold: false, tags: ['Lean', 'Versatile'], desc: 'A versatile, affordable weeknight steak with good flavor and moderate tenderness.' },
  { id: 'eye_round', name: 'Eye of Round', primal: 'round', price: '-', isSold: false, tags: ['Lean', 'Budget'], desc: 'Very lean. Best roasted rare and sliced thin, or braised.' },
  { id: 'tomahawk', name: 'Tomahawk Ribeye', primal: 'rib', price: '-', isSold: false, tags: ['Showstopper', 'Bone-In'], desc: 'Essentially a Ribeye with at least 5 inches of rib bone left intact. The ultimate presentation.' },
  { id: 'denver', name: 'Denver Steak', primal: 'chuck', price: '-', isSold: false, tags: ['Marbled', 'Value'], desc: 'A hidden gem from the chuck. heavily marbled and surprisingly tender.' }
];

// --- STATE ---
const state = {
  selectedPrimal: null,
  selectedSteak: null
};

// --- DOM ELEMENTS ---
const els = {
  cowShapes: document.querySelectorAll('.primal-shape'),
  searchInput: document.getElementById('steak-search'),
  searchDropdown: document.getElementById('search-dropdown'),
  buttonsGrid: document.getElementById('steak-buttons-grid'),
  primalTitle: document.getElementById('selected-primal-title'),
  primalDesc: document.getElementById('primal-desc'),
  detailsPane: document.getElementById('details-pane'),
  detailName: document.getElementById('detail-name'),
  // detailPrimal: document.getElementById('detail-primal'),
  detailDesc: document.getElementById('detail-desc'),
  detailTags: document.getElementById('detail-tags'),
  shopBtn: document.getElementById('shop-btn')
};

// --- INIT ---
function init() {
  // Safety check: if we aren't on the cuts page, stop.
  if (els.cowShapes.length === 0) return;

  // Cow Click Listeners
  els.cowShapes.forEach(shape => {
    shape.addEventListener('click', () => handlePrimalClick(shape.dataset.primal));
  });

  // Search Listeners
  if (els.searchInput) {
    els.searchInput.addEventListener('keyup', handleSearch);
    els.searchInput.addEventListener('focus', handleSearch);
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (els.searchInput && !els.searchInput.contains(e.target) && !els.searchDropdown.contains(e.target)) {
      els.searchDropdown.classList.add('hidden');
    }
  });

  // PRESELECT SIRLOIN
  handlePrimalClick('sirloin', { shouldScroll: false });
}

// --- HELPER ---
function scrollToElement(element) {
  // Small delay to allow DOM to update (e.g. removing 'hidden' class)
  setTimeout(() => {
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

// --- HANDLERS ---

function handlePrimalClick(primalId, options = {}) {
  const { shouldScroll = true } = options;
  state.selectedPrimal = primalId;
  state.selectedSteak = null; // Reset selected steak

  // 1. Highlight Cow
  els.cowShapes.forEach(s => {
    if (s.dataset.primal === primalId) s.classList.add('active');
    else s.classList.remove('active');
  });

  // 2. Update Buttons Grid
  renderButtons(RETAIL_CUTS.filter(cut => cut.primal === primalId), PRIMAL_CUTS[primalId].name);

  // 3. Reset Details Pane (Hide it)
  els.detailsPane.classList.add('hidden');
  els.detailsPane.classList.remove('flex');

  // 4. Scroll to buttons (Mobile UX improvement)
  if (window.innerWidth < 1024 && shouldScroll) { // Only scroll on mobile/tablet
    scrollToElement(els.buttonsGrid);
  }
}

function handleSteakClick(cut) {
  state.selectedSteak = cut;

  // 1. Highlight Button
  document.querySelectorAll('.steak-btn').forEach(btn => {
    if (btn.dataset.id === cut.id) {
      btn.classList.remove('bg-transparent', 'text-gray-300', 'border-white/30');
      btn.classList.add('bg-red-700', 'text-white', 'border-red-500');
    } else {
      btn.classList.add('bg-transparent', 'text-gray-300', 'border-white/30');
      btn.classList.remove('bg-red-700', 'text-white', 'border-red-500');
    }
  });

  // 2. Show Details
  renderDetails(cut);

  // 3. Ensure Cow Context is correct (if searching)
  if (cut.primal !== state.selectedPrimal) {
    handlePrimalClick(cut.primal, { shouldScroll: false }); // Sync the cow map without jumping
  }

  // 4. Scroll to Details (Mobile UX improvement)
  if (window.innerWidth < 1024) {
    scrollToElement(els.detailsPane);
  }
}

function handleSearch(e) {
  const term = e.target.value.toLowerCase();

  if (term.length < 1) {
    els.searchDropdown.classList.add('hidden');
    return;
  }

  const matches = RETAIL_CUTS.filter(cut => cut.name.toLowerCase().includes(term));
  renderDropdown(matches);
}

// --- RENDERERS ---

function renderButtons(cuts, primalName) {
  // Show Title
  els.primalTitle.textContent = `Cuts from the ${primalName}`;
  els.primalTitle.classList.remove('hidden');

  // Show Description (New Logic)
  // We need to find the primal key based on the name or pass the key directly.
  // It's cleaner to update the function signature in handlePrimalClick to pass both ID and Name, 
  // or just look it up here. Since we have state.selectedPrimal, we use that.
  if (state.selectedPrimal && PRIMAL_CUTS[state.selectedPrimal]) {
    els.primalDesc.textContent = PRIMAL_CUTS[state.selectedPrimal].desc;
    els.primalDesc.classList.remove('hidden');
  }

  els.buttonsGrid.innerHTML = '';

  if (cuts.length === 0) {
    els.buttonsGrid.innerHTML = '<p class="text-gray-500 italic">No specific cuts listed for this region yet.</p>';
    return;
  }

  cuts.forEach(cut => {
    const btn = document.createElement('button');
    // Base classes
    btn.className = 'cursor-pointer steak-btn px-4 py-2 border border-white/30 rounded-full text-sm lg:text-lg font-medium text-gray-300 transition-all hover:border-red-500 hover:text-white mb-2';
    btn.dataset.id = cut.id;
    btn.textContent = cut.name;

    // Check if already selected
    if (state.selectedSteak && state.selectedSteak.id === cut.id) {
      btn.classList.remove('bg-transparent', 'text-gray-300', 'border-white/30');
      btn.classList.add('bg-red-700', 'text-white', 'border-red-500');
    }

    btn.onclick = () => handleSteakClick(cut);
    els.buttonsGrid.appendChild(btn);
  });
}

function renderDetails(cut) {
  els.detailsPane.classList.remove('hidden');
  els.detailsPane.classList.add('flex');

  els.detailName.textContent = cut.name;
  // els.detailPrimal.textContent = PRIMAL_CUTS[cut.primal].name;
  // Price rendering line removed
  els.detailDesc.textContent = cut.desc;

  // Toggle Shop Button and set Link
  if (cut.isSold) {
    els.shopBtn.classList.remove('hidden');
    els.shopBtn.href = cut.link || '/pages/shop.html';
  } else {
    els.shopBtn.classList.add('hidden');
    els.shopBtn.href = '#';
  }

  // Render Tags
  els.detailTags.innerHTML = cut.tags.map(tag =>
    `<h6 class="inline bg-beige px-2 py-1 rounded text-xs uppercase tracking-wider">${tag}</h6>`
  ).join('');
}

function renderDropdown(matches) {
  els.searchDropdown.innerHTML = '';
  if (matches.length === 0) {
    els.searchDropdown.classList.add('hidden');
    return;
  }

  matches.forEach(cut => {
    const li = document.createElement('li');
    li.className = 'px-5 py-3 hover:bg-white/10 cursor-pointer border-b border-white/5 flex justify-between items-center text-white transition-colors';
    li.innerHTML = `
                    <span>${cut.name}</span>
                    <span class="text-xs text-gray-500 uppercase bg-black px-2 py-1 rounded">${PRIMAL_CUTS[cut.primal].name}</span>
                `;
    li.onclick = () => {
      els.searchInput.value = cut.name; // Fill input
      els.searchDropdown.classList.add('hidden'); // Hide dropdown
      handleSteakClick(cut); // Trigger selection
    };
    els.searchDropdown.appendChild(li);
  });

  els.searchDropdown.classList.remove('hidden');
}

// Run
init();


// --- PAGE TRANSITION LOADER ---
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('page-loader');

  // 1. Enter Animation (Fade Out)
  // Small delay to ensure browser render is stable
  setTimeout(() => {
    if (loader) loader.classList.add('loader-hidden');
  }, 100);

  // 2. Exit Animation (Fade In on Click)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');

    // Safety checks to ignore non-navigational clicks
    if (!link) return;
    if (link.target === '_blank') return;           // Ignore new tabs
    if (link.getAttribute('href').startsWith('#')) return; // Ignore anchors
    if (link.getAttribute('href').startsWith('mailto')) return;
    if (link.getAttribute('href').startsWith('tel')) return;
    if (e.ctrlKey || e.metaKey) return;             // Ignore ctrl/cmd+click

    // Check if it's a "Shop" or "Add to Cart" button that might use JS instead of nav
    // (Optional: add specific class checks if your cart buttons are <a> tags)

    const href = link.getAttribute('href');

    // If it is a valid internal link
    if (href && !href.startsWith('javascript')) {
      e.preventDefault();

      // Show curtain
      if (loader) loader.classList.remove('loader-hidden');

      // Wait for animation then navigate
      setTimeout(() => {
        window.location.href = href;
      }, 500); // Matches CSS duration
    }
  });
});
