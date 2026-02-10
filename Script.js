// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initContactForm();
    initSkillAnimations();
    initProjectAnimations();
    initTypingEffect();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        // Navbar background on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Reveal animations on scroll
        revealOnScroll();
    });
}

// Reveal elements on scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!validateForm(data)) {
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual implementation)
            setTimeout(() => {
                showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    hideFormMessage();
                }, 5000);
            }, 2000);
        });
    }
}

// Form validation
function validateForm(data) {
    const { name, email, subject, message } = data;
    
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (message.length < 10) {
        showFormMessage('Message must be at least 10 characters long.', 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Hide form message
function hideFormMessage() {
    const formMessage = document.getElementById('formMessage');
    formMessage.style.display = 'none';
}

// Skill bar animations
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                const width = bar.style.width;
                bar.style.width = '0';
                bar.classList.add('animated');
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    };
    
    // Initial check
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
}

// Project card animations
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Add reveal class for scroll animations
        card.classList.add('reveal');
        
        // Stagger animation delays
        card.style.transitionDelay = `${index * 0.1}s`;
        
        // Add hover effect with mouse tracking
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid var(--primary-color)';
        
        let index = 0;
        const typeSpeed = 100;
        
        function type() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(type, typeSpeed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing after page load
        setTimeout(type, 500);
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 800;
    }
});

// Add reveal class to elements that should animate on scroll
document.addEventListener('DOMContentLoaded', function() {
    const elementsToReveal = [
        '.about-content',
        '.skill-category',
        '.project-card',
        '.contact-content'
    ];
    
    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('reveal');
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    });
    
    // Add CSS for reveal animations
    const style = document.createElement('style');
    style.textContent = `
        .reveal.active {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based functions that don't need to run on every pixel
}, 10));

// Add loading states for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
    
    // Add error handling
    img.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
    });
});

// Add CSS for loaded images
const imageStyle = document.createElement('style');
imageStyle.textContent = `
    img {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    img.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(imageStyle);

// Console Easter egg
console.log('%c👨‍💻 Welcome to my portfolio!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cFeel free to explore the code and learn more about my work!', 'font-size: 14px; color: #718096;');
console.log('%cGitHub: https://github.com', 'font-size: 12px; color: #a0aec0;');
