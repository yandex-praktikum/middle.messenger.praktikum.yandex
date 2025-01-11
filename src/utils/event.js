export const onCustomEvent = (page) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { page } }));
}
