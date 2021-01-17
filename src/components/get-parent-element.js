export function getParentElement(node, selector) {
    const stack = [node];

    while (stack.length) {
        const element = stack.shift();
        const parentElement = element.parentElement;

        if (parentElement === null) {
            return null;
        }

        if (parentElement.matches(selector)) {
            return element.parentElement;
        }

        stack.push(parentElement);
    }

    return null;
}
