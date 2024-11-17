const snackbarHelper = {
	// Function to create a snackbar message
	showSnackbar: function (message) {
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

		document.body.appendChild(snackbar);

		setTimeout(() => {
			snackbar.style.opacity = '1';
			snackbar.style.bottom = '30px';
		}, 10);

		setTimeout(() => {
			snackbar.style.opacity = '0';
			snackbar.style.bottom = '20px';
			setTimeout(() => {
				snackbar.remove();
			}, 500);
		}, 3000);
	},
};
