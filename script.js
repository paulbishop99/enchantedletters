// Enchanted Letters Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for anchor links
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
    
    // Button click handlers
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('Start Your Journey') || buttonText.includes('Choose Your Story')) {
                // Scroll to stories section
                const storiesSection = document.querySelector('.stories');
                if (storiesSection) {
                    storiesSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (buttonText.includes('Learn More')) {
                // Scroll to features section
                const featuresSection = document.querySelector('.features');
                if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (buttonText.includes('Subscribe')) {
                // Handle subscription (placeholder)
                showSubscriptionModal(buttonText);
            } else if (buttonText.includes('Give as Gift')) {
                // Handle gift subscription (placeholder)
                showGiftModal();
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature, .story-card, .testimonial');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .feature, .story-card, .testimonial {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .story-card:hover .story-icon {
            transform: scale(1.1);
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'white';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Placeholder functions for subscription modals
    function showSubscriptionModal(buttonText) {
        let storyType = 'story';
        if (buttonText.includes('1️⃣')) {
            storyType = 'Victorian Mystery';
        } else if (buttonText.includes('2️⃣')) {
            storyType = 'WWII Romance';
        } else if (buttonText.includes('3️⃣')) {
            storyType = 'Fantasy Adventure';
        }
        
        alert(`Thank you for your interest in ${storyType}! This would normally redirect to a subscription page. For this demo, we're showing this message instead.`);
    }
    
    function showGiftModal() {
        alert('Gift subscriptions are a wonderful way to share the magic of storytelling! This would normally open a gift subscription form.');
    }
    
    // Add some interactive effects
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Testimonial rotation (optional enhancement)
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function highlightTestimonial() {
        testimonials.forEach((testimonial, index) => {
            if (index === currentTestimonial) {
                testimonial.style.transform = 'scale(1.05)';
                testimonial.style.boxShadow = '0 10px 30px rgba(159, 122, 234, 0.3)';
            } else {
                testimonial.style.transform = 'scale(1)';
                testimonial.style.boxShadow = 'none';
            }
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }
    
    // Highlight testimonials every 3 seconds
    if (testimonials.length > 0) {
        setInterval(highlightTestimonial, 3000);
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    console.log('Enchanted Letters website loaded successfully! ✨📧');
});

