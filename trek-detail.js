// ===== TREK DETAIL PAGE JAVASCRIPT =====

// Tab Switching Functionality
const trekTabs = document.querySelectorAll('.trek-tab');
const trekSubTabs = document.querySelectorAll('.trek-sub-tab');

trekTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        trekTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Get tab data
        const tabData = tab.getAttribute('data-tab');
        console.log('Tab clicked:', tabData);
        
        // Here you can add logic to show/hide different content based on tab
    });
});

trekSubTabs.forEach(subTab => {
    subTab.addEventListener('click', () => {
        // Remove active class from all sub tabs
        trekSubTabs.forEach(st => st.classList.remove('active'));
        
        // Add active class to clicked sub tab
        subTab.classList.add('active');
        
        console.log('Sub tab clicked:', subTab.textContent);
    });
});

// Booking form functionality is now handled by the navbar booking modal
// No separate booking form on trek pages

// Smooth Scroll for Destination Links
const destinationLinks = document.querySelectorAll('.destinations-list a');

destinationLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // If link has href="#", prevent default
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });
});

// Sticky Sidebar on Scroll
const sidebar = document.querySelector('.trek-sidebar-section');
const content = document.querySelector('.trek-content-section');

if (sidebar && content) {
    window.addEventListener('scroll', () => {
        const contentHeight = content.offsetHeight;
        const sidebarHeight = sidebar.offsetHeight;
        const scrollTop = window.pageYOffset;
        
        // Add scroll effect if needed
        if (scrollTop > 100) {
            sidebar.style.transform = 'translateY(0)';
        }
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe itinerary items
const itineraryItems = document.querySelectorAll('.itinerary-item');
itineraryItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Book Now Button in Offer Banner - Opens Booking Modal
const btnBookNow = document.querySelector('.btn-book-now');

if (btnBookNow) {
    btnBookNow.addEventListener('click', () => {
        // Open the booking modal from navbar
        const bookingModal = document.getElementById('bookingModal');
        if (bookingModal) {
            bookingModal.style.display = 'flex';
        }
    });
}

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        }
        50% {
            transform: scale(1.02);
            box-shadow: 0 15px 50px rgba(39, 174, 96, 0.2);
        }
    }
`;
document.head.appendChild(style);

// Console Message
console.log('%c🏔️ Chakrata Tigerfalls - The Daydream Trek', 'font-size: 20px; font-weight: bold; color: #27ae60;');
console.log('%cPage loaded successfully! ✅', 'font-size: 14px; color: #27ae60;');
