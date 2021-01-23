import {getElement as h} from "./get-element.js";

export function getExtensionElement(node) {
    return h(
        'p',
        {
            className: 'tree-node__description'
        },
        `${node.extName.constructor.name || node.extName}.${node.prop}`
    );
}
