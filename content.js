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

// Main initialization function
function initialize() {
	// Only initialize the relevant feature based on the current URL
	if (window.location.href.includes('google.com/maps')) {
		initializeMapsFeatures();
	} else if (window.location.href.includes('google.com/search')) {
		initializeSearchReviews();
	}
}

initialize();
