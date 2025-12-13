  window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loader').style.display = 'none';
                }, 500);
            }, 1500);
        });

        // Scroll Indicator
        window.addEventListener('scroll', () => {
            const scrollIndicator = document.getElementById('scrollIndicator');
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / scrollHeight) * 100;
            scrollIndicator.style.width = scrolled + '%';
        });

        // Code Rain Background
        const codeBg = document.getElementById('codeBg');
        const codeSnippets = [
            'const dev = () => {}',
            'function code() {}',
            'if (passion) { code(); }',
            'while (learning) { improve(); }',
            '{ creativity: true }',
            '<Component />',
            'npm install awesome',
            'git commit -m "success"',
            'console.log("Hello")',
            'let innovation = true',
            '=> { return solution; }',
            'async function build()',
            'import { skills }',
            'export default App',
        ];

        function createCodeRain() {
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    const codeLine = document.createElement('div');
                    codeLine.className = 'code-line';
                    codeLine.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                    codeLine.style.left = Math.random() * 100 + '%';
                    codeLine.style.animationDuration = (Math.random() * 10 + 10) + 's';
                    codeLine.style.animationDelay = Math.random() * 5 + 's';
                    codeBg.appendChild(codeLine);

                    setTimeout(() => {
                        codeLine.remove();
                    }, 15000);
                }, i * 1000);
            }
        }

        setInterval(createCodeRain, 15000);
        createCodeRain();

        // Particles Animation
        const particlesContainer = document.getElementById('particles');
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particlesContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 20000);
        }

        for (let i = 0; i < 30; i++) {
            setTimeout(() => createParticle(), i * 200);
        }

        setInterval(() => {
            createParticle();
        }, 2000);

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Fade-in Animation on Scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            observer.observe(el);
        });

        // Navbar Background on Scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(15, 23, 42, 1)';
                navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1), 0 0 30px rgba(37, 99, 235, 0.3)';
            } else {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1), 0 0 20px rgba(37, 99, 235, 0.1)';
            }
        });

        // Parallax Effect
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const parallaxElements = document.querySelectorAll('.hero-content');
            parallaxElements.forEach(el => {
                const speed = 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Animate Skill Bars
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const progress = bar.getAttribute('data-progress');
                        setTimeout(() => {
                            bar.style.width = progress + '%';
                        }, 300);
                    });
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.skill-category').forEach(category => {
            skillObserver.observe(category);
        });