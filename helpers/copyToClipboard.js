const copyToClipboardHelper = {
	copy: function (text) {
		if (
			navigator.clipboard &&
			typeof navigator.clipboard.writeText === 'function'
		) {
			navigator.clipboard
				.writeText(text)
				.then(() => {
					if (
						typeof snackbarHelper !== 'undefined' &&
						snackbarHelper.showSnackbar
					) {
						snackbarHelper.showSnackbar('Copied to clipboard!');
					} else {
						console.log('Copied to clipboard!');
					}
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

		// Style to prevent conflicts and keep invisible
		Object.assign(textarea.style, {
			position: 'fixed',
			top: '-9999px',
			left: '-9999px',
			opacity: '0',
			pointerEvents: 'none',
		});

		document.body.appendChild(textarea);
		textarea.select();

		try {
			const successful = document.execCommand('copy');
			if (successful) {
				if (
					typeof snackbarHelper !== 'undefined' &&
					snackbarHelper.showSnackbar
				) {
					snackbarHelper.showSnackbar('Copied using fallback!');
				} else {
					console.log('Copied using fallback!');
				}
			} else {
				console.warn('Fallback copy failed.');
			}
		} catch (err) {
			console.error('Fallback copy failed: ', err);
		} finally {
			document.body.removeChild(textarea);
		}
	},
};
