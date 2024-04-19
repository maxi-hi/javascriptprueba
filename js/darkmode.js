const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkModeIcon = darkModeToggle.querySelector('i');

darkModeToggle.addEventListener('click', function() {
    const body = document.body;
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        darkModeIcon.classList.remove('bi-moon-fill');
        darkModeIcon.classList.add('bi-sun-fill');
    } else {
        darkModeIcon.classList.remove('bi-sun-fill');
        darkModeIcon.classList.add('bi-moon-fill');
    }
});
