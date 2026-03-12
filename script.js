/* ============================
   PROTOCOLO ALIVIO - Scripts
   ============================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== Lead Form Submission =====
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('emailInput');
            const submitBtn = document.getElementById('submitBtn');
            const email = emailInput.value.trim();
            
            if (!email || !isValidEmail(email)) {
                shakeElement(emailInput.parentElement);
                return;
            }

            // Animate button
            submitBtn.classList.add('loading');
            const originalText = submitBtn.querySelector('.btn-text').textContent;
            submitBtn.querySelector('.btn-text').textContent = 'Redirigiendo...';
            submitBtn.disabled = true;

            // Simulate submission (ready for Hostinger Reach integration)
            setTimeout(() => {
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                
                // Log lead (for analytics)
                console.log('Lead captured for future Hostinger Reach integration:', email);
                
                // Open the actual app
                window.open('https://proyecto-alivio.lovable.app/', '_blank');
                
                // Clear form
                emailInput.value = '';
            }, 800);
        });
    }

    // ===== Navbar Scroll Effect =====
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // ===== Mobile Menu Toggle =====
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const links = document.querySelector('.nav-links');
            const cta = document.querySelector('.nav-cta');
            if (links) links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
        });
    }



    // ===== Scroll Animations (Intersection Observer) =====
    const animateElements = document.querySelectorAll(
        '.feature-card, .story-image-wrapper, .story-content, .premium-content, .premium-card, .section-header'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        observer.observe(el);
    });

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const offset = 80; // navbar height
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Parallax Effect on Hero Shapes =====
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        shapes.forEach((shape, i) => {
            const speed = (i + 1) * 8;
            const xMove = x * speed;
            const yMove = y * speed;
            shape.style.transform = `translate(${xMove}px, ${yMove}px)`;
        });
    }, { passive: true });

    // ===== Utility Functions =====
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function shakeElement(el) {
        el.style.animation = 'shake 0.5s ease-in-out';
        el.addEventListener('animationend', () => {
            el.style.animation = '';
        }, { once: true });
    }

    // Add shake keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-6px); }
            40% { transform: translateX(6px); }
            60% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
        }
        .loading {
            opacity: 0.7;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

});
