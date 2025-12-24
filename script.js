// ============================================
// KOR DYNASTY - SCRIPT PRINCIPAL
// ============================================

// CONFIGURACIÓN EMAILJS - REEMPLAZA CON TUS DATOS
const EMAILJS_PUBLIC_KEY = 'b9JLk-SkPVbChST9y';
const EMAILJS_SERVICE_ID = 'service_9huc6w1';
const EMAILJS_TEMPLATE_ID = 'template_183u5gu';

// Inicializar EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);
console.log('✅ EmailJS inicializado correctamente');

// ============================================
// MENÚ MÓVIL
// ============================================
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    const icon = this.querySelector('i');
    
    navLinks.classList.toggle('active');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        const menuBtnIcon = document.querySelector('.mobile-menu-btn i');
        
        navLinks.classList.remove('active');
        menuBtnIcon.classList.add('fa-bars');
        menuBtnIcon.classList.remove('fa-times');
    });
});

// ============================================
// FORMULARIO DE CONTACTO CON EMAILJS
// ============================================
document.getElementById('formContacto').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const nombre = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const asunto = this.querySelectorAll('input[type="text"]')[1].value;
    const mensaje = this.querySelector('textarea').value;
    
    // Validación básica
    if (!nombre || !email || !mensaje) {
        showModal('error', 'Por favor, completa todos los campos requeridos.');
        return;
    }
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showModal('error', 'Por favor, ingresa un email válido.');
        return;
    }
    
    // Mostrar modal de carga
    const loadingModal = showModal('loading', 'Enviando tu mensaje...');
    
    // Preparar parámetros para EmailJS
    const templateParams = {
        from_name: nombre,
        from_email: email,
        subject: asunto || 'Consulta desde KOR DYNASTY',
        message: mensaje,
        to_name: 'KOR DYNASTY',
        reply_to: email,
        date: new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    // Enviar email usando EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function(response) {
            console.log('✅ Email enviado exitosamente!', response.status, response.text);
            
            // Cerrar modal de carga
            if (loadingModal && loadingModal.parentNode) {
                document.body.removeChild(loadingModal);
            }
            
            // Mostrar modal de éxito
            showModal('success', `¡Gracias ${nombre}! Tu mensaje ha sido enviado correctamente. Te responderemos a ${email} en breve.`);
            
            // Limpiar formulario
            e.target.reset();
            
            // Restaurar estilos de los inputs
            document.querySelectorAll('#formContacto input, #formContacto textarea').forEach(input => {
                input.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                input.style.boxShadow = 'none';
            });
            
        }, function(error) {
            console.log('❌ Error al enviar email:', error);
            
            // Cerrar modal de carga
            if (loadingModal && loadingModal.parentNode) {
                document.body.removeChild(loadingModal);
            }
            
            // Mostrar modal de error
            let errorMessage = 'Ocurrió un error al enviar tu mensaje. ';
            if (error.text) {
                errorMessage += `Error: ${error.text}`;
            }
            showModal('error', errorMessage);
        });
});

