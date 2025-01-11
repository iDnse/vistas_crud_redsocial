document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.container_form');
    const nombreInput = document.getElementById('nom_fan_pag');
    const descripcionInput = document.getElementById('des_fan_pag');
    const fotoInput = document.getElementById('per_fan_pag');
    const fechaInput = document.getElementById('fec_fan_pag');
    const estatusSelect = document.getElementById('est_fan_pag');

    // Función para mostrar mensajes de error como tooltip en la parte superior derecha
    const showTooltip = (element, message) => {
        clearTooltip(); // Limpiar cualquier tooltip existente
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-error';
        tooltip.innerHTML = message.replace(/\. /g, '.<br>'); // Reemplazar punto y espacio por punto y salto de línea
        document.body.appendChild(tooltip);
        element.classList.add('input-error');
        setTimeout(() => {
            tooltip.classList.add('fade-out');
            setTimeout(() => {
                tooltip.remove();
            }, 500); // Esperar a que termine la animación de desvanecimiento
        }, 2500); // Mostrar el tooltip durante 2.5 segundos antes de comenzar a desvanecer
    };

    // Función para limpiar mensajes de error
    const clearTooltip = () => {
        const tooltips = document.querySelectorAll('.tooltip-error');
        tooltips.forEach(tooltip => tooltip.remove());
        const inputs = document.querySelectorAll('.input-error');
        inputs.forEach(input => input.classList.remove('input-error'));
    };

    // Función para validar un campo de entrada
    const validateField = (input, regex, emptyMessage, invalidMessage) => {
        clearTooltip();
        const value = input.value.trim();
        if (value === '') {
            showTooltip(input, emptyMessage);
            return false;
        } else if (!regex.test(value)) {
            showTooltip(input, invalidMessage);
            return false;
        }
        return true;
    };

    // Validar Nombre de la Fan Page
    nombreInput.addEventListener('blur', function() {
        validateField(nombreInput, /^[a-zA-Z0-9\s]{4,40}$/, 'El nombre no puede estar vacío.<br>', 'El nombre debe tener entre 4 y 40 caracteres y solo puede contener letras, números y espacios.<br>');
    });

    // Validar Descripción de la Fan Page
    descripcionInput.addEventListener('blur', function() {
        validateField(descripcionInput, /^.{10,100}$/, 'La descripción no puede estar vacía.<br>', 'La descripción debe tener entre 10 y 100 caracteres.<br>');
    });

    // Validar URL de la Foto de Perfil
    fotoInput.addEventListener('blur', function() {
        validateField(fotoInput, /^.{10,255}$/, 'La URL de la foto no puede estar vacía.<br>', 'La URL de la foto debe tener entre 10 y 255 caracteres.<br>');
    });

    // Validar Fecha de Creación
    fechaInput.addEventListener('blur', function() {
        clearTooltip();
        if (!fechaInput.value) {
            showTooltip(fechaInput, 'Debe seleccionar una fecha de creación.<br>');
        }
    });

    // Validar Estatus de la Fan Page
    estatusSelect.addEventListener('blur', function() {
        clearTooltip();
        const estatusValue = estatusSelect.value;
        if (estatusValue === "0") {
            showTooltip(estatusSelect, 'Debe seleccionar un estatus.<br>');
        }
    });

    // Establecer la fecha de creación como la fecha actual
    const setFechaActual = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
        const year = today.getFullYear();
        fechaInput.value = `${year}-${month}-${day}`;
    };

    setFechaActual();

    // Agregar evento de envío al formulario
    form.addEventListener('submit', function(event) {
        let valid = true;
        let errorMessage = '';

        // Validar Nombre de la Fan Page
        if (!validateField(nombreInput, /^[a-zA-Z0-9\s]{4,40}$/, 'El nombre no puede estar vacío.<br>', 'El nombre debe tener entre 4 y 40 caracteres y solo puede contener letras, números y espacios.<br>')) {
            errorMessage += 'Nombre inválido.<br>';
            valid = false;
        }

        // Validar Descripción de la Fan Page
        if (!validateField(descripcionInput, /^.{10,100}$/, 'La descripción no puede estar vacía.<br>', 'La descripción debe tener entre 10 y 100 caracteres.<br>')) {
            errorMessage += 'Descripción inválida.<br>';
            valid = false;
        }

        // Validar URL de la Foto de Perfil
        if (!validateField(fotoInput, /^.{10,255}$/, 'La URL de la foto no puede estar vacía.<br>', 'La URL de la foto debe tener entre 10 y 255 caracteres.<br>')) {
            errorMessage += 'URL de la foto inválida.<br>';
            valid = false;
        }

        // Validar Fecha de Creación
        clearTooltip();
        if (!fechaInput.value) {
            showTooltip(fechaInput, 'Debe seleccionar una fecha de creación.<br>');
            errorMessage += 'Fecha de creación no seleccionada.<br>';
            valid = false;
        }

        // Validar Estatus de la Fan Page
        clearTooltip();
        const estatusValue = estatusSelect.value;
        if (estatusValue === "0") {
            showTooltip(estatusSelect, 'Debe seleccionar un estatus.<br>');
            errorMessage += 'Estatus no seleccionado.<br>';
            valid = false;
        }

        // Si alguna validación falla, prevenir el envío del formulario y mostrar mensaje de error
        if (!valid) {
            event.preventDefault();
            showTooltip(form, 'Errores en el formulario:<br>' + errorMessage);
        } else {
            // Si todas las validaciones son correctas, redirigir a la página de la tabla de Fan Pages
            window.location.href = '../tablas/tablaPerfilEmpresarialFanPage.html';
        }
    });
});
