// ===== GALLERY PAGE JAVASCRIPT =====

// Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter gallery items
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                item.classList.remove('hide');
                // Re-trigger animation
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = 'fadeInScale 0.6s ease both';
                }, 10);
            } else {
                item.classList.add('hide');
            }
        });
    });
});

// Image Modal Functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.querySelector('.modal-close');
const galleryCards = document.querySelectorAll('.gallery-card');
const prevBtn = document.querySelector('.modal-prev');
const nextBtn = document.querySelector('.modal-next');

let currentImageIndex = 0;
let visibleImages = [];

// Update visible images array
function updateVisibleImages() {
    visibleImages = Array.from(galleryItems)
        .filter(item => !item.classList.contains('hide'))
        .map(item => ({
            img: item.querySelector('img'),
            title: item.querySelector('.gallery-info h3').textContent,
            description: item.querySelector('.gallery-info p').textContent
        }));
}

// Open modal
galleryCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        updateVisibleImages();
        
        // Find the index in visible images
        const clickedImg = card.querySelector('img');
        currentImageIndex = visibleImages.findIndex(item => item.img === clickedImg);
        
        if (currentImageIndex !== -1) {
            showImage(currentImageIndex);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Show image in modal
function showImage(index) {
    if (index >= 0 && index < visibleImages.length) {
        const imageData = visibleImages[index];
        modalImg.src = imageData.img.src;
        modalCaption.textContent = `${imageData.title} - ${imageData.description}`;
        currentImageIndex = index;
    }
}

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal on background click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Previous image
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
    showImage(currentImageIndex);
});

// Next image
nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
    showImage(currentImageIndex);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
            showImage(currentImageIndex);
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
            showImage(currentImageIndex);
        }
    }
});

// Scroll Animation for Gallery Items
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

galleryItems.forEach(item => {
    galleryObserver.observe(item);
});

// Active Nav Link
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === 'gallery.html' && linkHref === 'gallery.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Smooth Scroll for Internal Links
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

// Initialize visible images on page load
updateVisibleImages();

// Console Message
console.log('%c📸 Gallery - The Daydream Trek', 'font-size: 20px; font-weight: bold; color: #27ae60;');
console.log('%cGallery loaded successfully! ✅', 'font-size: 14px; color: #27ae60;');
