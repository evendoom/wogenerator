document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('copyBtn').addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(document.querySelector('.copyme').outerText);
            document.querySelector('.copied').innerText = 'Copied!';
        } catch {
            alert('Could not copy to clipboard!');
        }
    });
});