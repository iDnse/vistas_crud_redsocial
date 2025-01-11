document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario y los elementos de entrada
    const form = document.querySelector('.container_form');
    const desCon = document.getElementById('des_con');
    const actCon = document.getElementById('act_con');
    const fkyTipCon = document.getElementById('fky_tip_con');
    const fkyFanPag = document.getElementById('fky_fan_pag');
    const estCon = document.getElementById('est_con');

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

    // Función para establecer la fecha de actualización automáticamente
    const setUpdateDate = () => {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000; // Offset en milisegundos
        const localISOTime = (new Date(now - offset)).toISOString().slice(0, 16); // Formato 'YYYY-MM-DDTHH:MM'
        actCon.value = localISOTime;
    };

    // Establecer la fecha de actualización al cargar la página
    setUpdateDate();

    // Validar Descripcion del Contacto
    desCon.addEventListener('blur', function() {
        validateField(desCon, /^.{10,100}$/, 'La descripción del contacto no puede estar vacía.<br>', 'La descripción del contacto debe tener entre 10 y 100 caracteres.<br>');
    });

    // Validar Fecha de Actualizacion
    actCon.addEventListener('blur', function() {
        clearTooltip();
        if (!actCon.value) {
            showTooltip(actCon, 'La fecha de actualización es obligatoria.<br>');
        }
    });

    // Validar Codigo Tipo de Contacto
    fkyTipCon.addEventListener('blur', function() {
        clearTooltip();
        if (!fkyTipCon.value) {
            showTooltip(fkyTipCon, 'Debe seleccionar un código tipo de contacto.<br>');
        }
    });

    // Validar Codigo de Fan Page
    fkyFanPag.addEventListener('blur', function() {
        clearTooltip();
        if (!fkyFanPag.value) {
            showTooltip(fkyFanPag, 'Debe seleccionar un código de fan page.<br>');
        }
    });

    // Validar Estatus del Contacto
    estCon.addEventListener('blur', function() {
        clearTooltip();
        if (!estCon.value) {
            showTooltip(estCon, 'Debe seleccionar un estatus del contacto.<br>');
        } else if (estCon.value !== 'A' && estCon.value !== 'I') {
            showTooltip(estCon, 'Debe seleccionar un estatus válido para el contacto (A o I).<br>');
        }
    });

    // Agregar evento de envío al formulario
    form.addEventListener('submit', function(event) {
        let valid = true;
        let errorMessage = '';

        // Validar Descripcion del Contacto
        if (!validateField(desCon, /^.{10,100}$/, 'La descripción del contacto no puede estar vacía.<br>', 'La descripción del contacto debe tener entre 10 y 100 caracteres.<br>')) {
            errorMessage += 'Descripción del contacto inválida.<br>';
            valid = false;
        }

        // Validar Fecha de Actualizacion
        clearTooltip();
        if (!actCon.value) {
            showTooltip(actCon, 'La fecha de actualización es obligatoria.<br>');
            errorMessage += 'Fecha de actualización no seleccionada.<br>';
            valid = false;
        }

        // Validar Codigo Tipo de Contacto
        if (!fkyTipCon.value) {
            showTooltip(fkyTipCon, 'Debe seleccionar un código tipo de contacto.<br>');
            errorMessage += 'Código tipo de contacto no seleccionado.<br>';
            valid = false;
        }

        // Validar Codigo de Fan Page
        if (!fkyFanPag.value) {
            showTooltip(fkyFanPag, 'Debe seleccionar un código de fan page.<br>');
            errorMessage += 'Código de fan page no seleccionado.<br>';
            valid = false;
        }

        // Validar Estatus del Contacto
        if (!estCon.value) {
            showTooltip(estCon, 'Debe seleccionar un estatus del contacto.<br>');
            errorMessage += 'Estatus del contacto no seleccionado.<br>';
            valid = false;
        } else if (estCon.value !== 'A' && estCon.value !== 'I') {
            showTooltip(estCon, 'Debe seleccionar un estatus válido para el contacto (A o I).<br>');
            errorMessage += 'Estatus del contacto inválido.<br>';
            valid = false;
        }

        // Si alguna validación falla, prevenir el envío del formulario y mostrar mensaje de error
        if (!valid) {
            event.preventDefault();
            showTooltip(form, 'Errores en el formulario:<br>' + errorMessage);
        } else {
            // Redirigir a la página anterior si todas las validaciones son correctas
            window.location.href = '../tablas/tablaPerfilEmpresarialContacto.html';
        }
    });
});
