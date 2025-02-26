/**
 * Soroosh Shahtalebi - Portfolio
 * Main JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      
      // Accessibility - update aria-expanded attribute
      const isExpanded = nav.classList.contains('active');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });
  }
  
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only process if the href is not just "#"
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Close mobile menu if open
          if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', false);
          }
          
          // Calculate scroll position accounting for fixed header
          const headerOffset = 80; // Match the scroll-padding-top in CSS
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Add active class to navigation links based on scroll position
  function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY;
    
    // Find the current section
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // Offset for header
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        anchorLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to corresponding link
        const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }
  
  // Set active nav link on scroll
  window.addEventListener('scroll', setActiveNavLink);
  
  // Set active nav link on page load
  setActiveNavLink();
});
