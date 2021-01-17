import {getElement as h} from "./get-element.js";

export function getPre(text) {
    return h('pre', {
        __innerHTML: text,
        className: 'node-element__preformatted'
    });
}
