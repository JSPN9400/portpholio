
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
        

                // Animate fade-in for main content sections on scroll
                document.addEventListener('DOMContentLoaded', function () {
                    function revealSections() {
                        document.querySelectorAll('.fadein-section').forEach(function (section) {
                            var rect = section.getBoundingClientRect();
                            if (rect.top < window.innerHeight - 60) {
                                section.classList.add('visible');
                            }
                        });
                    }
                    window.addEventListener('scroll', revealSections);
                    revealSections();
                });
            

                // Animate about book cards in sequence (more elegant, staggered, and 3D)
                document.addEventListener('DOMContentLoaded', function () {
                    document.querySelectorAll('.about-book-card').forEach(function (card, i) {
                        setTimeout(function () {
                            card.classList.add('visible');
                            card.style.transitionTimingFunction = 'cubic-bezier(.7,1.7,.5,1)';
                        }, 250 + i * 240);
                    });
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
                document.getElementById('featured-project-landing').innerHTML = html;
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
        });
    