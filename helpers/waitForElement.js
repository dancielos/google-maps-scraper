const waitHelper = {
	waitForElement: function (selector, timeout = 5000) {
		return new Promise((resolve, reject) => {
			// If element already exists, resolve immediately
			const element = document.querySelector(selector);
			if (element) {
				resolve(element);
				return;
			}

			// Set a timeout to avoid waiting indefinitely
			const timeoutId = setTimeout(() => {
				observer.disconnect();
				reject(new Error(`Timeout waiting for element: ${selector}`));
			}, timeout);

			// Create observer to watch for the element
			const observer = new MutationObserver((mutations, obs) => {
				const element = document.querySelector(selector);
				if (element) {
					clearTimeout(timeoutId);
					obs.disconnect();
					resolve(element);
				}
			});

			// Start observing
			observer.observe(document.body, {
				childList: true,
				subtree: true,
			});
		});
	},
};
