export function domReady() {
    return new Promise(function handleReadyState(resolve) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve);
        } else {
            resolve();
        }
    });
}
