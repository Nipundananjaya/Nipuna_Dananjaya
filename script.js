document.addEventListener('DOMContentLoaded', function() {
    // Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
  
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navbar.classList.toggle('active');
      });
    }
  
    // Close menu when nav link is clicked
    navLinksItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navbar.classList.remove('active');
      });
    });
  
    // Navbar change on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('show');
      } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('show');
      }
      
      // Active nav link on scroll
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-links a');
      
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  
    // Typewriter Effect
    class TypeWriter {
      constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
      }
  
      type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];
  
        // Check if deleting
        if (this.isDeleting) {
          // Remove char
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          // Add char
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
  
        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
        // Initial Type Speed
        let typeSpeed = 100;
  
        if (this.isDeleting) {
          typeSpeed /= 2;
        }
  
        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
          // Make pause at end
          typeSpeed = this.wait;
          // Set delete to true
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          // Move to next word
          this.wordIndex++;
          // Pause before start typing
          typeSpeed = 500;
        }
  
        setTimeout(() => this.type(), typeSpeed);
      }
    }
  
    // Init Typewriter
    const txtElement = document.querySelector('.typewrite');
    if (txtElement) {
      const words = JSON.parse(txtElement.getAttribute('data-type'));
      const wait = txtElement.getAttribute('data-period');
      // Init TypeWriter
      new TypeWriter(txtElement, words, wait);
    }
  
    // Projects Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to current button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 300);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple form validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
          alert('Please fill in all required fields.');
          return;
        }
        
        // Here you would normally send the form data to your server
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
      });
    }
  
    // Skills Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const showSkills = () => {
      skillBars.forEach(skill => {
        const width = skill.style.width;
        skill.style.width = '0';
        setTimeout(() => {
          skill.style.width = width;
        }, 300);
      });
    }
  
    // Intersection Observer for Skills Section
    const skillsSection = document.querySelector('.skills-section');
    
    if (skillsSection) {
      const options = {
        threshold: 0.5
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            showSkills();
            observer.unobserve(entry.target);
          }
        });
      }, options);
      
      observer.observe(skillsSection);
    }
  
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      });
    });
  });







  