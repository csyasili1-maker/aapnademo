import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BadgeIndianRupee,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Gauge,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Menu,
  Minus,
  PackageCheck,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Trash2,
  Truck,
  User,
  Users,
  X
} from "lucide-react";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: "LM-01", name: "Lemon & Mint Makhana", type: "Roasted", price: 149, stock: 84, rating: 4.8, img: "/assets/Products-transparent/Products1.png", tag: "Fresh Zing", desc: "Tangy lemon zest with refreshing mint in every crunchy bite." },
  { id: "KP-02", name: "Makhana Kheer Premix", type: "Instant Dessert", price: 199, stock: 42, rating: 4.7, img: "/assets/Products-transparent/Products2.png", tag: "Sugar-Free", desc: "Traditional creamy kheer experience with premium makhana." },
  { id: "PP-03", name: "Peri Peri Makhana", type: "Roasted", price: 159, stock: 67, rating: 4.9, img: "/assets/Products-transparent/Products3.png", tag: "Spicy", desc: "Bold peri peri spices blended with crunchy roasted fox nuts." },
  { id: "CO-04", name: "Cream & Onion Makhana", type: "Roasted", price: 159, stock: 51, rating: 4.8, img: "/assets/Products-transparent/Products4.png", tag: "Creamy", desc: "Creamy richness and savory onion flavor in a light snack." },
  { id: "TT-05", name: "Tangy Tomato Makhana", type: "Roasted", price: 149, stock: 90, rating: 4.9, img: "/assets/Products-transparent/Products5.png", tag: "Best Seller", desc: "Zesty tomato flavor, roasted crunch and guilt-free snacking." },
  { id: "SP-06", name: "Salt & Pepper Makhana", type: "Roasted", price: 139, stock: 120, rating: 4.6, img: "/assets/Products-transparent/Products6.png", tag: "Classic", desc: "Simple, classic and perfectly seasoned for everyday munching." },
  { id: "MP-07", name: "Mint Pudina Makhana", type: "Roasted", price: 149, stock: 73, rating: 4.7, img: "/assets/Products-transparent/Products7.png", tag: "Cool Mint", desc: "Refreshing pudina flavor for tea-time, travel and cravings." },
  { id: "HS-08", name: "Handpicked 6 Sutta+", type: "Raw Grade", price: 399, stock: 33, rating: 4.9, img: "/assets/Products-transparent/Products8.png", tag: "Premium Grade", desc: "Extra-large handpicked makhana for fasting, kheer and bulk." },
  { id: "RS-09", name: "Premium 4 Sutta+ Ratio", type: "Raw Grade", price: 299, stock: 57, rating: 4.7, img: "/assets/Products-transparent/Products9.png", tag: "Ratio Mix", desc: "Balanced grade mix for roasting and traditional recipes." },
  { id: "FS-10", name: "Premium 4.5 Sutta+", type: "Raw Grade", price: 349, stock: 46, rating: 4.8, img: "/assets/Products-transparent/Products10.png", tag: "Clean Pick", desc: "Superior size, crisp texture and reliable purity." },
  { id: "PS-11", name: "Premium 5 Sutta+ Grade", type: "Raw Grade", price: 379, stock: 39, rating: 4.9, img: "/assets/Products-transparent/Products11.png", tag: "Exporter Pick", desc: "Extra-large grade for premium retail and export orders." }
];

const orders = [
  { id: "AMK-2149", customer: "Aarav Mehta", total: 1298, status: "Packed", payment: "Demo UPI", city: "Patna", items: 6 },
  { id: "AMK-2150", customer: "Riya Sharma", total: 698, status: "Delivered", payment: "Demo Card", city: "Delhi", items: 3 },
  { id: "AMK-2151", customer: "Neel Verma", total: 2095, status: "Processing", payment: "Demo Wallet", city: "Mumbai", items: 8 },
  { id: "AMK-2152", customer: "Kavya Singh", total: 1590, status: "Bulk Quote", payment: "Pending", city: "Bengaluru", items: 12 }
];

const users = [
  { name: "Aarav Mehta", role: "Retail Buyer", spend: 12980, loyalty: "Gold" },
  { name: "Riya Sharma", role: "Distributor", spend: 48900, loyalty: "Platinum" },
  { name: "Neel Verma", role: "Export Lead", spend: 74500, loyalty: "Enterprise" },
  { name: "Kavya Singh", role: "Cafe Partner", spend: 22300, loyalty: "Gold" }
];

const campaigns = [
  { title: "Tangy Tomato launch", value: "₹1.8L", trend: "+24%" },
  { title: "Bihar wholesale drive", value: "42 leads", trend: "+18%" },
  { title: "Fasting season combo", value: "318 carts", trend: "+31%" }
];

