const copyToClipboardHelper = {
	copy: function (text) {
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard
				.writeText(text)
				.then(() => {
					snackbarHelper.showSnackbar('Copied to clipboard!');
				})
				.catch((err) => {
					console.error('Failed to copy using Clipboard API: ', err);
					this.fallbackCopy(text);
				});
		} else {
			this.fallbackCopy(text);
		}
	},
	fallbackCopy: function (text) {
		const textarea = document.createElement('textarea');
		textarea.value = text;
		textarea.style.position = 'fixed'; // Avoid scrolling to bottom
		textarea.style.opacity = '0'; // Make it invisible
		document.body.appendChild(textarea);
		textarea.select();
		try {
			const successful = document.execCommand('copy');
			if (successful) {
				snackbarHelper.showSnackbar('Copied using fallback!');
			} else {
				snackbarHelper.showSnackbar('Fallback copy failed.');
			}
		} catch (err) {
			console.error('Fallback copy failed: ', err);
		} finally {
			document.body.removeChild(textarea);
		}
	},
};
