document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario y los elementos de entrada
    const form = document.querySelector('.container_form');
    const nomCatInput = document.getElementById('nom_cat');
    const desCatInput = document.getElementById('des_cat');
    const estCatSelect = document.getElementById('est_cat');

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

    // Validar Nombre de la Categoria
    nomCatInput.addEventListener('blur', function() {
        validateField(nomCatInput, /^[a-zA-Z0-9\s]{3,30}$/, 'El nombre de la categoria no puede estar vacío.<br>', 'El nombre de la categoria debe tener entre 3 y 30 caracteres y solo puede contener letras, números y espacios.<br>');
    });

    // Validar Descripcion de la Categoria
    desCatInput.addEventListener('blur', function() {
        validateField(desCatInput, /^.{0,100}$/, 'La descripcion de la categoria no puede estar vacía.<br>', 'La descripcion de la categoria no puede exceder los 100 caracteres.<br>');
    });

    // Validar Estatus de la Categoria
    estCatSelect.addEventListener('blur', function() {
        clearTooltip();
        const estCatValue = estCatSelect.value;
        if (estCatValue === '') {
            showTooltip(estCatSelect, 'Debe seleccionar un estatus para la categoria.<br>');
        } else if (estCatValue !== 'A' && estCatValue !== 'I') {
            showTooltip(estCatSelect, 'Debe seleccionar un estatus válido para la categoria (A o I).<br>');
        }
    });

    // Agregar evento de envío al formulario
    form.addEventListener('submit', function(event) {
        let valid = true;
        let errorMessage = '';

        // Validar Nombre de la Categoria
        if (!validateField(nomCatInput, /^[a-zA-Z0-9\s]{3,30}$/, 'El nombre de la categoria no puede estar vacío.<br>', 'El nombre de la categoria debe tener entre 3 y 30 caracteres y solo puede contener letras, números y espacios.<br>')) {
            errorMessage += 'Nombre de la categoria inválido.<br>';
            valid = false;
        }

        // Validar Descripcion de la Categoria
        if (!validateField(desCatInput, /^.{0,100}$/, 'La descripcion de la categoria no puede estar vacía.<br>', 'La descripcion de la categoria no puede exceder los 100 caracteres.<br>')) {
            errorMessage += 'Descripcion de la categoria inválida.<br>';
            valid = false;
        }

        // Validar Estatus de la Categoria
        clearTooltip();
        const estCatValue = estCatSelect.value;
        if (estCatValue === '') {
            showTooltip(estCatSelect, 'Debe seleccionar un estatus para la categoria.<br>');
            errorMessage += 'Estatus de la categoria no seleccionado.<br>';
            valid = false;
        } else if (estCatValue !== 'A' && estCatValue !== 'I') {
            showTooltip(estCatSelect, 'Debe seleccionar un estatus válido para la categoria (A o I).<br>');
            errorMessage += 'Estatus de la categoria inválido.<br>';
            valid = false;
        }

        // Si alguna validación falla, prevenir el envío del formulario y mostrar mensaje de error
        if (!valid) {
            event.preventDefault();
            showTooltip(form, 'Errores en el formulario:<br>' + errorMessage);
        } else {
            // Si todas las validaciones son correctas, redirigir a la página de la tabla de categorías
            window.location.href = '../tablas/tablaPerfilEmpresarialCategoria.html';
        }
    });
});