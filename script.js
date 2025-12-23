// Menú móvil
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-bars');
    this.querySelector('i').classList.toggle('fa-times');
});

// Cerrar menú al hacer clic en un enlace (para móviles)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        document.querySelector('.mobile-menu-btn i').classList.add('fa-bars');
        document.querySelector('.mobile-menu-btn i').classList.remove('fa-times');
    });
});

// Formulario de contacto - Solución para GitHub Pages (sin PHP)
document.getElementById('formContacto').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const nombre = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    
    // Simulación de envío con efecto dorado
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        backdrop-filter: blur(10px);
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #000000, #0a0a0a);
            padding: 50px 40px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            border: 2px solid #ffd700;
            box-shadow: 0 0 40px rgba(255, 215, 0, 0.6);
            position: relative;
            overflow: hidden;
        ">
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 5px;
                background: linear-gradient(90deg, #ffd700, #ffed4e, #ffd700);
            "></div>
            <h3 style="
                color: #ffd700; 
                margin-bottom: 20px;
                font-family: 'Cinzel', serif;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
            ">¡Mensaje Enviado Exitosamente!</h3>
            <p style="margin-bottom: 20px; color: #e0e0e0;">
                Gracias <strong style="color: #ffd700;">${nombre}</strong>, hemos recibido tu mensaje.
            </p>
            <p style="margin-bottom: 30px; color: #e0e0e0;">
                Te contactaremos pronto en <strong style="color: #ffd700;">${email}</strong> para discutir tu proyecto visionario.
            </p>
            <button id="closeModal" class="btn" style="
                padding: 12px 30px;
                background: linear-gradient(90deg, #ffd700, #ffed4e);
                color: #000;
                font-weight: bold;
            ">Continuar</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Resetear formulario
    this.reset();
    
    // Cerrar modal
    document.getElementById('closeModal').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(e) {
        if(e.target === this) {
            document.body.removeChild(modal);
        }
    });
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de header al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if(window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.8)';
        header.style.borderBottom = '1px solid rgba(255, 215, 0, 0.3)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = 'none';
        header.style.borderBottom = '1px solid rgba(255, 215, 0, 0.2)';
    }
});

// Crear partículas animadas doradas
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 60;
    
    for(let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posición aleatoria
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animation = `float ${duration}s infinite ${delay}s`;
        
        // Color dorado con variaciones
        const goldVariations = ['#ffd700', '#ffed4e', '#ffdf00', '#f8d500'];
        const goldColor = goldVariations[Math.floor(Math.random() * goldVariations.length)];
        
        particle.style.backgroundColor = goldColor;
        particle.style.boxShadow = `0 0 8px ${goldColor}, 0 0 16px ${goldColor}`;
        
        // Opacidad aleatoria para efecto más realista
        particle.style.opacity = Math.random() * 0.7 + 0.3;
        
        particlesContainer.appendChild(particle);
    }
}

// Animación de aparición de elementos al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Añadir un pequeño retraso secuencial para elementos de la cuadrícula
                if(entry.target.classList.contains('service-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1;
                    entry.target.style.transitionDelay = `${delay}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.service-card, .about-text, .about-image, .contact-info, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Efecto de escritura para el título principal
function typeWriterEffect() {
    const title = document.querySelector('.hero h1');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Solo activar en pantallas grandes
    if(window.innerWidth > 768) {
        setTimeout(typeWriter, 500);
    } else {
        title.textContent = originalText;
    }
}

// Efecto de brillo aleatorio en elementos dorados
function randomGlowEffect() {
    const goldElements = document.querySelectorAll('.service-icon, .contact-icon, .logo i');
    
    setInterval(() => {
        goldElements.forEach(element => {
            if(Math.random() > 0.7) {
                element.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.9)';
                setTimeout(() => {
                    element.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.7)';
                }, 300);
            }
        });
    }, 2000);
}

// Inicializar todo cuando la página cargue
window.addEventListener('load', function() {
    createParticles();
    initScrollAnimations();
    typeWriterEffect();
    randomGlowEffect();
    
    // Añadir clase de animación inicial
    document.body.classList.add('loaded');
});