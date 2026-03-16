/* ============================
   PROTOCOLO ALIVIO - Scripts
   ============================ */

document.addEventListener('DOMContentLoaded', () => {

    // ===== Lead Form Submission (MailerLite Integration) =====
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
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
            submitBtn.querySelector('.btn-text').textContent = 'Conectando...';
            submitBtn.disabled = true;

            try {
                // MailerLite JSONP Endpoint
                const accountId = '2186246';
                const formId = '181783285933802773';
                const url = `https://assets.mailerlite.com/jsonp/${accountId}/forms/${formId}/subscribe`;

                // Prepare Data
                const formData = new FormData();
                formData.append('fields[email]', email);
                formData.append('ajax', 1);

                // Use fetch with no-cors as a simple beacon or try regular fetch
                // JSONP is better but for simple capture, a hidden form or background fetch works
                await fetch(url, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors' // This avoids CORS issues but doesn't return response
                });

                // Success or just Proceed
                submitBtn.querySelector('.btn-text').textContent = '¡Listo!';
                
                setTimeout(() => {
                    // Open the actual app
                    window.open('https://proyecto-alivio.lovable.app/', '_blank');
                    
                    // Reset UI
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                    emailInput.value = '';
                }, 1000);

            } catch (error) {
                console.error('Error connecting to MailerLite:', error);
                // Fallback: Still open the app so we don't block the user
                window.open('https://proyecto-alivio.lovable.app/', '_blank');
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                submitBtn.querySelector('.btn-text').textContent = originalText;
            }
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

    // ===== Social Proof Popups Logic =====
    function initSocialProof() {
        const container = document.getElementById('social-proof-container');
        if (!container) return;

        const fakeUsers = [
            { name: "María de Colombia", action: "adquirió Protocolo Premium" },
            { name: "Carlos de México", action: "adquirió Protocolo Premium" },
            { name: "Ana de España", action: "se unió a Protocolo Premium" },
            { name: "José de Argentina", action: "desbloqueó el Acceso Total" },
            { name: "Laura de Chile", action: "adquirió Protocolo Premium" },
            { name: "Miguel de Perú", action: "desbloqueó el Acceso Total" },
            { name: "Sofía de Ecuador", action: "se unió a Protocolo Premium" },
            { name: "Diego de USA", action: "adquirió Protocolo Premium" }
        ];

        const times = ["Hace 1 min", "Hace 2 min", "Hace unos instantes", "Justo ahora"];

        function createPopup(userData, timeInfo) {
            const popup = document.createElement('div');
            popup.className = 'social-proof-popup';
            
            // Emoji aleatorio
            const emojis = ['🎉', '🌟', '💚', '🔥'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

            popup.innerHTML = `
                <div class="sp-icon">${randomEmoji}</div>
                <div class="sp-content">
                    <p class="sp-title"><strong>${userData.name}</strong> ${userData.action}</p>
                    <p class="sp-time">${timeInfo}</p>
                </div>
            `;

            container.appendChild(popup);

            // Animate In
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    popup.classList.add('show');
                });
            });

            // Animate Out after 6 seconds
            setTimeout(() => {
                popup.classList.remove('show');
                // Remove from DOM after transition
                setTimeout(() => {
                    if (container.contains(popup)) {
                        container.removeChild(popup);
                    }
                }, 500);
            }, 6000);
        }

        function triggerRandomPopup() {
            const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
            const randomTime = times[Math.floor(Math.random() * times.length)];
            createPopup(randomUser, randomTime);
            
            // Randomize next popup between 25s and 35s (avg 30s)
            const nextDelay = Math.floor(Math.random() * (35000 - 25000 + 1)) + 25000;
            setTimeout(triggerRandomPopup, nextDelay);
        }

        // Trigger first popup after 10 seconds of landing
        setTimeout(triggerRandomPopup, 10000);
    }

    initSocialProof();

});
