const businessHelper = {
	getBusinessDetails: function () {
		// Find the main business name element
		const nameElement = document.querySelector(
			'div[aria-label^="Actions for"]'
		);

		// Initialize default response object
		const defaultResponse = {
			name: 'N/A',
			rating: '0.0',
			reviewCount: '0',
			category: 'N/A',
			city: 'N/A',
			phone: 'N/A',
			website: 'N/A',
		};

		if (!nameElement) return defaultResponse;

		// Extract name
		const name = nameElement
			.getAttribute('aria-label')
			.replace('Actions for ', '');

		// Find the nearest container for rating and reviews
		const mainContainer =
			nameElement.closest('[role="main"]') ||
			nameElement.closest('[role="region"]');

		if (!mainContainer) return { ...defaultResponse, name };

		// Get rating and review count
		const ratingSpans = Array.from(
			mainContainer.querySelectorAll('span[role="img"]')
		).filter((span) => {
			const ariaLabel = span.getAttribute('aria-label') || '';
			return /^\d{1,2}(\.\d)?\s+(out of \d\s+)?stars?$/i.test(ariaLabel.trim());
		});

		const ratingSpan = ratingSpans[0];
		let reviewSpan = null;

		if (ratingSpan) {
			const nearbyElement = ratingSpan.parentElement || ratingSpan.parentNode;
			if (nearbyElement) {
				reviewSpan =
					nearbyElement.querySelector('span[aria-label*="reviews"]') ||
					nearbyElement.nextElementSibling?.querySelector(
						'span[aria-label*="reviews"]'
					);
			}
		}

		// Extract category, address, phone, and website from the main container
		const categoryElement = mainContainer.querySelector(
			'button[jsaction*=".category"]'
		);
		const addressElement = mainContainer.querySelector(
			'button[aria-label^="Address:"]'
		);
		const phoneElement = mainContainer.querySelector(
			'button[aria-label^="Phone:"]'
		);
		const websiteElement = mainContainer.querySelector(
			'a[aria-label^="Website:"]'
		);

		// Process address for city
		let city = 'N/A';
		if (addressElement) {
			const addressText = addressElement
				.getAttribute('aria-label')
				.replace('Address: ', '');
			const addressParts = addressText.split(', ');
			city =
				addressParts.length > 1 ? addressParts[addressParts.length - 2] : 'N/A';
		}

		// Return all details
		return {
			name,
			rating: ratingSpan
				? ratingSpan
						.getAttribute('aria-label')
						.trim()
						.match(/^\d{1,2}(\.\d)?/)[0]
				: '0.0',
			reviewCount: reviewSpan
				? reviewSpan.getAttribute('aria-label').match(/\d+/)[0]
				: '0',
			category: categoryElement ? categoryElement.innerText : 'N/A',
			city,
			phone: phoneElement
				? phoneElement.getAttribute('aria-label').replace('Phone: ', '')
				: 'N/A',
			website: websiteElement ? websiteElement.getAttribute('href') : 'N/A',
		};
	},
	addCopyButton: function () {
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
	},
};
