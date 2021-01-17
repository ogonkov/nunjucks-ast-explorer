export function getFormData(formElement) {
    const formData = {};

    for (let i = 0; i < formElement.elements.length; i++) {
        const element = formElement.elements.item(i);

        if (element.disabled) {
            continue;
        }

        if (element.type === 'checkbox') {
            formData[element.name] = element.checked;
        } else {
            formData[element.name] = element.value;
        }
    }

    return formData;
}
