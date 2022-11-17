document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const archiveType = document.getElementById('ltoarchiveType');
    const archiveSpec = document.querySelector('.ltoarchivespec');
    const validators = document.querySelectorAll('.input-validation');
    const submitBtn = document.getElementById('submitBtn');

    // Show Archive Spec box when archive type is 'client'
    archiveType.addEventListener('change', () => {
        if (archiveType.value === 'client') {
            archiveSpec.classList.remove('d-none');
            archiveSpec.children[1].setAttribute('required', true);
        } else {
            archiveSpec.classList.add('d-none');
            archiveSpec.children[1].removeAttribute('required');
        }
    });

    // Add checkmark whenever fields are filled in on form
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