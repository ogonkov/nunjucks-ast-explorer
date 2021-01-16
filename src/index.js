import nunjucks from 'nunjucks';
import {getElement as h} from "./components/ast-out/get-element.js";
import {getFormData} from "./components/get-form-data.js";
import {getParentElement} from "./components/get-parent-element.js";
import {printNodes} from "./components/print-nodes.js";
import {RemoteExtension} from "./RemoteExtension.js";

import {domReady} from "./utilities/dom-ready.js";

import './index.scss';

const extensions = [
    new RemoteExtension()
];

const formHandlers = {
    handleEvent(event) {
        switch (event.type) {
            case 'input': return this.handleInput(event);
            case 'submit': return this.handleSubmit(event);
        }
    },

    handleInput(/* InputEvent */ event) {
        const {
            template,
            show_whitespace: showWhitespaces
        } = getFormData(event.target.form);
        render(template, {
            showWhitespaces
        });
    },

    handleSubmit(event) {
        event.preventDefault();
    }
};

const treeHandlers = {
    handleEvent(event) {
        switch (event.type) {
            case 'click': this.handleClick(event);
        }
    },

    handleClick(event) {
        const element = event.target;
        const isExpand = element.matches('[data-ui-action="expand"]');

        if (!isExpand && !element.matches('[data-ui-action="collapse"]')) {
            return;
        }

        const nodeElement = getParentElement(element, '[data-ui-area="node"]');
        if (nodeElement === null) {
            return;
        }

        const childrenNodes = nodeElement.querySelectorAll('[data-ui-area="node"]');

        for (const [, node] of childrenNodes.entries()) {
            node.open = isExpand;
        }

        if (isExpand) {
            nodeElement.open = true;
        }
    }
};

function render(template, {showWhitespaces} = {}) {
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

    printNodes(nodes, rootNode, {
        showWhitespaces
    });
}

function main() {
    const form = document.getElementById('explorer');
    form.addEventListener('submit', formHandlers);
    form.addEventListener('input', formHandlers);

    const rootNode = document.getElementById('tree');
    rootNode.addEventListener('click', treeHandlers);

    const {
        template,
        show_whitespace: showWhitespaces
    } = getFormData(form);
    render(template, {
        showWhitespaces
    });
}

async function run() {
    await domReady();
    main();
}

run();
