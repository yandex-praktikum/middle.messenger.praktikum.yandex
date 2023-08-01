export function hideAllPopups() {
	const popupEls = document.querySelectorAll('.popup');

	(Array.from(popupEls) || []).forEach(popupEl => {
		if (!popupEl.classList.contains('popup_hidden')) {
			popupEl.classList.add('popup_hidden');
		}
	});
}
