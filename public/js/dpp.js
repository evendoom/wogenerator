document.addEventListener('DOMContentLoaded', () => {
    const audioChannels = document.getElementById('dppAudio');
    const dolbyXMLContainer = document.querySelector('.dppDolbyXML');
    const form = document.querySelector('form');
    const submitBtn = document.getElementById('submitBtn');

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

    form.addEventListener('input', () => {
        for (let i = 0; i < form.length; i++) {
            if (form[i].value !== '' && form[i].type !== 'submit') {
                form[i].classList.add('valid');
                if (form[i].classList.contains('is-invalid')) {
                    form[i].classList.remove('is-invalid');
                }
            }
        }
    });
});