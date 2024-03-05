chrome.runtime.onInstalled.addListener(function () {
	chrome.contextMenus.create({
		id: 'open-incognito',
		title: 'Open In Incognito',
		contexts: ['all'],
	});
});

function openInIncognito(url) {
	if (url === null || (!url.startsWith('www') && !url.startsWith('http'))) {
		url = 'https://www.duckduckgo.com';
	}
	chrome.windows.create({ url, incognito: true, state: 'maximized' });
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
	if (info.menuItemId === 'open-incognito') {
		const url = info.linkUrl || info.pageUrl;
		openInIncognito(url);
	}
});

function openCurrentTabInIncognito() {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		const tab = tabs[0];
		let url = tab.url;
		openInIncognito(url);
	});
}

// Add a listener for the keyboard shortcut
chrome.commands.onCommand.addListener(function (command) {
	if (command === 'openInIncognitoCommand') {
		openCurrentTabInIncognito();
	}
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === 'openIncognito') {
		openInIncognito(request.url);
		// chrome.windows.create({ url: request.url, incognito: true });
	}
});
