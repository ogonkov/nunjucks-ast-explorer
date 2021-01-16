import nunjucks from 'nunjucks';
import {getElement as h} from "./components/ast-out/get-element.js";
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

    const source = form.elements.template;

    render(source);
}

async function run() {
    await domReady();
    main();
}

run();
