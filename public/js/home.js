document.addEventListener('DOMContentLoaded', () => {
    let workOrder = document.getElementById('ioSelect');
    let form = document.querySelector('form');
    workOrder.addEventListener('change', () => {
        form.submit();
    });
});