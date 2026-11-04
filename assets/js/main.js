// Main JavaScript for Litigation Training Program Landing Page

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu on clicking any link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Countdown Timer
    // Launch Date: Wednesday, November 25, 2026 at 19:00:00 Cairo time (UTC+2)
    const targetDate = new Date('2026-11-25T19:00:00+02:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            if (daysEl) daysEl.innerText = '00';
            if (hoursEl) hoursEl.innerText = '00';
            if (minutesEl) minutesEl.innerText = '00';
            if (secondsEl) secondsEl.innerText = '00';
            const countdownTitle = document.querySelector('.countdown-title');
            if (countdownTitle) {
                countdownTitle.innerHTML = '<i class="fa-solid fa-bell"></i> انطلق البرنامج التدريبي الآن!';
            }
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 3. Floating Button Visibility Control (Show only after scrolling past hero)
    const registerSection = document.getElementById('register');
    const floatBtn = document.querySelector('.floating-register-btn');

    if (registerSection && floatBtn) {
        // Initial state: hidden
        floatBtn.style.opacity = '0';
        floatBtn.style.pointerEvents = 'none';
        floatBtn.style.transition = 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)';
        floatBtn.style.transform = 'translateY(15px)';

        const handleScroll = () => {
            const scrollPos = window.scrollY || window.pageYOffset;
            const rect = registerSection.getBoundingClientRect();
            const inRegister = rect.top <= window.innerHeight && rect.bottom >= 0;
            const pastHero = scrollPos > 350;

            if (pastHero && !inRegister) {
                floatBtn.style.opacity = '1';
                floatBtn.style.pointerEvents = 'auto';
                floatBtn.style.transform = 'translateY(0)';
            } else {
                floatBtn.style.opacity = '0';
                floatBtn.style.pointerEvents = 'none';
                floatBtn.style.transform = 'translateY(15px)';
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }
});
