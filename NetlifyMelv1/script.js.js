document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Management
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Check local storage for preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    });

    function updateToggleIcon(theme) {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    // 2. Clipboard Quick-Copy Mechanics
    const textTiles = document.querySelectorAll('.text-tile');

    textTiles.forEach(tile => {
        tile.addEventListener('click', async () => {
            const textToCopy = tile.getAttribute('data-copy');
            const badge = tile.querySelector('.copy-badge');

            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Trigger feedback badge animation
                badge.classList.add('show');
                setTimeout(() => {
                    badge.classList.remove('show');
                }, 1800);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    });
});