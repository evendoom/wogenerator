document.addEventListener('DOMContentLoaded', () => {
    const plusBtn = document.getElementById('plusBtn');
    const minusBtn = document.getElementById('minusBtn');
    const uploadGroup = document.getElementById('uploadGroup');
    const customPassword = document.getElementById('upPackagePassword');
    const customPasswordDiv = document.querySelector('.package-password');
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('.input-validation');
    const dropdowns = document.querySelectorAll('select');


    // Event listener for whenever user clicks the Plus button
    plusBtn.addEventListener('click', () => {
        appendUploadBox(uploadGroup);
        showMinusBtn(minusBtn);
        validateUploadSource(uploadGroup);
    });

    // Event listener for whenenver user clicks the Minus button
    minusBtn.addEventListener('click', () => {
        hideMinusBtn(uploadGroup, minusBtn);
        validateUploadSource(uploadGroup);
    });

    // Event listener for when user selects type of encryption
    // It shows a custom password input box
    customPassword.addEventListener('change', () => {
        if (customPassword.value === 'custom') {
            customPasswordDiv.classList.remove('d-none');
            customPasswordDiv.children[1].setAttribute('required', true);
        } else {
            customPasswordDiv.classList.add('d-none');
            customPasswordDiv.children[1].removeAttribute('required');
        }
    });

    // Add checkmarks for when inputs and dropdowns are filled in
    form.addEventListener('input', () => {
        // For inputs except 'Source'
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

        // For Dropdowns
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

    // Add checkmarks for when upload sources are filled in
    uploadGroup.addEventListener('input', () => {
        validateUploadSource(uploadGroup);
    });
});

// Create more input boxes for upload Source
const appendUploadBox = (parent) => {
    let inputBox = document.createElement('input');
    inputBox.setAttribute('type', 'text');
    inputBox.setAttribute('name', 'upSource');
    inputBox.setAttribute('placeholder', 'Path to media on SAN');
    inputBox.setAttribute('required', true);
    inputBox.classList.add('form-control');
    inputBox.classList.add('up-source');

    parent.appendChild(inputBox)
}

// Show Minus button when upload sources are more than 1
const showMinusBtn = (button) => {
    let uploadNum = document.querySelectorAll('.up-source');
    if (uploadNum.length > 1) {
            button.classList.remove('hide-icon');
    }
}

// Hide Minus button when upload sources are only 1
const hideMinusBtn = (parent, button) => {
    let lastBox = parent.lastChild;
    parent.removeChild(lastBox);

    let uploadNum = document.querySelectorAll('.up-source');
    
    if (uploadNum.length === 1) {
        button.classList.add('hide-icon');
    }
}

// Validate source upload inputs
const validateUploadSource = (parent) => {
    let uploadGroupInputs = parent.querySelectorAll('input');
    let valContainer = [];

    for (let el of uploadGroupInputs) {
        if (el.value === '') {
            valContainer.push(false);
        }
    }

    if (valContainer.includes(false)) {
        uploadGroup.children[3].classList.add('check');
    } else {
        uploadGroup.children[3].classList.remove('check');
    }
}