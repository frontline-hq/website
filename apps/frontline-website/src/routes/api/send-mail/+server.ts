import { error, json, type RequestHandler } from '@sveltejs/kit';
import { PRIVATE_PROD_BREVO_APIKEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const { message } = await request.json();
	// Send the message
	try {
		const mail = {
			sender: { name: 'Frontline Contact Form', email: 'contact@frontline.codes' },
			to: [{ email: 'contact@frontline.codes', name: 'Frontline Contact' }],
			subject: 'Frontline Contact Form - New Message',
			htmlContent: message,
			headers: {
				'Content-Type': 'text/html; charset=utf-8'
			}
		};

		const options = {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'api-key': PRIVATE_PROD_BREVO_APIKEY,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(mail)
		};

		await fetch('https://api.brevo.com/v3/smtp/email', options);
	} catch (e) {
		error(400, "Can't send message.");
	}
	return json({ message: 'Message sent.' });
};
