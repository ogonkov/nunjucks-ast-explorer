export function getPre(text) {
    const element = document.createElement('pre');
    element.innerHTML = text;
    element.classList.add('node-element__preformatted');

    return element;
}
