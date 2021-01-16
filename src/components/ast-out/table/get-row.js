import {getElement as h} from "../get-element.js";
import {getPre} from "../get-pre.js";

export function getTableRow(...values) {
    return h('tr', null, values.map((value) => {
        if (typeof value !== 'string') {
            return h('td', null, JSON.stringify(value));
        } else if (value.includes('\n')) {
            return h('td', null, getPre(value));
        }

        return h('td', null, value);
    }));
}
