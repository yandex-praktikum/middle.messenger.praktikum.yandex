export function emitModalClick(viewEl: Element) {
	const modalEl = viewEl.closest('.modal')!;

	return function() {
		const closeBtn = modalEl.querySelector('.modal__close-btn') as HTMLElement;
		closeBtn && closeBtn.click();
	};
}
