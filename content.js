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

initialize();
