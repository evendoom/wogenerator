document.addEventListener('DOMContentLoaded', () => {
    let workOrder = document.getElementById('io-select');
    workOrder.addEventListener('change', () => {
        console.log(workOrder.value);
    });
});