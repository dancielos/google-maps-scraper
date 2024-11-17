function waitForElement(selector, timeout = 5000) {
	return new Promise((resolve, reject) => {
		// If element already exists, resolve immediately
		const element = document.querySelector(selector);
		if (element) {
			resolve(element);
			return;
		}

		// Set a timeout to avoid waiting indefinitely
		const timeoutId = setTimeout(() => {
			observer.disconnect();
			reject(new Error(`Timeout waiting for element: ${selector}`));
		}, timeout);

		// Create observer to watch for the element
		const observer = new MutationObserver((mutations, obs) => {
			const element = document.querySelector(selector);
			if (element) {
				clearTimeout(timeoutId);
				obs.disconnect();
				resolve(element);
			}
		});

		// Start observing
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
}

const reviewerHelper = {
	createReviewerButton: function () {
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
		button.addEventListener('click', this.getLatestReviewer);
		document.body.appendChild(button);
	},

	getLatestReviewer: async function () {
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
			await waitForElement('.review-dialog-body');

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
	},
};
