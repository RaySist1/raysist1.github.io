// Toggle between dark and light mode
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', theme);
});

// Scroll-Based Gallery Animation
document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');

  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if(entry.isIntersecting){
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);

  galleryItems.forEach(item => {
      observer.observe(item);
  });
});

// Modal Functionality
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-image');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

const galleryImages = document.querySelectorAll('.gallery-image');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImg.src = img.src;
      captionText.innerHTML = img.alt;
  });
});

// Close Modal when clicking on close button
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close Modal when clicking outside the image
window.addEventListener('click', (e) => {
  if (e.target == modal) {
      modal.style.display = 'none';
  }
});

document.querySelectorAll('.clickable-image').forEach(image => {
  image.addEventListener('click', function() {
    const overlay = document.getElementById('overlay');
    const overlayImage = document.getElementById('overlay-image');
    
    // Set the clicked image source in the overlay
    overlayImage.src = this.src;
    
    // Show the overlay
    overlay.classList.add('active');
  });
});

// Close the overlay when clicked
document.getElementById('overlay').addEventListener('click', function() {
  this.classList.remove('active');
});

