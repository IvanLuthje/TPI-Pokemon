document.addEventListener('DOMContentLoaded', function() {
    // Obtiene el primer formulario en el documento y lo guarda en la variable 'form'
    const form = document.querySelector('form');
    
    // Obtiene los elementos del formulario por sus IDs y nombres y los guarda en variables
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const birthdate = document.getElementById('birthdate');
    const gender = document.getElementsByName('gender');
    const rating = document.getElementsByName('rating');
    const email = document.getElementById('email');
    const comment = document.getElementById('comment');

    form.addEventListener('submit', function(event) {
        
        // Previene el envío del formulario para poder validar los datos primero (se queda estático)
        event.preventDefault();
        
        // Valida que todos los campos obligatorios no estén vacíos
        if (!validateEmptyField(firstName.value, 'Nombre')) return;
        if (!validateEmptyField(lastName.value, 'Apellido')) return;
        if (!validateEmptyField(birthdate.value, 'Fecha de Nacimiento')) return;
        if (!validateSelection(gender, 'Sexo')) return; // Valida que se haya seleccionado una opción
        if (!validateSelection(rating, 'Valoración de la página')) return;
        if (!validateEmptyField(email.value, 'Email')) return;

        // Validación formato del nombre y apellido (solo letras)
        if (!validateNameSurname(firstName.value, 'Nombre')) return;
        if (!validateNameSurname(lastName.value, 'Apellido')) return;

        // Valida que el formato de la fecha de nacimiento sea 'dd-mm-yyyy'
        if (!validateBirthdate(birthdate.value)) return;

        // Valida el formato del email
        if (!validateEmail(email.value)) return;

        console.log("Formulario enviado");

        // Si todas las validaciones pasan, muestra un mensaje y envía el formulario
        alert('Formulario enviado correctamente.');
        form.submit();
    });

    // Función para validar que un campo no esté vacío
    function validateEmptyField(value, field) {
        if (value.trim() === '') {
            alert(`El campo ${field} es obligatorio.`);
            return false;
        }
        return true;
    }

    // Función para validar que se haya seleccionado una opción en un grupo de radio buttons
    function validateSelection(elements, field) {
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].checked) {
                return true; // Retorna verdadero si alguna opción está seleccionada
            }
        }
        alert(`Debe seleccionar una opción en el campo ${field}.`);
        return false;
    }

    // Función para validar que el formato de nombre y apellido sea correcto (solo letras)
    function validateNameSurname(value, field) {
        const regex = /^[a-zA-Z]+$/; // Expresión regular que solo permite letras
        if (!regex.test(value.trim())) {
            alert(`El campo ${field} solo puede contener letras de la 'a' a la 'z' y de la 'A' a la 'Z'.`);
            return false;
        }
        return true;
    }

    // Función para validar el formato de la fecha de nacimiento ('dd-mm-yyyy')
    function validateBirthdate(inputDate) {
        console.log(inputDate);

        // La fecha que llega está en formato 'aaaa-mm-dd'
        const regexDate = /^\d{4}-\d{2}-\d{2}$/;
    
        // Verificar si la fecha ingresada coincide con el formato aaaa-mm-dd
        if (!regexDate.test(inputDate)) {
            alert('La fecha de nacimiento debe tener el formato aaaa-mm-dd.');
            return false;
        }
    
        // Dividir la fecha en partes: aaaa, mm, dd
        const [year, month, day] = inputDate.split('-');
    
        // Verificar que las partes de la fecha son válidas
        const date = new Date(year, month - 1, day);
        if (
            date.getFullYear() != year ||
            date.getMonth() + 1 != month ||
            date.getDate() != day
        ) {
            alert('Fecha de nacimiento no es válida.');
            return false;
        }
    
        // Convertir la fecha de aaaa-mm-dd a dd-mm-aaaa
        const convertedDate = `${day}-${month}-${year}`;
    
        // Expresión regular para validar el formato dd-mm-aaaa
        const regexConverted = /^\d{2}-\d{2}-\d{4}$/;
    
        // Verificar que la fecha convertida coincide con el formato dd-mm-aaaa
        if (!regexConverted.test(convertedDate)) {
            alert('La fecha de nacimiento convertida no tiene el formato dd-mm-aaaa.');
            return false;
        }
    
        // si pasan todas las validaciones
        return true;
    }

    // Función para validar el formato del email
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email.trim())) {
            alert('El email debe tener un formato correcto.');
            return false;
        }
        return true;
    }
});
