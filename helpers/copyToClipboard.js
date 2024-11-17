const copyToClipboardHelper = {
	copy: function (text) {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				snackbarHelper.showSnackbar('Copied to clipboard!');
			})
			.catch((err) => {
				console.error('Failed to copy: ', err);
			});
	},
};
