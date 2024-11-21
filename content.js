// TODO: Add a feature where you check if they're full-time business or not
// TODO: it should work on Facebook to easily copy email address
// TODO: Highlight names if that can be done efficiently
// TODO: Auto input for contact forms (name, email, phone number)
// TODO: When there's no trigger, then catch that error
// TODO: Open website / Facebook if any

// ---- Initialization Functions ---- //
function initializeMapsFeatures() {
	if (UrlHelper.matchesPattern('*://*.google.com/maps/*')) {
		businessHelper.addCopyButton();
	}
}

function initializeSearchReviews() {
	if (UrlHelper.matchesPattern('*://*.google.com/search*')) {
		reviewerHelper.createReviewerButton();
	}
}

function initializeEmailFinder() {
	// Check if we're not on excluded sites
	const excludedSites = [
		'youtube.com',
		'facebook.com',
		'twitter.com',
		'instagram.com',
		'linkedin.com',
		'tiktok.com',
		'pinterest.com',
	];

	const currentHost = window.location.hostname;
	if (!excludedSites.some((site) => currentHost.includes(site))) {
		emailFinderHelper.createEmailDisplay();
	}
}

// Main initialization function
function initialize() {
	// Only initialize the relevant feature based on the current URL
	if (window.location.href.includes('google.com/maps')) {
		initializeMapsFeatures();
	} else if (window.location.href.includes('google.com/search')) {
		initializeSearchReviews();
	} else {
		initializeEmailFinder();
	}
}

// Wrap your main functionality to respect the "enabled" state
function main() {
	chrome.storage.local.get(['extensionEnabled'], (result) => {
		if (result.extensionEnabled ?? true) {
			initialize(); // Call your existing initialization logic
		}
	});
}

// Listen for runtime messages to enable/disable features dynamically
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'toggle-extension') {
		if (message.enabled) {
			console.log('Extension enabled');
			initialize(); // Reinitialize if enabled
		} else {
			console.log('Extension disabled');
			// Optionally clean up any UI changes or listeners
		}
	}
});

// Run the script
main();
