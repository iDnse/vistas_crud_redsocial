document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.container_form');
    const urlInput = document.getElementById('url_mul');
    const publicacionSelect = document.getElementById('fky_pub');
    const estatusSelect = document.getElementById('est_mul');

    // Función para mostrar mensajes de error como tooltip en la parte superior derecha
    const showTooltip = (element, message) => {
        clearTooltip();
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-error';
        tooltip.innerHTML = message.replace(/\. /g, '.<br>');
        document.body.appendChild(tooltip);
        element.classList.add('input-error');
        setTimeout(() => {
            tooltip.classList.add('fade-out');
            setTimeout(() => {
                tooltip.remove();
            }, 500);
        }, 2500);
    };

    // Función para limpiar mensajes de error
    const clearTooltip = () => {
        document.querySelectorAll('.tooltip-error').forEach(tooltip => tooltip.remove());
        document.querySelectorAll('.input-error').forEach(input => input.classList.remove('input-error'));
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

    // Validar URL de la Multimedia
    urlInput.addEventListener('blur', function() {
        validateField(urlInput, /^.{2,}$/, 'La URL de la multimedia no puede estar vacía.<br>', 'La URL de la multimedia debe tener más de un carácter.<br>');
    });

    // Validar Código de Publicación
    publicacionSelect.addEventListener('blur', function() {
        clearTooltip();
        const publicacionValue = publicacionSelect.value;
        if (publicacionValue === 'Seleccionar..') {
            showTooltip(publicacionSelect, 'Debe seleccionar un código de publicación.<br>');
        }
    });

    // Validar Estatus de la Multimedia
    estatusSelect.addEventListener('blur', function() {
        clearTooltip();
        const estatusValue = estatusSelect.value;
        if (estatusValue === 'Seleccionar..') {
            showTooltip(estatusSelect, 'Debe seleccionar un estatus.<br>');
        } else if (estatusValue !== 'A' && estatusValue !== 'I') {
            showTooltip(estatusSelect, 'Debe seleccionar un estatus válido (A o I).<br>');
        }
    });

    // Agregar evento de envío al formulario
    form.addEventListener('submit', function(event) {
        let valid = true;
        let errorMessage = '';

        // Validar URL de la Multimedia
        if (!validateField(urlInput, /^.{2,}$/, 'La URL de la multimedia no puede estar vacía.<br>', 'La URL de la multimedia debe tener más de un carácter.<br>')) {
            errorMessage += 'URL de la multimedia inválida.<br>';
            valid = false;
        }

        // Validar Código de Publicación
        clearTooltip();
        const publicacionValue = publicacionSelect.value;
        if (publicacionValue === 'Seleccionar..') {
            showTooltip(publicacionSelect, 'Debe seleccionar un código de publicación.<br>');
            errorMessage += 'Código de publicación no seleccionado.<br>';
            valid = false;
        }

        // Validar Estatus de la Multimedia
        clearTooltip();
        const estatusValue = estatusSelect.value;
        if (estatusValue === 'Seleccionar..') {
            showTooltip(estatusSelect, 'Debe seleccionar un estatus.<br>');
            errorMessage += 'Estatus no seleccionado.<br>';
            valid = false;
        } else if (estatusValue !== 'A' && estatusValue !== 'I') {
            showTooltip(estatusSelect, 'Debe seleccionar un estatus válido (A o I).<br>');
            errorMessage += 'Estatus inválido.<br>';
            valid = false;
        }

        // Si alguna validación falla, prevenir el envío del formulario y mostrar mensaje de error
        if (!valid) {
            event.preventDefault();
            showTooltip(form, 'Errores en el formulario:<br>' + errorMessage);
        } else {
            // Si todas las validaciones son correctas, redirigir a la página de la tabla de multimedia
            window.location.href = '../tablas/tablaPerfilEmpresarialMultimedia.html';
        }
    });
});
