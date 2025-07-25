// Funcionalidad del menú hamburguesa
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// Navegación del logo
const headerLogoConatiner = document.querySelector('.header__logo-container')
headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})

// Modal de bienvenida
var modal = document.getElementById("myModal");
var closeButton = document.getElementsByClassName("close-btn")[0];

// Loading Screen
function createLoadingScreen() {
  const loadingScreen = document.createElement('div');
  loadingScreen.id = 'loading-screen';
  loadingScreen.innerHTML = `
    <div class="loading-content">
      <div class="pixel-loader">
        <div class="pixel-block"></div>
        <div class="pixel-block"></div>
        <div class="pixel-block"></div>
        <div class="pixel-block"></div>
      </div>
      <p class="loading-text">Cargando Portfolio...</p>
    </div>
  `;
  document.body.appendChild(loadingScreen);
  
  // Remove loading screen after 2 seconds
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);
  }, 2000);
}

window.onload = function () {
  // Show loading screen first
  createLoadingScreen();
  
  // Show welcome modal if first visit
  setTimeout(() => {
    if (!localStorage.getItem('hasVisited')) {
      modal.style.display = "block";
      localStorage.setItem('hasVisited', 'true');
    }
  }, 2500);
  
  // Initialize animations and other features
  setTimeout(() => {
    initScrollAnimations();
    initParticles();
    initThemeToggle();
    initKonamiCode();
  }, 1000);
}

// Cerrar modal de bienvenida
closeButton.addEventListener('click', function() {
  modal.style.display = "none";
});

// Theme Toggle (Dark/Light Mode)
function initThemeToggle() {
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '🌙';
  themeToggle.title = 'Toggle Dark/Light Mode';
  
  // Add to header
  const header = document.querySelector('.header__content');
  header.appendChild(themeToggle);
  
  // Check saved theme
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(themeToggle, savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(themeToggle, newTheme);
  });
}

function updateThemeIcon(button, theme) {
  button.innerHTML = theme === 'dark' ? '☀️' : '🌙';
}

// Particles Effect
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 50;
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 2 + 1;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
      ctx.fillStyle = 'rgba(15, 78, 30, 0.1)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Resize handler
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Konami Code Easter Egg
function initKonamiCode() {
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];
  
  let userInput = [];
  
  document.addEventListener('keydown', (e) => {
    userInput.push(e.code);
    userInput = userInput.slice(-konamiCode.length);
    
    if (userInput.join(' ') === konamiCode.join(' ')) {
      triggerEasterEgg();
    }
  });
}

function triggerEasterEgg() {
  // Create game mode overlay
  const gameOverlay = document.createElement('div');
  gameOverlay.id = 'game-overlay';
  gameOverlay.innerHTML = `
    <div class="game-content">
      <h2>🎮 ¡Easter Egg Desbloqueado! 🎮</h2>
      <p>¡Has encontrado el código Konami!</p>
      <div class="achievement-badge">
        🏆 Achievement Unlocked: "Old School Gamer"
      </div>
      <button class="close-game" onclick="closeEasterEgg()">Cerrar</button>
    </div>
  `;
  document.body.appendChild(gameOverlay);
  
  // Add some confetti effect
  createConfetti();
}

function closeEasterEgg() {
  const overlay = document.getElementById('game-overlay');
  if (overlay) overlay.remove();
}

function createConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 50%)`;
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 3000);
  }
}

// Función para abrir modal de proyecto
function openProjectModal(projectName) {
  // Aquí puedes agregar lógica específica para cada proyecto
  switch(projectName) {
    case 'billix':
      window.open('./project-billix.html', '_blank');
      break;
    case 'gamehaven':
      window.open('./project-gamehaven.html', '_blank');
      break;
    case 'ai-app':
      alert('Proyecto en desarrollo - App de Rutinas con IA');
      break;
    default:
      alert('Proyecto no encontrado');
  }
}

// Animaciones de scroll mejoradas
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Add staggered animation for cards
        if (entry.target.classList.contains('project-card') || 
            entry.target.classList.contains('interest-card')) {
          const delay = Array.from(entry.target.parentElement.children)
            .indexOf(entry.target) * 100;
          entry.target.style.animationDelay = delay + 'ms';
        }
      }
    });
  }, observerOptions);

  // Observar elementos para animaciones
  const animateElements = document.querySelectorAll('.project-card, .interest-card, .personality-content, .about__content-main');
  animateElements.forEach(el => {
    observer.observe(el);
  });
}

// Formulario de contacto con validación mejorada
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Validación básica
      if (name.length < 2) {
        showNotification('El nombre debe tener al menos 2 caracteres', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showNotification('Por favor ingresa un email válido', 'error');
        return;
      }
      
      if (message.length < 10) {
        showNotification('El mensaje debe tener al menos 10 caracteres', 'error');
        return;
      }
      
      // Simular envío
      showNotification(`¡Gracias ${name}! Tu mensaje ha sido recibido. Te contactaré pronto.`, 'success');
      contactForm.reset();
    });
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Efectos hover mejorados para las tarjetas
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.interest-card, .project-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.boxShadow = '0 15px 30px rgba(15, 78, 30, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
  });
});

// Smooth scrolling mejorado
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

// Efecto de typing para el título principal
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Aplicar efecto typing al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  const mainTitle = document.querySelector('.heading-primary');
  if (mainTitle) {
    const originalText = mainTitle.textContent;
    setTimeout(() => {
      typeWriter(mainTitle, originalText, 80);
    }, 2500);
  }
  
  // Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
  
  // Install PWA prompt
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button
    const installBtn = document.createElement('button');
    installBtn.className = 'install-pwa-btn';
    installBtn.innerHTML = '📱 Instalar App';
    installBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: var(--verde-principal);
      color: white;
      border: none;
      padding: 1rem;
      border-radius: 25px;
      cursor: pointer;
      z-index: 1000;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(15, 78, 30, 0.3);
    `;
    
    document.body.appendChild(installBtn);
    
    installBtn.addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          installBtn.remove();
        }
        deferredPrompt = null;
      });
    });
  });
  
  // Hide install button after installation
  window.addEventListener('appinstalled', () => {
    const installBtn = document.querySelector('.install-pwa-btn');
    if (installBtn) installBtn.remove();
    console.log('PWA was installed');
  });
});