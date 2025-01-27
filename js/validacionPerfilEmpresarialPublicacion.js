document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.container_form');
    const fechaInput = document.getElementById('fec_pub');
    const tituloInput = document.getElementById('tit_pub');
    const descripcionInput = document.getElementById('des_pub');
    const ciudadSelect = document.getElementById('fky_ciu');
    const personaSelect = document.getElementById('fky_per');
    const tipoAcontecimientoSelect = document.getElementById('fky_tip_aco');
    const fanPageSelect = document.getElementById('fky_fan_pag');
    const estatusSelect = document.getElementById('est_pub');

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

    // Establecer la fecha de publicación como la fecha actual
    const setFechaActual = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        fechaInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    setFechaActual();

    // Validaciones individuales
    const validateSelect = (select, message) => {
        if (select.value === 'Seleccionar..') {
            showTooltip(select, message);
            return false;
        }
        return true;
    };

    fechaInput.addEventListener('blur', () => {
        if (!fechaInput.value) {
            showTooltip(fechaInput, 'Debe seleccionar una fecha de publicación.<br>');
        }
    });

    tituloInput.addEventListener('blur', () => {
        validateField(tituloInput, /^.{2,}$/, 'El título no puede estar vacío.<br>', 'El título debe tener más de un carácter.<br>');
    });

    descripcionInput.addEventListener('blur', () => {
        validateField(descripcionInput, /^.{2,}$/, 'La descripción no puede estar vacía.<br>', 'La descripción debe tener más de un carácter.<br>');
    });

    ciudadSelect.addEventListener('blur', () => {
        validateSelect(ciudadSelect, 'Debe seleccionar un código de ciudad.<br>');
    });

    personaSelect.addEventListener('blur', () => {
        validateSelect(personaSelect, 'Debe seleccionar un código de persona.<br>');
    });

    tipoAcontecimientoSelect.addEventListener('blur', () => {
        validateSelect(tipoAcontecimientoSelect, 'Debe seleccionar un código de tipo de acontecimiento.<br>');
    });

    fanPageSelect.addEventListener('blur', () => {
        validateSelect(fanPageSelect, 'Debe seleccionar un código de Fan Page.<br>');
    });

    estatusSelect.addEventListener('blur', () => {
        if (!validateSelect(estatusSelect, 'Debe seleccionar un estatus.<br>')) return;
        if (estatusSelect.value !== 'A' && estatusSelect.value !== 'I') {
            showTooltip(estatusSelect, 'Debe seleccionar un estatus válido (A o I).<br>');
        }
    });

    // Validar formulario al enviar
    form.addEventListener('submit', function(event) {
        let valid = true;
        let errorMessage = '';

        if (!fechaInput.value) {
            showTooltip(fechaInput, 'Debe seleccionar una fecha de publicación.<br>');
            errorMessage += 'Fecha de publicación no seleccionada.<br>';
            valid = false;
        }

        if (!validateField(tituloInput, /^.{2,}$/, 'El título no puede estar vacío.<br>', 'El título debe tener más de un carácter.<br>')) {
            errorMessage += 'Título inválido.<br>';
            valid = false;
        }

        if (!validateField(descripcionInput, /^.{2,}$/, 'La descripción no puede estar vacía.<br>', 'La descripción debe tener más de un carácter.<br>')) {
            errorMessage += 'Descripción inválida.<br>';
            valid = false;
        }

        if (!validateSelect(ciudadSelect, 'Debe seleccionar un código de ciudad.<br>')) {
            errorMessage += 'Código de ciudad no seleccionado.<br>';
            valid = false;
        }

        if (!validateSelect(personaSelect, 'Debe seleccionar un código de persona.<br>')) {
            errorMessage += 'Código de persona no seleccionado.<br>';
            valid = false;
        }

        if (!validateSelect(tipoAcontecimientoSelect, 'Debe seleccionar un código de tipo de acontecimiento.<br>')) {
            errorMessage += 'Código de tipo de acontecimiento no seleccionado.<br>';
            valid = false;
        }

        if (!validateSelect(fanPageSelect, 'Debe seleccionar un código de Fan Page.<br>')) {
            errorMessage += 'Código de Fan Page no seleccionado.<br>';
            valid = false;
        }

        if (!validateSelect(estatusSelect, 'Debe seleccionar un estatus.<br>')) {
            errorMessage += 'Estatus no seleccionado.<br>';
            valid = false;
        } else if (estatusSelect.value !== 'A' && estatusSelect.value !== 'I') {
            showTooltip(estatusSelect, 'Debe seleccionar un estatus válido (A o I).<br>');
            errorMessage += 'Estatus inválido.<br>';
            valid = false;
        }

        if (!valid) {
            event.preventDefault();
            showTooltip(form, 'Errores en el formulario:<br>' + errorMessage);
        } else {
            window.location.href = '../tablas/tablaPerfilEmpresarialPublicacion.html';
        }
    });
});
