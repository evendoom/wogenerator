const cleanRecipients = (container) => {
    let exp = /\r\n/g;
    let cleanContainer = container.replaceAll(exp, '');
    return cleanContainer.split(',');
}

module.exports = cleanRecipients;