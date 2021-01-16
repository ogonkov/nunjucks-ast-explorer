import nunjucks from 'nunjucks';
import {getTableRow} from "./components/ast-out/table/get-row.js";
import {RemoteExtension} from "./RemoteExtension.js";

import {domReady} from "./utilities/dom-ready.js";

const extensions = [
    new RemoteExtension()
];

function getPropsElement(props) {
    const element = document.createElement('table');

    const header = document.createElement('thead');
    header.innerHTML = '<tr><th>Field</th><th>Value</th></tr>';
    element.appendChild(header);

    const body = document.createElement('tbody');
    Object.entries(props).forEach(function([field, value]) {
        body.appendChild(getTableRow(field, value));
    });

    element.appendChild(body);

    return element;
}

function getNodeElement(type, fieldName) {
    const element = document.createElement('details');
    element.setAttribute('open', '');
    element.classList.add('node-element');

    const summary = document.createElement('summary');
    summary.textContent = fieldName ? `${type} (${fieldName})` : type;
    element.appendChild(summary);

    return element;
}

function getExtensionElement(node) {
    const element = document.createElement('p');
    element.classList.add('node-element__description');
    element.textContent = `${node.extName.constructor.name || node.extName}.${node.prop}`;

    return element;
}

function printNodes(node, element) {
    const stack = [[node, element]];

    while (stack.length) {
        const [node, currentNode, fieldName] = stack.shift();
        const nodeElement = getNodeElement(node.typename, fieldName);

        currentNode.appendChild(nodeElement);

        if (node instanceof nunjucks.nodes.NodeList) {
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
        node.iterFields(function (val, fieldName) {
            if (val instanceof nunjucks.nodes.Node) {
                nodes.push([fieldName, val]);
            } else {
                props[fieldName] = val;
            }
        });

        if (Object.keys(props).length > 0) {
            nodeElement.appendChild(getPropsElement(props));
        }

        for (const [fieldName, node] of nodes) {
            stack.push([node, nodeElement, fieldName]);
        }
    }
}

const handlers = {
    handleEvent(event) {
        switch (event.type) {
            case 'input': return this.handleInput(event);
            case 'submit': return this.handleSubmit(event);
        }
    },

    handleInput(/* InputEvent */ event) {
        render(event.target);
    },

    handleSubmit(event) {
        event.preventDefault();
    }
};

function render(/* HTMLTextAreaElement */ textarea) {
    const {value: template} = textarea;
    const rootNode = document.getElementById('tree');
    rootNode.innerHTML = '';

    let nodes = null;
    try {
        nodes = nunjucks.parser.parse(template, extensions);
    } catch (e) {
        rootNode.innerHTML = `<div class="app-error">
            <p>Failed to parse nodes. Line ${e.lineno}, column ${e.colno}.</p>
            <p>${e.message}</p>
        </div>`;
    }

    if (nodes === null) {
        return;
    }

    printNodes(nodes, rootNode);
}

function main() {
    const form = document.getElementById('explorer');
    form.addEventListener('submit', handlers);
    form.addEventListener('input', handlers);

    const source = form.elements.template;

    render(source);
}

async function run() {
    await domReady();
    main();
}

run();
