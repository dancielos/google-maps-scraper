const emailFinderHelper = {
	// Regular expression for finding emails
	emailRegex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,

	// Find all unique emails in the document
	findEmails: function () {
		const bodyText = document.body.innerText;
		const htmlContent = document.body.innerHTML;

		// Find emails in both text and HTML (for mailto: links)
		const textEmails = bodyText.match(this.emailRegex) || [];

		const htmlEmails = htmlContent.match(/mailto:([^"'>\s]+)/g) || [];

		// Clean up mailto: emails and combine results
		const mailtoEmails = htmlEmails.map((email) =>
			email.replace('mailto:', '')
		);
		const allEmails = [...new Set([...textEmails, ...mailtoEmails])];
		const cleanedEmails = allEmails.map((a) => a.toLowerCase());

		return cleanedEmails;
	},

	// Create and inject the email display UI
	createEmailDisplay: function () {
		const emails = this.findEmails();

		// Create container
		const container = document.createElement('div');
		container.id = 'email-finder-container';
		container.style.cssText = `
          position: fixed;
          bottom: 20px;
          left: 20px;
          background: white;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 10px;
          max-width: 300px;
          max-height: 400px;
          overflow-y: auto;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          z-index: 10000;
          font-family: Arial, sans-serif;
      `;

		// Add header
		const header = document.createElement('div');
		header.style.cssText = `
          font-weight: bold;
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 1px solid #eee;
      `;
		header.textContent = `Found ${emails.length} Email${
			emails.length !== 1 ? 's' : ''
		}`;
		container.appendChild(header);

		// Add emails with copy buttons
		emails.forEach((email) => {
			const emailContainer = document.createElement('div');
			emailContainer.style.cssText = `
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 8px;
              padding: 5px;
              background: #f5f5f5;
              border-radius: 4px;
          `;

			const emailText = document.createElement('div');
			emailText.style.cssText = `
              margin-right: 10px;
              word-break: break-all;
          `;
			emailText.textContent = email;

			const copyButton = document.createElement('button');
			copyButton.style.cssText = `
              background: #4285f4;
              color: white;
              border: none;
              border-radius: 4px;
              padding: 4px 8px;
              cursor: pointer;
              font-size: 12px;
          `;
			copyButton.textContent = 'Copy';
			copyButton.onclick = () => copyToClipboardHelper.copy(email);

			emailContainer.appendChild(emailText);
			emailContainer.appendChild(copyButton);
			container.appendChild(emailContainer);
		});

		// Add close button
		const closeButton = document.createElement('button');
		closeButton.style.cssText = `
          position: absolute;
          top: 5px;
          right: 5px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          color: #666;
      `;
		closeButton.innerHTML = '×';
		closeButton.onclick = () => container.remove();
		container.appendChild(closeButton);

		document.body.appendChild(container);
	},
};
