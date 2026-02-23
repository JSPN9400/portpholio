        // Hamburger Menu Toggle
        function initHamburgerMenu() {
            const hamburger = document.getElementById('hamburger');
            const mainNav = document.querySelector('.main-nav');
            
            if (!hamburger || !mainNav) return;
            
            hamburger.addEventListener('click', function () {
                hamburger.classList.toggle('active');
                mainNav.classList.toggle('active');
                hamburger.setAttribute('aria-expanded', 
                    hamburger.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
                );
            });
            
            // Close menu when a link is clicked
            const navLinks = mainNav.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function () {
                    hamburger.classList.remove('active');
                    mainNav.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function (event) {
                if (!event.target.closest('.nav-container')) {
                    hamburger.classList.remove('active');
                    mainNav.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // Contact Form Handler with Formspree
        function initContactForm() {
            const form = document.getElementById('contact-form');
            if (!form) return;

            const successMessage = document.getElementById('success-message');
            const errorMessage = document.getElementById('error-message');
            const submitBtn = document.getElementById('submit-btn');
            const formInputs = form.querySelectorAll('.form-input, .form-textarea');

            // Real-time validation
            formInputs.forEach(input => {
                input.addEventListener('blur', () => validateField(input));
                input.addEventListener('input', () => {
                    const group = input.closest('.form-group');
                    group.classList.remove('error');
                });
            });

            function validateField(field) {
                const group = field.closest('.form-group');
                const errorSpan = group.querySelector('.form-error');
                let isValid = true;
                let errorText = '';

                if (field.id === 'name') {
                    if (field.value.trim().length < 2) {
                        isValid = false;
                        errorText = 'Name must be at least 2 characters';
                    }
                } else if (field.id === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        errorText = 'Please enter a valid email address';
                    }
                } else if (field.id === 'message') {
                    if (field.value.trim().length < 10) {
                        isValid = false;
                        errorText = 'Message must be at least 10 characters';
                    }
                }

                if (!isValid) {
                    group.classList.add('error');
                    if (errorSpan) errorSpan.textContent = errorText;
                } else {
                    group.classList.remove('error');
                    if (errorSpan) errorSpan.textContent = '';
                }

                return isValid;
            }

            function validateForm() {
                let isValid = true;
                formInputs.forEach(input => {
                    if (!validateField(input)) {
                        isValid = false;
                    }
                });
                return isValid;
            }

            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                // Validate form
                if (!validateForm()) {
                    return;
                }

                // Show loading state
                submitBtn.disabled = true;
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';

                try {
                    // Formspree handles submission automatically
                    const formData = new FormData(form);
                    
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        // Show success message
                        form.style.display = 'none';
                        successMessage.style.display = 'block';
                        errorMessage.style.display = 'none';

                        // Reset form
                        form.reset();
                        formInputs.forEach(input => input.closest('.form-group')?.classList.remove('error'));

                        // Show form again after 5 seconds for new submissions
                        setTimeout(() => {
                            form.style.display = 'flex';
                            successMessage.style.display = 'none';
                        }, 5000);
                    } else {
                        throw new Error('Form submission failed');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    errorMessage.style.display = 'flex';
                    successMessage.style.display = 'none';
                    
                    setTimeout(() => {
                        errorMessage.style.display = 'none';
                    }, 5000);
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            });
        }
        
        // Theme toggle logic
        function setTheme(mode) {
            if (mode === 'dark') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        }
        // Detect system preference
        (function () {
            const userTheme = localStorage.getItem('theme');
            if (userTheme) {
                setTheme(userTheme);
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setTheme('dark');
            }
        })();
    

            // Theme toggle button logic
            const themeToggle = document.getElementById('theme-toggle');
            const themeIcon = document.getElementById('theme-toggle-icon');
            if (themeToggle && themeIcon) {
            function updateThemeIcon() {
                if (document.documentElement.classList.contains('dark')) {
                    themeIcon.textContent = '☀️';
                    themeToggle.title = 'Switch to light mode';
                } else {
                    themeIcon.textContent = '🌙';
                    themeToggle.title = 'Switch to dark mode';
                }
            }
            themeToggle.addEventListener('click', function () {
                if (document.documentElement.classList.contains('dark')) {
                    setTheme('light');
                } else {
                    setTheme('dark');
                }
                updateThemeIcon();
            });
            updateThemeIcon();
            }
        

                // Animate fade-in for main content sections on scroll with enhanced easing
                document.addEventListener('DOMContentLoaded', function () {
                    function revealSections() {
                        document.querySelectorAll('.fadein-section').forEach(function (section) {
                            var rect = section.getBoundingClientRect();
                            if (rect.top < window.innerHeight - 100) {
                                section.classList.add('visible');
                            }
                        });
                    }
                    window.addEventListener('scroll', revealSections);
                    revealSections();
                });
            

                // Animate about book cards in sequence with improved timing
                document.addEventListener('DOMContentLoaded', function () {
                    document.querySelectorAll('.about-book-card').forEach(function (card, i) {
                        setTimeout(function () {
                            card.classList.add('visible');
                            card.style.transitionTimingFunction = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
                        }, 200 + i * 180);
                    });
                });
            

        // Animate hero elements on load
        document.addEventListener('DOMContentLoaded', function () {
            // Reveal hero elements
            document.querySelectorAll('.hero-animate').forEach(function (el) {
                el.classList.add('visible');
            });

            // Reveal fade-in photo
            const photoElement = document.querySelector('.fadein-photo');
            if (photoElement) {
                photoElement.classList.add('visible');
            }
        });

        // Animate footer contact section on scroll
        document.addEventListener('DOMContentLoaded', function () {
            function revealFooterContact() {
                var footerContact = document.querySelector('.footer-contact');
                if (!footerContact) return;
                var rect = footerContact.getBoundingClientRect();
                if (rect.top < window.innerHeight - 60) {
                    footerContact.classList.add('visible');
                    window.removeEventListener('scroll', revealFooterContact);
                }
            }
            window.addEventListener('scroll', revealFooterContact);
            revealFooterContact();

            // Featured Project logic for landing page
            const projects = [
                {
                    key: 'ABAAS',
                    title: 'ABAAS – AI-Based Accounts Analysis System',
                    desc: 'Automated bookkeeping, GST error detection, and dashboarding for finance teams. Built with Python, Pandas, and Power BI.',
                    link: 'https://github.com/jaishankar9400/ABAAS',
                },
                {
                    key: 'Sales Dashboard',
                    title: 'Sales Dashboard',
                    desc: 'Interactive dashboard for sales analytics and KPI tracking, built for business insights.',
                    link: 'https://github.com/jaishankar9400',
                },
                {
                    key: 'Data Cleaning Toolkit',
                    title: 'Data Cleaning Toolkit',
                    desc: 'Python toolkit for automating data cleaning and preprocessing tasks for analytics projects.',
                    link: 'https://github.com/jaishankar9400',
                },
                {
                    key: 'Pratima',
                    title: 'Pratima – Fashion Brand Dashboard',
                    desc: 'Created a business intelligence dashboard for inventory, orders, and analytics using pandas, openpyxl, and Excel.',
                    link: null,
                },
            ];
            function renderFeaturedLanding(key) {
                const featured = projects.find(p => p.key === key) || projects[0];
                let html = `<div class="project-card" style="box-shadow:0 6px 32px 0 var(--color-shadow);border:2px solid var(--color-accent2);">
                    <h3 class="project-title">${featured.title}</h3>
                    <p class="project-desc">${featured.desc}</p>`;
                if (featured.link) {
                    html += `<a href="${featured.link}" target="_blank" class="project-link">View on GitHub</a>`;
                }
                html += `</div>`;
                const featuredContainer = document.getElementById('featured-project-landing');
                if (featuredContainer) {
                    featuredContainer.innerHTML = html;
                }
            }
            // On load, show featured project from localStorage
            let featuredKey = localStorage.getItem('featuredProject') || projects[0].key;
            renderFeaturedLanding(featuredKey);
        });
    

        document.addEventListener('DOMContentLoaded', function () {
            function revealHeroPhoto() {
                var heroPhoto = document.querySelector('.hero-photo');
                if (!heroPhoto) return;
                var rect = heroPhoto.getBoundingClientRect();
                if (rect.top < window.innerHeight - 60) {
                    heroPhoto.classList.add('visible');
                    window.removeEventListener('scroll', revealHeroPhoto);
                }
            }
            window.addEventListener('scroll', revealHeroPhoto);
            revealHeroPhoto();
        });
    

        // Animate all hero section items in sequence
        document.addEventListener('DOMContentLoaded', function () {
            function revealHeroItems() {
                document.querySelectorAll('.hero-animate').forEach(function (el) {
                    var rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight - 60) {
                        el.classList.add('visible');
                    }
                });
            }
            window.addEventListener('scroll', revealHeroItems);
            revealHeroItems();
            
            // Initialize hamburger menu
            initHamburgerMenu();
            
            // Initialize contact form
            initContactForm();
        });

        // KPI Counter Animation
        function initKPICounters() {
          const kpiNumbers = document.querySelectorAll('.kpi-number');
          
          const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
          };

          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const element = entry.target;
                const finalCount = parseInt(element.getAttribute('data-count'));
                let currentCount = 0;
                
                element.classList.add('counted');

                const increment = Math.ceil(finalCount / 50);
                const interval = setInterval(() => {
                  currentCount += increment;
                  if (currentCount >= finalCount) {
                    element.textContent = finalCount;
                    // Re-add the suffix if present
                    const suffix = element.querySelector('.kpi-suffix');
                    if (suffix) {
                      element.appendChild(suffix);
                    }
                    clearInterval(interval);
                  } else {
                    element.textContent = currentCount;
                  }
                }, 30);
              }
            });
          }, observerOptions);

          kpiNumbers.forEach(number => observer.observe(number));
        }

        // Initialize KPI counters when page loads
        initKPICounters();
        // Scroll Animation Observer for fade-in sections
        function initScrollAnimations() {
            // Create observer for fade-in sections
            const observerOptions = {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        // Stop observing after animation completes
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe all fade-in sections
            const fadeInElements = document.querySelectorAll('.fade-in-section');
            fadeInElements.forEach(el => observer.observe(el));
        }

        // Initialize scroll animations
        initScrollAnimations();

        // Smooth scroll behavior for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && document.querySelector(href)) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    const offsetTop = target.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    
