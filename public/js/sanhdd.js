document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const driveFormat = document.getElementById('sanhddFormat');
    const driveEncryptionBox = document.querySelector('.sanhddEncryption');
    const driveLabel = document.getElementById('sanhddLabel');
    const driveLabelBox = document.querySelector('.sanhddLabelBox');
    const validators = document.querySelectorAll('.input-validation');

    // Display Encryption input box when drive format requires encryption
    driveFormat.addEventListener('change', () => {
        if (driveFormat.value === 'hfsenc' || driveFormat.value === 'apfs') {
            driveEncryptionBox.classList.remove('d-none');
            driveEncryptionBox.children[1].setAttribute('required', true);
        } else {
            driveEncryptionBox.classList.add('d-none');
            driveEncryptionBox.children[1].removeAttribute('required');
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
});