import {getElement as h} from "./get-element.js";

export function getExtensionElement(node) {
    return h(
        'p',
        {
            className: 'node-element__description'
        },
        `${node.extName.constructor.name || node.extName}.${node.prop}`
    );
}
