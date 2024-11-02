// Function to extract rating and review count
function getRatingAndReview() {
	// Try to locate the rating span
	const ratingSpan = document.querySelector('span[aria-hidden="true"]');
	const reviewSpan = document.querySelector('span[aria-label*="reviews"]');

	// Check if the elements exist before accessing their text
	const rating = ratingSpan ? ratingSpan.innerText : 'N/A';
	const reviewCount = reviewSpan
		? reviewSpan.getAttribute('aria-label').match(/\d+/)[0]
		: 'N/A';

	return { rating, reviewCount };
}

// Function to copy the data to the clipboard
function copyToClipboard(text) {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			alert('Copied to clipboard!');
		})
		.catch((err) => {
			console.error('Failed to copy: ', err);
		});
}

// Function to add "Copy to Clipboard" button
function addCopyButton() {
	const button = document.createElement('button');
	button.textContent = 'Copy Rating & Review';
	button.style.position = 'fixed';
	button.style.bottom = '20px';
	button.style.right = '20px';
	button.style.padding = '10px 15px';
	button.style.backgroundColor = '#4285F4'; // Google blue color
	button.style.color = 'white';
	button.style.border = 'none';
	button.style.borderRadius = '5px';
	button.style.cursor = 'pointer';
	button.style.zIndex = 1000;

	button.addEventListener('click', () => {
		const { rating, reviewCount } = getRatingAndReview();
		const formattedText = `Rating: ${rating}\tReviews: ${reviewCount}`;
		copyToClipboard(formattedText);
	});

	document.body.appendChild(button);
}

// Run the function to add the button when the script loads
addCopyButton();
