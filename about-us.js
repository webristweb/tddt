// ===== ABOUT US PAGE JAVASCRIPT =====

// Smooth page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.about-images-section, .step-card, .testimonial-card-about');
animatedElements.forEach(el => {
    fadeInObserver.observe(el);
});

// WhatsApp button functionality - Now opens booking modal
const discoverBtn = document.querySelector('.btn-discover');
if (discoverBtn) {
    // This will be handled by the booking modal code below
    // discoverBtn.addEventListener('click', () => {
    //     const phoneNumber = '917110101970';
    //     const message = 'Hi! I want to know more about The Daydream Trek.';
    //     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    //     window.open(whatsappUrl, '_blank');
    // });
}

// Contact info click
const contactNumber = document.querySelector('.contact-number');
if (contactNumber) {
    contactNumber.addEventListener('click', () => {
        window.location.href = 'tel:+917110101970';
    });
    contactNumber.style.cursor = 'pointer';
}

// Read More functionality
const readMoreLinks = document.querySelectorAll('.read-more-inline');
readMoreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const card = link.closest('.testimonial-card-about');
        const paragraph = card.querySelector('p');
        
        if (paragraph.style.webkitLineClamp === 'unset') {
            paragraph.style.webkitLineClamp = '3';
            link.innerHTML = 'Read More <i class="fas fa-arrow-right"></i>';
        } else {
            paragraph.style.webkitLineClamp = 'unset';
            link.innerHTML = 'Read Less <i class="fas fa-arrow-up"></i>';
        }
    });
});

// Helpful button functionality
const helpfulBtns = document.querySelectorAll('.helpful-btn');
helpfulBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const icon = btn.querySelector('i');
        const currentCount = parseInt(btn.textContent.match(/\d+/)[0]);
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.innerHTML = `<i class="fas fa-thumbs-up"></i> Helpful (${currentCount + 1})`;
            btn.style.background = '#27ae60';
            btn.style.color = '#fff';
            btn.style.borderColor = '#27ae60';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            btn.innerHTML = `<i class="far fa-thumbs-up"></i> Helpful (${currentCount - 1})`;
            btn.style.background = '#fff';
            btn.style.color = '#1a1a2e';
            btn.style.borderColor = '#e0e0e0';
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.about-hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active class to current nav link
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === 'about-us.html' && linkHref === 'about-us.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Performance optimization - Lazy load images
const images = document.querySelectorAll('img[loading="lazy"]');
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

// Console message
console.log('%c🏔️ About Us - The Daydream Trek', 'font-size: 20px; font-weight: bold; color: #ff6b35;');
console.log('%cPage loaded successfully! ✅', 'font-size: 14px; color: #27ae60;');


// ===== BOOKING MODAL FUNCTIONALITY =====
const bookButtons = document.querySelectorAll('.btn-book, .btn-discover');
const bookingModalOverlay = document.getElementById('bookingModalOverlay');
const bookingModal = document.getElementById('bookingModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const bookingForm = document.getElementById('bookingForm');

// Open booking modal
bookButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add a click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        // Open modal
        bookingModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal when clicking close button
if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
        bookingModalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking overlay
if (bookingModalOverlay) {
    bookingModalOverlay.addEventListener('click', (e) => {
        if (e.target === bookingModalOverlay) {
            bookingModalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModalOverlay && bookingModalOverlay.classList.contains('active')) {
        bookingModalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
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
