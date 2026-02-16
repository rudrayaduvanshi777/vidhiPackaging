// Smooth scrolling for navigation links
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

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Product slider functionality
let currentSlideIndex = 0;
let autoSlideInterval;

function moveSlide(direction) {
    const slider = document.getElementById('productSlider');
    if (!slider) return;
    
    const slides = slider.children;
    const totalSlides = slides.length;
    
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    updateSlider();
    resetAutoSlide();
}

function currentSlide(index) {
    currentSlideIndex = index;
    updateSlider();
    resetAutoSlide();
}

function updateSlider() {
    const slider = document.getElementById('productSlider');
    if (!slider) return;
    
    const dots = document.querySelectorAll('.slider-dot');
    
    slider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveSlide(1);
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initialize auto-slide
startAutoSlide();

// Pause auto-slide when user hovers over slider
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

// Form submission handler
function handleSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    alert(`Thank you, ${name}! We've received your message and will get back to you at ${email} soon.`);
    e.target.reset();
}

// Newsletter form handler
function handleNewsletter(e) {
    e.preventDefault();
    
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    alert(`Thank you for subscribing! We'll send updates to ${email}`);
    e.target.reset();
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }
    
    lastScroll = currentScroll;
});

// Animate elements on scroll
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

// Observe all goal cards, certificate cards, and info cards
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.goal-card, .certificate-card, .info-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Keyboard navigation for slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveSlide(-1);
    } else if (e.key === 'ArrowRight') {
        moveSlide(1);
    }
});

// Add touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            moveSlide(1);
        } else {
            moveSlide(-1);
        }
    }
}