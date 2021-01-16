import {getElement as h} from "./get-element.js";
import {getTableRow} from "./table/get-row.js";

export function getPropsElement(props) {
    return h('table', null, [
        h('thead', null, [
            h('tr', null, [
                h('th', null, 'Field'),
                h('th', null, 'Value')
            ])
        ]),
        h('tbody', null, Object.entries(props).map(
            ([field, value]) => getTableRow(field, value)
        ))
    ]);
}
