document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario y los elementos de entrada
    const form = document.querySelector('.container_form');
    const selectFanPage = document.getElementById('fky_fan_pag');
    const selectCategoria = document.getElementById('fky_cat');

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

    // Función para validar un campo de selección
    const validateSelect = (select, emptyMessage, invalidMessage) => {
        clearTooltip();
        const value = select.value.trim();
        if (value === '') {
            showTooltip(select, emptyMessage);
            return false;
        } else if (!/^\d+$/.test(value)) {
            showTooltip(select, invalidMessage);
            return false;
        }
        return true;
    };

    // Validar Fan Page
    selectFanPage.addEventListener('blur', function() {
        validateSelect(selectFanPage, 'Debe seleccionar un código de Fan Page.<br>', 'Por favor, seleccione un valor válido.<br>');
    });

    // Validar Categoria
    selectCategoria.addEventListener('blur', function() {
        validateSelect(selectCategoria, 'Debe seleccionar un código de Categoria.<br>', 'Por favor, seleccione un valor válido.<br>');
    });

    // Agregar evento de envío al formulario
    form.addEventListener('submit', function(event) {
        let valid = true;
        let errorMessage = '';

        // Validar Fan Page
        if (!validateSelect(selectFanPage, 'Debe seleccionar un código de Fan Page.<br>', 'Por favor, seleccione un valor válido.<br>')) {
            errorMessage += 'Código de Fan Page inválido.<br>';
            valid = false;
        }

        // Validar Categoria
        if (!validateSelect(selectCategoria, 'Debe seleccionar un código de Categoria.<br>', 'Por favor, seleccione un valor válido.<br>')) {
            errorMessage += 'Código de Categoria inválido.<br>';
            valid = false;
        }

        // Si alguna validación falla, prevenir el envío del formulario y mostrar mensaje de error
        if (!valid) {
            event.preventDefault();
            showTooltip(form, 'Errores en el formulario:<br>' + errorMessage);
        } else {
            window.location.href = '../tablas/tablaPerfilEmpresarialCategoriaFanPage.html';
        }
    });
});
