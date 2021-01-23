import {addWhitespaces} from "./add-whitespaces.js";
import {getElement as h} from "./get-element.js";
import {getPre} from "./get-pre.js";
import {getTableRow} from "./table/get-row.js";

export function getPropsElement(props, {showWhitespaces} = {}) {
    return h('table', null, [
        h('thead', null, [
            h('tr', null, [
                h('th', null, 'Field'),
                h('th', null, 'Value')
            ])
        ]),
        h('tbody', null, Object.entries(props).map(
            ([field, value]) => getTableRow([field, value].map((value) => {
                let children = value;

                if (typeof children !== 'string') {
                    children = JSON.stringify(children);
                } else if (children.includes('\n')) {
                    children = showWhitespaces ?
                        h('div', {
                            className: 'tree-node__preformatted',
                            __innerHTML: addWhitespaces(children.replace(/</g, '&lt;'))
                        }) :
                        getPre(children.replace(/</g, '&lt;'));
                }

                return h('td', null, children);
            }))
        ))
    ]);
}
