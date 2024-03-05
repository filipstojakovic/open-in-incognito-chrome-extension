document.addEventListener('click', function (event) {
	const el = event.target;
	const ancestorAnchor = el.closest('a');

	if (el.tagName == 'A' || ancestorAnchor) {
		if (event.shiftKey) {
			event.preventDefault();
			chrome.runtime.sendMessage({
				action: 'openIncognito',
				url: el.href || ancestorAnchor.href,
			});
		}
	}
});
