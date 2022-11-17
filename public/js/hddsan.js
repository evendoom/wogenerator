document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const validators = document.querySelectorAll('.input-validation');
    const submitBtn = document.getElementById('submitBtn');

    // Add checkmarks when inputs are filled in
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