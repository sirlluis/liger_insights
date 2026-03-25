document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                navbar.style.padding = '0.7rem 0';
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
                navbar.style.padding = '1rem 0';
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }

    // Smooth scrolling for anchor links (if browser doesn't support CSS scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple form handling with animation
    const form = document.getElementById('form-contacto');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        // Animación de carga
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        btn.style.opacity = '0.9';
        btn.disabled = true;

        try {
            // Envío real a Formspree
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Éxito
                btn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje Enviado!';
                btn.style.background = 'linear-gradient(135deg, #00b09b, #96c93d)';
                btn.style.boxShadow = '0 4px 15px rgba(0, 176, 155, 0.3)';
                form.reset();
            } else {
                // Error en el envío
                btn.innerHTML = '<i class="fas fa-times"></i> Error al enviar';
                btn.style.background = 'linear-gradient(135deg, #ff416c, #ff4b2b)';
            }
        } catch (error) {
            btn.innerHTML = '<i class="fas fa-times"></i> Error al enviar';
            btn.style.background = 'linear-gradient(135deg, #ff416c, #ff4b2b)';
        }

        // Reset button after 4 seconds
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.style.boxShadow = '';
            btn.style.opacity = '1';
            btn.disabled = false;
        }, 4000);
    });
}

    // Initialize simple scroll reveal animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to elements
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .about-content, .contact-info, .contact-form');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});
