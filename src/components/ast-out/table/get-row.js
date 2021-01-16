import {getPre} from "../get-pre.js";

export function getTableRow(...values) {
    const row = document.createElement('tr');

    for (const value of values) {
        const cell = document.createElement('td');

        if (typeof value !== 'string') {
            cell.textContent = JSON.stringify(value);
        } else if (value.includes('\n')) {
            cell.appendChild(getPre(value));
        } else {
            cell.textContent = value;
        }

        row.appendChild(cell);
    }

    return row;
}
