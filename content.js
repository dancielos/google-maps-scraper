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
		'button[jsaction*=".category"]'
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
		city =
			addressParts.length > 1 ? addressParts[addressParts.length - 2] : 'N/A';
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
			showSnackbar('Copied to clipboard!');
		})
		.catch((err) => {
			console.error('Failed to copy: ', err);
		});
}

// Function to create a snackbar message
function showSnackbar(message) {
	// Create snackbar element
	const snackbar = document.createElement('div');
	snackbar.textContent = message;
	snackbar.style.position = 'fixed';
	snackbar.style.bottom = '20px';
	snackbar.style.left = '50%';
	snackbar.style.transform = 'translateX(-50%)';
	snackbar.style.backgroundColor = '#323232';
	snackbar.style.color = '#fff';
	snackbar.style.padding = '12px 24px';
	snackbar.style.borderRadius = '4px';
	snackbar.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
	snackbar.style.zIndex = 1001;
	snackbar.style.opacity = '0';
	snackbar.style.transition = 'opacity 0.5s ease, bottom 0.5s ease';

	// Add snackbar to the document
	document.body.appendChild(snackbar);

	// Show snackbar
	setTimeout(() => {
		snackbar.style.opacity = '1';
		snackbar.style.bottom = '30px';
	}, 10);

	// Hide snackbar after 3 seconds
	setTimeout(() => {
		snackbar.style.opacity = '0';
		snackbar.style.bottom = '20px';
		setTimeout(() => {
			snackbar.remove();
		}, 500);
	}, 3000);
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
