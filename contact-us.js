// ===== CONTACT US PAGE JAVASCRIPT =====

// Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            destination: document.getElementById('destination').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            people: document.getElementById('people').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Log form data (for testing)
            console.log('Form submitted:', formData);
            
            // Optional: Send WhatsApp message
            sendWhatsAppMessage(formData);
        }, 1500);
    });
}

// Show Success Message
function showSuccessMessage() {
    // Create success message element
    let successMsg = document.querySelector('.success-message');
    
    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. We will contact you soon!';
        contactForm.appendChild(successMsg);
    }
    
    successMsg.classList.add('show');
    
    // Hide after 5 seconds
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 5000);
}

// Send WhatsApp Message
function sendWhatsAppMessage(data) {
    const phoneNumber = '917110101970';
    const message = `
🏔️ *New Trip Inquiry - The Daydream Trek*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
🌍 *Destination:* ${data.destination}
📅 *Start Date:* ${data.startDate}
📅 *End Date:* ${data.endDate}
👥 *No. of People:* ${data.people}

💬 *Message:*
${data.message}
    `.trim();
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Optional: Auto-open WhatsApp (uncomment if needed)
    // window.open(whatsappUrl, '_blank');
}

// Phone Number Formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `+${value}`;
            } else if (value.length <= 6) {
                value = `+${value.slice(0, 3)}(${value.slice(3)}`;
            } else if (value.length <= 9) {
                value = `+${value.slice(0, 3)}(${value.slice(3, 6)}) ${value.slice(6)}`;
            } else {
                value = `+${value.slice(0, 3)}(${value.slice(3, 6)}) ${value.slice(6, 9)}-${value.slice(9, 13)}`;
            }
        }
        e.target.value = value;
    });
}

// Date Validation
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');

if (startDateInput && endDateInput) {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    startDateInput.setAttribute('min', today);
    endDateInput.setAttribute('min', today);
    
    // Validate end date is after start date
    startDateInput.addEventListener('change', () => {
        endDateInput.setAttribute('min', startDateInput.value);
        if (endDateInput.value && endDateInput.value < startDateInput.value) {
            endDateInput.value = '';
        }
    });
}

// Smooth Scroll for Map
const mapContainer = document.querySelector('.map-container');
if (mapContainer) {
    mapContainer.addEventListener('click', () => {
        mapContainer.style.pointerEvents = 'auto';
    });
}

// Input Animation
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Active Nav Link
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === 'contact-us.html' && linkHref === 'contact-us.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Console Message
console.log('%c📞 Contact Us - The Daydream Trek', 'font-size: 20px; font-weight: bold; color: #27ae60;');
console.log('%cPage loaded successfully! ✅', 'font-size: 14px; color: #27ae60;');
