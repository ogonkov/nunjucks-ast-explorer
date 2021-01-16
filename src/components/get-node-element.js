import {getElement as h} from "./ast-out/get-element.js";

export function getNodeElement(type, fieldName) {
    return h('details', {
        open: true,
        className: 'node-element'
    }, h(
        'summary',
        null,
        fieldName ? `${type} (${fieldName})` : type
    ));
}