const demoLogins = [
  { name: "Aarav Buyer", email: "buyer@aapna.demo", role: "Retail Buyer", badge: "Gold customer" },
  { name: "Riya Distributor", email: "distributor@aapna.demo", role: "Distributor", badge: "B2B account" },
  { name: "Neel Export Lead", email: "export@aapna.demo", role: "Export Lead", badge: "Export pipeline" }
];

const adminLogin = { name: "Aapna Admin", email: "admin@aapna.demo", role: "Admin", badge: "Control room" };

const seoMetrics = [
  { label: "Organic clicks", value: "18.4K", trend: "+32%", note: "Last 30 days" },
  { label: "Keyword rank", value: "#3", trend: "+5 spots", note: "premium makhana Bihar" },
  { label: "CTR", value: "7.8%", trend: "+1.2%", note: "Search campaigns" },
  { label: "Core Web Vitals", value: "94", trend: "Good", note: "Demo score" }
];

function App() {
  const [page, setPage] = useState(() => window.location.pathname === "/admin" ? "admin" : "home");
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [checkoutStep, setCheckoutStep] = useState("cart");
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const cartTotal = useMemo(() => cart.reduce((sum, line) => sum + line.price * line.qty, 0), [cart]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".shell-reveal", { opacity: 0, y: 24, duration: 0.8, stagger: 0.08, ease: "power3.out" });
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 36 }, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" }
        });
      });
      gsap.to(".float-pack.one", { y: -24, rotate: 3, repeat: -1, yoyo: true, duration: 3.4, ease: "sine.inOut" });
      gsap.to(".float-pack.two", { y: 20, rotate: -4, repeat: -1, yoyo: true, duration: 3.8, ease: "sine.inOut" });
      gsap.utils.toArray(".real-makhana").forEach((el, index) => {
        gsap.to(el, {
          x: index % 2 ? "-115vw" : "115vw",
          rotate: index % 2 ? -520 : 520,
          ease: "none",
          scrollTrigger: { trigger: ".motion-strip", start: "top bottom", end: "bottom top", scrub: 1 + index * 0.2 }
        });
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const track = document.querySelector(".product-track");
        const section = document.querySelector(".featured-scroll");
        if (!track || !section) return;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 110);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight}`,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      });
    });
    return () => ctx.revert();
  }, [page]);

  const navigate = (target) => {
    if (target === "dashboard" && !user) {
      setAuthMode("login");
      setLoginOpen(true);
      setMobileOpen(false);
      return;
    }
    if (target === "auth") {
      setAuthMode("login");
      setLoginOpen(true);
      setMobileOpen(false);
      return;
    }
    if (target === "admin") {
      window.history.pushState(null, "", "/admin");
      setPage("admin");
      setLoginOpen(false);
      setMobileOpen(false);
      setCartOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (window.location.pathname === "/admin") {
      window.history.pushState(null, "", "/");
    }
    setLoginOpen(false);
    setCartOpen(false);
    setPage(target);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product) => {
    setCart((current) => {
      const exists = current.find((item) => item.id === product.id);
      if (exists) return current.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...current, { ...product, qty: 1 }];
    });
    setToast(`${product.name} added to cart`);
    setCartOpen(true);
    window.setTimeout(() => setToast(null), 1800);
  };

  const updateQty = (id, delta) => {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
    );
  };

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const submitAuth = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setUser({
      name: form.get("name") || "Aapna Buyer",
      email: form.get("email") || "buyer@aapnamakhana.com",
      role: form.get("role") || "Customer"
    });
    setLoginOpen(false);
    setPage("dashboard");
  };

  const loginAsDemo = (account) => {
    setUser(account);
    setLoginOpen(false);
    setPage("dashboard");
    if (window.location.pathname === "/admin") window.history.pushState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loginAsAdmin = () => {
    setAdminUser(adminLogin);
  };

  const payNow = () => {
    setPaymentStatus("processing");
    setTimeout(() => {
      setPaymentStatus("success");
      setCheckoutStep("success");
    }, 1200);
  };

  return (
    <div>
      {page !== "admin" && (
        <>
          <Topbar />
          <Header
            page={page}
            user={user}
            cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            navigate={navigate}
            openCart={() => setCartOpen(true)}
            openLogin={() => setLoginOpen(true)}
            logout={() => { setUser(null); setPage("home"); }}
          />
        </>
      )}

      {page === "home" && <Home addToCart={addToCart} navigate={navigate} />}
      {page === "shop" && <Shop addToCart={addToCart} navigate={navigate} />}
      {page === "dashboard" && <Dashboard user={user} navigate={navigate} />}
      {page === "checkout" && <Checkout cart={cart} total={cartTotal} step={checkoutStep} setStep={setCheckoutStep} paymentStatus={paymentStatus} payNow={payNow} navigate={navigate} />}
      {page === "admin" && <AdminRoute adminUser={adminUser} loginAsAdmin={loginAsAdmin} navigate={navigate} />}

      <LoginModal
        open={loginOpen}
        close={() => setLoginOpen(false)}
        authMode={authMode}
        setAuthMode={setAuthMode}
        submitAuth={submitAuth}
        loginAsDemo={loginAsDemo}
      />
      <CartDrawer
        open={cartOpen}
        cart={cart}
        total={cartTotal}
        close={() => setCartOpen(false)}
        updateQty={updateQty}
        removeFromCart={removeFromCart}
        navigate={navigate}
      />
      {toast && <div className="cart-toast"><CheckCircle2 size={18} /> {toast}</div>}
      {page !== "admin" && <Footer navigate={navigate} />}
    </div>
  );
}

function Topbar() {
  return (
    <div className="topbar">
      <div className="ticker">
        <span>Premium makhana from Bihar</span>
        <span>FSSAI licensed: 10021064000284</span>
        <span>Retail, bulk and export ready</span>
        <span>Demo payment gateway enabled</span>
      </div>
    </div>
  );
}

function Header({ page, user, cartCount, mobileOpen, setMobileOpen, navigate, openCart, openLogin, logout }) {
  const nav = [
    ["home", "Home"],
    ["shop", "Shop"],
    ["dashboard", "Dashboard"]
  ];
  return (
    <header className="app-header shell-reveal">
      <button className="brand" onClick={() => navigate("home")} aria-label="Go home">
        <img src="/assets/logo-transparent.png" alt="Aapna Makhana" />
      </button>
      <nav className={`nav ${mobileOpen ? "open" : ""}`}>
        {nav.map(([id, label]) => (
          <button key={id} className={page === id ? "active" : ""} onClick={() => navigate(id)}>{label}</button>
        ))}
        <button className="cart-nav-button" onClick={openCart}>
          <ShoppingBag size={17} /> Cart {cartCount ? <b>{cartCount}</b> : null}
        </button>
      </nav>
      <div className="header-actions">
        <button className="cart-pill" onClick={openCart} aria-label="Open cart">
          <ShoppingBag size={18} />
          {cartCount ? <span>{cartCount}</span> : null}
        </button>
        {user ? (
          <button className="icon-text" onClick={logout}><LogOut size={18} /> Logout</button>
        ) : (
          <button className="icon-text" onClick={openLogin}><Lock size={18} /> Login</button>
        )}
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function Home({ addToCart, navigate }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy shell-reveal">
          <p className="eyebrow">Delicious moments, perfectly roasted</p>
          <h1>From quick bites to premium Bihar makhana.</h1>
          <p>Handpicked fox nuts, roasted flavors, raw grades and healthy dessert mixes served through a rich demo shopping experience.</p>
          <div className="hero-actions">
            <button className="btn primary" onClick={() => navigate("shop")}>View products <ChevronRight size={18} /></button>
            <button className="btn lime" onClick={() => navigate("dashboard")}>My account</button>
          </div>
          <div className="review-ribbon">
            <div className="avatar-stack"><span>A</span><span>M</span><span>K</span></div>
            <div><strong>4.9 / 5</strong><small>Based on 426 demo reviews</small></div>
          </div>
          <div className="hero-badges">
            <span>100% natural</span>
            <span>FSSAI licensed</span>
            <span>Bulk ready</span>
          </div>
        </div>
        <div className="hero-visual shell-reveal">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/generated-makhana-hero.png"
            aria-label="Aapna Makhana background video"
          >
            <source src="/assets/video/hero-makhana.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" aria-hidden="true"></div>
          <img className="float-pack one" src="/assets/Products-transparent/Products5.png" alt="Tangy Tomato Makhana" />
          <img className="float-pack two" src="/assets/Products-transparent/Products7.png" alt="Mint Makhana" />
        </div>
      </section>

      <TopCategories navigate={navigate} />

      <WhyChoose />

      <section className="motion-strip" aria-hidden="true">
        <img className="real-makhana real-one" src="/assets/makhana-real.png" alt="" />
        <img className="real-makhana real-two" src="/assets/makhana-real.png" alt="" />
        <img className="real-makhana real-three" src="/assets/makhana-real.png" alt="" />
      </section>

      <FeaturedScroll addToCart={addToCart} />

      <SignatureGrid addToCart={addToCart} navigate={navigate} />

      <section className="story-section restaurant-story reveal">
        <div>
          <p className="eyebrow green">20+ years of regional sourcing craft</p>
          <h2>Fresh, flavorful makhana packed with care, crunch and consistency.</h2>
          <p>Inspired by Bihar's finest fox nut regions, Aapna Makhana brings clean sourcing, modern processing and snack-ready packaging for homes, retailers and distributors.</p>
          <div className="mission-grid">
            <div><ShieldCheck /><h3>Our Mission</h3><p>Deliver hygienic, crunchy makhana that makes healthy snacking easy.</p></div>
            <div><Sparkles /><h3>Our Vision</h3><p>Become a trusted makhana brand for retail, bulk and export buyers.</p></div>
          </div>
        </div>
        <div className="story-stack">
          <img src="/assets/banner.png" alt="Aapna Makhana collection" />
          <img src="/assets/banner2.png" alt="Best of Aapna Makhana" />
        </div>
      </section>

      <TastyMenu addToCart={addToCart} />

      <TestimonialBand />
    </main>
  );
}

function TopCategories({ navigate }) {
  const categories = [
    { title: "Roasted Flavors", text: "Tea-time packs with tangy, minty and spicy crunch.", img: "/assets/Products-transparent/Products5.png" },
    { title: "Raw Grades", text: "4, 4.5, 5 and 6 Sutta+ premium fox nuts.", img: "/assets/Products-transparent/Products8.png" },
    { title: "Dessert Mix", text: "Sugar-free kheer premix for quick traditional sweetness.", img: "/assets/Products-transparent/Products2.png" },
    { title: "Bulk Supply", text: "Distributor, retail shelf and export-ready mock supply.", img: "/assets/makhanas.png" }
  ];
  return (
    <section className="category-showcase">
      <div className="section-title-block reveal">
        <p className="eyebrow green">Top Categories</p>
        <h2>Explore carefully curated makhana collections.</h2>
        <p>Fresh packs, premium grades and signature flavors for everyday snacking.</p>
      </div>
      <div className="category-grid">
        {categories.map((category) => (
          <button className="category-tile reveal" key={category.title} onClick={() => navigate("shop")}>
            <img src={category.img} alt={category.title} />
            <h3>{category.title}</h3>
            <p>{category.text}</p>
            <span>Explore <ChevronRight size={16} /></span>
          </button>
        ))}
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="why-section">
      <div className="why-visual reveal">
        <img src="/assets/aapnamakhana.png" alt="Aapna Makhana facility" />
        <div className="experience-card"><strong>4.9</strong><span>customer rating</span></div>
      </div>
      <div className="why-content reveal">
        <p className="eyebrow green">Why choose us</p>
        <h2>Quality ingredients, modern process, memorable crunch.</h2>
        <div className="why-list">
          <Panel icon={<ShieldCheck />} title="Fresh Sourcing" text="Direct Bihar sourcing for clean taste and consistent quality." />
          <Panel icon={<PackageCheck />} title="Premium Grading" text="Handpicked sizes and raw grades for retail and bulk needs." />
          <Panel icon={<Truck />} title="Fast Supply" text="Demo fulfillment flows for retail, distributor and export orders." />
          <Panel icon={<CreditCard />} title="Easy Checkout" text="Cart drawer, demo payment and dashboard-ready order journeys." />
        </div>
      </div>
    </section>
  );
}

function SignatureGrid({ addToCart, navigate }) {
  return (
    <section className="signature-section">
      <div className="section-title-block center reveal">
        <p className="eyebrow green">Our signature packs</p>
        <h2>Handcrafted flavors made with premium fox nuts.</h2>
        <p>Shop the hero products or open the full store for raw grades and bulk variants.</p>
      </div>
      <div className="signature-grid">
        {products.slice(0, 6).map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} compact />)}
      </div>
      <div className="center-action reveal">
        <button className="btn primary" onClick={() => navigate("shop")}>View all products <ChevronRight size={18} /></button>
      </div>
    </section>
  );
}

function TastyMenu({ addToCart }) {
  const menu = products.slice(6, 11);
  return (
    <section className="menu-today">
      <div className="menu-copy reveal">
        <p className="eyebrow">Tasty menu today</p>
        <h2>Premium grade makhana for recipes, fasting and roasting.</h2>
        <p>Choose from handpicked grades and pouch-ready packs with mock pricing for the shopping demo.</p>
      </div>
      <div className="menu-list reveal">
        {menu.map((item) => (
          <div className="menu-row" key={item.id}>
            <img src={item.img} alt={item.name} />
            <div><h3>{item.name}</h3><p>{item.desc}</p></div>
            <strong>Rs. {item.price}</strong>
            <button onClick={() => addToCart(item)}><Plus size={18} /></button>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialBand() {
  return (
    <section className="testimonial-band">
      <div className="section-title-block center reveal">
        <p className="eyebrow green">Loved by snackers</p>
        <h2>Healthy crunch, premium taste, repeat orders.</h2>
      </div>
      <div className="testimonial-grid">
        {["The tangy tomato pack feels fresh and premium.", "Raw grades are clean, big and perfect for kheer.", "The demo checkout and cart flow feels like a real store."].map((text, index) => (
          <article className="testimonial-card reveal" key={text}>
            <div className="stars">★★★★★</div>
            <p>{text}</p>
            <strong>{["Aarav Mehta", "Riya Sharma", "Neel Verma"][index]}</strong>
            <span>{["Retail Buyer", "Distributor", "Export Lead"][index]}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturedScroll({ addToCart }) {
  return (
    <section className="featured-scroll">
      <div className="section-head reveal">
        <p className="eyebrow green">GSAP product scroll</p>
        <h2>Products glide while you scroll.</h2>
      </div>
      <div className="product-track">
        {products.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}
      </div>
    </section>
  );
}

function Shop({ addToCart, navigate }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const types = ["All", ...new Set(products.map((p) => p.type))];
  const visible = products.filter((p) => (filter === "All" || p.type === filter) && p.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <main className="page-wrap">
      <div className="page-hero reveal">
        <p className="eyebrow">Shop panel</p>
        <h1>All makhana products.</h1>
        <p>Mock pricing is included for checkout demo. Replace values later with live Shopify/backend data.</p>
      </div>
      <div className="shop-tools reveal">
        <label><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search makhana" /></label>
        <div className="segmented">{types.map((type) => <button key={type} className={filter === type ? "active" : ""} onClick={() => setFilter(type)}>{type}</button>)}</div>
        <button className="btn primary" onClick={() => navigate("checkout")}>Go checkout</button>
      </div>
      <div className="shop-grid">
        {visible.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} compact />)}
      </div>
    </main>
  );
}

function ProductCard({ product, addToCart, compact = false }) {
  return (
    <article className={`product-card reveal ${compact ? "compact" : ""}`}>
      <div className="product-art">
        <span>{product.tag}</span>
        <img src={product.img} alt={product.name} />
      </div>
      <div className="product-info">
        <p>{product.type}</p>
        <h3>{product.name}</h3>
        <small>{product.desc}</small>
        <div className="product-meta">
          <strong>₹{product.price}</strong>
          <span><Star size={15} fill="currentColor" /> {product.rating}</span>
        </div>
        <button className="add-cart-btn" onClick={() => addToCart(product)}>
          <ShoppingBag size={18} /> Add to cart
        </button>
      </div>
    </article>
  );
}

function CartDrawer({ open, cart, total, close, updateQty, removeFromCart, navigate }) {
  return (
    <div className={`drawer-shell ${open ? "open" : ""}`} aria-hidden={!open}>
      <button className="drawer-backdrop" onClick={close} aria-label="Close cart"></button>
      <aside className="cart-drawer">
        <div className="drawer-head">
          <div>
            <p className="eyebrow green">Shopping cart</p>
            <h2>{cart.length ? `${cart.length} item${cart.length > 1 ? "s" : ""} ready` : "Your cart is empty"}</h2>
          </div>
          <button className="close-btn" onClick={close} aria-label="Close cart"><X /></button>
        </div>
        {cart.length ? (
          <>
            <div className="drawer-items">
              {cart.map((item) => (
                <div className="drawer-line" key={item.id}>
                  <img src={item.img} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>₹{item.price} · {item.type}</span>
                    <div className="qty-controls">
                      <button onClick={() => updateQty(item.id, -1)} aria-label="Decrease quantity"><Minus size={16} /></button>
                      <b>{item.qty}</b>
                      <button onClick={() => updateQty(item.id, 1)} aria-label="Increase quantity"><Plus size={16} /></button>
                    </div>
                  </div>
                  <div className="line-total">
                    <b>₹{item.price * item.qty}</b>
                    <button onClick={() => removeFromCart(item.id)} aria-label="Remove item"><Trash2 size={17} /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="price-box">
              <div><span>Subtotal</span><strong>₹{total}</strong></div>
              <div><span>Delivery</span><strong>Free</strong></div>
              <div><span>Demo savings</span><strong>-₹49</strong></div>
              <div className="grand-total"><span>Total</span><strong>₹{Math.max(total - 49, 0)}</strong></div>
            </div>
            <button className="btn primary full checkout-cta" onClick={() => navigate("checkout")}>Proceed to payment <ChevronRight size={18} /></button>
          </>
        ) : (
          <div className="empty-cart">
            <ShoppingBag size={64} />
            <p>Add roasted or premium grade makhana to see a Flipkart-style cart summary here.</p>
            <button className="btn lime full" onClick={() => navigate("shop")}>Start shopping</button>
          </div>
        )}
      </aside>
    </div>
  );
}

function LoginModal({ open, close, authMode, setAuthMode, submitAuth, loginAsDemo }) {
  return (
    <div className={`login-modal-shell ${open ? "open" : ""}`} aria-hidden={!open}>
      <button className="login-backdrop" onClick={close} aria-label="Close login"></button>
      <section className="auth-card login-modal">
        <button className="close-btn modal-close" onClick={close} aria-label="Close login"><X /></button>
        <div className="auth-art">
          <img src="/assets/girl-ads.png" alt="Aapna Makhana product model" />
          <div>
            <p className="eyebrow">Secure mock access</p>
            <h2>{authMode === "login" ? "Welcome back." : "Create your buyer account."}</h2>
            <p>Demo credentials are accepted instantly. No backend needed for this mockup.</p>
          </div>
        </div>
        <form onSubmit={submitAuth}>
          <div className="demo-login-list">
            <h3>Demo logins</h3>
            {demoLogins.map((account) => (
              <button type="button" key={account.email} onClick={() => loginAsDemo(account)}>
                <span><User size={18} /> {account.name}</span>
                <small>{account.badge}</small>
              </button>
            ))}
          </div>
          <div className="tab-row">
            <button type="button" className={authMode === "login" ? "active" : ""} onClick={() => setAuthMode("login")}>Login</button>
            <button type="button" className={authMode === "signup" ? "active" : ""} onClick={() => setAuthMode("signup")}>Signup</button>
          </div>
          {authMode === "signup" && <Field icon={<User />} name="name" placeholder="Full name" />}
          <Field icon={<Mail />} name="email" placeholder="Email address" />
          <Field icon={<Lock />} name="password" placeholder="Password" type="password" />
          {authMode === "signup" && (
            <select name="role">
              <option>Retail Buyer</option>
              <option>Distributor</option>
              <option>Export Lead</option>
              <option>Cafe Partner</option>
            </select>
          )}
          <button className="btn primary full" type="submit">{authMode === "login" ? "Login to dashboard" : "Create account"}</button>
        </form>
      </section>
    </div>
  );
}

function Dashboard({ user, navigate }) {
  return (
    <main className="dashboard">
      <aside className="side-panel reveal">
        <img src="/assets/logo-transparent.png" alt="Aapna Makhana" />
        <button className="active"><LayoutDashboard /> Overview</button>
        <button><ShoppingBag /> Orders</button>
        <button><PackageCheck /> Subscriptions</button>
        <button><CreditCard /> Payments</button>
      </aside>
      <section className="dash-main">
        <div className="dash-hero reveal">
          <div>
            <p className="eyebrow">Customer dashboard</p>
            <h1>Hello, {user?.name || "Aapna Buyer"}.</h1>
            <p>Track your orders, demo invoices, rewards and saved makhana carts.</p>
          </div>
          <button className="btn lime" onClick={() => navigate("checkout")}>Pay demo invoice</button>
        </div>
        <div className="analytics-grid">
          <MetricCard icon={<ShoppingBag />} title="Active orders" value="04" label="+2 this week" />
          <MetricCard icon={<BadgeIndianRupee />} title="Wallet savings" value="₹1,240" label="Demo points" />
          <MetricCard icon={<Truck />} title="Shipments" value="03" label="In transit" />
          <MetricCard icon={<Star />} title="Loyalty tier" value="Gold" label="820 points" />
        </div>
        <div className="panel-grid">
          <DataPanel title="Recent Orders" rows={orders.map((o) => [o.id, o.status, `₹${o.total}`])} />
          <div className="rich-panel">
            <h3>Recommended reorder</h3>
            {products.slice(0, 3).map((p) => (
              <div className="mini-product" key={p.id}><img src={p.img} alt={p.name} /><div><strong>{p.name}</strong><span>₹{p.price} · {p.stock} in stock</span></div></div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Checkout({ cart, total, step, setStep, paymentStatus, payNow, navigate }) {
  const displayCart = cart.length ? cart : products.slice(0, 3).map((p) => ({ ...p, qty: 1 }));
  const displayTotal = cart.length ? total : displayCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <main className="checkout-page">
      <div className="page-hero reveal">
        <p className="eyebrow">Demo payment gateway</p>
        <h1>Checkout flow mockup.</h1>
        <p>Use the demo card/UPI/wallet options. Payment completes locally with a success panel.</p>
      </div>
      <section className="checkout-grid">
        <div className="rich-panel reveal">
          <div className="stepper"><span className={step === "cart" ? "active" : ""}>Cart</span><span className={step === "payment" ? "active" : ""}>Payment</span><span className={step === "success" ? "active" : ""}>Success</span></div>
          {step !== "success" ? (
            <>
              {displayCart.map((item) => <div className="cart-line" key={item.id}><img src={item.img} alt={item.name} /><div><strong>{item.name}</strong><span>Qty {item.qty}</span></div><b>₹{item.price * item.qty}</b></div>)}
              <button className="btn primary full" onClick={() => step === "cart" ? setStep("payment") : payNow()}>{step === "cart" ? "Continue to payment" : paymentStatus === "processing" ? "Processing..." : "Pay demo gateway"}</button>
            </>
          ) : (
            <div className="success-state">
              <CheckCircle2 size={72} />
              <h2>Payment successful</h2>
              <p>Demo order AMK-DEMO-2606 is confirmed.</p>
              <button className="btn lime" onClick={() => navigate("dashboard")}>Open dashboard</button>
            </div>
          )}
        </div>
        <div className="payment-panel reveal">
          <h3>Gateway mockup</h3>
          <div className="payment-method active"><CreditCard /> Demo Card **** 4242</div>
          <div className="payment-method"><Phone /> Demo UPI aapna@upi</div>
          <div className="payment-method"><ShieldCheck /> Demo Wallet</div>
          <div className="total-box"><span>Total</span><strong>₹{displayTotal}</strong></div>
        </div>
      </section>
    </main>
  );
}

function AdminRoute({ adminUser, loginAsAdmin, navigate }) {
  if (!adminUser) {
    return <AdminLogin loginAsAdmin={loginAsAdmin} navigate={navigate} />;
  }
  return <Admin adminUser={adminUser} />;
}

function AdminLogin({ loginAsAdmin, navigate }) {
  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <div>
          <p className="eyebrow">Separate admin route</p>
          <h1>Admin login</h1>
          <p>This panel is intentionally separate from the main shopping site. Use demo admin access to enter the control room.</p>
          <div className="admin-demo-box">
            <span><Lock size={18} /> Demo admin</span>
            <strong>{adminLogin.email}</strong>
            <small>Password: demo123</small>
          </div>
          <div className="hero-actions">
            <button className="btn primary" onClick={loginAsAdmin}>Login as admin</button>
            <button className="btn lime" onClick={() => navigate("home")}>Back to store</button>
          </div>
        </div>
        <div className="admin-login-visual">
          <img src="/assets/Products-transparent/Products5.png" alt="Aapna Makhana admin product" />
          <div><BarChart3 /><span>SEO score</span><strong>94</strong></div>
          <div><ShoppingBag /><span>Orders today</span><strong>426</strong></div>
        </div>
      </section>
    </main>
  );
}

function Admin({ adminUser }) {
  return (
    <main className="admin-page">
      <aside className="side-panel reveal admin">
        <img src="/assets/logo-transparent.png" alt="Aapna Makhana" />
        <button className="active"><Gauge /> Command Center</button>
        <button><Store /> Products</button>
        <button><Users /> Customers</button>
        <button><BarChart3 /> Analytics</button>
      </aside>
      <section className="dash-main">
        <div className="dash-hero reveal dark">
          <div>
            <p className="eyebrow">Admin panel</p>
            <h1>Aapna operations cockpit.</h1>
            <p>Logged in as {adminUser.name}. Manage mock products, SEO, orders, customers, inventory and payment signals.</p>
          </div>
          <button className="btn lime">Export mock CSV</button>
        </div>
        <div className="analytics-grid">
          <MetricCard icon={<BadgeIndianRupee />} title="Revenue" value="₹2.48L" label="+18% mock" />
          <MetricCard icon={<ShoppingBag />} title="Orders" value="426" label="32 pending" />
          <MetricCard icon={<Users />} title="Customers" value="1,284" label="+82 new" />
          <MetricCard icon={<PackageCheck />} title="Stock value" value="₹6.7L" label="11 SKUs" />
        </div>
        <div className="panel-grid">
          <DataPanel title="Live Orders" rows={orders.map((o) => [o.id, o.customer, o.status, `₹${o.total}`])} />
          <DataPanel title="Customer Segments" rows={users.map((u) => [u.name, u.role, u.loyalty, `₹${u.spend}`])} />
        </div>
        <div className="seo-grid">
          {seoMetrics.map((metric) => (
            <article className="seo-card reveal" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <b>{metric.trend}</b>
              <small>{metric.note}</small>
            </article>
          ))}
        </div>
        <div className="admin-rich-grid">
          <div className="rich-panel reveal">
            <h3>SEO task board</h3>
            <div className="task-row"><CheckCircle2 /> Add product schema for roasted makhana <span>Done</span></div>
            <div className="task-row"><Sparkles /> Optimize Bihar makhana landing copy <span>In progress</span></div>
            <div className="task-row"><Search /> Publish 4 recipe articles <span>Queued</span></div>
          </div>
          <div className="rich-panel reveal">
            <h3>Inventory health</h3>
            {products.slice(0, 5).map((product) => (
              <div className="inventory-row" key={product.id}>
                <img src={product.img} alt={product.name} />
                <span>{product.name}</span>
                <b>{product.stock} units</b>
              </div>
            ))}
          </div>
        </div>
        <div className="campaign-grid">
          {campaigns.map((campaign) => <div className="campaign-card reveal" key={campaign.title}><Sparkles /><h3>{campaign.title}</h3><strong>{campaign.value}</strong><span>{campaign.trend}</span></div>)}
        </div>
      </section>
    </main>
  );
}

function Metric({ value, label }) {
  return <div className="metric"><strong>{value}</strong><span>{label}</span></div>;
}

function Panel({ icon, title, text }) {
  return <article className="info-panel reveal">{icon}<h3>{title}</h3><p>{text}</p></article>;
}

function Field({ icon, name, placeholder, type = "text" }) {
  return <label className="field">{icon}<input name={name} type={type} placeholder={placeholder} required /></label>;
}

function MetricCard({ icon, title, value, label }) {
  return <article className="metric-card reveal">{icon}<span>{title}</span><strong>{value}</strong><p>{label}</p></article>;
}

function DataPanel({ title, rows }) {
  return (
    <div className="rich-panel reveal">
      <h3>{title}</h3>
      <div className="table-list">
        {rows.map((row, index) => <div key={index}>{row.map((cell, i) => <span key={i}>{cell}</span>)}</div>)}
      </div>
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src="/assets/logo-transparent.png" alt="Aapna Makhana" />
          <p>Premium makhana from Bihar with a rich demo ecommerce experience for retail buyers, distributors and export leads.</p>
          <div className="footer-badges">
            <span>FSSAI 10021064000284</span>
            <span>MSME</span>
            <span>Made in India</span>
          </div>
        </div>
        <div className="newsletter">
          <p className="eyebrow">Stay connected</p>
          <h3>Get launch offers and bulk price updates.</h3>
          <label>
            <Mail size={18} />
            <input placeholder="Enter your email" />
            <button>Subscribe</button>
          </label>
        </div>
      </div>
      <div className="footer-grid">
        <div>
          <h3>Shop</h3>
          <button onClick={() => navigate("shop")}>All Products</button>
          <button onClick={() => navigate("shop")}>Roasted Makhana</button>
          <button onClick={() => navigate("shop")}>Raw Grades</button>
          <button onClick={() => navigate("shop")}>Kheer Premix</button>
          <button onClick={() => navigate("shop")}>Bulk Supply</button>
        </div>
        <div>
          <h3>Account</h3>
          <button onClick={() => navigate("auth")}>Login</button>
          <button onClick={() => navigate("auth")}>Signup</button>
          <button onClick={() => navigate("dashboard")}>Dashboard</button>
          <button onClick={() => navigate("checkout")}>Cart & Checkout</button>
          <a href="/admin">Admin Login</a>
        </div>
        <div>
          <h3>Company</h3>
          <button onClick={() => navigate("home")}>About Aapna</button>
          <button onClick={() => navigate("home")}>Quality & Certification</button>
          <button onClick={() => navigate("home")}>Bihar Sourcing</button>
          <button onClick={() => navigate("home")}>Wholesale</button>
          <button onClick={() => navigate("home")}>Export Enquiry</button>
        </div>
        <div>
          <h3>Policies</h3>
          <button>Terms of Service</button>
          <button>Privacy Policy</button>
          <button>Refund Policy</button>
          <button>Shipping Policy</button>
          <button>Demo Payment Policy</button>
        </div>
        <div>
          <h3>Contact</h3>
          <a href="tel:+919152150599">+91 9152150599</a>
          <a href="mailto:info@aapnamakhana.com">info@aapnamakhana.com</a>
          <span>Pandual, Madhubani - Bihar</span>
          <span>Retail, wholesale and export support</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Aapna Makhana. Demo ecommerce UI.</span>
        <div>
          <button onClick={() => navigate("shop")}>Shop now</button>
          <button onClick={() => navigate("checkout")}>Checkout demo</button>
          <a href="/admin">Admin panel</a>
        </div>
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
