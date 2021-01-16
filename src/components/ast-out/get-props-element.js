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
                if (typeof value !== 'string') {
                    return h('td', null, JSON.stringify(value));
                } else if (value.includes('\n')) {
                    return h('td', null, showWhitespaces ?
                        h('div', {
                            className: 'node-element__preformatted',
                            __innerHTML: addWhitespaces(value)
                        }) :
                        getPre(value)
                    );
                }

                return h('td', null, value);
            }))
        ))
    ]);
}
