/**
 * Protocol Health Club Shared Page - Interactive Mechanics
 * Includes: Local Storage Theme Engine & Accessible Accordion Stack Toggles
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. Local Storage Theme Engine
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Retrieve previous choice or system default
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Apply theme on initial load
    applyTheme(initialTheme);
    
    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(targetTheme);
    });
    
    /**
     * Applies the given theme to the HTML element and updates the toggle button icon.
     * @param {string} theme - 'light' or 'dark'
     */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update toggle icon with rotational transition
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggleBtn.title = 'Switch to Light Mode';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggleBtn.title = 'Switch to Dark Mode';
        }
    }


    /* ==========================================================================
       2. FAQ Accordion / Expandable Cards (With keyboard navigation)
       ========================================================================== */
    const accordionCards = document.querySelectorAll('.accordion-card');
    
    accordionCards.forEach(card => {
        // Toggle accordion on mouse click
        card.addEventListener('click', () => {
            toggleAccordion(card);
        });

        // Accessibility: Toggle accordion on keyboard 'Enter' or 'Space' keys
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Prevent page scrolling on spacebar press
                toggleAccordion(card);
            }
        });
    });

    /**
     * Toggles the active state of an accordion card container
     * @param {HTMLElement} card - The selected accordion card element
     */
    function toggleAccordion(card) {
        const isActive = card.classList.contains('active');
        
        // Optional: Close all other accordions first (Creates an exclusive accordion behavior)
        accordionCards.forEach(otherCard => {
            if (otherCard !== card && otherCard.classList.contains('active')) {
                otherCard.classList.remove('active');
                const otherIcon = otherCard.querySelector('.accordion-toggle-icon i');
                if (otherIcon) otherIcon.className = 'fas fa-plus';
            }
        });

        // Toggle current card active state
        card.classList.toggle('active');
        
        // Update plus/minus icon dynamically
        const icon = card.querySelector('.accordion-toggle-icon i');
        if (icon) {
            if (card.classList.contains('active')) {
                icon.className = 'fas fa-minus';
            } else {
                icon.className = 'fas fa-plus';
            }
        }
    }


    /* ==========================================================================
       3. Video Component Interaction Simulation
       ========================================================================== */
    const videoTile = document.querySelector('.video-tile');
    if (videoTile) {
        videoTile.addEventListener('click', () => {
            const playBtn = videoTile.querySelector('.video-play-btn i');
            const videoTitle = videoTile.querySelector('.video-title');
            
            // Toggle visual state indicating playback has started
            if (playBtn.classList.contains('fa-play')) {
                playBtn.className = 'fas fa-pause';
                videoTitle.textContent = 'Playing Walkthrough Presentation...';
                videoTile.style.boxShadow = '0 0 25px rgba(0, 210, 196, 0.4)';
            } else {
                playBtn.className = 'fas fa-play';
                videoTitle.textContent = 'Learn How We Optimize Your Health';
                videoTile.style.boxShadow = '';
            }
        });
    }
});