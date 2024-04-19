function obtenerClima() {
    const apiKey = '05288033c4b983b4e60806783ad762a4';
    const ciudad = document.getElementById('ciudad').value;

    if (!ciudad) {
        alert('Por favor, ingrese una ciudad.');
        return;
    }

    const urlClimaActual = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`;
    const urlPronostico = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${apiKey}`;

    fetch(urlClimaActual)
        .then(response => response.json())
        .then(data => {
            mostrarClima(data);
        })
        .catch(error => {
            console.error('Error al obtener datos meteorológicos actuales:', error);
            alert('Error al obtener datos meteorológicos actuales.');
        });

    fetch(urlPronostico)
        .then(response => response.json())
        .then(data => {
            mostrarPronosticoPorHora(data.list);
        })
        .catch(error => {
            console.error('Error al obtener datos de pronóstico por hora:', error);
            alert('Error al obtener datos de pronóstico por hora. Por favor, inténtelo de nuevo.');
        });
}

function mostrarClima(data) {
    const infoDiv = document.getElementById('info-clima');
    const iconoClima = document.getElementById('icono-clima');
    const pronosticoPorHoraDiv = document.getElementById('pronostico-por-hora');

    // Limpiar contenido previo
    infoDiv.innerHTML = '';
    pronosticoPorHoraDiv.innerHTML = '';

    if (data.cod === '404') {
        infoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const nombreCiudad = data.name;
        const temperatura = Math.round(data.main.temp - 273.15); // Convertir a Celsius
        const descripcion = data.weather[0].description;
        const codigoIcono = data.weather[0].icon;
        const urlIcono = `https://openweathermap.org/img/wn/${codigoIcono}@4x.png`;

        const temperaturaHTML = `
            <p>${temperatura}°C</p>
        `;

        const climaHTML = `
            <p>${nombreCiudad}</p>
            <p>${descripcion}</p>
        `;

        infoDiv.innerHTML = temperaturaHTML + climaHTML;
        iconoClima.src = urlIcono;
        iconoClima.alt = descripcion;

        mostrarImagen();
    }
}

function mostrarPronosticoPorHora(datosPorHora) {
    const pronosticoPorHoraDiv = document.getElementById('pronostico-por-hora');

    const proximas24Horas = datosPorHora.slice(0, 8); // Mostrar las próximas 24 horas (intervalos de 3 horas)

    proximas24Horas.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convertir marca de tiempo a milisegundos
        const hora = dateTime.getHours();
        const temperatura = Math.round(item.main.temp - 273.15); // Convertir a Celsius
        const codigoIcono = item.weather[0].icon;
        const urlIcono = `https://openweathermap.org/img/wn/${codigoIcono}.png`;

        const itemHTML = `
            <div class="item-horario">
                <span>${hora}:00</span>
                <img src="${urlIcono}" alt="Icono del clima por hora">
                <span>${temperatura}°C</span>
            </div>
        `;

        pronosticoPorHoraDiv.innerHTML += itemHTML;
    });
}

function mostrarImagen() {
    const iconoClima = document.getElementById('icono-clima');
    iconoClima.style.display = 'block'; // Hacer visible la imagen una vez cargada
}
