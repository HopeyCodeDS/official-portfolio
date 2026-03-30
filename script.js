/* =============================================
   OPEYEMI MOMODU — PORTFOLIO v2 SCRIPTS
   Scroll-reveal, smooth scroll, nav, progress
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    const nav         = document.getElementById('nav');
    const hamburger   = document.getElementById('hamburger');
    const mobileNav   = document.getElementById('mobileNav');
    const scrollBar   = document.getElementById('scrollProgress');
    const reveals     = document.querySelectorAll('.reveal');
    const navLinks    = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // ── SCROLL PROGRESS BAR ──
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress  = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollBar.style.width = progress + '%';
    }

    // ── NAV SCROLL STATE ──
    function updateNav() {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    }

    // ── ACTIVE NAV LINK ──
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const top = section.offsetTop - 200;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                link.classList.toggle('active',
                    href === '#' + current
                );
            }
        });
    }

    // ── SCROLL LISTENERS ──
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                updateNav();
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ── INTERSECTION OBSERVER — SCROLL REVEAL ──
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 150);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));

    // ── MOBILE MENU ──
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ── SMOOTH SCROLL FOR ANCHOR LINKS ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ── STAGGER SKILL TAGS ON HOVER ──
    document.querySelectorAll('.skill-block').forEach(block => {
        block.addEventListener('mouseenter', () => {
            const tags = block.querySelectorAll('.skill-tag');
            tags.forEach((tag, i) => {
                tag.style.transitionDelay = `${i * 30}ms`;
            });
        });
        block.addEventListener('mouseleave', () => {
            const tags = block.querySelectorAll('.skill-tag');
            tags.forEach(tag => {
                tag.style.transitionDelay = '0ms';
            });
        });
    });

    // ── INITIAL STATE ──
    updateScrollProgress();
    updateNav();

});
