document.getElementById('copyButton').addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.scripting.executeScript({
			target: { tabId: tabs[0].id },
			function: getLatestReviewer,
		});
	});
});

document.addEventListener('DOMContentLoaded', () => {
	const toggleSwitch = document.getElementById('toggleSwitch');

	// Initialize the toggle state
	chrome.storage.local.get(['extensionEnabled'], (result) => {
		toggleSwitch.checked = result.extensionEnabled ?? true; // Default to true
	});

	// Listen for changes in toggle state
	toggleSwitch.addEventListener('change', (event) => {
		const enabled = event.target.checked;
		chrome.storage.local.set({ extensionEnabled: enabled }, () => {
			console.log(`Extension enabled: ${enabled}`);
		});

		// Notify content scripts of the change
		chrome.runtime.sendMessage({ action: 'toggle-extension', enabled });
	});
});
