export function getElement(tagName = 'div', attributes = {}, children = []) {
    const element = document.createElement(tagName);

    for (const [attribute, value] of Object.entries(attributes || {})) {
        if (attribute === '__innerHTML' && typeof value === 'string') {
            element.innerHTML = value;

            continue;
        }

        if (attribute === 'className') {
            element.classList.add(value);

            continue;
        }

        element.setAttribute(
            attribute,
            typeof value === 'boolean' ? '' : value
        );
    }

    for (const child of [].concat(children || [])) {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));

            continue;
        }

        element.appendChild(child);
    }

    return element;
}
