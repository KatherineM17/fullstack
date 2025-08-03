// Navegación móvil
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animación del botón hamburguesa
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Cerrar menú al hacer click en un link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Header sticky effect
const header = document.getElementById('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
});

// Smooth scroll para los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animaciones de entrada (AOS alternative)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) : 0;
            setTimeout(() => {
                entry.target.classList.add('aos-animate');
            }, delay);
        }
    });
}, observerOptions);

// Observar elementos con animación
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Cerrar todos los items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Abrir el item actual si no estaba activo
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Toggle de precios (Mensual/Anual)
const pricingToggle = document.getElementById('pricing-toggle');
const monthlyPrices = document.querySelectorAll('.monthly-price');
const annualPrices = document.querySelectorAll('.annual-price');
const monthlyPeriods = document.querySelectorAll('.monthly-period');
const annualPeriods = document.querySelectorAll('.annual-period');
const annualOnlyElements = document.querySelectorAll('.annual-only');

pricingToggle.addEventListener('click', () => {
    pricingToggle.classList.toggle('active');
    const isAnnual = pricingToggle.classList.contains('active');
    
    if (isAnnual) {
        // Mostrar precios anuales
        monthlyPrices.forEach(price => price.style.display = 'none');
        annualPrices.forEach(price => price.style.display = 'inline');
        monthlyPeriods.forEach(period => period.style.display = 'none');
        annualPeriods.forEach(period => period.style.display = 'inline');
        annualOnlyElements.forEach(element => element.style.display = 'block');
    } else {
        // Mostrar precios mensuales
        monthlyPrices.forEach(price => price.style.display = 'inline');
        annualPrices.forEach(price => price.style.display = 'none');
        monthlyPeriods.forEach(period => period.style.display = 'inline');
        annualPeriods.forEach(period => period.style.display = 'none');
        annualOnlyElements.forEach(element => element.style.display = 'none');
    }
});

// Typing animation para el código
const codeElement = document.querySelector('.typing-animation');
if (codeElement) {
    const originalText = codeElement.textContent;
    let index = 0;
    
    function typeWriter() {
        if (index < originalText.length) {
            codeElement.textContent = originalText.substring(0, index + 1);
            index++;
            setTimeout(typeWriter, 50);
        } else {
            // Reiniciar después de una pausa
            setTimeout(() => {
                index = 0;
                codeElement.textContent = '';
                typeWriter();
            }, 3000);
        }
    }
    
    // Iniciar animación cuando el elemento sea visible
    const codeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                codeObserver.unobserve(entry.target);
            }
        });
    });
    
    codeObserver.observe(codeElement);
}

// Efectos de parallax suave para el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        const speed = 0.5;
        heroImage.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Contador animado para las estadísticas
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Formatear números
        if (target >= 1000) {
            element.textContent = Math.floor(current).toLocaleString() + '+';
        } else if (element.textContent.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (element.textContent.includes('K')) {
            element.textContent = '$' + Math.floor(current) + 'K+';
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 20);
}

// Inicializar contadores cuando sean visibles
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElement = entry.target.querySelector('strong');
            const originalText = statElement.textContent;
            let targetNumber = 0;
            
            // Extraer número del texto
            if (originalText.includes('2,500')) targetNumber = 2500;
            else if (originalText.includes('4.9')) targetNumber = 4.9;
            else if (originalText.includes('85')) targetNumber = 85;
            else if (originalText.includes('5,000')) targetNumber = 5000;
            else if (originalText.includes('15')) targetNumber = 15;
            else if (originalText.includes('50')) targetNumber = 50;
            else if (originalText.includes('55')) targetNumber = 55;
            
            if (targetNumber > 0) {
                statElement.textContent = '0';
                animateCounter(statElement, targetNumber);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
});

// Observar elementos de estadísticas
document.querySelectorAll('.stat, .cta-stat, .instructor-stats .stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Validación simple para formularios (si se añaden)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Manejo de clics en botones CTA
document.querySelectorAll('.btn-primary, .pricing-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.getAttribute('href') === '#' || button.getAttribute('href') === '') {
            e.preventDefault();
            
            // Aquí puedes añadir la lógica para manejar el proceso de inscripción
            // Por ejemplo, abrir un modal o redirigir a una página de pago
            console.log('Botón de inscripción clickeado');
            
            // Simular una acción (puedes reemplazar esto con tu lógica real)
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
            button.style.pointerEvents = 'none';
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> ¡Inscripción exitosa!';
                button.style.background = 'var(--success-color)';
                
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-rocket"></i> ¡Inscríbete Ahora!';
                    button.style.background = '';
                    button.style.pointerEvents = 'auto';
                }, 2000);
            }, 1500);
        }
    });
});

// Efecto de escritura en tiempo real para testimonios
function addTypingEffect() {
    const testimonials = document.querySelectorAll('.testimonial-card p');
    
    testimonials.forEach((testimonial, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    entry.target.textContent = '';
                    entry.target.style.borderRight = '2px solid var(--primary-color)';
                    
                    let i = 0;
                    const typeWriter = () => {
                        if (i < text.length) {
                            entry.target.textContent += text.charAt(i);
                            i++;
                            setTimeout(typeWriter, 30);
                        } else {
                            entry.target.style.borderRight = 'none';
                        }
                    };
                    
                    setTimeout(typeWriter, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(testimonial);
    });
}

// Activar efectos adicionales después de que la página cargue
window.addEventListener('load', () => {
    // addTypingEffect(); // Descomenta si quieres el efecto de escritura en testimonios
    
    // Precargar imágenes importantes
    const importantImages = [
        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    ];
    
    importantImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Manejo de errores para imágenes
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.background = 'linear-gradient(135deg, var(--gray-200), var(--gray-300))';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.innerHTML = '<i class="fas fa-image" style="color: var(--gray-500); font-size: 2rem;"></i>';
    });
});

// Optimización de rendimiento: lazy loading para elementos no críticos
const lazyElements = document.querySelectorAll('.testimonial-card, .benefit-card, .module');

const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.willChange = 'transform';
            lazyObserver.unobserve(entry.target);
        }
    });
}, {
    rootMargin: '100px'
});

lazyElements.forEach(el => lazyObserver.observe(el));