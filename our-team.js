// ===== OUR TEAM PAGE JAVASCRIPT =====

// Counter Animation for Stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// Intersection Observer for Stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                animateCounter(statNumber);
            }
        }
    });
}, { threshold: 0.5 });

// Observe stat cards
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => statsObserver.observe(card));

// Team Card Animation on Scroll
const teamCards = document.querySelectorAll('.team-card');

const teamObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

teamCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    teamObserver.observe(card);
});

// Social Links Click Handler
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Add your social media links here
        console.log('Social link clicked');
    });
});

// Team Contact Click Handler
const teamContactLinks = document.querySelectorAll('.team-contact a');
teamContactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('mailto:') || href.startsWith('tel:')) {
            // Allow default behavior for email and phone links
            return;
        }
        e.preventDefault();
    });
});

// Join Team Button
const joinTeamBtn = document.querySelector('.btn-cta-team');
if (joinTeamBtn) {
    joinTeamBtn.addEventListener('click', () => {
        // Redirect to careers page or open contact form
        window.location.href = 'contact-us.html';
    });
}

// Active Nav Link
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === 'our-team.html' && linkHref === 'our-team.html')) {
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

// Console Message
console.log('%c👥 Our Team - The Daydream Trek', 'font-size: 20px; font-weight: bold; color: #27ae60;');
console.log('%cPage loaded successfully! ✅', 'font-size: 14px; color: #27ae60;');
