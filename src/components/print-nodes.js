import nunjucks from "nunjucks";
import {getElement as h} from "./ast-out/get-element.js";
import {getExtensionElement} from "./ast-out/get-extension-element.js";
import {getPropsElement} from "./ast-out/get-props-element.js";
import {getNodeElement} from "./get-node-element.js";

export function printNodes(node, element, {
    showWhitespaces = false
} = {}) {
    const stack = [[node, element]];

    while (stack.length) {
        const [node, currentNode, fieldName] = stack.shift();
        const nodeElement = getNodeElement(node.typename, fieldName);

        currentNode.appendChild(nodeElement);

        if (node instanceof nunjucks.nodes.NodeList) {
            if (node.children.length === 0) {
                nodeElement.appendChild(h('p', {
                    className: 'tree-node__empty-children'
                }, h(
                    'em', null, '(empty)'
                )))

                continue;
            }

            stack.push(...node.children.map((node) => [node, nodeElement]));
            continue;
        }

        if (node instanceof nunjucks.nodes.CallExtension) {
            nodeElement.appendChild(getExtensionElement(node));

            if (node.args) {
                stack.push([node.args, nodeElement, 'args']);
            }

            if (node.contentArgs) {
                stack.push(...node.contentArgs.map((node) => [node, nodeElement, 'contentArgs']));
            }
            continue;
        }

        const nodes = [];
        let props = {};
        node.iterFields(function(val, fieldName) {
            if (val instanceof nunjucks.nodes.Node) {
                nodes.push([fieldName, val]);
            } else {
                props[fieldName] = val;
            }
        });

        if (Object.keys(props).length > 0) {
            nodeElement.appendChild(getPropsElement(props, {
                showWhitespaces
            }));
        }

        for (const [fieldName, node] of nodes) {
            stack.push([node, nodeElement, fieldName]);
        }
    }
}
