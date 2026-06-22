// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const scrollTop = document.getElementById('scrollTop');

if (navbar && scrollTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            scrollTop.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            scrollTop.classList.remove('active');
        }
    });
}

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when clicking on a link (except dropdown toggle)
const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
if (navLinks.length > 0 && navMenu && hamburger) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== DROPDOWN MENU (Mobile) =====
// Handle multiple dropdowns
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const dropdowns = document.querySelectorAll('.dropdown');

if (dropdownToggles.length > 0) {
    dropdownToggles.forEach((toggle, index) => {
        toggle.addEventListener('click', (e) => {
            // Only prevent default on mobile
            if (window.innerWidth <= 900) {
                e.preventDefault();
                const parentDropdown = toggle.closest('.dropdown');
                
                // Close other dropdowns
                dropdowns.forEach(dropdown => {
                    if (dropdown !== parentDropdown) {
                        dropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                parentDropdown.classList.toggle('active');
            }
        });
    });
}

// Close dropdown when clicking on dropdown menu item
const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            // Close all dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            const navMenu = document.getElementById('navMenu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && hamburger && window.innerWidth <= 900) {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            if (dropdown) {
                dropdown.classList.remove('active');
            }
        }
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SCROLL TO TOP =====
if (scrollTop) {
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== DESTINATIONS - Grid Layout (No Slider) =====
// Destinations are displayed in a grid layout
// No slider functionality needed

// ===== WISHLIST FUNCTIONALITY =====
const wishlistBtns = document.querySelectorAll('.wishlist-btn');

wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const icon = btn.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.style.background = '#ff6b35';
            btn.style.color = '#fff';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            btn.style.background = '#fff';
            btn.style.color = '#1a1a2e';
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
const cards = document.querySelectorAll('.category-card, .destination-card, .package-card, .testimonial-card');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    if (sections.length === 0) return;
    
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            const allNavLinks = document.querySelectorAll('.nav-link');
            allNavLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

if (sections.length > 0) {
    window.addEventListener('scroll', activateNavLink);
}

// ===== COUNTER ANIMATION =====
const counterElement = document.querySelector('.badge-number');

function animateCounter() {
    if (!counterElement) return;
    
    const target = 500;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counterElement.textContent = target + '+';
            clearInterval(timer);
        } else {
            counterElement.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection && counterElement) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterObserver.observe(aboutSection);
}

// ===== FORM VALIDATION (if you add a contact form later) =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 500);
    }
    
    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== BOOK NOW BUTTON FUNCTIONALITY =====
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing Book Now buttons...');
    
    // Get all book buttons
    const bookButtons = document.querySelectorAll('.btn-primary, .btn-book, .btn-book-modern, .btn-book-desktop, .btn-book-mobile');
    const bookingModalOverlay = document.getElementById('bookingModalOverlay');
    const bookingModal = document.getElementById('bookingModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const bookingForm = document.getElementById('bookingForm');

    console.log('Book buttons found:', bookButtons.length);
    console.log('Modal overlay found:', bookingModalOverlay ? 'Yes' : 'No');
    
    // Log each button found
    bookButtons.forEach((btn, index) => {
        console.log(`Button ${index + 1}:`, btn.className);
    });

    // Function to open modal
    function openBookingModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        console.log('Opening booking modal...');
        
        if (bookingModalOverlay) {
            bookingModalOverlay.classList.add('active');
            bookingModalOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            console.log('Modal opened successfully!');
        } else {
            console.error('Modal overlay not found!');
        }
        
        // Close mobile menu if open
        const navMenu = document.getElementById('navMenu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            console.log('Mobile menu closed');
        }
    }

    // Function to close modal
    function closeBookingModal() {
        if (bookingModalOverlay) {
            bookingModalOverlay.classList.remove('active');
            setTimeout(() => {
                bookingModalOverlay.style.display = 'none';
            }, 300);
            document.body.style.overflow = 'auto';
            console.log('Modal closed');
        }
    }

    // Open booking modal - Add event listeners to all book buttons
    if (bookButtons.length > 0) {
        bookButtons.forEach(button => {
            // Remove any existing listeners
            button.removeEventListener('click', openBookingModal);
            // Add new listener
            button.addEventListener('click', openBookingModal);
            console.log('Event listener added to:', button.className);
        });
        console.log('Book Now buttons initialized successfully!');
    } else {
        console.error('No book buttons found!');
    }

    // Close modal when clicking close button
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeBookingModal);
    }

    // Close modal when clicking overlay
    if (bookingModalOverlay) {
        bookingModalOverlay.addEventListener('click', (e) => {
            if (e.target === bookingModalOverlay) {
                closeBookingModal();
            }
        });
    }

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bookingModalOverlay && bookingModalOverlay.classList.contains('active')) {
            closeBookingModal();
        }
    });

    // Handle form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
        
        // Get form data
        const formData = new FormData(bookingForm);
        const fullName = formData.get('fullName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const destination = formData.get('destination');
        const travelDate = formData.get('travelDate');
        const travelers = formData.get('travelers');
        const message = formData.get('message');
        
        // Get destination text
        const destinationSelect = document.getElementById('destination');
        const destinationText = destinationSelect.options[destinationSelect.selectedIndex].text;
        
        // Add loading state
        const submitBtn = bookingForm.querySelector('.btn-submit-booking');
        submitBtn.classList.add('loading');
        
        // Simulate API call (replace with actual API call)
        setTimeout(() => {
            // Remove loading state
            submitBtn.classList.remove('loading');
            
            // Create WhatsApp message
            const whatsappMessage = `*New Booking Inquiry*%0A%0A*Name:* ${fullName}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Destination:* ${destinationText}%0A*Travel Date:* ${travelDate}%0A*Travelers:* ${travelers}%0A*Message:* ${message || 'N/A'}`;
            
            // WhatsApp number (replace with actual number)
            const whatsappNumber = '917110101970';
            
            // Open WhatsApp
            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
            
            // Show success message
            alert('✅ Thank you for your inquiry! We will contact you within 24 hours. You can also reach us directly on WhatsApp.');
            
            // Reset form
            bookingForm.reset();
            
            // Close modal
            bookingModalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Add success animation
            bookingModal.classList.add('form-success');
            setTimeout(() => {
                bookingModal.classList.remove('form-success');
            }, 500);
        }, 1500);
    });
}

