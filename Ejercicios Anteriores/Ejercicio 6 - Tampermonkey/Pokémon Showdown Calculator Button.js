// ==UserScript==
// @name         Pokémon Showdown Calculator Button
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Añade un botón que redirige a la calculadora de daño de Pokémon Showdown en el menú existente
// @author       Germán Fábregas
// @match        https://play.pokemonshowdown.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Crear el botón
    const button = document.createElement('button');
    button.innerText = 'Calculator';
    button.className = 'button mainmenu'; // Misma clase para mantener el estilo
    button.style.marginTop = '10px';
    button.style.padding = '5px 10px';
    button.style.backgroundColor = '#ffcc00';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';

    // Redirigir al hacer clic
    button.onclick = function() {
        window.open('https://calc.pokemonshowdown.com/', '_blank');
    };

    // Esperar a que el menú esté disponible
    const checkMenuInterval = setInterval(() => {
        const menuGroups = document.querySelectorAll('.menugroup'); // Obtener todos los grupos de botones
        if (menuGroups.length > 1) {
            // Añadimos el botón en el segundo grupo del menú
            const teambuilderButton = menuGroups[1].querySelector('button[name="joinRoom"][value="teambuilder"]');
            if (teambuilderButton) {
                // Insertar el botón justo después del botón "Teambuilder"
                teambuilderButton.parentNode.insertBefore(button, teambuilderButton.nextSibling);
                clearInterval(checkMenuInterval); // Detener la comprobación una vez que el menú está listo
            }
        }
    }, 500); // Comprobar cada 500 ms
})();






