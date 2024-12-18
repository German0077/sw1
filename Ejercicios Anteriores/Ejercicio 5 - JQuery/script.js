$(document).ready(function() {
    // Mostrar formulario y ocultar el contenido principal
    $("#btn-registrar").click(function() {
        $("#contenido-principal").hide();
        $("#formulario-registro").show();
    });

    // Cancelar registro
    $("#btn-cancelar").click(function() {
        $("#formulario-registro").hide();
        $("#contenido-principal").show();
    });

    // Enviar los datos + validar
    $("#btn-enviar").click(function() {

        const nombre = $("#nombre").val();
        const correo = $("#correo").val();
        const telefono = $("#telefono").val();
        const contrasena = $("#contrasena").val();

        if (!validarNombre(nombre)) {
            alert("El campo de Nombre y Apellidos debe contener al menos dos palabras y solo letras.");
            return;
        }
        if (!validarCorreo(correo)) {
            alert("El formato del correo electrónico no es válido. ejemplo@correo.com");
            return;
        }
        if (!validarTelefono(telefono)) {
            alert("El número de teléfono solo debe contener números.");
            return;
        }
        if (!validarContrasena(contrasena)) {
            alert("La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula y un número.");
            return;
        }

        alert("Tus datos han sido guardados correctamente");
    });

    //Validaciones
    function validarNombre(nombre) {
        const palabras = nombre.trim().split(/\s+/);
        const caracteresValidos = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/;
        if (palabras.length < 2) {
            return false;
        }
        if (!caracteresValidos.test(nombre)) {
            return false;
        }

        return true;

    }
    function validarCorreo(correo) {
        const formatoValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return formatoValido.test(correo);
    }
    function validarTelefono(telefono) {
        const palabras = telefono.trim().split(/\s+/);
        const caracteresValidos = /^[0-9]+$/;
        if (palabras.length > 1) {
            return false;
        }
        if (!caracteresValidos.test(telefono)) {
            return false;
        }

        return true;
    }
    function validarContrasena(contrasena) {
        // Expresión regular que verifica los requisitos de la contraseña
        const estructura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    
        // Verificar si la contraseña cumple con el patrón
        return estructura.test(contrasena);
    }
});