// Set minimum date to today for travel date input
const travelDateInput = document.getElementById('travelDate');
if (travelDateInput) {
    const today = new Date().toISOString().split('T')[0];
    travelDateInput.setAttribute('min', today);
}
}); // End of DOMContentLoaded

// ===== WHATSAPP BUTTON =====
const whatsappBtn = document.querySelector('.btn-outline-white');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const phoneNumber = '919876543210'; // Replace with actual number
        const message = 'Hi! I am interested in booking a trip with The Daydream Trek.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
}

// ===== IMAGE LAZY LOADING =====
const images = document.querySelectorAll('img[data-src]');

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

images.forEach(img => imageObserver.observe(img));

// ===== PREVENT CONTEXT MENU ON IMAGES (Optional - for image protection) =====
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        // Uncomment the line below if you want to disable right-click on images
        // e.preventDefault();
    });
});

// ===== CONSOLE MESSAGE =====
console.log('%c🏔️ The Daydream Trek', 'font-size: 24px; font-weight: bold; color: #ff6b35;');
console.log('%cWebsite developed with ❤️', 'font-size: 14px; color: #004e89;');
console.log('%cReady for adventure? Book your trip now!', 'font-size: 12px; color: #636e72;');

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
if (sections.length > 0) {
    const debouncedActivateNavLink = debounce(activateNavLink, 100);
    window.removeEventListener('scroll', activateNavLink);
    window.addEventListener('scroll', debouncedActivateNavLink);
}

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
});

