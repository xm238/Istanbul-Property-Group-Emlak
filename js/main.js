/**
 * Luxury Estates - Premium Real Estate Website
 * Main JavaScript File
 * Author: Luxury Estates Team
 * Version: 1.0.0
 */

// DOM Elements
const header = document.getElementById('header');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mainNav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');
const preloader = document.getElementById('preloader');
const heroSlider = document.getElementById('hero-slider');
const sliderIndicators = document.getElementById('slider-indicators');
const sliderPrev = document.getElementById('slider-prev');
const sliderNext = document.getElementById('slider-next');
const testimonialsSlider = document.getElementById('testimonials-slider');
const testimonialPrev = document.getElementById('testimonial-prev');
const testimonialNext = document.getElementById('testimonial-next');
const propertiesGrid = document.getElementById('properties-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const propertyModal = document.getElementById('property-modal');
const closeModal = document.querySelector('.close-modal');

// Enable JS-scoped CSS behaviors
document.documentElement.classList.add('js');

// State Management
let currentSlide = 0;
let currentTestimonial = 0;
let testimonialsIntervalId = null;
let currentFilter = 'all';
let currentPriceFilter = 'all';
let currentBedsFilter = 'all';
let currentSort = 'newest';
let propertiesLoaded = 6;
let isLoading = false;

// Sample Data
const propertiesData = [
    {
        id: 1,
        title: 'Luxury Beachfront Villa',
        location: 'Malibu, CA',
        price: 2500000,
        beds: 5,
        baths: 6,
        sqft: 4500,
        type: 'villa',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        featured: true,
        description: 'Stunning beachfront property with panoramic ocean views and private beach access.',
        features: ['Ocean View', 'Private Beach', 'Infinity Pool', 'Smart Home'],
        agent: 'Sarah Johnson',
        contact: '+1 (555) 123-4567'
    },
    {
        id: 2,
        title: 'Modern Downtown Apartment',
        location: 'New York, NY',
        price: 850000,
        beds: 2,
        baths: 2,
        sqft: 1200,
        type: 'apartment',
        image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800',
        featured: true,
        description: 'Contemporary apartment in the heart of the city with skyline views.',
        features: ['City View', 'Gym', 'Rooftop', '24/7 Security'],
        agent: 'Michael Chen',
        contact: '+1 (555) 234-5678'
    },
    {
        id: 3,
        title: 'Spacious Family Home',
        location: 'Beverly Hills, CA',
        price: 1800000,
        beds: 4,
        baths: 5,
        sqft: 3800,
        type: 'house',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
        featured: false,
        description: 'Perfect family home with large backyard and modern amenities.',
        features: ['Backyard', 'Garage', 'Fireplace', 'Garden'],
        agent: 'Emily Rodriguez',
        contact: '+1 (555) 345-6789'
    },
    {
        id: 4,
        title: 'Penthouse Suite',
        location: 'Chicago, IL',
        price: 1200000,
        beds: 3,
        baths: 3,
        sqft: 2800,
        type: 'condo',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        featured: true,
        description: 'Elegant penthouse with city views and luxury finishes.',
        features: ['City View', 'Balcony', 'Doorman', 'Gym'],
        agent: 'David Thompson',
        contact: '+1 (555) 456-7890'
    },
    {
        id: 5,
        title: 'Mountain Retreat',
        location: 'Aspen, CO',
        price: 3200000,
        beds: 6,
        baths: 7,
        sqft: 5200,
        type: 'villa',
        image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800',
        featured: false,
        description: 'Luxurious mountain retreat with ski-in/ski-out access.',
        features: ['Ski Access', 'Hot Tub', 'Fireplace', 'Views'],
        agent: 'Sarah Johnson',
        contact: '+1 (555) 567-8901'
    },
    {
        id: 6,
        title: 'Urban Loft',
        location: 'Los Angeles, CA',
        price: 650000,
        beds: 1,
        baths: 1,
        sqft: 900,
        type: 'apartment',
        image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800',
        featured: false,
        description: 'Chic urban loft in trendy neighborhood with exposed brick.',
        features: ['Exposed Brick', 'High Ceilings', 'Balcony', 'Parking'],
        agent: 'Michael Chen',
        contact: '+1 (555) 678-9012'
    },
    {
        id: 7,
        title: 'Suburban Family Home',
        location: 'Austin, TX',
        price: 450000,
        beds: 4,
        baths: 3,
        sqft: 2800,
        type: 'house',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        featured: false,
        description: 'Beautiful family home in quiet neighborhood with large yard.',
        features: ['Backyard', 'Garage', 'Patio', 'School District'],
        agent: 'Emily Rodriguez',
        contact: '+1 (555) 789-0123'
    },
    {
        id: 8,
        title: 'Waterfront Condo',
        location: 'Miami, FL',
        price: 950000,
        beds: 2,
        baths: 2,
        sqft: 1500,
        type: 'condo',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        featured: true,
        description: 'Luxury waterfront condo with private dock and pool access.',
        features: ['Waterfront', 'Dock', 'Pool', 'Gym'],
        agent: 'David Thompson',
        contact: '+1 (555) 890-1234'
    },
    {
        id: 9,
        title: 'Historic Brownstone',
        location: 'Boston, MA',
        price: 1100000,
        beds: 3,
        baths: 4,
        sqft: 3200,
        type: 'house',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        featured: false,
        description: 'Beautifully restored historic brownstone with modern amenities.',
        features: ['Historic', 'Fireplace', 'Garden', 'Parking'],
        agent: 'Sarah Johnson',
        contact: '+1 (555) 901-2345'
    },
    {
        id: 10,
        title: 'Modern Studio',
        location: 'San Francisco, CA',
        price: 750000,
        beds: 1,
        baths: 1,
        sqft: 650,
        type: 'apartment',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
        featured: false,
        description: 'Modern studio apartment with city views and building amenities.',
        features: ['City View', 'Gym', 'Rooftop', 'Parking'],
        agent: 'Michael Chen',
        contact: '+1 (555) 012-3456'
    }
];

const testimonialsData = [
    {
        id: 1,
        quote: "Working with Luxury Estates was an absolute pleasure. They found us our dream home in just three weeks and handled every detail perfectly.",
        author: "John & Sarah Wilson",
        role: "First-time home buyers",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
    },
    {
        id: 2,
        quote: "Their investment advice helped me build a diversified real estate portfolio that has exceeded my expectations. Highly recommended!",
        author: "Robert Chen",
        role: "Real Estate Investor",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
    },
    {
        id: 3,
        quote: "The property management services are outstanding. My rental properties have never been better maintained or more profitable.",
        author: "Maria Garcia",
        role: "Property Owner",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    init();
});

function init() {
    // Footer year
    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = String(new Date().getFullYear());

    // Premium custom selects (keeps real <select> values for filtering)
    initPremiumSelects();

    // Scroll-reveal animations (IntersectionObserver)
    initRevealAnimations();

    // Event Listeners
    initEventListeners();
    handleScroll();
    
    // Initialize Components
    initHeroSlider();
    initTestimonialsSlider();
    initProperties();
    initScrollEffects();
    initForms();
    
    // Hide preloader
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
}

function initPremiumSelects() {
    const nativeSelects = Array.from(document.querySelectorAll('.filter-group select'));
    if (!nativeSelects.length) return;
    const filterSection = document.querySelector('.filter-section');

    const syncOpenState = () => {
        if (!filterSection) return;
        const isOpen = document.querySelector('.select.is-open') !== null;
        filterSection.classList.toggle('has-open-select', isOpen);
    };

    const closeAll = () => {
        document.querySelectorAll('.select.is-open').forEach(wrapper => {
            wrapper.classList.remove('is-open');
            const button = wrapper.querySelector('.select__button');
            if (button) button.setAttribute('aria-expanded', 'false');
        });
        syncOpenState();
    };

    const syncFromNative = (wrapper, select) => {
        const valueEl = wrapper.querySelector('[data-select-value]');
        if (valueEl) valueEl.textContent = select.options[select.selectedIndex]?.text ?? '';

        wrapper.querySelectorAll('[role="option"]').forEach(opt => {
            const isSelected = opt.getAttribute('data-value') === select.value;
            opt.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        });
    };

    nativeSelects.forEach(select => {
        if (!select.id) return;
        if (select.closest('.select')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'select';
        wrapper.dataset.selectId = select.id;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'select__button';
        button.setAttribute('aria-haspopup', 'listbox');
        button.setAttribute('aria-expanded', 'false');

        const value = document.createElement('span');
        value.className = 'select__value';
        value.setAttribute('data-select-value', '');

        const chevron = document.createElement('span');
        chevron.className = 'select__chevron';
        chevron.setAttribute('aria-hidden', 'true');

        button.appendChild(value);
        button.appendChild(chevron);

        const list = document.createElement('ul');
        list.className = 'select__list';
        list.setAttribute('role', 'listbox');
        list.tabIndex = -1;
        list.id = `${select.id}-listbox`;
        button.setAttribute('aria-controls', list.id);

        Array.from(select.options).forEach((opt, idx) => {
            const item = document.createElement('li');
            item.className = 'select__option';
            item.setAttribute('role', 'option');
            item.setAttribute('data-value', opt.value);
            item.textContent = opt.text;
            item.setAttribute('aria-selected', idx === select.selectedIndex ? 'true' : 'false');
            item.tabIndex = -1;

            item.addEventListener('click', (e) => {
                e.preventDefault();
                select.value = opt.value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
                syncFromNative(wrapper, select);
                closeAll();
                button.focus();
            });

            list.appendChild(item);
        });

        const open = () => {
            closeAll();
            wrapper.classList.add('is-open');
            button.setAttribute('aria-expanded', 'true');
            syncFromNative(wrapper, select);
            syncOpenState();

            const selected = wrapper.querySelector('[role="option"][aria-selected="true"]');
            const focusTarget = selected ?? wrapper.querySelector('[role="option"]');
            if (focusTarget) focusTarget.focus();
        };

        const toggle = () => {
            if (wrapper.classList.contains('is-open')) {
                closeAll();
                button.focus();
            } else {
                open();
            }
        };

        button.addEventListener('click', (e) => {
            e.preventDefault();
            toggle();
        });

        button.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open();
            }
        });

        list.addEventListener('keydown', (e) => {
            const options = Array.from(wrapper.querySelectorAll('[role="option"]'));
            const activeIndex = options.indexOf(document.activeElement);

            if (e.key === 'Escape') {
                e.preventDefault();
                closeAll();
                button.focus();
                return;
            }

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const next = options[Math.min(options.length - 1, activeIndex + 1)] ?? options[0];
                next?.focus();
                return;
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prev = options[Math.max(0, activeIndex - 1)] ?? options[options.length - 1];
                prev?.focus();
                return;
            }

            if (e.key === 'Home') {
                e.preventDefault();
                options[0]?.focus();
                return;
            }

            if (e.key === 'End') {
                e.preventDefault();
                options[options.length - 1]?.focus();
                return;
            }

            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const focused = document.activeElement;
                if (focused && focused.getAttribute('role') === 'option') {
                    focused.click();
                }
            }
        });

        // Keep the custom UI in sync when values change programmatically (reset/quick search)
        select.addEventListener('change', () => syncFromNative(wrapper, select));

        select.classList.add('select__native');
        select.tabIndex = -1;
        select.setAttribute('aria-hidden', 'true');

        // Replace select with wrapper (but keep select in DOM for existing filtering code)
        const parent = select.parentElement;
        if (!parent) return;
        parent.replaceChild(wrapper, select);
        wrapper.appendChild(button);
        wrapper.appendChild(list);
        wrapper.appendChild(select);

        syncFromNative(wrapper, select);
    });

    document.addEventListener('click', (e) => {
        const target = e.target;
        if (!(target instanceof Element)) return;
        if (target.closest('.select')) return;
        closeAll();
    });
}

