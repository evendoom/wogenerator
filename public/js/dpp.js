document.addEventListener('DOMContentLoaded', () => {
    const audioChannels = document.getElementById('dppAudio');
    const dolbyXMLContainer = document.querySelector('.dppDolbyXML');
    const form = document.querySelector('form');
    const submitBtn = document.getElementById('submitBtn');
    const inputs = document.querySelectorAll('input');
    const dropdowns = document.querySelectorAll('select');

    // Show dolbyXML input box
    audioChannels.addEventListener('change', () => {
        if (parseInt(audioChannels.value) === 16) {
            dolbyXMLContainer.classList.toggle('d-none');
            dolbyXMLContainer.children[1].setAttribute('required', true);
        } else if (parseInt(audioChannels.value) === 4) {
            dolbyXMLContainer.classList.add('d-none');
            dolbyXMLContainer.children[1].removeAttribute('required');
        }
    });

    // Validate form
    submitBtn.addEventListener('click', () => {
        for (let i = 0; i < form.length; i++) {
            if (form[i].value === '' && form[i].type !== 'submit') {
                form[i].classList.add('is-invalid');
            }
        }
    });

    // Add checkmark when inputs and dropdowns are filled in
    form.addEventListener('input', () => {
        for (let el of inputs) {
            if (el.value !== '') {
                el.labels[0].childNodes[1].classList.remove('check');
                if (el.classList.contains('is-invalid')) {
                    el.classList.remove('is-invalid');
                }
            } else {
                el.labels[0].childNodes[1].classList.add('check');
            }
        }

        for (let el of dropdowns) {
            if (el.value !== '') {
                el.labels[0].childNodes[1].classList.remove('check');
                if (el.classList.contains('is-invalid')) {
                    el.classList.remove('is-invalid');
                }
            } else {
                el.labels[0].childNodes[1].classList.add('check');
            }
        }
    });
});