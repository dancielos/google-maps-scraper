// Function to extract rating and review count
function getRatingAndReview() {
	const ratingSpan = document.querySelector('span[role="img"]');
	const reviewSpan = document.querySelector('span[aria-label*="reviews"]');

	const rating = ratingSpan
		? ratingSpan.getAttribute('aria-label').trim().substring(0, 3)
		: '0.0';
	const reviewCount = reviewSpan
		? reviewSpan.getAttribute('aria-label').match(/\d+/)[0]
		: '0';

	return { rating, reviewCount };
}

// Function to extract name, category, address, phone, and website
function getAdditionalDetails() {
	// Extracting business name from the "Actions for" element
	const nameElement = document.querySelector('div[aria-label^="Actions for"]');
	const name = nameElement
		? nameElement.getAttribute('aria-label').replace('Actions for ', '')
		: 'N/A';

	// Extracting category from the "category" button
	const categoryElement = document.querySelector(
		'button[jsaction="pane.wfvdle14.category"]'
	);
	const category = categoryElement ? categoryElement.innerText : 'N/A';

	// Extracting city from the address button
	const addressElement = document.querySelector(
		'button[aria-label^="Address:"]'
	);
	let city = 'N/A';
	if (addressElement) {
		const addressText = addressElement
			.getAttribute('aria-label')
			.replace('Address: ', '');
		const addressParts = addressText.split(', ');
		city = addressParts.length > 1 ? addressParts[1] : 'N/A';
	}

	// Extracting phone number
	const phoneElement = document.querySelector('button[aria-label^="Phone:"]');
	const phone = phoneElement
		? phoneElement.getAttribute('aria-label').replace('Phone: ', '')
		: 'N/A';

	// Extracting website URL
	const websiteElement = document.querySelector('a[aria-label^="Website:"]');
	const website = websiteElement ? websiteElement.getAttribute('href') : 'N/A';

	return { name, category, city, phone, website };
}

// Function to copy data to clipboard
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
	button.textContent = 'Copy Data';
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
		const { name, category, city, phone, website } = getAdditionalDetails();
		const formattedText = `${name}\t${rating}\t${reviewCount}\t${category}\t${city}\t${phone}\t${website}`;
		copyToClipboard(formattedText);
	});

	document.body.appendChild(button);
}

// Run the function to add the button when the script loads
addCopyButton();