// Event Listeners
function initEventListeners() {
    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Scroll Events
    window.addEventListener('scroll', handleScroll);
    
    // Resize Events
    window.addEventListener('resize', handleResize);

    // Slider Controls
    sliderPrev.addEventListener('click', () => changeSlide(-1));
    sliderNext.addEventListener('click', () => changeSlide(1));
    
    testimonialPrev.addEventListener('click', () => changeTestimonial(-1));
    testimonialNext.addEventListener('click', () => changeTestimonial(1));

    // Property Filters
    document.getElementById('property-filter').addEventListener('change', applyFilters);
    document.getElementById('price-filter').addEventListener('change', applyFilters);
    document.getElementById('beds-filter').addEventListener('change', applyFilters);
    document.getElementById('sort-filter').addEventListener('change', applyFilters);
    const resetFiltersBtn = document.getElementById('reset-filters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            document.getElementById('property-filter').value = 'all';
            document.getElementById('price-filter').value = 'all';
            document.getElementById('beds-filter').value = 'all';
            document.getElementById('sort-filter').value = 'newest';
            applyFilters();
        });
    }

    // Forms
    document.getElementById('quick-search-form').addEventListener('submit', handleQuickSearch);
    document.getElementById('newsletter-form').addEventListener('submit', handleNewsletterSubmit);
    document.getElementById('contact-form').addEventListener('submit', handleContactSubmit);

    // Modal
    closeModal.addEventListener('click', closeModalHandler);
    window.addEventListener('click', outsideClickHandler);

    // Load More Properties
    loadMoreBtn.addEventListener('click', loadMoreProperties);
}

