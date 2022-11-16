document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const driveEnc = document.getElementById('sanhddEncryption');
    const driveEncBox = document.querySelector('.sanhddEncP')
    const driveLabel = document.getElementById('sanhddLabel');
    const driveLabelBox = document.querySelector('.sanhddLabelBox');
    const validators = document.querySelectorAll('.input-validation');
    const submitBtn = document.getElementById('submitBtn');

    // Display Encryption input box when drive format requires encryption
    driveEnc.addEventListener('change', () => {
        if (driveEnc.value === 'encY') {
            driveEncBox.classList.remove('d-none');
            driveEncBox.children[1].setAttribute('required', true);
        } else {
            driveEncBox.classList.add('d-none');
            driveEncBox.children[1].removeAttribute('required');
        }
    });

    // Display textbox if labelling for drive is required
    driveLabel.addEventListener('change', () => {
        if (driveLabel.value === 'labelY') {
            driveLabelBox.classList.remove('d-none');
            driveLabelBox.children[1].setAttribute('required', true);
        } else {
            driveLabelBox.classList.add('d-none');
            driveLabelBox.children[1].removeAttribute('required');
        }
    });

    // Add checkmark for when inputs and dropboxes are filled in
    form.addEventListener('input', () => {
        for (let el of validators) {
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

    // Submit button validation
    submitBtn.addEventListener('click', () => {
        for (let el of validators) {
            if (el.value === '') {
                el.classList.add('is-invalid');
            }
        }
    });
});