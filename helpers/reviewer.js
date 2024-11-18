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
			await waitHelper.waitForElement('.review-dialog-body');

			// Find all reviews
			const reviews = document.querySelectorAll(
				'.gws-localreviews__google-review'
			);
			if (!reviews || reviews.length === 0) {
				throw new Error('No reviews found');
			}

			// Loop through reviews to find the latest 5-star review
			for (const review of reviews) {
				// Find the rating element by aria-label containing "Rated"
				const ratingElement = review.querySelector('[aria-label^="Rated"]');
				if (!ratingElement) continue;

				const ratingText = ratingElement.getAttribute('aria-label');
				if (!ratingText) continue;

				// Extract the rating number (e.g., "5.0" from "Rated 5.0 out of 5,")
				const ratingMatch = ratingText.match(/Rated (\d+\.?\d*) out of/);
				if (!ratingMatch) continue;

				const rating = parseFloat(ratingMatch[1]);

				// Check if it's a 5-star review
				if (rating === 5.0) {
					// Try to get the name from the nested anchor tag first
					const reviewerImage = review.querySelector('a > img');
					if (!reviewerImage) continue;

					const reviewerName = reviewerImage.alt.trim();
					if (!reviewerName) continue;

					// Get just the first name
					const firstName = textHelper.toTitleCase(reviewerName.split(' ')[0]);

					// Copy to clipboard and return
					copyToClipboardHelper.copy(firstName);
					return;
				}
			}

			// If we get here, no 5-star review was found
			throw new Error('No recent 5-star reviews found');
		} catch (error) {
			console.error('Error:', error);
			alert(`Error: ${error.message}`);
		}
	},
};
