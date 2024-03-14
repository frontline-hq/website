import { error, json, type RequestHandler } from '@sveltejs/kit';
import SibApiV3Sdk from 'sib-api-v3-typescript';
import { PRIVATE_PROD_BREVO_APIKEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const { message } = await request.json();
	// Send the message
	try {
		const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
		const apiKey = apiInstance.authentications['apiKey'];
		apiKey.apiKey = PRIVATE_PROD_BREVO_APIKEY;
		const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

		const sender = { name: 'Frontline Contact Form', email: 'contact@frontline.codes' };
		const receivers = [{ email: 'contact@frontline.codes', name: 'Frontline Contact' }];

		sendSmtpEmail.subject = 'Frontline Contact Form - New Message';
		sendSmtpEmail.textContent = message;
		sendSmtpEmail.sender = sender;
		sendSmtpEmail.to = receivers;
		sendSmtpEmail.replyTo = sender;
		sendSmtpEmail.params = { subject: 'Frontline Contact Form' };

		try {
			await apiInstance.sendTransacEmail(sendSmtpEmail);
		} catch (error) {
			throw new Error();
		}
	} catch (e) {
		error(400, "Can't send message.");
	}
	return json({ message: 'Message sent.' });
};
