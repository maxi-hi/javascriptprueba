// Selecciona el botón de dark mode y el ícono dentro de él
const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkModeIcon = darkModeToggle.querySelector('i');

// Agrega un evento de clic al botón
darkModeToggle.addEventListener('click', function() {
    // Obtiene el body del documento
    const body = document.body;
    // Toggle dark mode agregando o removiendo una clase
    body.classList.toggle('dark');
    // Cambia el ícono del botón al modo oscuro
    if (body.classList.contains('dark')) {
        darkModeIcon.classList.remove('bi-moon-fill');
        darkModeIcon.classList.add('bi-sun-fill');
    } else {
        darkModeIcon.classList.remove('bi-sun-fill');
        darkModeIcon.classList.add('bi-moon-fill');
    }
});
