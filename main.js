const $ = query => document.querySelector(query)

const mainForm = $('#order-form')

const onlyNumbers = (element) => {
    element.addEventListener('input', _ => {
        element.value = ([... (element.value)]).filter(e => /([0-9\s])/g.test(e)).join('');
    })
}

const emailValidator = email => {
    if (email.split('@').length !== 2) return false;
    const [local_part, domain] = email.split('@');

    if (! /(^[a-z0-9.+_-])/gi.test(local_part) ||
        ! /(^[a-z0-9 -]+\.[a-z]{2,})/gi.test(domain))
        return false

    return true
}
console.log()
const onlyLetters = element => {
    element.addEventListener('input', _ => {
        element.value = ([... (element.value)]).filter(char => /([a-zA-ZšŠđĐžŽćĆčČ \s])/g.test(char)).join('');
    })
}
const allInputs = mainForm.querySelectorAll('input');
for (let inputField of allInputs) {
    if (inputField.dataset.onlyNumbers !== undefined) onlyNumbers(inputField);
    if (inputField.dataset.onlyLetters !== undefined) onlyLetters(inputField);
}


$('#cash').addEventListener('click', _ => {
    const formElements = mainForm.elements;
    const order = {}
    for (let formElement of formElements) {


        if (formElement.type !== 'button' &&
            formElement.parentElement.parentElement.id === 'personal-data')
            order[formElement.name] = formElement.value;
    }
    order['payment-method'] = 'cash';
    console.log(order)

    const x = $('#hide-pop-up')
    x.removeAttribute('id')
    x.setAttribute('id', 'form-submited')
})

const phoneNumberValidator = phoneNumber => {
    return (
        (phoneNumber.split('').filter(char => /[0-9]/g.test(char))).length >= 9
    )
}
const cardNuberValidator = phoneNumber => {
    return (
        (phoneNumber.split('').filter(char => /[0-9]/g.test(char))).length === 16
    )
}

$('#btn_next').addEventListener('click', e => {

    if (mainForm.checkValidity()) e.preventDefault()
    const formElements = mainForm.elements;
    const order = {}
    for (let formElement of formElements) {
        if (formElement.type === 'email' &&
            !emailValidator(formElement.value))
            return
        if (formElement.type === 'tel' && !phoneNumberValidator(formElement.value)) {
            alert('Phone number must contain more 8 digits')
            return;

        }

        if (formElement.type !== 'button' &&
            formElement.parentElement.parentElement.id === 'personal-data')
            order[formElement.name] = formElement.value;
    }
    if (!mainForm.checkValidity()) return
    $('#personal-data').classList.toggle('hide-section')
    $('#payment-method').classList.toggle('hide-section')

})
$('#btn_back').addEventListener('click', _ => {

    $('#personal-data').classList.toggle('hide-section')
    $('#payment-method').classList.toggle('hide-section')

})

$('#card').addEventListener('click', _ => {
    $('#card-data').classList.toggle('hide-section')
    $('#payment-method').classList.toggle('hide-section')
})

$('#btn_pay').addEventListener('click', _ => {
    const formElements = mainForm.elements;
    const order = {}
    for (let formElement of formElements) {
        if (formElement.type !== 'button')
            order[formElement.name] = formElement.value;
    }
    order['payment-method'] = 'card';
    console.log(order)

    const x = $('#hide-pop-up')
    x.removeAttribute('id')
    x.setAttribute('id', 'form-submited')

}
)



mainForm.addEventListener('input', _ => {
    if ($("#security-code").value.length === 3 ||
        $("#security-code").value.length === 4 &&

        cardNuberValidator($("#card-number").value)) {
        $('#btn_pay').removeAttribute("disabled")
        return;
    }
    $('#btn_pay').setAttribute('disabled', 'true')

})

$('#btn_change-payment-method').addEventListener("click", _ => {
    $('#card-data').classList.toggle('hide-section')
    $('#payment-method').classList.toggle('hide-section')
})