// Mobile Menu
function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    
    // Accessibility
    const isOpen = mainNav.classList.contains('active');
    mobileMenuToggle.setAttribute('aria-expanded', isOpen);
}

function handleNavClick(e) {
    const target = e.target.closest('.nav-link');
    if (!target) return;
    
    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to clicked link
    target.classList.add('active');
    
    // Close mobile menu if open
    if (window.innerWidth <= 767) {
        toggleMobileMenu();
    }
}

// Scroll Effects
function handleScroll() {
    // Header scroll effect
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }

}

function initRevealAnimations() {
    const elements = Array.from(document.querySelectorAll('[data-aos]'));

    // Apply delay values already present in markup; otherwise stagger within each section.
    const sectionGroups = new Map();
    elements.forEach(el => {
        const explicitDelay = el.getAttribute('data-aos-delay');
        if (explicitDelay) {
            el.style.transitionDelay = `${parseInt(explicitDelay, 10) || 0}ms`;
            return;
        }

        const section = el.closest('section') || document.body;
        const count = sectionGroups.get(section) ?? 0;
        const i = Math.min(3, count); // cap at 4 items
        el.style.transitionDelay = `${i * 100}ms`;
        sectionGroups.set(section, count + 1);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    elements.forEach(el => observer.observe(el));
}

function initScrollEffects() {
    // Intersection Observer for stats
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target.querySelector('.stat-number');
                if (statElement && !statElement.dataset.animated) {
                    animateNumber(statElement);
                    statElement.dataset.animated = 'true';
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-item').forEach(item => {
        observer.observe(item);
    });
}

function initForms() {
    // Initialize form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                    field.style.backgroundColor = '#ffeaea';
                } else {
                    field.style.borderColor = '#2ecc71';
                    field.style.backgroundColor = '#f0fff0';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showMessage('Please fill in all required fields.', 'error');
            }
        });
        
        // Clear validation styles on input
        form.addEventListener('input', function(e) {
            if (e.target.hasAttribute('required')) {
                e.target.style.borderColor = '';
                e.target.style.backgroundColor = '';
            }
        });
    });
    
    // Initialize newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Initialize contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Initialize quick search form
    const quickSearchForm = document.getElementById('quick-search-form');
    if (quickSearchForm) {
        quickSearchForm.addEventListener('submit', handleQuickSearch);
    }
}

