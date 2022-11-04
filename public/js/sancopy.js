document.addEventListener('DOMContentLoaded', () => {
    const plusBtnSource = document.getElementById('plusBtnSource');
    const minusBtnSource = document.getElementById('minusBtnSource');
    const plusBtnDest = document.getElementById('plusBtnDest');
    const minusBtnDest = document.getElementById('minusBtnDest');
    const sanSourceGroup = document.getElementById('sanCopySourceGroup');
    const sanDestGroup = document.getElementById('sanCopyDestGroup');
    const sanSelect = document.getElementById('sanSelect');
    const form = document.querySelector('form');

    // Event listener for when user clicks Plus button on Source
    plusBtnSource.addEventListener('click', () => {
        appendBox(sanSourceGroup, 'sanSource', 'Path to source media', 'san-source');
        showMinusBtn(minusBtnSource, '.san-source');
        validateInputs(sanSourceGroup);
    });

    // Event listener for when user clicks Plus button on Destination
    plusBtnDest.addEventListener('click', () => {
        appendBox(sanDestGroup, 'sanDest', 'Path to destination', 'san-dest');
        showMinusBtn(minusBtnDest, '.san-dest');
        validateInputs(sanDestGroup);
    });

    // Event listener for when user clicks Minus button on Source
    minusBtnSource.addEventListener('click', () => {
        hideMinusBtn(sanSourceGroup, minusBtnSource, '.san-source');
        validateInputs(sanSourceGroup);
    });

    // Event listener for when user clicks Minus button on Destination
    minusBtnDest.addEventListener('click', () => {
        hideMinusBtn(sanDestGroup, minusBtnDest, '.san-dest');
        validateInputs(sanDestGroup);
    });

    // Add checkmarks for when Source and Destination inputs are filled in
    sanSourceGroup.addEventListener('input', () => {
        validateInputs(sanSourceGroup);
    });

    sanDestGroup.addEventListener('input', () => {
        validateInputs(sanDestGroup);
    });

    // Add checkmark for Select box
    sanSelect.addEventListener('change', () => {
        if (sanSelect.value !== '') {
            sanSelect.labels[0].childNodes[1].classList.remove('check');
            if (sanSelect.classList.contains('is-invalid')) {
                sanSelect.classList.remove('is-invalid');
            }
        } else {
            sanSelect.labels[0].childNodes[1].classList.add('check');
        }
    });

    // Submit button validation
    submitBtn.addEventListener('click', () => {
        for (let i = 0; i < form.length; i++) {
            if (form[i].value === '' && form[i].type !== 'submit') {
                form[i].classList.add('is-invalid');
            }
        }
    });
});

// Create more input boxes
const appendBox = (parent, name, placeholder, classAttr) => {
    let inputBox = document.createElement('input');
    inputBox.setAttribute('type', 'text');
    inputBox.setAttribute('name', name);
    inputBox.setAttribute('placeholder', placeholder);
    inputBox.setAttribute('required', true);
    inputBox.classList.add('form-control');
    inputBox.classList.add(classAttr);

    parent.appendChild(inputBox);
}

// Show Minus button when input boxes are more than 1
const showMinusBtn = (button, classAttr) => {
    let uploadNum = document.querySelectorAll(classAttr);
    if (uploadNum.length > 1) {
            button.classList.remove('hide-icon');
    }
}

// Hide Minus button when input boxes are only 1
const hideMinusBtn = (parent, button, classAttr) => {
    let lastBox = parent.lastChild;
    parent.removeChild(lastBox);

    let uploadNum = document.querySelectorAll(classAttr);
    
    if (uploadNum.length === 1) {
        button.classList.add('hide-icon');
    }
}

// Validate source upload inputs
const validateInputs = (parent) => {
    let groupInputs = parent.querySelectorAll('input');
    let valContainer = [];

    for (let el of groupInputs) {
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