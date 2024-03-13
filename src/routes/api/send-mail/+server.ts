import { error, json, type RequestHandler } from '@sveltejs/kit';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const POST: RequestHandler = async ({ request }) => {
	const { message } = await request.json();
    // Send the message
    
    try {
        // TODO: replace this with actual sending.
        console.log(message)
        await sleep(2000)
        throw new Error()
    } catch (e) {
        error(400, "Can't send message.")
    }
	return json({message: "Message sent."})
};