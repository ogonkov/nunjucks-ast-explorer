import {getElement as h} from "./ast-out/get-element.js";

export function getNodeElement(type, fieldName) {
    return h('details', {
        open: true,
        className: 'node-element',
        'data-ui-area': 'node'
    }, h(
        'summary',
        null,
        [
            fieldName ? `${type} (${fieldName})` : type,
            h('button', {
                title: 'Expand subtree',
                className: 'node-element__control',
                'data-ui-action': 'expand'
            }, '+'),
            h('button', {
                title: 'Collapse subtree',
                className: 'node-element__control',
                'data-ui-action': 'collapse'
            }, '-')
        ]
    ));
}