// Focus trap for mobile menu
if (navMenu) {
    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (focusableElements.length > 0) {
        navMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        });
    }
}

// ===== GALLERY SLIDER FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const gallerySlider = document.getElementById('gallerySlider');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    const galleryDotsContainer = document.getElementById('galleryDots');
    
    if (!gallerySlider) return;
    
    const slides = gallerySlider.querySelectorAll('.gallery-slide');
    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    const totalSlides = slides.length;
    
    // Get slides per view based on screen size
    function getSlidesPerView() {
        if (window.innerWidth >= 1200) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1; // Mobile: always 1 slide
    }
    
    // Get slide width including gap
    function getSlideWidth() {
        const slide = slides[0];
        if (!slide) return 0;
        const slideRect = slide.getBoundingClientRect();
        const gap = window.innerWidth <= 480 ? 15 : 20;
        return slideRect.width + gap;
    }
    
    // Create dots
    function createDots() {
        if (!galleryDotsContainer) return;
        galleryDotsContainer.innerHTML = '';
        
        // On mobile, create dot for each slide
        const dotsCount = window.innerWidth < 768 ? totalSlides : Math.ceil(totalSlides / slidesPerView);
        
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('gallery-dot');
            if (i === 0) dot.classList.add('active');
            
            if (window.innerWidth < 768) {
                dot.addEventListener('click', () => goToSlide(i));
            } else {
                dot.addEventListener('click', () => goToSlide(i * slidesPerView));
            }
            
            galleryDotsContainer.appendChild(dot);
        }
    }
    
    // Update dots
    function updateDots() {
        if (!galleryDotsContainer) return;
        const dots = galleryDotsContainer.querySelectorAll('.gallery-dot');
        
        if (window.innerWidth < 768) {
            // Mobile: highlight current slide dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        } else {
            // Desktop: highlight current group dot
            const activeDotIndex = Math.floor(currentIndex / slidesPerView);
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeDotIndex);
            });
        }
    }
    
    // Go to specific slide
    function goToSlide(index) {
        const maxIndex = totalSlides - slidesPerView;
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        
        const slideWidth = getSlideWidth();
        const scrollAmount = currentIndex * slideWidth;
        
        gallerySlider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
        updateDots();
        updateButtons();
    }
    
    // Next slide
    function nextSlide() {
        if (currentIndex < totalSlides - slidesPerView) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0); // Loop back to start
        }
    }
    
    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(totalSlides - slidesPerView); // Loop to end
        }
    }
    
    // Update button states
    function updateButtons() {
        if (galleryPrev && galleryNext) {
            galleryPrev.style.opacity = currentIndex === 0 ? '0.5' : '1';
            galleryNext.style.opacity = currentIndex >= totalSlides - slidesPerView ? '0.5' : '1';
        }
    }
    
    // Event listeners
    if (galleryNext) {
        galleryNext.addEventListener('click', nextSlide);
    }
    
    if (galleryPrev) {
        galleryPrev.addEventListener('click', prevSlide);
    }
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    gallerySlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    gallerySlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Auto-play disabled - User can manually control with buttons
    // let autoplayInterval;
    // function startAutoplay() {
    //     autoplayInterval = setInterval(nextSlide, 5000);
    // }
    
    // function stopAutoplay() {
    //     clearInterval(autoplayInterval);
    // }
    
    // Auto-play is now disabled for better user control
    // startAutoplay();
    
    // Pause on hover (disabled since autoplay is off)
    // gallerySlider.addEventListener('mouseenter', stopAutoplay);
    // gallerySlider.addEventListener('mouseleave', startAutoplay);
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            slidesPerView = getSlidesPerView();
            createDots();
            goToSlide(0);
        }, 250);
    });
    
    // Initialize
    createDots();
    updateButtons();
    
    console.log('✅ Gallery slider initialized successfully!');
});

console.log('✅ All scripts loaded successfully!');


