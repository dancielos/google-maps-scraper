const UrlHelper = {
	matchesPattern: function (pattern) {
		const regexPattern = pattern
			.replace(/\./g, '\\.')
			.replace(/\*/g, '.*')
			.replace(/\//g, '\\/');
		const regex = new RegExp(`^${regexPattern}$`);
		return regex.test(window.location.href);
	},
};
