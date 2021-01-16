import nunjucks from 'nunjucks';
import {getElement as h} from "./components/ast-out/get-element.js";
import {getFormData} from "./components/get-form-data.js";
import {printNodes} from "./components/print-nodes.js";
import {RemoteExtension} from "./RemoteExtension.js";

import {domReady} from "./utilities/dom-ready.js";

import './index.scss';

const extensions = [
    new RemoteExtension()
];

const handlers = {
    handleEvent(event) {
        switch (event.type) {
            case 'input': return this.handleInput(event);
            case 'submit': return this.handleSubmit(event);
        }
    },

    handleInput(/* InputEvent */ event) {
        const {template} = getFormData(event.target.form);
        render(template);
    },

    handleSubmit(event) {
        event.preventDefault();
    }
};

function render(template) {
    const rootNode = document.getElementById('tree');
    rootNode.innerHTML = '';

    let nodes = null;
    try {
        nodes = nunjucks.parser.parse(template, extensions);
    } catch (e) {
        rootNode.appendChild(h('div', {
            className: 'app-error'
        }, [
            h('p', null, `Failed to parse nodes. Line ${e.lineno}, column ${e.colno}.`),
            h('p', null, e.message)
        ]));
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

    const {template} = getFormData(form);
    render(template);
}

async function run() {
    await domReady();
    main();
}

run();
