export function addWhitespaces(text) {
    return text
        .replace(/\n/g, '<span>↩</span><br/>')
        .replace(/ /g, '<span>○</span>')
        .replace(/\t/g, '<span>→</span>');
}
