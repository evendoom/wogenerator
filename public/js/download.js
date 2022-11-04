document.addEventListener('DOMContentLoaded', () => {
    const plusBtn = document.getElementById('plusBtn');
    const minusBtn = document.getElementById('minusBtn');
    const downloadGroup = document.getElementById('downloadGroup');
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('.input-validation');

    // Event listener for whenever user clicks the Plus button
    plusBtn.addEventListener('click', () => {
        appendDownloadBox(downloadGroup);
        showMinusBtn(minusBtn);
        validateDownloadSource(downloadGroup);
    });

    // Event listener for whenenver user clicks the Minus button
    minusBtn.addEventListener('click', () => {
        hideMinusBtn(downloadGroup, minusBtn);
        validateDownloadSource(downloadGroup);
    });

    // Add checkmarks for when form inputs are filled in (except download URL inputs)
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
    });

    // Add checkmark for when download URL inputs are filled in
    downloadGroup.addEventListener('input', () => {
        validateDownloadSource(downloadGroup);
    });

    // Submit button validation
    submitBtn.addEventListener('click', () => {
        for (let i = 0; i < form.length; i++) {
            if (form[i].value === '' && form[i].type !== 'submit' && !form[i].classList.contains('not-required')) {
                form[i].classList.add('is-invalid');
            }
        }
    });
});

// Create more input boxes for download URLs
const appendDownloadBox = (parent) => {
    let inputBox = document.createElement('input');
    inputBox.setAttribute('type', 'text');
    inputBox.setAttribute('name', 'downURL');
    inputBox.setAttribute('placeholder', 'URL for download');
    inputBox.setAttribute('required', true);
    inputBox.classList.add('form-control');
    inputBox.classList.add('down-source');

    parent.appendChild(inputBox)
}

// Show Minus button when upload sources are more than 1
const showMinusBtn = (button) => {
    let downloadNum = document.querySelectorAll('.down-source');
    if (downloadNum.length > 1) {
            button.classList.remove('hide-icon');
    }
}

// Hide Minus button when upload sources are only 1
const hideMinusBtn = (parent, button) => {
    let lastBox = parent.lastChild;
    parent.removeChild(lastBox);

    let downloadNum = document.querySelectorAll('.down-source');
    
    if (downloadNum.length === 1) {
        button.classList.add('hide-icon');
    }
}

// Validate source upload inputs
const validateDownloadSource = (parent) => {
    let downloadGroupInputs = parent.querySelectorAll('input');
    let valContainer = [];

    for (let el of downloadGroupInputs) {
        if (el.value === '') {
            valContainer.push(false);
        } else {
            if (el.classList.contains('is-invalid')) {
                el.classList.remove('is-invalid');
            }
        }
    }

    if (valContainer.includes(false)) {
        parent.children[3].classList.add('check');
    } else {
        parent.children[3].classList.remove('check');
    }
}