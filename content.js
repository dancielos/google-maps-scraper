// ---- Maps Feature Functions ---- //
// Function to add "Copy to Clipboard" button
function addCopyButton() {
	const button = document.createElement('button');
	button.textContent = 'Copy Data';
	button.style.position = 'fixed';
	button.style.bottom = '20px';
	button.style.right = '20px';
	button.style.padding = '10px 15px';
	button.style.backgroundColor = '#4285F4';
	button.style.color = 'white';
	button.style.border = 'none';
	button.style.borderRadius = '5px';
	button.style.cursor = 'pointer';
	button.style.zIndex = 1000;

	button.addEventListener('click', () => {
		const details = businessHelper.getBusinessDetails();
		const formattedText = `${details.name}\t${details.rating}\t${details.reviewCount}\t${details.category}\t${details.city}\t${details.phone}\t${details.website}`;
		copyToClipboardHelper.copy(formattedText);
	});

	document.body.appendChild(button);
}

// ---- Search Feature Functions ---- //

function createReviewerButton() {
	const button = document.createElement('button');
	button.textContent = 'Copy Latest 5-Star Reviewer';
	button.style.cssText = `
			position: fixed;
			bottom: 20px;
			right: 20px;
			z-index: 9999;
			padding: 10px;
			background: #4285f4;
			color: white;
			border: none;
			border-radius: 4px;
			cursor: pointer;
	`;
	button.addEventListener('click', getLatestReviewer);
	document.body.appendChild(button);
}

async function getLatestReviewer() {
	try {
		// Find the reviews trigger element
		const reviewsTrigger = document.querySelector(
			'[data-async-trigger="reviewDialog"]'
		);
		if (!reviewsTrigger) {
			throw new Error('Reviews trigger not found');
		}

		// Update the sort_by attribute
		reviewsTrigger.setAttribute('data-sort_by', 'newestFirst');

		// Click to open reviews dialog
		reviewsTrigger.click();

		// Wait for the reviews dialog to open and load
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// Find the first review
		const firstReview = document.querySelector(
			'.gws-localreviews__google-review'
		);
		if (!firstReview) {
			throw new Error('No reviews found');
		}

		// Try to get the name from the nested anchor tag first
		let reviewerName = '';

		const reviewerImage = firstReview.querySelector('a > img');
		if (reviewerImage) {
			reviewerName = reviewerImage.alt.trim();
		}

		if (!reviewerName) {
			throw new Error('Reviewer name not found');
		}

		// Get just the first name
		const firstName = reviewerName.split(' ')[0];

		// Copy to clipboard
		copyToClipboardHelper.copy(firstName);
	} catch (error) {
		console.error('Error:', error);
		alert(`Error: ${error.message}`);
	}
}

// ---- Initialization Functions ---- //
function initializeMapsFeatures() {
	if (UrlHelper.matchesPattern('*://*.google.com/maps/*')) {
		addCopyButton();
	}
}

function initializeSearchReviews() {
	if (UrlHelper.matchesPattern('*://*.google.com/search*')) {
		createReviewerButton();
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