// ============================================
// FUNCIÓN PARA MOSTRAR MODALES
// ============================================
function showModal(type, message = '') {
    // Eliminar modal existente si hay
    const existingModal = document.querySelector('.custom-modal-overlay');
    if (existingModal) {
        document.body.removeChild(existingModal);
    }
    
    // Crear overlay del modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'custom-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(15px);
        animation: fadeIn 0.3s ease-out;
    `;
    
    let modalContent = '';
    
    switch(type) {
        case 'loading':
            modalContent = `
                <div class="modal-content loading-modal" style="
                    background: linear-gradient(145deg, #000000, #0a0a0a);
                    padding: 50px 40px;
                    border-radius: 20px;
                    max-width: 500px;
                    width: 90%;
                    text-align: center;
                    border: 2px solid #ffd700;
                    box-shadow: 0 0 40px rgba(255, 215, 0, 0.5);
                    position: relative;
                    overflow: hidden;
                    animation: modalAppear 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                ">
                    <!-- Efecto de brillo superior -->
                    <div class="modal-shine" style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 4px;
                        background: linear-gradient(90deg, 
                            transparent, 
                            #ffd700, 
                            #ffed4e, 
                            #ffd700, 
                            transparent);
                        animation: shine 3s infinite;
                    "></div>
                    
                    <!-- Loader animado -->
                    <div class="modal-loader" style="
                        width: 80px;
                        height: 80px;
                        margin: 0 auto 30px;
                        position: relative;
                    ">
                        <div class="loader-outer" style="
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            border: 4px solid transparent;
                            border-top: 4px solid #ffd700;
                            border-right: 4px solid #ffed4e;
                            border-radius: 50%;
                            animation: spin 1.5s linear infinite;
                            box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
                        "></div>
                        <div class="loader-inner" style="
                            position: absolute;
                            width: 70%;
                            height: 70%;
                            top: 15%;
                            left: 15%;
                            border: 3px solid transparent;
                            border-bottom: 3px solid #ffed4e;
                            border-left: 3px solid #ffd700;
                            border-radius: 50%;
                            animation: spinReverse 2s linear infinite;
                        "></div>
                        <i class="fas fa-paper-plane" style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            font-size: 30px;
                            color: #ffd700;
                            text-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
                        "></i>
                    </div>
                    
                    <h3 style="
                        color: #ffd700; 
                        margin-bottom: 20px;
                        font-family: 'Cinzel', serif;
                        font-size: 2rem;
                        text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                    ">Enviando Mensaje...</h3>
                    
                    <p style="
                        color: #e0e0e0;
                        font-size: 1.1rem;
                        opacity: 0.9;
                        margin-bottom: 30px;
                    ">
                        ${message}
                    </p>
                    
                    <div class="loading-bar" style="
                        height: 4px;
                        background: rgba(255, 215, 0, 0.2);
                        border-radius: 2px;
                        overflow: hidden;
                    ">
                        <div class="loading-progress" style="
                            height: 100%;
                            width: 60%;
                            background: linear-gradient(90deg, #ffd700, #ffed4e);
                            border-radius: 2px;
                            animation: loadingBar 2s infinite alternate;
                        "></div>
                    </div>
                </div>
            `;
            break;
            
        case 'success':
            modalContent = `
                <div class="modal-content success-modal" style="
                    background: linear-gradient(145deg, #000000, #0a0a0a);
                    padding: 60px 40px;
                    border-radius: 20px;
                    max-width: 550px;
                    width: 90%;
                    text-align: center;
                    border: 3px solid #ffd700;
                    box-shadow: 
                        0 0 50px rgba(255, 215, 0, 0.7),
                        inset 0 0 30px rgba(255, 215, 0, 0.2);
                    position: relative;
                    overflow: hidden;
                    animation: modalAppear 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                ">
                    <!-- Efecto de brillo superior -->
                    <div class="modal-shine" style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 4px;
                        background: linear-gradient(90deg, 
                            transparent, 
                            #ffd700, 
                            #ffed4e, 
                            #ffd700, 
                            transparent);
                        animation: shine 3s infinite;
                    "></div>
                    
                    <!-- Icono de éxito -->
                    <div class="success-icon" style="
                        width: 80px;
                        height: 80px;
                        background: linear-gradient(135deg, #ffd700, #ffed4e);
                        border-radius: 50%;
                        margin: 0 auto 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
                        animation: pulseSuccess 2s infinite;
                    ">
                        <i class="fas fa-check" style="
                            font-size: 40px;
                            color: #000;
                        "></i>
                    </div>
                    
                    <h3 style="
                        color: #ffd700; 
                        margin-bottom: 25px;
                        font-family: 'Cinzel', serif;
                        font-size: 2.2rem;
                        text-shadow: 0 0 15px rgba(255, 215, 0, 0.7);
                        letter-spacing: 2px;
                    ">¡Mensaje Enviado!</h3>
                    
                    <p style="
                        color: #e0e0e0;
                        font-size: 1.2rem;
                        line-height: 1.6;
                        margin-bottom: 30px;
                        padding: 0 10px;
                    ">
                        ${message}
                    </p>
                    
                    <button id="modalCloseBtn" class="modal-close-btn" style="
                        padding: 15px 40px;
                        background: linear-gradient(90deg, #ffd700, #ffed4e);
                        color: #000;
                        font-weight: bold;
                        font-size: 1.1rem;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: all 0.3s;
                        margin-top: 10px;
                        font-family: 'Cinzel', serif;
                        letter-spacing: 1px;
                    ">
                        <i class="fas fa-gem" style="margin-right: 10px;"></i>
                        Continuar
                    </button>
                </div>
            `;
            break;
            
        case 'error':
            modalContent = `
                <div class="modal-content error-modal" style="
                    background: linear-gradient(145deg, #000000, #0a0a0a);
                    padding: 60px 40px;
                    border-radius: 20px;
                    max-width: 550px;
                    width: 90%;
                    text-align: center;
                    border: 3px solid #ff3333;
                    box-shadow: 0 0 50px rgba(255, 51, 51, 0.5);
                    position: relative;
                    overflow: hidden;
                    animation: modalAppear 0.4s ease-out;
                ">
                    <!-- Icono de error -->
                    <div class="error-icon" style="
                        width: 80px;
                        height: 80px;
                        background: linear-gradient(135deg, #ff3333, #ff6666);
                        border-radius: 50%;
                        margin: 0 auto 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 0 30px rgba(255, 51, 51, 0.6);
                    ">
                        <i class="fas fa-exclamation-triangle" style="
                            font-size: 40px;
                            color: #fff;
                        "></i>
                    </div>
                    
                    <h3 style="
                        color: #ff6666; 
                        margin-bottom: 25px;
                        font-family: 'Cinzel', serif;
                        font-size: 2.2rem;
                        text-shadow: 0 0 10px rgba(255, 102, 102, 0.5);
                    ">Error</h3>
                    
                    <p style="
                        color: #e0e0e0;
                        font-size: 1.2rem;
                        line-height: 1.6;
                        margin-bottom: 30px;
                        padding: 0 10px;
                    ">
                        ${message}
                    </p>
                    
                    <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
                        <button id="modalRetryBtn" class="modal-retry-btn" style="
                            padding: 15px 30px;
                            background: linear-gradient(90deg, #ff3333, #ff6666);
                            color: white;
                            font-weight: bold;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            transition: all 0.3s;
                            font-family: 'Cinzel', serif;
                            letter-spacing: 1px;
                        ">
                            <i class="fas fa-redo" style="margin-right: 10px;"></i>
                            Reintentar
                        </button>
                        
                        <button id="modalCloseBtn" class="modal-close-btn" style="
                            padding: 15px 30px;
                            background: transparent;
                            border: 2px solid #ff6666;
                            color: #ff6666;
                            border-radius: 5px;
                            cursor: pointer;
                            transition: all 0.3s;
                            font-weight: bold;
                            font-family: 'Cinzel', serif;
                            letter-spacing: 1px;
                        ">
                            Cerrar
                        </button>
                    </div>
                </div>
            `;
            break;
    }
    
    modalOverlay.innerHTML = modalContent;
    document.body.appendChild(modalOverlay);
    
    // Añadir estilos de animación
    addModalStyles();
    
    // Configurar eventos de los botones del modal
    setTimeout(() => {
        const closeBtn = document.getElementById('modalCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modalOverlay);
            });
        }
        
        const retryBtn = document.getElementById('modalRetryBtn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                document.body.removeChild(modalOverlay);
                // Aquí puedes agregar lógica para reintentar
            });
        }
        
        // Cerrar al hacer clic fuera del modal
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });
        
        // Cerrar con tecla ESC
        const closeModalOnEsc = (event) => {
            if (event.key === 'Escape') {
                document.body.removeChild(modalOverlay);
                document.removeEventListener('keydown', closeModalOnEsc);
            }
        };
        document.addEventListener('keydown', closeModalOnEsc);
        
        // Limpiar evento ESC cuando se cierre el modal
        const originalRemoveChild = modalOverlay.parentNode.removeChild;
        modalOverlay.parentNode.removeChild = function() {
            document.removeEventListener('keydown', closeModalOnEsc);
            return originalRemoveChild.apply(this, arguments);
        };
    }, 10);
    
    return modalOverlay;
}

// ============================================
// ESTILOS PARA LOS MODALES
// ============================================
function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'modal-styles';
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes modalAppear {
            from {
                opacity: 0;
                transform: scale(0.8) translateY(50px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes spinReverse {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
        }
        
        @keyframes loadingBar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(250%); }
        }
        
        @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        @keyframes pulseSuccess {
            0%, 100% { 
                transform: scale(1); 
                box-shadow: 0 0 30px rgba(255, 215, 0, 0.8); 
            }
            50% { 
                transform: scale(1.05); 
                box-shadow: 0 0 50px rgba(255, 215, 0, 0.9); 
            }
        }
        
        .modal-close-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 20px rgba(255, 215, 0, 0.4);
        }
        
        .modal-retry-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 20px rgba(255, 51, 51, 0.4);
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.8)';
        header.style.borderBottom = '1px solid rgba(255, 215, 0, 0.3)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = 'none';
        header.style.borderBottom = '1px solid rgba(255, 215, 0, 0.2)';
    }
});

// ============================================
// PARTÍCULAS DORADAS
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 60;
    
    for (let i = 0; i < particleCount; i++) {
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
        particle.style.opacity = Math.random() * 0.7 + 0.3;
        
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// ANIMACIONES SCROLL
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Retraso secuencial para elementos de la cuadrícula
                if (entry.target.classList.contains('service-card')) {
                    const cards = Array.from(entry.target.parentNode.children);
                    const delay = cards.indexOf(entry.target) * 0.1;
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

// ============================================
// EFECTO DE ESCRITURA PARA EL TÍTULO
// ============================================
function typeWriterEffect() {
    const title = document.querySelector('.hero h1');
    if (!title) return;
    
    const originalText = title.textContent;
    title.textContent = '';
    
    // Solo activar en pantallas grandes
    if (window.innerWidth > 768) {
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 500);
    } else {
        title.textContent = originalText;
    }
}

// ============================================
// EFECTO DE BRILLO ALEATORIO
// ============================================
function randomGlowEffect() {
    const goldElements = document.querySelectorAll('.service-icon, .contact-icon, .logo i');
    
    setInterval(() => {
        goldElements.forEach(element => {
            if (Math.random() > 0.7) {
                element.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.9)';
                setTimeout(() => {
                    element.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.7)';
                }, 300);
            }
        });
    }, 2000);
}

// ============================================
// VALIDACIÓN EN TIEMPO REAL DEL FORMULARIO
// ============================================
function initFormValidation() {
    const formInputs = document.querySelectorAll('#formContacto input, #formContacto textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#ff6666';
                this.style.boxShadow = '0 0 10px rgba(255, 102, 102, 0.5)';
            } else {
                this.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                this.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.2)';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = 'rgba(255, 215, 0, 0.5)';
                this.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.3)';
            }
        });
    });
}

// ============================================
// INICIALIZACIÓN CUANDO LA PÁGINA CARGA
// ============================================
window.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    createParticles();
    initScrollAnimations();
    typeWriterEffect();
    randomGlowEffect();
    initFormValidation();
    
    // Test EmailJS connection
    setTimeout(() => {
        if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'b9JLk-SkPVbChST9y') {
            console.log('🔍 EmailJS Config:');
            console.log('Public Key:', EMAILJS_PUBLIC_KEY.substring(0, 10) + '...');
            console.log('Service ID:', EMAILJS_SERVICE_ID);
            console.log('Template ID:', EMAILJS_TEMPLATE_ID);
            
            if (typeof emailjs !== 'undefined') {
                console.log('✅ EmailJS está cargado correctamente');
            }
        }
    }, 2000);
    
    // Añadir clase de animación inicial
    document.body.classList.add('loaded');
    
    // Prevenir reenvío del formulario al recargar la página
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
});

// ============================================
// MANEJO DE ERRORES GLOBALES
// ============================================
window.addEventListener('error', function(e) {
    console.error('Error global:', e.error);
});

// ============================================
// DEBUG MODE (opcional - quitar en producción)
// ============================================
const DEBUG_MODE = false;

if (DEBUG_MODE) {
    console.log('🔧 Modo debug activado');
    
    // Test function para probar los modales
    window.testModal = function(type) {
        switch(type) {
            case 'loading':
                showModal('loading', 'Probando modal de carga...');
                break;
            case 'success':
                showModal('success', '¡Este es un mensaje de prueba exitoso!');
                break;
            case 'error':
                showModal('error', 'Este es un mensaje de error de prueba.');
                break;
        }
    };
    
    // Test EmailJS sin enviar realmente
    window.testEmailJS = function() {
        console.log('🔍 Probando EmailJS...');
        if (typeof emailjs !== 'undefined') {
            console.log('✅ EmailJS está disponible');
            console.log('Versión:', emailjs.version);
        } else {
            console.log('❌ EmailJS no está disponible');
        }
    };

}