// ===== PACKAGES - Grid Layout (No Slider) =====
// Packages are displayed in a grid layout
// No slider functionality needed

// Wishlist functionality for modern packages
const wishlistBtnsModern = document.querySelectorAll('.wishlist-btn-modern');
wishlistBtnsModern.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const icon = btn.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.style.background = '#ff6b35';
            btn.style.color = '#fff';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            btn.style.background = '#fff';
            btn.style.color = '#1a1a2e';
        }
    });
});


// ===== ABOUT US MODAL =====
const aboutModal = document.getElementById('aboutModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const aboutUsLink = document.querySelector('a[href="#about"]');

// Open modal when clicking "About Us" in navbar
if (aboutUsLink && aboutModal) {
    aboutUsLink.addEventListener('click', (e) => {
        e.preventDefault();
        aboutModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
}

// Close modal when clicking close button
if (modalClose && aboutModal) {
    modalClose.addEventListener('click', () => {
        aboutModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
}

// Close modal when clicking overlay
if (modalOverlay && aboutModal) {
    modalOverlay.addEventListener('click', () => {
        aboutModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aboutModal && aboutModal.classList.contains('active')) {
        aboutModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});


// ===== NEWSLETTER FORM =====
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Show success message
        alert('Thank you for subscribing! You will receive our latest updates and exclusive travel deals.');
        
        // Reset form
        newsletterForm.reset();
        
        // Optional: Send to WhatsApp or backend
        // const whatsappMessage = `*New Newsletter Subscription*%0A%0A*Email:* ${email}`;
        // const whatsappNumber = '917110101970';
        // window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    });
}

// ===== SCROLL TO TOP FUNCTIONALITY =====
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== VISITING CARD FUNCTIONALITY =====
function openVisitingCard(destination) {
    const modal = document.getElementById('visitingCardModal');
    const image = document.getElementById('visitingCardImage');
    
    // Map destination names to image file names
    const cardMapping = {
        'Chopta Tungnath': 'CHOPTA TUNGNATH TREK.png',
        'Manali': 'Manali.png',
        'Kedarkantha': 'KEDARKANTHA TREK.png',
        'Hampta Pass': 'HAMPTA PASS TREK.png',
        'Kedarnath Dham': 'KEDARNATH.png',
        'Char Dham': 'CHAR DHAM YATRA.png',
        'Jaisalmer': 'JAISALMER DESERT TOUR.png',
        'Rishikesh River Rafting': 'RISHIKESH ADVENTURE TOUR.png',
        'Chakrata Tigerfall': 'CHAKRATA TIGERFALL.png',
        'Kuari Pass Trek': 'KUARI PASS TREK.png',
        'Dayara Bugyal Trek': 'Dayara Bugyal Trek.png',
        'Mcleodganj Triund': 'MCLEODGANJ + TRIUND TREK.png',
        'Jibhi Tirthan Valley': 'JIBHI TIRTHAN VALLEY TOUR.png',
        'Harsil Valley': 'HARSIL VALLEY.png',
        'Auli Chopta Tungnath': 'CHOPTA TUNGNATH TREK.png',
        'Spiti Valley': 'SPITI VALLEY.png',
        'Madhya Maheshwar': 'MADHYA MAHESHWAR.png'
    };
    
    // Get the image file name
    const imageName = cardMapping[destination];
    
    if (imageName) {
        // Set the image source
        image.src = `visiting card/${imageName}`;
        image.alt = `${destination} Visiting Card`;
        
        // Show the modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        alert(`Visiting card for ${destination} is not available yet.`);
    }
}

function closeVisitingCard() {
    const modal = document.getElementById('visitingCardModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function downloadVisitingCard() {
    const image = document.getElementById('visitingCardImage');
    const imageSrc = image.src;
    const imageName = imageSrc.split('/').pop(); // Get filename from URL
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = imageName;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeVisitingCard();
    }
});
