// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 600);
    }, 1500);
});

// Navigation Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate menu bars
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => bar.classList.toggle('active'));
});

// Close menu when clicking on a menu item
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.padding = '5px 0';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.padding = '15px 0';
        nav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    }
});

// Typing effect
const texts = [
    'Duta Anak Nasional',
    'Public Speaker',
    'Peneliti Muda',
    'Aktivis Anak & Budaya',
    'Inovator Digital'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let erasingDelay = 50;
let newTextDelay = 2000;

function typeText() {
    const currentText = texts[textIndex];
    const typedTextElement = document.getElementById('typed-text');
    
    if (isDeleting) {
        // Remove character
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = erasingDelay;
    } else {
        // Add character
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }
    
    // If word is complete
    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end
        typingDelay = newTextDelay;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        // Move to next word
        textIndex++;
        // Reset if at the last word
        if (textIndex >= texts.length) {
            textIndex = 0;
        }
    }
    
    setTimeout(typeText, typingDelay);
}

// Start the typing effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
});

// Animate skill bars on scroll
const skillLevels = document.querySelectorAll('.skill-level');
skillLevels.forEach(level => {
    level.style.width = '0';
});

const animateSkills = () => {
    const skills = document.querySelector('.skills');
    if (!skills) return;
    
    const skillsPosition = skills.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (skillsPosition < screenPosition) {
        skillLevels.forEach(level => {
            const width = level.style.getPropertyValue('--width') || level.style.width;
            level.style.width = width;
        });
    }
};

// Back to Top button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    animateSkills();
    
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Mohon lengkapi semua field!');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message and clear the form
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Terima kasih, ${name}! Pesan Anda telah dikirim.</p>
        `;
        
        // Add success message to form
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
        
        // Reset form after 5 seconds (optional)
        setTimeout(() => {
            contactForm.innerHTML = `
                <div class="form-group">
                    <input type="text" id="name" placeholder="Nama Lengkap" required>
                </div>
                <div class="form-group">
                    <input type="email" id="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <input type="text" id="subject" placeholder="Subjek" required>
                </div>
                <div class="form-group">
                    <textarea id="message" placeholder="Pesan" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn primary-btn">Kirim Pesan</button>
            `;
        }, 5000);
    });
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('active');
        }
    });
};

// Add fade-in classes to elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionHeader = section.querySelector('.section-header');
        if (sectionHeader) {
            sectionHeader.classList.add('fade-in-element');
        }
        
        const contentElements = section.querySelectorAll('.achievement-card, .innovation-card, .product-card, .timeline-item');
        contentElements.forEach(element => {
            element.classList.add('fade-in-element');
        });
    });
    
    // Initial check for elements in view on page load
    animateOnScroll();
    
    // Add scroll event for animation
    window.addEventListener('scroll', animateOnScroll);
});

// Modal popup for projects (can be added if needed)
const setupProjectModals = () => {
    const projectItems = document.querySelectorAll('.product-card');
    
    projectItems.forEach(item => {
        const overlay = item.querySelector('.product-overlay');
        
        overlay.addEventListener('click', (e) => {
            if (e.target.classList.contains('overlay-btn')) {
                // External link, do nothing as it will navigate to the link
            } else {
                e.preventDefault();
                
                // Show project details in a modal (would require modal HTML and CSS)
                // For now, just navigate to the link
                const link = overlay.querySelector('.overlay-btn').getAttribute('href');
                window.open(link, '_blank');
            }
        });
    });
};

// Setup modals when DOM is loaded
document.addEventListener('DOMContentLoaded', setupProjectModals);

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.scrollY;
    
    if (hero) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// Add CSS animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add animation to achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('animate-fade-in');
    });
    
    // Add animation to innovation cards
    const innovationCards = document.querySelectorAll('.innovation-card');
    innovationCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('animate-fade-in');
    });
    
    // Add animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
        item.classList.add('animate-fade-in');
    });
});

// Add preloading for images to improve performance
const preloadImages = () => {
    const imagesToPreload = [
        'https://via.placeholder.com/300x300.png?text=Mifta+Yoga',
        'https://via.placeholder.com/300x200?text=SEBULA+App',
        'https://via.placeholder.com/300x200?text=Kartu+Edukasi',
        'https://via.placeholder.com/300x200?text=E-Book+Karya'
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// Preload images when DOM is loaded
document.addEventListener('DOMContentLoaded', preloadImages);

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed header
                behavior: 'smooth'
            });
            
            // Update URL without page jump
            history.pushState(null, null, targetId);
        }
    });
});

// Add active class to current nav item based on scroll position
const updateActiveNavItem = () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href').substring(1);
        
        if (href === currentSection) {
            item.classList.add('active');
        }
    });
};

// Update active nav item on scroll
window.addEventListener('scroll', updateActiveNavItem);

// Initialize AOS (Animate on Scroll) if needed
// This would require the AOS library to be included
// You could replace this with your own animation logic
const initAnimations = () => {
    // Check if AOS is available (would require external library)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initAnimations);