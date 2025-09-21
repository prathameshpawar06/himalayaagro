import { useState, useEffect } from 'react';
import './App.css';

function ImageSlider() {
  const base = import.meta.env.BASE_URL || '/';
  const images = [
    base + 'SliderImages/p1.jpg',
    base + 'SliderImages/p2.jpg',
    base + 'SliderImages/p3.jpg',
    base + 'SliderImages/p4.jpg',
    // base + 'arohanaAgro.png'.startsWith('/') ? base + 'arohanaAgro.png'.slice(1) : base + 'arohanaAgro.png',
  ];
  const [current, setCurrent] = useState(0);

  // auto-advance every 4s
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(c => (c + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images.length]);

  const nextSlide = () => setCurrent((current + 1) % images.length);
  const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <section className="slider-section">
      <div className="slider-container">
        <button className="slider-btn left" onClick={prevSlide}>&lt;</button>
        {/* give wrapper an explicit size so images have room to render */}
        {/* <div className="slider-image-wrapper" style={{ width: '720px', height: '360px', margin: '0 auto' }}> */}
        <div className="slider-image-wrapper" style={{ width: '100%', maxWidth: '1200px', height: '500px', margin: '0 auto' }}> 
          {images.map((img, idx) => (
            <img
              key={`${img}-${idx}`}
              src={img}
              alt={`slide-${idx}`}
              onError={(e) => {
                console.warn('Image failed to load:', e.target.src);
                e.target.onerror = null;
                e.target.src = (import.meta.env.BASE_URL || '/') + 'vite.svg';
              }}
              className={`slider-image${idx === current ? ' active' : ''}`}
              style={{
                display: idx === current ? 'block' : 'none',
                width: '100%',
                height: '100%',
                // objectFit: 'cover',
                // borderRadius: '12px',
                boxShadow: '0 6px 18px rgba(0,0,0,0.12)'
              }}
            />
          ))}
        </div>
        <button className="slider-btn right" onClick={nextSlide}>&gt;</button>
      </div>
      <div className="slider-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`slider-dot${idx === current ? ' active' : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </section>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const baseurl = import.meta.env.BASE_URL || '/';

  function VendorsSection() {
    const vendors = [
      { name: 'Zepto', logo: 'vendors/zepto.svg' },
      { name: 'Tata Star', logo: 'vendors/tata-star.svg' },
      { name: 'Kisan Konnect', logo: 'vendors/kisan-konnect.svg' },
      { name: 'Swiggy', logo: 'vendors/swiggy.svg' },
      { name: 'Amazon', logo: 'vendors/amazon.svg' },
      { name: 'Bigbasket', logo: 'vendors/bigbasket.svg' },
      { name: 'Reliance', logo: 'vendors/reliance.svg' },
      { name: 'Vegrow', logo: 'vendors/vegrow.webp' },
      { name: 'Shtayushi Organic', logo: 'vendors/shtayushi-organic.png' },
    ];

    return (
      <section id="vendors" className="vendor-section">
        <div className="container">
          <h2>Our Vendor Partners</h2>
          <p className="section-intro">We collaborate with trusted marketplace and retail partners</p>
          <div className="vendor-grid">
            {vendors.map(v => (
              <div key={v.name} className="vendor-item" title={v.name}>
                <img
                  src={`${baseurl}${v.logo}`}
                  alt={`${v.name} logo`}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `${baseurl}vite.svg`;
                  }}
                />
                <span className="vendor-name">{v.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container flex items-center justify-between">
          <div className="logo flex items-center gap-2">
            <img 
              src={`${baseurl}/logo.png`} 
              alt="Himalaya Agro Logo" 
              className="h-6 w-auto" 
            />
            <h2>Himalaya agro</h2>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#products">Products</a>
            <a href="#retail-services">Retail Services</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
                <div className="hero-content">
                  <h1>A One-Stop Solution Platform for Farmers</h1>
                  <p>From seeds to post-harvest solutions - we provide the best quality products and services to enhance agricultural productivity and farmer prosperity.</p>
                  <div className="hero-buttons">
                    <button className="btn-primary">Explore Products</button>
                    <button className="btn-secondary">Our Services</button>
                  </div>
                </div>
                <div className="hero-image">
                  <div className="placeholder-image">🌾</div>
                </div>
              </section>

              {/* Image Slider Section */}
              <ImageSlider />

              {/* About Us Section */}
              <section id="about" className="about">
                <div className="container">
                  <h2>About Himalaya agro</h2>
                  <div className="about-content">
                    <div className="about-text">
                      <p>
                        Welcome to Himalaya agro Pvt Ltd, your trusted partner in bringing the freshest, highest-quality vegetables directly from farm to table. We are committed to sustainable practices, technological innovation, and empowering farmers, ensuring a brighter future for agriculture and healthier choices for our consumers. 
                      </p>
                      <p>
                        Join us as we explore our journey, our comprehensive offerings, and the exciting opportunities ahead.
                      </p>
                    </div>
                    <div className="about-stats">
                      <div className="stat">
                        <h3>10,000+</h3>
                        <p>Farmers Served</p>
                      </div>
                      <div className="stat">
                        <h3>500+</h3>
                        <p>Products Available</p>
                      </div>
                      <div className="stat">
                        <h3>50+</h3>
                        <p>Expert Advisors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Services Section */}
              <section id="services" className="services">
                <div className="container">
                  <h2>Our Comprehensive Agricultural Solutions</h2>
                  <p className="services-intro">A complete ecosystem of agricultural services designed to support farmers at every stage of their farming journey</p>
          
                  <div className="services-grid">
                    <div className="service-card">
                      <div className="service-icon">🌱</div>
                      <h3>Himalaya Agri Mall</h3>
                      <div className="service-subtitle">A one-stop solution platform for farmers needs</div>
                      <p>Himalaya Agri Mall is a retail chain renowned for providing A one-stop solution platform for farmers needs to cater seeds to post-harvest solutions. Our retail division provides well-known international brands, popular local products, and advisory services on soil health, cropping practices, nutrition & pest management for improving crop yields and farmer prosperity.</p>
                      <div className="service-features">
                        <h4>Key Features:</h4>
                        <ul>
                          <li>✓ Complete range of agricultural inputs</li>
                          <li>✓ International and local brand products</li>
                          <li>✓ Soil health advisory services</li>
                          <li>✓ Crop nutrition guidance</li>
                          <li>✓ Pest management solutions</li>
                        </ul>
                      </div>
                    </div>

                    <div className="service-card">
                      <div className="service-icon">🛒</div>
                      <h3>Himalaya E-Mart</h3>
                      <div className="service-subtitle">Our digital marketplace platform</div>
                      <p>Himalaya E-Mart is a digital marketplace platform which provides end-to-end services to the farming community. Through our platform, manufacturers and sellers can establish separate virtual stores to promote and sell their agricultural products. We act as a bridge between manufacturers and farmers for agricultural input products.</p>
                      <div className="service-features">
                        <h4>Products Available:</h4>
                        <ul>
                          <li>✓ Seeds & Saplings</li>
                          <li>✓ Fertilizers & Organic fertilizers</li>
                          <li>✓ Pesticides & Plant Growth promoters</li>
                          <li>✓ Sprayers & Farm equipment</li>
                          <li>✓ Drip Irrigation systems</li>
                          <li>✓ Free Home Delivery throughout India</li>
                        </ul>
                      </div>
                    </div>

                    <div className="service-card">
                      <div className="service-icon">🤝</div>
                      <h3>Himalaya Varadhi</h3>
                      <div className="service-subtitle">Our reliable dealers and wholesalers</div>
                      <p>Himalaya Varadhi initiative is a one-stop Agri Shop for all your fertilizers, seeds, pesticides, seedlings, and equipment. The needs of farmers are fulfilled through certified and reliable dealers and wholesalers who are located in nearby villages.</p>
                      <div className="service-features">
                        <h4>Network Benefits:</h4>
                        <ul>
                          <li>✓ Certified and reliable dealer network</li>
                          <li>✓ Village-level accessibility</li>
                          <li>✓ Complete agricultural input solutions</li>
                          <li>✓ Local language support</li>
                          <li>✓ Quick delivery and service</li>
                        </ul>
                      </div>
                    </div>

                    <div className="service-card">
                      <div className="service-icon">🔧</div>
                      <h3>Himalaya Farm Services</h3>
                      <div className="service-subtitle">Comprehensive farming support services</div>
                      <p>Himalaya Farm Services initiative provides Land preparation Advisory, Drip irrigation Installation, Sapling supply & Plantation, Farm inspection & Advisory, Consultation services, Supply of Agri inputs, and Support in produce marketing to fruit growers as well as other horticulture farmers.</p>
                      <div className="service-features">
                        <h4>Service Portfolio:</h4>
                        <ul>
                          <li>✓ Land preparation advisory</li>
                          <li>✓ Drip irrigation installation</li>
                          <li>✓ Farm inspection & advisory</li>
                          <li>✓ Consultation services</li>
                          <li>✓ Produce marketing support</li>
                          <li>✓ Direct service to 2 lakh+ farmers</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Service Statistics */}
                  <div className="service-stats">
                    <div className="stat-item">
                      <div className="stat-number">2,00,000+</div>
                      <div className="stat-label">Farmers Served Directly</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">500+</div>
                      <div className="stat-label">Retail Outlets</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">1000+</div>
                      <div className="stat-label">Product Varieties</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">24/7</div>
                      <div className="stat-label">Customer Support</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Vendors Section */}
              <VendorsSection />

              {/* Products Section */}
              <section id="products" className="products">
                <div className="container">
                  <h2>Our Product Categories</h2>
                  <p className="products-intro">Comprehensive range of high-quality agricultural products covering the entire crop value chain</p>
          
                  <div className="products-grid">
                    <div className="product-category">
                      <div className="product-icon">🌿</div>
                      <h3>Fertilizers & Nutrients</h3>
                      <p className="category-description">Complete nutrition solutions for enhanced crop productivity and soil health</p>
                      <ul>
                        <li><strong>Organic Fertilizers</strong> - Natural soil enhancers</li>
                        <li><strong>Bio Fertilizers</strong> - Microbial soil supplements</li>
                        <li><strong>Specialty Nutrients</strong> - Targeted nutrition solutions</li>
                        <li><strong>Bio Stimulants</strong> - Growth enhancing compounds</li>
                        <li><strong>Micro Nutrients</strong> - Essential trace elements</li>
                        <li><strong>Water Soluble Fertilizers</strong> - Quick absorption formulas</li>
                      </ul>
                      <div className="category-highlight">
                        <span>🏆 Premium Quality Assured</span>
                      </div>
                    </div>

                    <div className="product-category">
                      <div className="product-icon">🛡️</div>
                      <h3>Crop Protection</h3>
                      <p className="category-description">Advanced crop protection solutions for disease and pest management</p>
                      <ul>
                        <li><strong>Pesticides</strong> - Comprehensive pest control</li>
                        <li><strong>Herbicides</strong> - Effective weed management</li>
                        <li><strong>Fungicides</strong> - Disease prevention solutions</li>
                        <li><strong>Insecticides</strong> - Insect control products</li>
                        <li><strong>Plant Growth Regulators</strong> - Growth optimization</li>
                        <li><strong>Organic Pesticides</strong> - Eco-friendly options</li>
                      </ul>
                      <div className="category-highlight">
                        <span>🌱 Environment Friendly Options</span>
                      </div>
                    </div>

                    <div className="product-category">
                      <div className="product-icon">🌾</div>
                      <h3>Seeds & Implements</h3>
                      <p className="category-description">High-yielding seeds and modern farming equipment for optimal results</p>
                      <ul>
                        <li><strong>Vegetable Seeds</strong> - Hybrid & Open pollinated</li>
                        <li><strong>Field Crop Seeds</strong> - Cereals, pulses & oilseeds</li>
                        <li><strong>Fruit Saplings</strong> - Quality fruit plants</li>
                        <li><strong>Farm Equipment</strong> - Modern farming tools</li>
                        <li><strong>Irrigation Systems</strong> - Water efficient solutions</li>
                        <li><strong>Greenhouse Materials</strong> - Protected cultivation</li>
                      </ul>
                      <div className="category-highlight">
                        <span>🚀 Latest Technology</span>
                      </div>
                    </div>

                    <div className="product-category">
                      <div className="product-icon">⚙️</div>
                      <h3>Farm Machinery</h3>
                      <p className="category-description">Modern agricultural machinery for efficient and productive farming</p>
                      <ul>
                        <li><strong>Tractors & Attachments</strong> - Power farming solutions</li>
                        <li><strong>Harvesting Equipment</strong> - Efficient crop collection</li>
                        <li><strong>Spraying Equipment</strong> - Precision application</li>
                        <li><strong>Tillage Tools</strong> - Soil preparation equipment</li>
                        <li><strong>Post-Harvest Equipment</strong> - Processing machinery</li>
                        <li><strong>Solar Equipment</strong> - Renewable energy solutions</li>
                      </ul>
                      <div className="category-highlight">
                        <span>⚡ Energy Efficient</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Features */}
                  <div className="product-features">
                    <h3>Why Choose Our Products?</h3>
                    <div className="features-grid">
                      <div className="feature-item">
                        <div className="feature-icon">✅</div>
                        <h4>Quality Assurance</h4>
                        <p>All products undergo rigorous quality testing</p>
                      </div>
                      <div className="feature-item">
                        <div className="feature-icon">🚚</div>
                        <h4>Free Delivery</h4>
                        <p>Home delivery across India with no extra cost</p>
                      </div>
                      <div className="feature-item">
                        <div className="feature-icon">🎯</div>
                        <h4>Expert Guidance</h4>
                        <p>Technical support from agricultural experts</p>
                      </div>
                      <div className="feature-item">
                        <div className="feature-icon">💰</div>
                        <h4>Best Prices</h4>
                        <p>Competitive pricing with maximum value</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Retail Services Section */}
              <section id="retail-services" className="retail-services">
                <div className="container">
                  <h2>Our Retail Services</h2>
                  <p className="section-intro">Comprehensive retail services designed to support farmers at every stage of agricultural production</p>
          
                  <div className="retail-services-grid">
                    <div className="retail-service-item">
                      <div className="service-number">01</div>
                      <div className="retail-service-icon">📦</div>
                      <h3>Complete Range of Agri Inputs</h3>
                      <p>One-stop shop for all agricultural inputs including seeds, fertilizers, pesticides, farm equipment, and irrigation systems. We stock products from leading national and international brands.</p>
                      <ul>
                        <li>✓ Seeds & Saplings</li>
                        <li>✓ Fertilizers & Nutrients</li>
                        <li>✓ Crop Protection products</li>
                        <li>✓ Farm Equipment & Tools</li>
                      </ul>
                    </div>

                    <div className="retail-service-item">
                      <div className="service-number">02</div>
                      <div className="retail-service-icon">👨‍🌾</div>
                      <h3>Farm Advisory Services</h3>
                      <p>Expert agricultural guidance from certified agronomists to help farmers make informed decisions about crop management, soil health, and farming practices.</p>
                      <ul>
                        <li>✓ Crop planning & selection</li>
                        <li>✓ Soil health management</li>
                        <li>✓ Pest & disease control</li>
                        <li>✓ Nutrition management</li>
                      </ul>
                    </div>

                    <div className="retail-service-item">
                      <div className="service-number">03</div>
                      <div className="retail-service-icon">📱</div>
                      <h3>Digital Technology Based Advisory</h3>
                      <p>Advanced digital tools and mobile applications for real-time farm monitoring, weather updates, market prices, and personalized recommendations.</p>
                      <ul>
                        <li>✓ Mobile app for farmers</li>
                        <li>✓ Weather forecasting</li>
                        <li>✓ Market price updates</li>
                        <li>✓ Crop monitoring tools</li>
                      </ul>
                    </div>

                    <div className="retail-service-item">
                      <div className="service-number">04</div>
                      <div className="retail-service-icon">🧪</div>
                      <h3>Soil Tests</h3>
                      <p>Comprehensive soil testing services to analyze nutrient levels, pH, organic matter content, and provide customized fertilizer recommendations.</p>
                      <ul>
                        <li>✓ Nutrient analysis</li>
                        <li>✓ pH level testing</li>
                        <li>✓ Organic matter assessment</li>
                        <li>✓ Fertilizer recommendations</li>
                      </ul>
                    </div>

                    <div className="retail-service-item">
                      <div className="service-number">05</div>
                      <div className="retail-service-icon">📞</div>
                      <h3>Hello Himalaya</h3>
                      <p>24/7 customer support helpline for immediate assistance with product information, technical support, and emergency agricultural advice.</p>
                      <ul>
                        <li>✓ 24/7 helpline support</li>
                        <li>✓ Technical assistance</li>
                        <li>✓ Product information</li>
                        <li>✓ Emergency support</li>
                      </ul>
                    </div>

                    <div className="retail-service-item">
                      <div className="service-number">06</div>
                      <div className="retail-service-icon">🎓</div>
                      <h3>Consultancy Service</h3>
                      <p>Professional agricultural consultancy for farm planning, crop diversification, modern farming techniques, and business development.</p>
                      <ul>
                        <li>✓ Farm planning & design</li>
                        <li>✓ Crop diversification</li>
                        <li>✓ Modern farming techniques</li>
                        <li>✓ Business development</li>
                      </ul>
                    </div>

                    <div className="retail-service-item">
                      <div className="service-number">07</div>
                      <div className="retail-service-icon">🌱</div>
                      <h3>Seedlings</h3>
                      <p>High-quality vegetable, fruit, and ornamental plant seedlings grown in controlled environments with disease-free certification.</p>
                      <ul>
                        <li>✓ Vegetable seedlings</li>
                        <li>✓ Fruit plant saplings</li>
                        <li>✓ Ornamental plants</li>
                        <li>✓ Disease-free certification</li>
                      </ul>
                    </div>

                    <div className="retail-service-item">
                      <div className="service-number">08</div>
                      <div className="retail-service-icon">🔗</div>
                      <h3>Output Linkage</h3>
                      <p>Direct market linkage services connecting farmers with buyers, processors, and exporters for better price realization of agricultural produce.</p>
                      <ul>
                        <li>✓ Direct buyer connections</li>
                        <li>✓ Price negotiation support</li>
                        <li>✓ Quality certification</li>
                        <li>✓ Export opportunities</li>
                      </ul>
                    </div>

                    <div className="retail-service-item">
                      <div className="service-number">09</div>
                      <div className="retail-service-icon">🚚</div>
                      <h3>Door Delivery</h3>
                      <p>Free home delivery service for all agricultural products across India with timely delivery and quality assurance.</p>
                      <ul>
                        <li>✓ Free home delivery</li>
                        <li>✓ Pan-India coverage</li>
                        <li>✓ Timely delivery</li>
                        <li>✓ Quality assurance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Vision & Mission */}
              <section className="vision-mission">
                <div className="container">
                  <div className="vm-grid">
                    <div className="vm-card">
                      <div className="vm-icon">👁️</div>
                      <h3>Vision</h3>
                      <p>To be the leading agro-solutions provider, fostering sustainable agriculture and enhancing food security through innovation, quality, and community empowerment. We envision a future where fresh, nutritious produce is accessible to all, cultivated with respect for the environment and rewarded with fair practices for farmers.</p>
                    </div>
                    <div className="vm-card">
                      <div className="vm-icon">🎯</div>
                      <h3>Mission</h3>
                      <p>To deliver premium fresh vegetables while offering a comprehensive range of agri-inputs and advisory services. We are dedicated to supporting farmers, optimizing crop yields, and ensuring consumer satisfaction through efficient, transparent, and eco-friendly business operations.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Values Section */}
              <section className="values">
                <div className="container">
                  <h2>Our Core Values</h2>
                  <div className="values-grid">
                    <div className="value-item">
                      <h4>Integrity</h4>
                      <p>Honesty and fairness in all business aspects</p>
                    </div>
                    <div className="value-item">
                      <h4>Quality</h4>
                      <p>Delivering value for money through superior products</p>
                    </div>
                    <div className="value-item">
                      <h4>Innovation</h4>
                      <p>Embracing technology for better farming solutions</p>
                    </div>
                    <div className="value-item">
                      <h4>Customer Focus</h4>
                      <p>24/7 obsession with farmer needs and satisfaction</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="contact">
                <div className="container">
                  <h2>Get In Touch</h2>
                  <div className="contact-content">
                    <div className="contact-info">
                      <h3>Contact Information</h3>
                      <p>📍 Address: H. NO. 180/1/K/2 NEAR RADHAKRUSHNA HOTEL, PUNE ROAD, VENEGAON, Tembhurni (Solapur), Solapur, Madha, Maharashtra, India, 413211</p>
                      <p>📞 Phone: +91 93708 29551 </p>
                      <p>✉️ Email: himalayaagro7441@gmail.com</p>
                      <div className="social-links">
                        <a href="https://www.facebook.com/" aria-label="Facebook">📘</a>
                        <a href="https://www.instagram.com/" aria-label="Instagram">📷</a>
                        <a href="https://x.com/" aria-label="Twitter">🐦</a>
                        <a href="https://www.linkedin.com/" aria-label="LinkedIn">💼</a>
                      </div>
                    </div>
                    <form className="contact-form">
                      <input type="text" placeholder="Your Name" required />
                      <input type="email" placeholder="Your Email" required />
                      <input type="tel" placeholder="Your Phone" required />
                      <textarea placeholder="Your Message" rows="5" required></textarea>
                      <button type="submit" className="btn-primary">Send Message</button>
                    </form>
                  </div>
                </div>
              </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Himalaya agro</h3>
              <p>Empowering farmers with innovative agricultural solutions for sustainable growth and prosperity.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#products">Products</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Products</h4>
              <ul>
                <li><a href="#">Fertilizers</a></li>
                <li><a href="#">Seeds</a></li>
                <li><a href="#">Equipment</a></li>
                <li><a href="#">Organic Products</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Customer Service</a></li>
                <li><a href="#">Farm Advisory</a></li>
                <li><a href="#">Technical Support</a></li>
                <li><a href="#">Training</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Himalaya agro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
