document.getElementById('copyButton').addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.scripting.executeScript({
			target: { tabId: tabs[0].id },
			function: getLatestReviewer,
		});
	});
});
