// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const header = document.getElementById('header');
    const contactForm = document.getElementById('contactForm');
    const scrollTopBtn = document.createElement('button');
    
    // Configuración del botón de scroll hacia arriba
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Evento para mostrar/ocultar el menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Cerrar el menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            scrollTopBtn.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            scrollTopBtn.classList.remove('visible');
        }
        
        // Animaciones al hacer scroll
        revealElements();
        
        // Activar contador cuando esté en vista
        activateCounters();
    });
    
    // Función para mostrar elementos con animación al hacer scroll
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }
    
    // Función para activar contadores
    function activateCounters() {
        const stats = document.querySelector('.stats');
        
        if (!stats) return;
        
        const statsPosition = stats.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statsPosition < windowHeight - 100 && !stats.classList.contains('counted')) {
            stats.classList.add('counted');
            
            const counters = document.querySelectorAll('.counter-value');
            
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / 50; // Velocidad del contador
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(() => activateCounters(), 40);
                } else {
                    counter.innerText = target;
                }
            });
        }
    }
    
    // Navegación para el carrusel de testimonios
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = indicator.getAttribute('data-index');
            
            // Remover clase active de todos los indicadores y testimonios
            indicators.forEach(i => i.classList.remove('active'));
            testimonialItems.forEach(item => item.classList.remove('active'));
            
            // Añadir clase active al indicador y testimonio actual
            indicator.classList.add('active');
            testimonialItems[index].classList.add('active');
        });
    });
    
    // Auto-reproducción del carrusel
    let currentSlide = 0;
    
    function nextSlide() {
        testimonialItems.forEach(item => item.classList.remove('active'));
        indicators.forEach(i => i.classList.remove('active'));
        
        currentSlide = (currentSlide + 1) % testimonialItems.length;
        
        testimonialItems[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    // Cambiar testimonios cada 5 segundos
    setInterval(nextSlide, 5000);
    
    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Botón de scroll hacia arriba
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Validación del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores de los campos
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Restablecer mensajes de error
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
            
            // Validar campos
            let isValid = true;
            
            if (name.trim() === '') {
                document.getElementById('nameError').textContent = 'Por favor, ingresa tu nombre';
                isValid = false;
            }
            
            if (email.trim() === '') {
                document.getElementById('emailError').textContent = 'Por favor, ingresa tu correo electrónico';
                isValid = false;
            } else if (!isValidEmail(email)) {
                document.getElementById('emailError').textContent = 'Por favor, ingresa un correo electrónico válido';
                isValid = false;
            }
            
            if (message.trim() === '') {
                document.getElementById('messageError').textContent = 'Por favor, ingresa tu mensaje';
                isValid = false;
            }
            
            // Si el formulario es válido, mostrar mensaje de éxito
            if (isValid) {
                document.getElementById('formSuccess').style.display = 'block';
                contactForm.reset();
                
                // Ocultar mensaje después de 3 segundos
                setTimeout(() => {
                    document.getElementById('formSuccess').style.display = 'none';
                }, 3000);
            }
        });
    }
    
    // Función para validar formato de email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Detectar enlaces activos según la sección visible
    window.addEventListener('scroll', highlightActiveLink);
    
    function highlightActiveLink() {
        // Detectar si estamos en una página específica de modelo
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('modelo.html')) {
            // Si estamos en la página de modelos, resaltar el enlace de modelos
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            
            const modelLink = document.querySelector('.nav-links a[href="modelo.html"]');
            if (modelLink) {
                modelLink.classList.add('active');
            }
            return;
        }
        
        // Para la página principal, continuar con la lógica original
        // Obtener las secciones en orden inverso (de abajo hacia arriba)
        const sections = Array.from(document.querySelectorAll('section[id]')).reverse();
        
        // Encontrar la primera sección que está visible en la ventana
        for (const section of sections) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                // Eliminar la clase active de todos los enlaces
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Añadir la clase active al enlace correspondiente
                const currentLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (currentLink) {
                    currentLink.classList.add('active');
                }
                
                // Solo resaltamos un enlace, por lo que podemos salir del bucle
                break;
            }
        }
    }
    
    // Video de fondo
    const video = document.getElementById('background-video');
    
    if (video) {
        // Ajustar el volumen a 0 para asegurar que está silenciado
        video.volume = 0;
        
        // Intentar reproducir el video automáticamente
        video.play().catch(error => {
            console.log('Reproducción automática no permitida:', error);
            // Ya no se crea el botón de reproducción manual
        });
    }
    
    // Ejecutar las funciones de animación al cargar la página
    revealElements();
    highlightActiveLink();
}); 