// Back to Top
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hero Slider
function initHeroSlider() {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const indicators = sliderIndicators.querySelectorAll('.indicator');
    
    // Auto slide change
    setInterval(() => {
        changeSlide(1);
    }, 5000);
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
}

function changeSlide(direction) {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const totalSlides = slides.length;
    
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    updateSlider();
}

function updateSlider() {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const indicators = sliderIndicators.querySelectorAll('.indicator');
    
    // Update slides
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Testimonials Slider
function initTestimonialsSlider() {
    // Auto-advance every 6s; pause on hover
    const start = () => {
        if (testimonialsIntervalId) return;
        testimonialsIntervalId = setInterval(() => changeTestimonial(1), 6000);
    };
    const stop = () => {
        if (!testimonialsIntervalId) return;
        clearInterval(testimonialsIntervalId);
        testimonialsIntervalId = null;
    };

    start();
    testimonialsSlider.addEventListener('mouseenter', stop);
    testimonialsSlider.addEventListener('mouseleave', start);

    updateTestimonials();
}

function changeTestimonial(direction) {
    const slides = testimonialsSlider.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    
    currentTestimonial += direction;
    
    if (currentTestimonial >= totalSlides) {
        currentTestimonial = 0;
    } else if (currentTestimonial < 0) {
        currentTestimonial = totalSlides - 1;
    }
    
    updateTestimonials();
}

function updateTestimonials() {
    const slides = testimonialsSlider.querySelectorAll('.testimonial-slide');
    
    slides.forEach((slide, index) => {
        if (index === currentTestimonial) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    updateTestimonialsHeight();
}

function updateTestimonialsHeight() {
    if (!testimonialsSlider) return;
    const active = testimonialsSlider.querySelector('.testimonial-slide.active');
    if (!active) return;
    testimonialsSlider.style.height = `${active.offsetHeight}px`;
}

// Properties System
function initProperties() {
    renderProperties(propertiesData.slice(0, propertiesLoaded));
    
    // Initialize filter event listeners
    const filterSelects = document.querySelectorAll('.filter-group select');
    filterSelects.forEach(select => {
        select.addEventListener('change', applyFilters);
    });
}

function renderProperties(properties) {
    propertiesGrid.innerHTML = '';
    
    properties.forEach(property => {
        const propertyCard = createPropertyCard(property);
        propertyCard.classList.add('reveal');
        propertiesGrid.appendChild(propertyCard);
    });

    // Staggered reveal (cap at 4)
    const cards = Array.from(propertiesGrid.querySelectorAll('.property-card'));
    cards.forEach((card, index) => {
        const i = Math.min(3, index);
        card.style.transitionDelay = `${i * 80}ms`;
    });
    requestAnimationFrame(() => {
        cards.forEach(card => card.classList.add('is-visible'));
    });
}

function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.innerHTML = `
        <div class="property-image" aria-label="${property.title}">
            <div class="property-image-bg" style="background-image: url('${property.image}')"></div>
            <div class="property-badge ${property.featured ? 'is-featured' : 'is-available'}">
                ${property.featured ? 'Featured' : 'Available'}
            </div>
        </div>
        <div class="property-content">
            <h3 class="property-title">${property.title}</h3>
            <div class="property-location">
                <i class="fas fa-map-marker-alt"></i>
                <span>${property.location}</span>
            </div>
            <div class="property-price">$${property.price.toLocaleString()}</div>
            <div class="property-divider"></div>
            <div class="property-metrics" aria-label="Property details">
                <div class="metric">
                    <i class="fas fa-bed"></i>
                    <span>${property.beds} Beds</span>
                </div>
                <div class="metric">
                    <i class="fas fa-bath"></i>
                    <span>${property.baths} Baths</span>
                </div>
                <div class="metric">
                    <i class="fas fa-ruler-combined"></i>
                    <span>${property.sqft.toLocaleString()} sqft</span>
                </div>
            </div>
            <div class="property-actions">
                <button class="btn btn-outline view-property-btn" data-id="${property.id}">View Details</button>
                <button class="btn btn-secondary contact-agent-btn" data-id="${property.id}">Contact</button>
            </div>
        </div>
    `;
    
    // Add event listeners
    card.querySelector('.view-property-btn').addEventListener('click', () => openPropertyModal(property));
    card.querySelector('.contact-agent-btn').addEventListener('click', () => contactAgent(property));
    
    return card;
}

function applyFilters() {
    const typeFilter = document.getElementById('property-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const bedsFilter = document.getElementById('beds-filter').value;
    const sortFilter = document.getElementById('sort-filter').value;
    
    let filteredProperties = [...propertiesData];
    
    // Type filter
    if (typeFilter !== 'all') {
        filteredProperties = filteredProperties.filter(p => p.type === typeFilter);
    }
    
    // Price filter
    if (priceFilter !== 'all') {
        filteredProperties = filteredProperties.filter(p => {
            switch(priceFilter) {
                case 'under-500k':
                    return p.price < 500000;
                case '500k-1m':
                    return p.price >= 500000 && p.price <= 1000000;
                case '1m-2m':
                    return p.price > 1000000 && p.price <= 2000000;
                case 'over-2m':
                    return p.price > 2000000;
                default:
                    return true;
            }
        });
    }
    
    // Beds filter
    if (bedsFilter !== 'all') {
        filteredProperties = filteredProperties.filter(p => p.beds >= parseInt(bedsFilter));
    }
    
    // Sort
    filteredProperties.sort((a, b) => {
        switch(sortFilter) {
            case 'newest':
                return b.id - a.id;
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'beds':
                return b.beds - a.beds;
            default:
                return 0;
        }
    });
    
    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
        const isActive =
            typeFilter !== 'all' ||
            priceFilter !== 'all' ||
            bedsFilter !== 'all' ||
            sortFilter !== 'newest';
        resetBtn.hidden = !isActive;
    }

    // Animate filter transition
    const existingCards = Array.from(propertiesGrid.querySelectorAll('.property-card'));
    existingCards.forEach(card => card.classList.remove('is-visible'));
    existingCards.forEach(card => card.classList.add('is-leaving'));

    window.setTimeout(() => {
        renderProperties(filteredProperties);
    }, existingCards.length ? 180 : 0);
}

function loadMoreProperties() {
    if (isLoading) return;
    
    isLoading = true;
    loadMoreBtn.textContent = 'Loading...';
    
    setTimeout(() => {
        propertiesLoaded += 3;
        const visibleProperties = getVisibleProperties();
        renderProperties(visibleProperties.slice(0, propertiesLoaded));
        
        if (propertiesLoaded >= visibleProperties.length) {
            loadMoreBtn.style.display = 'none';
        }
        
        isLoading = false;
        loadMoreBtn.textContent = 'Load More Properties';
    }, 1000);
}

function getVisibleProperties() {
    const typeFilter = document.getElementById('property-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const bedsFilter = document.getElementById('beds-filter').value;
    const sortFilter = document.getElementById('sort-filter').value;
    
    let filteredProperties = [...propertiesData];
    
    // Apply same filters as in applyFilters()
    if (typeFilter !== 'all') {
        filteredProperties = filteredProperties.filter(p => p.type === typeFilter);
    }
    
    if (priceFilter !== 'all') {
        filteredProperties = filteredProperties.filter(p => {
            switch(priceFilter) {
                case 'under-500k':
                    return p.price < 500000;
                case '500k-1m':
                    return p.price >= 500000 && p.price <= 1000000;
                case '1m-2m':
                    return p.price > 1000000 && p.price <= 2000000;
                case 'over-2m':
                    return p.price > 2000000;
                default:
                    return true;
            }
        });
    }
    
    if (bedsFilter !== 'all') {
        filteredProperties = filteredProperties.filter(p => p.beds >= parseInt(bedsFilter));
    }
    
    filteredProperties.sort((a, b) => {
        switch(sortFilter) {
            case 'newest':
                return b.id - a.id;
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'beds':
                return b.beds - a.beds;
            default:
                return 0;
        }
    });
    
    return filteredProperties;
}

// Property Modal
function openPropertyModal(property) {
    const modalContent = propertyModal.querySelector('.modal-body');
    modalContent.innerHTML = `
        <div class="property-modal-content">
            <div class="property-modal-image">
                <img src="${property.image}" alt="${property.title}">
            </div>
            <div class="property-modal-details">
                <div class="property-modal-header">
                    <h2>${property.title}</h2>
                    <div class="property-modal-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${property.location}</span>
                    </div>
                    <div class="property-modal-price">$${property.price.toLocaleString()}</div>
                </div>
                <div class="property-modal-features">
                    <div class="feature-grid">
                        <div class="feature-item">
                            <i class="fas fa-bed"></i>
                            <span>${property.beds} Bedrooms</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-bath"></i>
                            <span>${property.baths} Bathrooms</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-ruler-combined"></i>
                            <span>${property.sqft.toLocaleString()} sqft</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-car"></i>
                            <span>2 Car Garage</span>
                        </div>
                    </div>
                </div>
                <div class="property-modal-description">
                    <h3>Property Description</h3>
                    <p>${property.description}</p>
                </div>
                <div class="property-modal-features-list">
                    <h3>Features</h3>
                    <ul>
                        ${property.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="property-modal-agent">
                    <h3>Contact Agent</h3>
                    <div class="agent-info">
                        <div class="agent-name">${property.agent}</div>
                        <div class="agent-contact">
                            <i class="fas fa-phone"></i>
                            <span>${property.contact}</span>
                        </div>
                    </div>
                </div>
                <div class="property-modal-actions">
                    <button class="btn btn-primary schedule-tour-btn" data-id="${property.id}">Schedule Tour</button>
                    <button class="btn btn-secondary download-brochure-btn" data-id="${property.id}">Download Brochure</button>
                </div>
            </div>
        </div>
    `;
    
    propertyModal.style.display = 'block';
    
    // Add event listeners for modal actions
    modalContent.querySelector('.schedule-tour-btn').addEventListener('click', () => scheduleTour(property));
    modalContent.querySelector('.download-brochure-btn').addEventListener('click', () => downloadBrochure(property));
}

function closeModalHandler() {
    propertyModal.style.display = 'none';
}

function outsideClickHandler(e) {
    if (e.target === propertyModal) {
        closeModalHandler();
    }
}

// Forms
function handleQuickSearch(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const searchParams = {
        type: formData.get('property-type'),
        location: formData.get('location'),
        minPrice: formData.get('min-price'),
        maxPrice: formData.get('max-price')
    };
    
    // Apply filters based on search
    if (searchParams.type) document.getElementById('property-filter').value = searchParams.type;
    if (searchParams.location) {
        // Custom location handling could go here
        console.log('Searching for location:', searchParams.location);
    }
    
    applyFilters();
    
    // Scroll to properties section
    document.querySelector('#properties').scrollIntoView({ behavior: 'smooth' });
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletter-email').value;
    
    if (!email) {
        showMessage('Please enter your email address.', 'error');
        return;
    }
    
    // Simulate API call
    showMessage('Thank you for subscribing to our newsletter!', 'success');
    e.target.reset();
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject') || 'General Inquiry',
        message: formData.get('message')
    };
    
    if (!contactData.name || !contactData.email || !contactData.message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Simulate API call
    showMessage('Thank you for your message. We will get back to you soon!', 'success');
    e.target.reset();
}

// Utility Functions
function contactAgent(property) {
    const message = `I'm interested in ${property.title} in ${property.location}. Please contact me.`;
    const mailto = `mailto:info@luxuryestates.com?subject=Interest in ${property.title}&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
}

function scheduleTour(property) {
    const message = `I would like to schedule a tour for ${property.title} in ${property.location}.`;
    const mailto = `mailto:info@luxuryestates.com?subject=Tour Request: ${property.title}&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
}

function downloadBrochure(property) {
    // Simulate brochure download
    showMessage(`Downloading brochure for ${property.title}...`, 'success');
    
    // Create a fake download
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = '#';
        link.download = `${property.title.replace(/\s+/g, '-')}-brochure.pdf`;
        link.click();
    }, 1000);
}

function animateNumber(element) {
    const target = parseInt(element.dataset.target);
    if (!Number.isFinite(target)) return;

    const duration = 1500;
    const start = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const value = Math.round(target * easeOutCubic(t));
        element.textContent = value.toLocaleString();
        if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
}

function showMessage(message, type = 'success') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

function handleResize() {
    // Handle mobile menu on resize
    if (window.innerWidth > 767) {
        mainNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }

    updateTestimonialsHeight();
}

// Performance Optimizations
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Accessibility Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Skip to content link
    const skipLink = document.querySelector('.skip-to-content');
    skipLink.addEventListener('click', function() {
        const target = document.getElementById('main-content');
        target.focus();
    });
    
    // Focus management for modal
    propertyModal.addEventListener('show', function() {
        const firstFocusableElement = propertyModal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusableElement) {
            firstFocusableElement.focus();
        }
    });
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could send error to logging service here
});

// Console Cleanup for Production
if (window.location.hostname !== 'localhost') {
    console.log = function() {};
    console.warn = function() {};
    console.error = function() {};
}
