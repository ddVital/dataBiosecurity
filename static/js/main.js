var submitBtn = document.querySelector('#btn-submit');

function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove non-numeric characters
    if (cpf.length !== 11) return false;

    var sum = 0;
    var remainder;

    for (var i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) {
        remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (var i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) {
        remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove all non-numeric characters
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Add a dot after the first 3 digits
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Add a dot after the next 3 digits
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Add a hyphen after the last 2 digits
    return cpf;
}

function formatPhoneNumber(number) {
    const inputValue = number.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    let formattedValue = '';

    if (inputValue.length > 0) formattedValue = '(' + inputValue.substring(0, 2);
    if (inputValue.length > 2) formattedValue += ') ' + inputValue.substring(2, 7);
    if (inputValue.length > 7) formattedValue += '-' + inputValue.substring(7, 11);
    return formattedValue;
}

function validatePhoneNumber(number, input) {
    if (number.length === 15) {
        enableSubmitBtn(submitBtn);
        removeInputErrorClasses(input)
    } else {
        disableSubmitBtn(submitBtn)
        setInputErrorClasses(input);
    }
}

// Usage example
var alergiaInput = document.getElementById('id_alergias');
var alergiaDescInput = document.getElementById('id_alergia_descricao');
var filhoInput = document.getElementById('id_filho');
var qtdFilho = document.getElementById('id_qtd_filhos');
var contatoInput = document.getElementById('id_contato');
var contatoEmergenciaInput = document.getElementById('id_contato_emergencia');
var cpfInput = document.getElementById('id_cpf');

if (cpfInput) {
    cpfInput.addEventListener('input', function() {
        this.value = formatCPF(this.value);
    });

    filhoInput.addEventListener('change', function() {
        console.log(qtdFilho);
        if (this.value === 'sim') enableInput(qtdFilho);
        else disableInput(qtdFilho);
    });

    alergiaInput.addEventListener('change', function() {
        if (this.value === 'sim') enableInput(alergiaDescInput);
        else disableInput(alergiaDescInput);
    });

    contatoInput.addEventListener('input', function() {
        this.value = formatPhoneNumber(this.value);
        validatePhoneNumber(this.value, contatoInput);
    });

    contatoEmergenciaInput.addEventListener('input', function() {
        this.value = formatPhoneNumber(this.value);
        validatePhoneNumber(this.value, contatoEmergenciaInput);
    });


    cpfInput.addEventListener('blur', function() {
        // this.value = formatCPF(this.value);
        if (!validateCPF(this.value)) {
            disableSubmitBtn(submitBtn)
            setInputErrorClasses(cpfInput);
        } else {
            enableSubmitBtn(submitBtn)
            removeInputErrorClasses(cpfInput);
        }
    });

    function disableSubmitBtn(btn) {
        btn.disabled = true;
        btn.classList.add("cursor-not-allowed");
        btn.classList.add("opacity-50");
    }

    function enableSubmitBtn(btn) {
        btn.disabled = false;
        btn.classList.remove("cursor-not-allowed");
        btn.classList.remove("opacity-50");
    }

    function setInputErrorClasses(input) {
        input.classList.add('border-red-500')
        input.classList.remove('border-gray-300')
    }

    function removeInputErrorClasses(input) {
        input.classList.remove('border-red-500')
        input.classList.add('border-gray-300')
    }

    function enableInput(input) {
        input.disabled = false;
        input.classList.remove("cursor-not-allowed");
        input.classList.remove("opacity-50");
    }

    function disableInput(input) {
        input.disabled = true;
        input.classList.add("cursor-not-allowed");
        input.classList.add("opacity-50");
    }
}

var mobileMenuBtn = document.getElementById('mobile-menu-button')

if (mobileMenuBtn) {
    
    mobileMenuBtn.addEventListener('click', function () {
        var mobileMenu = document.getElementById('mobile-menu');
        console.log('click', mobileMenu.style.display);
        if (mobileMenu.style.display === 'block') {
            mobileMenu.style.display = 'none';
    } else {
        mobileMenu.style.display = 'block';
    }
});
}

var acceptTerms = document.getElementById('acceptTerms')

if (acceptTerms) {
    console.log('s');
    document.addEventListener('DOMContentLoaded', () => {
        disableSubmitBtn(submitBtn);
        console.log('a');
    })

    acceptTerms.addEventListener('click', function() {
        if (acceptTerms.checked) {
            enableSubmitBtn(submitBtn)
        } else {
            disableSubmitBtn(submitBtn)
        }
    });
}